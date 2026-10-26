import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Buscador from './components/Buscador.jsx'
import Filtros from './components/Filtros.jsx'
import TarjetaInvitado from './components/TarjetaInvitado.jsx'
import ModalIngreso from './components/ModalIngreso.jsx'
import { ESTADOS } from './lib/constants.js'
import { cargar, guardar, reiniciar, descargarCSV, nuevoInvitado, recordarAsesor } from './lib/store.js'
import { normalizar, ordenIngreso } from './lib/utils.js'

export default function App() {
  const [invitados, setInvitados] = useState(cargar)
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState('todos')
  const [abierto, setAbierto] = useState(null)
  const [aviso, setAviso] = useState('')

  useEffect(() => { guardar(invitados) }, [invitados])

  useEffect(() => {
    if (!aviso) return
    const t = setTimeout(() => setAviso(''), 2400)
    return () => clearTimeout(t)
  }, [aviso])

  const ordenados = useMemo(() => ordenIngreso([...invitados]), [invitados])
  const ganador = ordenados[0] || null

  const conteos = useMemo(() => ({
    todos: invitados.length,
    [ESTADOS.PENDIENTE]: invitados.filter((g) => g.estado === ESTADOS.PENDIENTE).length,
    [ESTADOS.DENTRO]: invitados.filter((g) => g.estado === ESTADOS.DENTRO).length,
    [ESTADOS.SALIO]: invitados.filter((g) => g.estado === ESTADOS.SALIO).length,
  }), [invitados])

  const lista = useMemo(() => {
    const texto = normalizar(q)
    return invitados.filter((g) => {
      if (filtro !== 'todos' && g.estado !== filtro) return false
      return !texto || normalizar(g.nombre).includes(texto)
    })
  }, [invitados, q, filtro])

  const guardarCambio = (nuevo, mensaje) => {
    if (nuevo.asesor) recordarAsesor(nuevo.asesor)
    setInvitados((prev) => prev.map((g) => (g.id === nuevo.id ? nuevo : g)))
    setAbierto(null)
    setAviso(mensaje)
  }

  const agregar = () => {
    const nombre = window.prompt('Nombre completo del invitado no listado:')
    if (!nombre || !nombre.trim()) return
    const id = Math.max(0, ...invitados.map((g) => g.id)) + 1
    setInvitados((prev) => [...prev, nuevoInvitado(id, nombre.trim().replace(/\s+/g, ' ').toUpperCase())])
    setQ('')
    setFiltro('todos')
    setAbierto(id)
  }

  const borrarTodo = () => {
    if (!window.confirm('¿Borrar TODOS los ingresos registrados y empezar de cero?')) return
    if (!window.confirm('Última confirmación: se perderá todo lo registrado. ¿Continuar?')) return
    reiniciar()
    setInvitados(cargar())
  }

  const invitadoAbierto = invitados.find((g) => g.id === abierto)

  return (
    <div className="min-h-dvh pb-24">
      <Header
        total={conteos.todos}
        ingresaron={conteos[ESTADOS.DENTRO] + conteos[ESTADOS.SALIO]}
        adentro={conteos[ESTADOS.DENTRO]}
        primero={ganador}
      />

      <main className="mx-auto max-w-3xl space-y-3 px-4 pt-4">
        <Buscador valor={q} onChange={setQ} />
        <Filtros activo={filtro} onChange={setFiltro} conteos={conteos} />

        {lista.length === 0 ? (
          <div className="py-14 text-center">
            <p className="font-display text-3xl uppercase">Sin resultados</p>
            <p className="mt-1 text-sm text-texto">Revisa el nombre o agrégalo como invitado nuevo.</p>
            <button onClick={agregar} className="mt-4 h-12 border-2 border-onix px-5 text-sm font-bold">Agregar invitado</button>
          </div>
        ) : (
          <ul className="space-y-2">
            {lista.map((g) => (
              <li key={g.id}>
                <TarjetaInvitado g={g} ganador={ganador?.id === g.id} onClick={() => setAbierto(g.id)} />
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-3 border-t border-plata pt-6">
          <button onClick={() => descargarCSV(invitados)} className="h-14 w-full border-2 border-onix font-display text-2xl uppercase hover:bg-onix hover:text-white">
            Descargar respaldo (Excel)
          </button>
          <div className="flex justify-center gap-5 text-sm">
            <button onClick={agregar} className="font-semibold text-texto underline">Agregar invitado no listado</button>
            <button onClick={borrarTodo} className="font-semibold text-texto underline">Empezar de cero</button>
          </div>
          <p className="text-center text-xs text-texto">Todo se guarda automáticamente en este dispositivo.</p>
        </div>
      </main>

      {invitadoAbierto && (
        <ModalIngreso
          key={invitadoAbierto.id}
          g={invitadoAbierto}
          yaIngresaron={ordenados.length}
          onClose={() => setAbierto(null)}
          onSave={guardarCambio}
        />
      )}

      {aviso && (
        <div role="status" className="anim-subir fixed inset-x-4 bottom-6 z-40 mx-auto max-w-sm bg-onix px-4 py-3 text-center text-sm font-bold text-white">
          {aviso}
        </div>
      )}
    </div>
  )
}
