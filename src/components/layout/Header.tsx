import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { progress } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-[#F7F4EE] border-b border-[#E3DFD4] overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-16 flex items-center gap-3 sm:gap-4">
        <NavLink to="/" className="shrink-0 text-lg sm:text-2xl font-serif font-semibold text-[#1B1A17] tracking-tight">
          Idiomatrix
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `shrink-0 px-3 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-sm transition-colors ${
              isActive
                ? 'bg-[#1B1A17] text-white'
                : 'bg-white border border-[#E3DFD4] text-[#1B1A17] hover:bg-[#F1EDE4]'
            }`
          }
        >
          Dashboard
        </NavLink>

        <div className="flex-1" />

        <div className="shrink-0 flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1 font-semibold text-xs sm:text-base text-[#D3A15C] whitespace-nowrap">
            🔥 {progress.streak}
          </span>
          <span className="flex items-center gap-1 font-semibold text-xs sm:text-base text-[#D97757] whitespace-nowrap">
            ⚡ {progress.xp} XP
          </span>
        </div>
      </div>
    </header>
  );
}
