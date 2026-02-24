import { Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, LogOut, TrendingUp, ShieldCheck, Shield } from "lucide-react";

const Logo = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#10069f" strokeWidth="2" strokeDasharray="20 10" />
    <path d="M30 45 L45 65 L55 55 L75 35" fill="none" stroke="#10069f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M25 40 L40 60 L50 50 L70 30" fill="none" stroke="#32cd32" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
  </svg>
);

export default function Layout({ user, onLogout }: { user: any; onLogout: () => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-linear-to-b from-white to-[#10069f] flex flex-col border-r border-stone-200 shadow-xl">
        <div className="p-6 border-b border-stone-100">
          <div className="flex items-center gap-2 mb-2">
            <Logo />
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">
                <span className="text-[#10069f]">WORK</span>
                <span className="text-[#32cd32]">FIX</span>
              </h1>
              <p className="text-[8px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-0.5">Consulting</p>
            </div>
          </div>
          <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold mt-2">Diagnóstico Financiero IA</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="flex items-center gap-3 p-3 rounded-lg text-stone-700 hover:bg-stone-100/80 hover:text-[#10069f] transition-all font-medium">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/new" className="flex items-center gap-3 p-3 rounded-lg text-stone-700 hover:bg-stone-100/80 hover:text-[#10069f] transition-all font-medium">
            <PlusCircle size={20} />
            <span>Nuevo Diagnóstico</span>
          </Link>
          <Link to="/privacy" className="flex items-center gap-3 p-3 rounded-lg text-stone-700 hover:bg-stone-100/80 hover:text-[#10069f] transition-all font-medium">
            <Shield size={20} />
            <span>Política de Datos</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/20 text-white">
          <div className="mb-4 px-3">
            <p className="text-xs text-white/60 mb-1">Usuario</p>
            <p className="text-sm font-bold">{user.username}</p>
            <div className="mt-2 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white" 
                style={{ width: `${(user.diagnoses_count / user.license_limit) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-white/60 mt-1">
              {user.diagnoses_count} de {user.license_limit} diagnósticos usados
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 text-white transition-colors font-bold"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-stone-200 h-16 flex items-center px-8 justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <TrendingUp size={16} />
            <span>Análisis Financiero Estratégico</span>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
