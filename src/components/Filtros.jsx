import { ESTADOS } from '../lib/constants.js'

const TABS = [
  { id: 'todos', label: 'Todos' },
  { id: ESTADOS.PENDIENTE, label: 'Pendientes' },
  { id: ESTADOS.DENTRO, label: 'Adentro' },
  { id: ESTADOS.SALIO, label: 'Salieron' },
]

export default function Filtros({ activo, onChange, conteos }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filtrar por estado">
      {TABS.map((t) => {
        const on = activo === t.id
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.id)}
            className={`h-11 shrink-0 border-2 px-4 text-sm font-bold ${
              on ? 'border-onix bg-onix text-white' : 'border-plata bg-white text-onix hover:border-onix'
            }`}
          >
            {t.label} <span className={on ? 'text-plata' : 'text-texto'}>{conteos[t.id]}</span>
          </button>
        )
      })}
    </div>
  )
}
