import { ESTADOS } from '../lib/constants.js'
import { hora } from '../lib/utils.js'

const ESTILOS = {
  [ESTADOS.PENDIENTE]: { borde: 'border-l-plata', fondo: 'bg-white', chip: 'border border-plata text-texto', texto: 'Pendiente' },
  [ESTADOS.DENTRO]: { borde: 'border-l-dentro', fondo: 'bg-white', chip: 'border border-dentro text-dentro', texto: 'Adentro' },
  [ESTADOS.SALIO]: { borde: 'border-l-salio', fondo: 'bg-white', chip: 'border border-salio text-salio', texto: 'Salió' },
}

export default function TarjetaInvitado({ g, orden, onClick }) {
  const e = ESTILOS[g.estado] || ESTILOS[ESTADOS.PENDIENTE]
  const llego = g.estado !== ESTADOS.PENDIENTE
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-stretch gap-3 border border-l-[6px] border-y-plata border-r-plata py-3 pl-3 pr-3 text-left hover:bg-plata-claro active:brightness-95 ${e.borde} ${e.fondo}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display text-2xl uppercase leading-none">{g.nombre}</h2>
          <span className={`shrink-0 px-2 py-0.5 text-xs font-semibold ${e.chip}`}>{e.texto}</span>
        </div>
        <p className="mt-1 text-sm font-semibold text-onix">{g.telefono}</p>
        <p className="mt-0.5 text-sm text-texto">
          {llego && g.acompanantes !== '' ? `${g.acompanantes} de ${g.cantidad}` : g.cantidad}{' '}
          {Number(g.cantidad) === 1 ? 'asistente' : 'asistentes'}
          {g.asesor && <> · Asesor: <b className="text-onix">{g.asesor}</b></>}
        </p>
        {llego && (
          <p className="mt-0.5 text-xs text-texto">
            Ingresó {hora(g.horaIngreso)}
            {g.horaSalida && <> · Salió {hora(g.horaSalida)}</>}
            {g.regaloTitular === 'Sí' && <> · Hervidora entregada</>}
          </p>
        )}
      </div>
      {orden && orden <= 3 && (
        <div className="flex w-12 shrink-0 flex-col items-center justify-center border-2 border-rojo text-rojo" title="Premio especial">
          <span className="text-[10px] font-bold leading-none">Premio</span>
          <span className="font-display text-4xl leading-none">{orden}</span>
        </div>
      )}
    </button>
  )
}
