import { DEMO } from './demo.js'

const URL = import.meta.env.VITE_SHEET_URL
export const enVivo = Boolean(URL)

const LS = 'markas-checkin-demo-v1'

export async function cargarInvitados() {
  if (!enVivo) {
    const guardado = localStorage.getItem(LS)
    if (guardado) return JSON.parse(guardado)
    localStorage.setItem(LS, JSON.stringify(DEMO))
    return DEMO
  }
  const res = await fetch(URL)
  if (!res.ok) throw new Error('No se pudo leer la hoja')
  return res.json()
}

export async function guardarInvitado(invitado, todos) {
  if (!enVivo) {
    localStorage.setItem(LS, JSON.stringify(todos))
    return
  }
  // text/plain evita el preflight CORS de Apps Script
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(invitado),
  })
  if (!res.ok) throw new Error('No se pudo guardar en la hoja')
}

export function reiniciarDemo() {
  localStorage.removeItem(LS)
}
