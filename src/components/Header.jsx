import { PREMIO_TOP } from '../lib/constants.js'
import { hora } from '../lib/utils.js'

export default function Header({ total, ingresaron, adentro, primeros, enVivo }) {
  const slots = Array.from({ length: PREMIO_TOP }, (_, i) => primeros[i] || null)
  return (
    <header className="sticky top-0 z-20 border-b-2 border-onix bg-white">
      <div className="mx-auto max-w-3xl px-4 pt-3 pb-3">
        <div className="flex items-center gap-3">
          <img src="/logo-m.png" alt="MARKAS" className="h-11 w-auto" />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-3xl uppercase leading-none">
              Control de ingreso
            </h1>
            <p className="mt-1 text-xs font-medium text-texto">
              {enVivo ? 'Conectado a la hoja de Google' : 'Modo demostración · datos locales'}
            </p>
          </div>
          <div className="flex shrink-0 items-stretch divide-x divide-plata border border-plata">
            <div className="px-3 py-1.5 text-center">
              <div className="font-display text-4xl leading-none text-onix">
                {ingresaron}
                <span className="text-xl text-texto">/{total}</span>
              </div>
              <div className="mt-0.5 text-xs font-semibold text-texto">Ingresaron</div>
            </div>
            <div className="px-3 py-1.5 text-center">
              <div className="font-display text-4xl leading-none text-onix">{adentro}</div>
              <div className="mt-0.5 text-xs font-semibold text-texto">Adentro</div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className="mb-1.5 text-xs font-semibold text-texto">Primeros {PREMIO_TOP} en llegar · premio especial</p>
          <div className="grid grid-cols-3 gap-2">
            {slots.map((g, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 border-l-4 px-2 py-1.5 ${
                  g ? 'border-rojo bg-white' : 'border-plata bg-plata-claro'
                }`}
              >
                <span className={`font-display text-3xl leading-none ${g ? 'text-rojo' : 'text-plata'}`}>
                  {i + 1}
                </span>
                <span className="min-w-0 text-xs leading-tight">
                  {g ? (
                    <>
                      <span className="block truncate font-bold">{g.nombre.split(' ').slice(0, 2).join(' ')}</span>
                      <span className="text-texto">{hora(g.horaIngreso)}</span>
                    </>
                  ) : (
                    <span className="text-texto">Libre</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
