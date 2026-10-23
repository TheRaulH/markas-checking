import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Buscador from './components/Buscador.jsx'
import Filtros from './components/Filtros.jsx'
import TarjetaInvitado from './components/TarjetaInvitado.jsx'
import ModalIngreso from './components/ModalIngreso.jsx'
import { ESTADOS, PREMIO_TOP } from './lib/constants.js'
import { cargarInvitados, guardarInvitado, enVivo, reiniciarDemo } from './lib/sheet.js'
import { normalizar, soloDigitos, ordenIngreso } from './lib/utils.js'

export default function App() {
  const [invitados, setInvitados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState('todos')
  const [abierto, setAbierto] = useState(null)
  const [aviso, setAviso] = useState('')

  const cargar = useCallback(async () => {
    setCargando(true)
    setError('')
    try {
      setInvitados(await cargarInvitados())
    } catch (e) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => { cargar() }, [cargar])

  useEffect(() => {
    if (!aviso) return
    const t = setTimeout(() => setAviso(''), 2600)
    return () => clearTimeout(t)
  }, [aviso])

  const ordenados = useMemo(() => ordenIngreso([...invitados]), [invitados])
  const posicion = useMemo(() => new Map(ordenados.map((g, i) => [g.row, i + 1])), [ordenados])
  const primeros = ordenados.slice(0, PREMIO_TOP)

  const conteos = useMemo(() => ({
    todos: invitados.length,
    [ESTADOS.PENDIENTE]: invitados.filter((g) => g.estado === ESTADOS.PENDIENTE).length,
    [ESTADOS.DENTRO]: invitados.filter((g) => g.estado === ESTADOS.DENTRO).length,
    [ESTADOS.SALIO]: invitados.filter((g) => g.estado === ESTADOS.SALIO).length,
  }), [invitados])

  const lista = useMemo(() => {
    const texto = normalizar(q)
    const dig = soloDigitos(q)
    return invitados.filter((g) => {
      if (filtro !== 'todos' && g.estado !== filtro) return false
      if (!texto) return true
      return normalizar(g.nombre).includes(texto) || (dig.length >= 2 && soloDigitos(g.telefono).includes(dig))
    })
  }, [invitados, q, filtro])

  const guardar = async (nuevo, mensaje) => {
    const previo = invitados
    const todos = invitados.map((g) => (g.row === nuevo.row ? nuevo : g))
    setInvitados(todos)
    setAbierto(null)
    try {
      await guardarInvitado(nuevo, todos)
      setAviso(mensaje)
    } catch (e) {
      setInvitados(previo)
      setError(`${e.message}. El cambio no se guardó.`)
    }
  }

  const invitadoAbierto = invitados.find((g) => g.row === abierto)

  return (
    <div className="min-h-dvh pb-24">
      <Header
        total={conteos.todos}
        ingresaron={conteos[ESTADOS.DENTRO] + conteos[ESTADOS.SALIO]}
        adentro={conteos[ESTADOS.DENTRO]}
        primeros={primeros}
        enVivo={enVivo}
      />

      <main className="mx-auto max-w-3xl space-y-3 px-4 pt-4">
        <Buscador valor={q} onChange={setQ} />
        <Filtros activo={filtro} onChange={setFiltro} conteos={conteos} />

        {error && (
          <div role="alert" className="flex items-center justify-between gap-3 border-l-4 border-rojo bg-plata-claro p-3 text-sm font-semibold">
            <span>{error}</span>
            <button onClick={cargar} className="h-10 shrink-0 bg-onix px-4 font-bold text-white">Reintentar</button>
          </div>
        )}

        {cargando ? (
          <p className="py-16 text-center font-semibold text-texto">Cargando invitados…</p>
        ) : lista.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-3xl uppercase">Sin resultados</p>
            <p className="mt-1 text-sm text-texto">Revisa el nombre o prueba con los últimos dígitos del teléfono.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {lista.map((g) => (
              <li key={g.row}>
                <TarjetaInvitado g={g} orden={posicion.get(g.row)} onClick={() => setAbierto(g.row)} />
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-center gap-4 pt-6 text-sm">
          <button onClick={cargar} className="font-semibold text-texto underline">Actualizar lista</button>
          {!enVivo && (
            <button
              onClick={() => { if (window.confirm('¿Reiniciar los datos de demostración?')) { reiniciarDemo(); cargar() } }}
              className="font-semibold text-texto underline"
            >
              Reiniciar demo
            </button>
          )}
        </div>
      </main>

      {invitadoAbierto && (
        <ModalIngreso
          key={invitadoAbierto.row}
          g={invitadoAbierto}
          yaIngresaron={ordenados.length}
          onClose={() => setAbierto(null)}
          onSave={guardar}
        />
      )}

      {aviso && (
        <div role="status" className="anim-subir fixed inset-x-4 bottom-6 z-40 mx-auto max-w-sm bg-onix px-4 py-3 text-center text-sm font-bold text-white shadow-lg">
          {aviso}
        </div>
      )}
    </div>
  )
}
