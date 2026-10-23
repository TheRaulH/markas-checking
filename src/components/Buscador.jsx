export default function Buscador({ valor, onChange }) {
  return (
    <div className="relative">
      <label htmlFor="buscar" className="sr-only">Buscar invitado por nombre o teléfono</label>
      <svg className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-texto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
      </svg>
      <input
        id="buscar"
        type="search"
        inputMode="search"
        autoComplete="off"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nombre o teléfono"
        className="h-16 w-full border-2 border-onix bg-white pr-4 text-lg font-semibold placeholder:font-medium placeholder:text-texto focus:outline-none focus:ring-4 focus:ring-onix/15"
        style={{ paddingLeft: '3.25rem' }}
      />
    </div>
  )
}
