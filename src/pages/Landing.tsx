import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { TrendingUp, Target, ShieldCheck, Zap, Building2, BarChart3, Users, ChevronRight, BookOpen, GraduationCap, Layout, Sparkles, ArrowRight } from "lucide-react";

export default function Landing({ user }: { user?: any }) {
  return (
    <div className="min-h-screen bg-[#10069f]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#10069f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tighter leading-none">
              <span className="text-white">WORK</span>
              <span className="text-[#32cd32]">FIX</span>
            </h1>
          </div>
          <div className="flex items-center gap-8">
            <Link to="/nosotros" className="text-white font-bold uppercase tracking-widest text-xs hover:text-[#32cd32] transition-colors">
              Nosotros
            </Link>
            {user ? (
              <Link to="/dashboard" className="bg-[#32cd32] text-[#10069f] px-6 py-2.5 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-[#28a428] transition-all">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="bg-[#32cd32] text-[#10069f] px-6 py-2.5 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-[#28a428] transition-all">
                Acceder
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20"
            >
              <Zap size={16} className="text-[#32cd32]" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Aceleramos Negocios</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none"
            >
              WORK<span className="text-[#32cd32]">FIX</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 max-w-2xl mx-auto font-medium"
            >
              Expertos en el crecimiento empresarial rentable. Con disciplina, pasión y convicción llevamos tu empresa al siguiente nivel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link
                to={user ? "/dashboard" : "/login"}
                className="group bg-[#32cd32] text-[#10069f] px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#28a428] transition-all shadow-2xl shadow-black/20 flex items-center gap-2"
              >
                {user ? "Ir al Dashboard" : "Acceder al Sistema"} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#32cd32] rounded-full blur-3xl" 
          />
        </div>
      </section>

      {/* Academia Workfix Section */}
      <section className="py-24 bg-white text-stone-900 overflow-hidden relative border-y border-stone-100">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10069f,transparent)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-[#10069f]/5 rounded-full flex items-center justify-center mb-6 border border-[#10069f]/10">
                <GraduationCap size={40} className="text-[#10069f]" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                Academia <span className="text-[#10069f]">Workfix</span>
              </h2>
              <div className="w-24 h-1 bg-[#10069f] mt-4 rounded-full" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-black uppercase tracking-widest text-[#10069f]">¿Qué es Academia Workfix?</h3>
              <p className="text-xl text-stone-600 leading-relaxed">
                Academia Workfix es tu aliado estratégico en el mundo del aprendizaje digital. Nos especializamos en crear y distribuir libros digitales y recursos estratégicos creados para resolver problemas reales de negocio, disponibles para empresarios, emprendedores, profesionales y autodidactas que buscan crecer constantemente.
              </p>
              <p className="text-xl text-stone-600 leading-relaxed">
                Nuestro contenido está actualizado, es completamente práctico y enfocado en generar resultados reales y medibles en tu vida profesional.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                {[
                  { icon: BookOpen, title: "Contenido Digital", desc: "Libros digitales y guías personalizadas." },
                  { icon: TrendingUp, title: "Enfoque en Resultados", desc: "Aprendizaje diseñado para aplicar de inmediato." },
                  { icon: Users, title: "Comunidad Empresarial", desc: "Accede a un ecosistema de líderes." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-10 h-10 bg-[#10069f]/5 rounded-lg flex items-center justify-center text-[#10069f]">
                      <item.icon size={20} />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-stone-900">{item.title}</h4>
                    <p className="text-xs text-stone-500 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border-4 border-stone-100 shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/academy-v2/1000/1000" 
                  alt="Academy" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#10069f] p-8 rounded-2xl shadow-2xl rotate-3">
                <p className="text-white font-black text-2xl uppercase tracking-tighter leading-none">
                  Contenido<br />Práctico
                </p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-12">
            <h3 className="text-3xl font-black uppercase tracking-widest text-center text-stone-900">Temáticas destacadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Estructura Empresarial", icon: Layout, desc: "Organiza tu empresa para que funcione con claridad y orden." },
                { title: "Comercial y Ventas", icon: TrendingUp, desc: "Desarrolla un sistema comercial sólido y predecible." },
                { title: "Finanzas y Gestión", icon: BarChart3, desc: "Comprende los números que realmente importan." },
                { title: "Inteligencia Artificial", icon: Sparkles, desc: "Integra la IA como un apoyo estratégico en tu empresa." }
              ].map((topic, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:bg-white hover:shadow-xl transition-all group"
                >
                  <topic.icon size={32} className="text-[#10069f] mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-lg font-black uppercase tracking-wider mb-4 text-stone-900">{topic.title}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed">{topic.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-24 bg-[#10069f]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-xl font-black text-[#32cd32] uppercase tracking-[0.3em]">Nuestra Primera Colección</h3>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">¡La temporada de oportunidades ha llegado!</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "IA SIN COMPLICACIONES", desc: "Domina el uso de la inteligencia artificial en tu negocio sin esfuerzo." },
              { title: "CIERRA O CIERRA", desc: "El problema no es vender sin estructura. Cierra ventas de forma predecible." },
              { title: "VENDE MÁS CON METAS SMART", desc: "Trabajar mucho no es el problema. El problema es trabajar sin dirección." },
              { title: "EMBUDO DE VENTAS", desc: "Aprende a dejar de improvisar y construye un sistema que trabaje todos los días." }
            ].map((book, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-8 rounded-3xl shadow-xl border border-white/10 flex flex-col items-center text-center space-y-6 group"
              >
                <div className="w-full aspect-[3/4] bg-white/5 rounded-2xl overflow-hidden relative">
                  <img 
                    src={`https://picsum.photos/seed/book-v2-${i}/600/800`} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-[#32cd32] text-[#10069f] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    E-Book
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-white uppercase tracking-wider leading-tight">{book.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{book.desc}</p>
                </div>
                <button className="w-full py-3 rounded-xl border-2 border-[#32cd32] text-[#32cd32] font-black uppercase tracking-widest text-xs hover:bg-[#32cd32] hover:text-[#10069f] transition-all">
                  Saber más
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Enfoque Section */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 space-y-4">
            <motion.div 
              initial={{ rotate: -10 }}
              whileInView={{ rotate: 0 }}
              className="flex justify-center mb-4"
            >
              <div className="w-16 h-16 bg-[#10069f] rounded-2xl flex items-center justify-center text-white shadow-2xl">
                <Target size={32} />
              </div>
            </motion.div>
            <h2 className="text-4xl font-black text-stone-900 uppercase tracking-widest">Nuestro Enfoque</h2>
            <div className="w-24 h-1 bg-[#10069f] mx-auto rounded-full" />
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Triangle Diagram with SVG */}
            <div className="relative aspect-square flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg viewBox="0 0 500 433" className="w-full h-full drop-shadow-2xl overflow-visible">
                  <motion.path
                    d="M 250 0 L 500 433 L 0 433 Z"
                    fill="rgba(16, 6, 159, 0.03)"
                    stroke="rgba(16, 6, 159, 0.2)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  {/* Inner Triangle for depth */}
                  <motion.path
                    d="M 250 50 L 450 400 L 50 400 Z"
                    fill="rgba(16, 6, 159, 0.05)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                </svg>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-[55%] left-1/2 -translate-x-1/2 text-center w-64"
                >
                  <p className="text-2xl font-black text-stone-900 uppercase tracking-tighter">Indicadores</p>
                  <p className="text-5xl font-black text-[#10069f] tracking-tighter">+ IA</p>
                </motion.div>
              </motion.div>

              {/* Apex Labels */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#10069f] rounded-2xl shadow-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all">
                  <Building2 className="text-white" size={32} />
                </div>
                <p className="font-black text-stone-900 uppercase tracking-widest text-sm">Finanzas</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-0 left-0 -translate-x-12 translate-y-12 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#10069f] rounded-2xl shadow-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all">
                  <BarChart3 className="text-white" size={32} />
                </div>
                <p className="font-black text-stone-900 uppercase tracking-widest text-sm">Procesos</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-0 right-0 translate-x-12 translate-y-12 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#10069f] rounded-2xl shadow-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <p className="font-black text-stone-900 uppercase tracking-widest text-sm">Comercial</p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-40 text-center max-w-2xl mx-auto"
            >
              <p className="text-xl text-stone-600 leading-relaxed font-medium">
                Lograr que cada empresa funcione como un sistema inteligente donde <strong className="text-stone-900">Finanzas</strong> garanticen liquidez, <strong className="text-stone-900">Comercial</strong> impulse crecimiento y <strong className="text-stone-900">Procesos</strong> aseguren eficiencia, utilizando <strong className="text-[#10069f]">indicadores e inteligencia artificial</strong> como brújula para decidir con foco y acción.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Propósito & Filosofía */}
      <section className="py-24 bg-[#10069f]">
        <div className="max-w-7xl mx-auto px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10"
            >
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
                  src="https://picsum.photos/seed/purpose-v3/800/1200" 
                  alt="Teamwork" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse shadow-2xl border border-white/10"
            >
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
                  src="https://picsum.photos/seed/philosophy-v3/800/1200" 
                  alt="Strategy" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#021b33] border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h4 className="text-xl font-black tracking-tighter leading-none">
              <span className="text-white">WORK</span>
              <span className="text-[#32cd32]">FIX</span>
            </h4>
          </div>
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
            © 2026 Workfix Consulting S.A.S BIC. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
