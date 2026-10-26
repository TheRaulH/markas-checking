export const normalizar = (s = '') =>
  String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export const hora = (iso) =>
  iso ? new Date(iso).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) : ''

export const ordenIngreso = (invitados) =>
  invitados
    .filter((g) => g.horaIngreso)
    .sort((a, b) => new Date(a.horaIngreso) - new Date(b.horaIngreso))
