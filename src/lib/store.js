import { INVITADOS } from '../data/invitados.js'

const LS = 'markas-checkin-v2'
const LS_ASESOR = 'markas-checkin-asesor'

export const nuevoInvitado = (id, nombre) => ({
  id, nombre, estado: 'Pendiente', asesor: '', acompanantes: '',
  regaloTitular: '', regaloAcomp: '', horaIngreso: '', horaSalida: '',
})

export function cargar() {
  try {
    const s = localStorage.getItem(LS)
    if (s) return JSON.parse(s)
  } catch { /* ignorar */ }
  return INVITADOS.map((n, i) => nuevoInvitado(i + 1, n))
}

export function guardar(lista) {
  try { localStorage.setItem(LS, JSON.stringify(lista)) } catch { /* ignorar */ }
}

export function reiniciar() {
  try { localStorage.removeItem(LS); localStorage.removeItem(LS_ASESOR) } catch { /* ignorar */ }
}

export const ultimoAsesor = () => { try { return localStorage.getItem(LS_ASESOR) || '' } catch { return '' } }
export const recordarAsesor = (a) => { try { localStorage.setItem(LS_ASESOR, a) } catch { /* ignorar */ } }

const fmt = (iso) => (iso ? new Date(iso).toLocaleString('es-BO') : '')

export function descargarCSV(lista) {
  const cab = ['N°', 'Nombre', 'Estado', 'Asesor', 'Personas que ingresaron', 'Regalo titular', 'Regalo acompañante', 'Hora ingreso', 'Hora salida']
  const filas = lista.map((g) => [g.id, g.nombre, g.estado, g.asesor, g.acompanantes, g.regaloTitular, g.regaloAcomp, fmt(g.horaIngreso), fmt(g.horaSalida)])
  const csv = [cab, ...filas].map((f) => f.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `ingresos-markas-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 2000)
}
