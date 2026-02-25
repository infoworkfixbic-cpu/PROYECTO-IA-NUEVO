import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { TrendingUp, Target, ShieldCheck, Zap, Building2, BarChart3, Users, ChevronRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-stone-50 to-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#10069f]/5 rounded-full border border-[#10069f]/10"
            >
              <Zap size={16} className="text-[#10069f]" />
              <span className="text-xs font-black text-[#10069f] uppercase tracking-widest">Aceleramos Negocios</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter leading-none"
            >
              WORK<span className="text-[#10069f]">FIX</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-stone-500 max-w-2xl mx-auto font-medium"
            >
              Somos expertos en el crecimiento empresarial rentable. Con disciplina, pasión y convicción llevamos tu empresa al siguiente nivel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link
                to="/login"
                className="bg-[#10069f] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#0a0466] transition-all shadow-2xl shadow-[#10069f]/20 flex items-center gap-2"
              >
                Acceder al Sistema <ChevronRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#10069f]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#32cd32]/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Nuestro Enfoque Section */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Target size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-stone-900 uppercase tracking-widest">Nuestro Enfoque</h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Triangle Diagram */}
            <div className="relative aspect-square flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[250px] border-l-transparent border-r-[250px] border-r-transparent border-bottom-[433px] border-bottom-stone-100 relative">
                  <div className="absolute top-[150px] left-1/2 -translate-x-1/2 text-center w-48">
                    <p className="text-xl font-black text-stone-900">Indicadores</p>
                    <p className="text-3xl font-black text-[#10069f]">+ IA</p>
                  </div>
                </div>
              </div>

              {/* Apex Labels */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-center">
                <div className="w-12 h-12 bg-white border border-stone-200 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-2">
                  <Building2 className="text-[#10069f]" size={24} />
                </div>
                <p className="font-black text-stone-900 uppercase tracking-widest text-sm">Finanzas</p>
              </div>

              <div className="absolute bottom-0 left-0 -translate-x-12 translate-y-12 text-center">
                <div className="w-12 h-12 bg-white border border-stone-200 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="text-[#10069f]" size={24} />
                </div>
                <p className="font-black text-stone-900 uppercase tracking-widest text-sm">Procesos</p>
              </div>

              <div className="absolute bottom-0 right-0 translate-x-12 translate-y-12 text-center">
                <div className="w-12 h-12 bg-white border border-stone-200 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="text-[#10069f]" size={24} />
                </div>
                <p className="font-black text-stone-900 uppercase tracking-widest text-sm">Comercial</p>
              </div>
            </div>

            <div className="mt-32 text-center max-w-2xl mx-auto">
              <p className="text-lg text-stone-600 leading-relaxed">
                Lograr que cada empresa funcione como un sistema inteligente donde <strong>Finanzas</strong> garanticen liquidez, <strong>Comercial</strong> impulse crecimiento y <strong>Procesos</strong> aseguren eficiencia, utilizando <strong>indicadores e inteligencia artificial</strong> como brújula para decidir con foco y acción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Propósito & Filosofía */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#10069f] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="p-12 text-white flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <Target size={32} className="text-[#32cd32]" />
                  <h3 className="text-3xl font-black uppercase tracking-widest">Propósito</h3>
                </div>
                <p className="text-white/80 text-lg leading-relaxed">
                  Aumentamos el crecimiento empresarial rentable, por medio del seguimiento a resultados y la transferencia de conocimiento, implementando indicadores de gestión, estrategias y acompañamiento en la toma de decisiones.
                </p>
                <p className="text-[#32cd32] font-black text-xl italic">¡Llevamos tu empresa al siguiente nivel!</p>
              </div>
              <div className="w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/team/800/1200" 
                  alt="Teamwork" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="bg-[#10069f] rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse shadow-2xl">
              <div className="p-12 text-white flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={32} className="text-[#32cd32]" />
                  <h3 className="text-3xl font-black uppercase tracking-widest">Filosofía</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Transferir el conocimiento es la clave del éxito.",
                    "El trabajo en equipo hace que las metas sean alcanzables.",
                    "Para mejorar los problemas, no se pueden ocultar.",
                    "Lo que no se mide no se controla y lo que no se controla no se mejora."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#32cd32] mt-2 shrink-0" />
                      <span className="text-white/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/strategy/800/1200" 
                  alt="Strategy" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-stone-100 text-center">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h4 className="text-xl font-black tracking-tighter leading-none">
              <span className="text-[#10069f]">WORK</span>
              <span className="text-[#32cd32]">FIX</span>
            </h4>
          </div>
          <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">
            © 2026 Workfix Consulting S.A.S BIC. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
