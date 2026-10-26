import { ESTADOS } from '../lib/constants.js'
import { hora } from '../lib/utils.js'

const ESTILOS = {
  [ESTADOS.PENDIENTE]: { borde: 'border-l-plata', chip: 'border border-plata text-texto', texto: 'Pendiente' },
  [ESTADOS.DENTRO]: { borde: 'border-l-dentro', chip: 'border border-dentro text-dentro', texto: 'Adentro' },
  [ESTADOS.SALIO]: { borde: 'border-l-salio', chip: 'border border-salio text-salio', texto: 'Salió' },
}

export default function TarjetaInvitado({ g, ganador, onClick }) {
  const e = ESTILOS[g.estado] || ESTILOS[ESTADOS.PENDIENTE]
  const llego = g.estado !== ESTADOS.PENDIENTE
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-stretch gap-3 border border-l-[6px] border-y-plata border-r-plata bg-white py-3 pl-3 pr-3 text-left hover:bg-plata-claro ${e.borde}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display text-2xl uppercase leading-none">{g.nombre}</h2>
          <span className={`shrink-0 px-2 py-0.5 text-xs font-semibold ${e.chip}`}>{e.texto}</span>
        </div>
        {llego ? (
          <p className="mt-1.5 text-sm text-texto">
            Ingresó {hora(g.horaIngreso)}
            {g.horaSalida && <> · Salió {hora(g.horaSalida)}</>}
            {' · '}{g.acompanantes} {Number(g.acompanantes) === 1 ? 'persona' : 'personas'}
            {g.asesor && <> · Asesor: <b className="text-onix">{g.asesor}</b></>}
            {g.regaloTitular === 'Sí' && <> · Regalo entregado</>}
          </p>
        ) : (
          <p className="mt-1.5 text-sm text-texto">Toca para registrar el ingreso</p>
        )}
      </div>
      {ganador && (
        <div className="flex w-14 shrink-0 flex-col items-center justify-center border-2 border-rojo text-rojo" title="Premio por puntualidad">
          <span className="text-[10px] font-bold leading-none">Premio</span>
          <span className="font-display text-3xl leading-none">1°</span>
        </div>
      )}
    </button>
  )
}
