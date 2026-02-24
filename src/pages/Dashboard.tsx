import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar, Building2, ChevronRight, AlertCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function Dashboard({ user, onUpdateUser }: { user: any; onUpdateUser: (data: any) => void }) {
  const [diagnoses, setDiagnoses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest user info to sync counts
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, password: user.password }) // Note: In a real app we'd use a session token
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) onUpdateUser(data);
      });

    fetch("/api/diagnoses", {
      headers: { "x-user-id": user.id.toString() }
    })
      .then(res => res.json())
      .then(data => {
        setDiagnoses(data);
        setLoading(false);
      });
  }, [user.id]);

  const formatDateTime = (dateStr: string) => {
    // SQLite CURRENT_TIMESTAMP is UTC "YYYY-MM-DD HH:MM:SS"
    // We convert it to ISO format "YYYY-MM-DDTHH:MM:SSZ" to ensure JS treats it as UTC
    const isoStr = dateStr.replace(" ", "T") + "Z";
    const date = new Date(isoStr);
    
    return date.toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Bienvenido, {user.username}</h2>
          <p className="text-stone-500 mt-1">Gestione sus diagnósticos financieros estratégicos.</p>
        </div>
        <Link 
          to="/new" 
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
        >
          Nuevo Diagnóstico
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Diagnósticos Totales</p>
          <p className="text-3xl font-bold text-stone-900">{user.diagnoses_count}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Límite de Licencia</p>
          <p className="text-3xl font-bold text-stone-900">{user.license_limit}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Disponibles</p>
          <p className="text-3xl font-bold text-emerald-600">{user.license_limit - user.diagnoses_count}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h3 className="font-bold text-stone-900">Historial de Análisis</h3>
          <span className="text-xs text-stone-400">Últimos diagnósticos realizados</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-stone-400">Cargando historial...</div>
        ) : diagnoses.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-50 rounded-full mb-4">
              <AlertCircle className="text-stone-300" size={32} />
            </div>
            <p className="text-stone-500">No hay diagnósticos registrados aún.</p>
            <Link to="/new" className="text-emerald-600 font-bold mt-2 inline-block hover:underline">Comenzar primer análisis</Link>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {diagnoses.map((d) => (
              <Link 
                key={d.id} 
                to={`/report/${d.id}`}
                className="flex items-center p-6 hover:bg-stone-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                  <Building2 size={24} />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-stone-900 text-lg">{d.company_name}</h4>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-1">
                    <span className="flex items-center gap-1.5 text-xs text-stone-500">
                      <Calendar size={14} className="text-stone-400" /> 
                      {formatDateTime(d.created_at)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-stone-400 font-bold uppercase tracking-wider">
                      <FileText size={14} className="text-stone-300" /> 
                      {d.sector}
                    </span>
                  </div>
                </div>
                <ChevronRight className="text-stone-300 group-hover:text-stone-900 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
