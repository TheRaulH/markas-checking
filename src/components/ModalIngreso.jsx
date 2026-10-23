import { useEffect, useState } from 'react'
import { ASESORES, ESTADOS, PREMIO_TOP } from '../lib/constants.js'
import { hora } from '../lib/utils.js'
import Interruptor from './Interruptor.jsx'

export default function ModalIngreso({ g, yaIngresaron, onClose, onSave }) {
  const esNuevo = g.estado === ESTADOS.PENDIENTE
  const esDentro = g.estado === ESTADOS.DENTRO
  const [asesor, setAsesor] = useState(g.asesor || '')
  const [n, setN] = useState(g.acompanantes === '' ? Number(g.cantidad) || 1 : Number(g.acompanantes))
  const [titular, setTitular] = useState(g.regaloTitular === 'Sí')
  const [acomp, setAcomp] = useState(g.regaloAcomp === 'Sí')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const numero = yaIngresaron + 1
  const premio = esNuevo && numero <= PREMIO_TOP
  const difiere = n !== Number(g.cantidad)

  const base = () => ({
    ...g,
    asesor,
    acompanantes: n,
    regaloTitular: titular ? 'Sí' : 'No',
    regaloAcomp: n > 1 && acomp ? 'Sí' : 'No',
  })
  const ahora = () => new Date().toISOString()

  const confirmar = () => onSave({ ...base(), estado: ESTADOS.DENTRO, horaIngreso: ahora(), horaSalida: '' }, `Ingreso confirmado: ${g.nombre}`)
  const salida = () => onSave({ ...base(), estado: ESTADOS.SALIO, horaSalida: ahora() }, `Salida registrada: ${g.nombre}`)
  const guardar = () => onSave(base(), 'Cambios guardados')
  const reingresar = () => onSave({ ...base(), estado: ESTADOS.DENTRO, horaSalida: '' }, `Reingreso: ${g.nombre}`)
  const deshacer = () => {
    if (!window.confirm('¿Deshacer el ingreso? Se borrarán asesor, regalos y horas.')) return
    onSave(
      { ...g, estado: ESTADOS.PENDIENTE, asesor: '', acompanantes: '', regaloTitular: '', regaloAcomp: '', horaIngreso: '', horaSalida: '' },
      'Ingreso deshecho',
    )
  }

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
      <div className="anim-aparecer absolute inset-0 bg-onix/70" onClick={onClose} />
      <div className="anim-subir relative flex max-h-[94dvh] w-full max-w-lg flex-col bg-white sm:max-h-[90dvh]">
        <div className="h-1 shrink-0 bg-rojo" />
        <div className="flex items-start justify-between gap-3 border-b border-plata px-4 py-3">
          <div className="min-w-0">
            <h2 id="modal-titulo" className="font-display text-3xl uppercase leading-none">{g.nombre}</h2>
            <p className="text-sm text-texto">
              {g.telefono} · Registró {g.cantidad} {Number(g.cantidad) === 1 ? 'asistente' : 'asistentes'}
              {g.horaIngreso && <> · Ingresó {hora(g.horaIngreso)}</>}
            </p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-plata hover:border-onix">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto px-4 py-4">
          {premio && (
            <div className="flex items-center gap-3 border-2 border-onix p-3">
              <span className="font-display text-6xl leading-none text-rojo">{numero}</span>
              <p className="text-sm font-bold leading-snug">
                Será el invitado n.° {numero} en ingresar.
                <br />Entregar premio especial.
              </p>
            </div>
          )}

          <section>
            <h3 className="mb-2 text-sm font-bold">Asesor a cargo</h3>
            <div className="grid grid-cols-3 gap-2">
              {ASESORES.map((a) => (
                <button
                  key={a}
                  onClick={() => setAsesor(a)}
                  aria-pressed={asesor === a}
                  className={`h-14 border-2 text-base font-bold ${asesor === a ? 'border-onix bg-onix text-white' : 'border-plata bg-white hover:border-onix'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-bold">Personas que llegaron</h3>
            <div className="flex items-center gap-3">
              <button onClick={() => setN(Math.max(1, n - 1))} aria-label="Una persona menos" className="h-14 w-14 border-2 border-onix text-3xl font-bold active:bg-plata">−</button>
              <div className="flex-1 text-center font-display text-6xl leading-none">{n}</div>
              <button onClick={() => setN(n + 1)} aria-label="Una persona más" className="h-14 w-14 border-2 border-onix bg-onix text-3xl font-bold text-white active:bg-texto">+</button>
            </div>
            {difiere && (
              <p className="mt-2 border-l-4 border-rojo bg-plata-claro px-3 py-1.5 text-sm font-semibold">
                Difiere del formulario ({g.cantidad}).
              </p>
            )}
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold">Regalos</h3>
            <Interruptor label="Regalo titular" detalle="Hervidora" checked={titular} onChange={setTitular} />
            <Interruptor
              label="Regalo acompañante"
              detalle={n > 1 ? 'Entregado al acompañante' : 'Solo si llega con acompañante'}
              checked={n > 1 && acomp}
              onChange={setAcomp}
              disabled={n < 2}
            />
          </section>
        </div>

        <div className="space-y-2 border-t border-plata bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
          {esNuevo && (
            <button onClick={confirmar} disabled={!asesor} className="h-16 w-full bg-onix font-display text-3xl uppercase text-white hover:bg-texto disabled:bg-plata disabled:text-texto">
              {asesor ? 'Confirmar ingreso' : 'Elegir asesor para confirmar'}
            </button>
          )}
          {esDentro && (
            <>
              <button onClick={salida} className="h-16 w-full bg-onix font-display text-3xl uppercase text-white hover:bg-texto">
                Registrar salida
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={guardar} disabled={!asesor} className="h-12 border-2 border-onix text-sm font-bold disabled:opacity-40">Guardar cambios</button>
                <button onClick={deshacer} className="h-12 border-2 border-plata text-sm font-bold text-texto hover:border-onix">Deshacer ingreso</button>
              </div>
            </>
          )}
          {g.estado === ESTADOS.SALIO && (
            <div className="grid grid-cols-2 gap-2">
              <button onClick={reingresar} className="h-14 bg-onix text-sm font-bold text-white">Volver a ingresar</button>
              <button onClick={guardar} className="h-14 border-2 border-onix text-sm font-bold">Guardar cambios</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
