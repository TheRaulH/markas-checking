import logo from '../assets/logo-m.png'
import { hora } from '../lib/utils.js'

export default function Header({ total, ingresaron, adentro, primero }) {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-onix bg-white">
      <div className="mx-auto max-w-3xl px-4 pb-3 pt-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MARKAS" className="h-11 w-auto" />
          <h1 className="min-w-0 flex-1 font-display text-3xl uppercase leading-none">Control de ingreso</h1>
          <div className="flex shrink-0 divide-x divide-plata border border-plata">
            <div className="px-3 py-1.5 text-center">
              <div className="font-display text-4xl leading-none">{ingresaron}<span className="text-xl text-texto">/{total}</span></div>
              <div className="mt-0.5 text-xs font-semibold text-texto">Ingresaron</div>
            </div>
            <div className="px-3 py-1.5 text-center">
              <div className="font-display text-4xl leading-none">{adentro}</div>
              <div className="mt-0.5 text-xs font-semibold text-texto">Adentro</div>
            </div>
          </div>
        </div>
        <div className={`mt-3 flex items-center gap-3 border-l-4 px-3 py-2 ${primero ? 'border-rojo' : 'border-plata bg-plata-claro'}`}>
          <span className={`font-display text-3xl leading-none ${primero ? 'text-rojo' : 'text-plata'}`}>1°</span>
          <div className="min-w-0 text-sm leading-tight">
            <span className="block text-xs font-semibold text-texto">Premio por puntualidad</span>
            {primero ? (
              <span className="block truncate font-bold">{primero.nombre} · {hora(primero.horaIngreso)}</span>
            ) : (
              <span className="block font-semibold">Aún sin ganador · el primero en ingresar se lo lleva</span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
