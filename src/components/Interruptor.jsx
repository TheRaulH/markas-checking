export default function Interruptor({ label, detalle, checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`flex min-h-16 w-full items-center justify-between gap-3 border-2 px-4 py-2 text-left disabled:opacity-40 ${
        checked ? 'border-onix bg-white' : 'border-plata bg-white'
      }`}
    >
      <span>
        <span className="block text-base font-bold">{label}</span>
        {detalle && <span className="block text-sm text-texto">{detalle}</span>}
      </span>
      <span className={`relative h-8 w-14 shrink-0 ${checked ? 'bg-onix' : 'bg-plata'}`}>
        <span className={`absolute top-1 h-6 w-6 bg-white transition-all ${checked ? 'left-7' : 'left-1'}`} />
      </span>
    </button>
  )
}
