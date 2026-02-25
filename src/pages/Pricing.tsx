import { useState } from "react";
import { Check, Info, MessageCircle, CreditCard, Zap, BarChart3, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils/utils";

const FAQ_ITEMS = [
  {
    q: "¿Qué es una licencia?",
    a: "Una licencia equivale a un diagnóstico financiero completo generado por nuestra IA. Cada vez que inicias y completas un análisis de una empresa o periodo, se consume una licencia de tu saldo disponible."
  },
  {
    q: "¿Las licencias se acumulan mes a mes?",
    a: "No, las licencias se reinician al comienzo de cada ciclo de facturación mensual según tu plan contratado. Esto permite mantener un flujo constante de análisis para tu gestión empresarial."
  },
  {
    q: "¿Puedo mejorar mi plan en cualquier momento?",
    a: "¡Por supuesto! Puedes escalar a un plan superior en cualquier momento para obtener más licencias y funcionalidades avanzadas. El cambio se aplica de manera inmediata."
  },
  {
    q: "¿Qué pasa si consumo todas mis licencias antes de fin de mes?",
    a: "Si llegas al límite, el sistema bloqueará la generación de nuevos diagnósticos. Podrás seguir consultando tus informes anteriores, pero para generar uno nuevo deberás adquirir un plan superior o esperar al reinicio mensual."
  },
  {
    q: "¿Los reportes PDF tienen fecha de caducidad?",
    a: "No. Una vez generado un diagnóstico, el reporte PDF y los datos en el dashboard permanecen disponibles en tu historial de forma permanente, independientemente de si tienes licencias activas o no."
  },
  {
    q: "¿El soporte técnico está incluido?",
    a: "Sí, todos nuestros planes incluyen algún nivel de soporte. Los planes Emprendedor y PYME cuentan con soporte prioritario para resolver cualquier duda sobre la interpretación de los datos."
  }
];

export default function Pricing({ user }: { user: any }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const WHATSAPP_URL = "https://wa.me/573021212225?text=Hola%20quiero%20mejorar%20mi%20plan%20del%20Diagnóstico%20Financiero%20IA";

  const plans = [
    {
      name: "GRATIS",
      price: "0",
      description: "Para profesionales que inician su camino en el análisis financiero.",
      licenses: "Incluye 5 diagnósticos (5 licencias)",
      features: [
        "1 usuario",
        "Reporte PDF básico",
        "Indicadores financieros esenciales",
        "Sin comparativo por periodos"
      ],
      buttonText: "Empezar gratis",
      highlight: false
    },
    {
      name: "EMPRENDEDOR",
      price: billingCycle === "monthly" ? "39" : "32",
      description: "Ideal para consultores y dueños de negocio en crecimiento.",
      licenses: "20 diagnósticos al mes",
      features: [
        "Comparativo hasta 2 periodos",
        "PDF profesional",
        "Recomendaciones estratégicas con IA",
        "Soporte por correo"
      ],
      buttonText: "Comprar plan",
      highlight: false
    },
    {
      name: "PYME",
      price: billingCycle === "monthly" ? "79" : "65",
      tag: "Más elegido",
      description: "La solución completa para empresas que buscan control total.",
      licenses: "50 diagnósticos al mes",
      features: [
        "Comparativo hasta 3 periodos",
        "Dashboard ejecutivo con KPIs",
        "Alertas automáticas de riesgo",
        "Branding en PDF",
        "Soporte prioritario"
      ],
      buttonText: "Comprar plan",
      highlight: true
    },
    {
      name: "EMPRESARIAL",
      price: "Custom",
      description: "Potencia ilimitada para grandes organizaciones y firmas contables.",
      licenses: "Diagnósticos ilimitados",
      features: [
        "Multiusuario",
        "Integraciones personalizadas",
        "Soporte 24/7 dedicado",
        "Onboarding estratégico"
      ],
      buttonText: "Hablar con asesor",
      highlight: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-20 pb-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
          Invierta en la <span className="text-[#10069f]">Inteligencia</span> de su Negocio
        </h2>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto">
          Planes diseñados para escalar su capacidad de análisis y toma de decisiones estratégicas.
        </p>

        <div className="pt-8 flex flex-col items-center gap-4">
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-6 py-2 rounded-lg font-bold text-sm transition-all",
                billingCycle === "monthly" ? "bg-white text-[#10069f] shadow-sm" : "text-stone-500"
              )}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-6 py-2 rounded-lg font-bold text-sm transition-all",
                billingCycle === "yearly" ? "bg-white text-[#10069f] shadow-sm" : "text-stone-500"
              )}
            >
              Anual
            </button>
          </div>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            Ahorre hasta un 20% en planes anuales
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={cn(
              "relative flex flex-col p-8 rounded-3xl border transition-all hover:shadow-2xl",
              plan.highlight 
                ? "bg-[#10069f] text-white border-[#10069f] scale-105 z-10 shadow-xl" 
                : "bg-white text-stone-900 border-stone-200"
            )}
          >
            {plan.tag && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#32cd32] text-[#10069f] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                {plan.tag}
              </span>
            )}
            
            <div className="mb-8">
              <h3 className={cn("text-xs font-black uppercase tracking-widest mb-4", plan.highlight ? "text-white/60" : "text-stone-400")}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">
                  {plan.price !== "Custom" && "$"}
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className={cn("text-sm font-bold", plan.highlight ? "text-white/60" : "text-stone-400")}>
                    {plan.price === "0" ? "" : "/mes"}
                  </span>
                )}
              </div>
              <p className={cn("text-xs mt-4 leading-relaxed", plan.highlight ? "text-white/80" : "text-stone-500")}>
                {plan.description}
              </p>
            </div>

            <div className={cn("mb-8 p-4 rounded-2xl", plan.highlight ? "bg-white/10" : "bg-stone-50")}>
              <p className="text-xs font-bold flex items-center gap-2">
                <Zap size={14} className={plan.highlight ? "text-[#32cd32]" : "text-[#10069f]"} />
                {plan.licenses}
              </p>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <Check size={18} className={cn("shrink-0", plan.highlight ? "text-[#32cd32]" : "text-emerald-500")} />
                  <span className={plan.highlight ? "text-white/90" : "text-stone-600"}>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "w-full py-4 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2",
                plan.highlight
                  ? "bg-[#32cd32] text-[#10069f] hover:bg-[#28a428]"
                  : "bg-[#10069f] text-white hover:bg-[#0a0466]"
              )}
            >
              {plan.buttonText === "Comprar plan" ? <CreditCard size={18} /> : plan.buttonText === "Hablar con asesor" ? <MessageCircle size={18} /> : <Zap size={18} />}
              {plan.buttonText}
            </a>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-white rounded-3xl border border-stone-200 p-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-stone-900 flex items-center gap-3">
              <Info className="text-[#10069f]" size={32} />
              ¿Cómo funcionan las licencias?
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-[#10069f] shrink-0">1</div>
                <p className="text-stone-600"><strong>1 diagnóstico = 1 licencia.</strong> Cada vez que generas un informe completo, se consume una unidad de tu saldo.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-[#10069f] shrink-0">2</div>
                <p className="text-stone-600"><strong>Consumo en tiempo real.</strong> La licencia se descuenta automáticamente al finalizar el proceso de análisis.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-[#10069f] shrink-0">3</div>
                <p className="text-stone-600"><strong>Reinicio mensual.</strong> En los planes de pago, tu cupo de licencias se restablece cada mes.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-[#10069f] shrink-0">4</div>
                <p className="text-stone-600"><strong>Continuidad.</strong> Si llegas a 0 licencias, el botón "Analizar ahora" se bloqueará hasta que mejores tu plan.</p>
              </div>
            </div>
          </div>
          <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-stone-500 uppercase">Estado de Licencias</span>
                <span className="text-xs font-bold text-[#10069f] bg-[#10069f]/10 px-3 py-1 rounded-full">Plan Actual</span>
              </div>
              <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-3xl font-black text-stone-900">0</p>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Licencias Disponibles</p>
                  </div>
                  <AlertTriangle className="text-amber-500" size={32} />
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-full" />
                </div>
                <p className="text-[10px] text-red-500 font-bold mt-2">Límite alcanzado. Mejore su plan para continuar.</p>
              </div>
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#10069f] text-white rounded-xl font-bold text-center block hover:bg-[#0a0466] transition-all"
              >
                Compra tu plan aquí
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mi Plan Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-stone-900 flex items-center gap-3">
          <ShieldCheck className="text-[#10069f]" size={28} />
          Mi Plan
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Plan Actual</p>
                <h4 className="text-3xl font-black text-[#10069f]">{user.license_limit === 5 ? "GRATIS" : "PERSONALIZADO"}</h4>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Próximo Reinicio</p>
                <p className="text-sm font-bold text-stone-900">15 de Marzo, 2026</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-stone-600">Uso de Licencias</span>
                <span className="text-stone-900">{user.diagnoses_count} / {user.license_limit === 20 ? 5 : user.license_limit}</span>
              </div>
              <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#10069f] transition-all duration-1000" 
                  style={{ width: `${(user.diagnoses_count / (user.license_limit === 20 ? 5 : user.license_limit)) * 100}%` }}
                />
              </div>
              <p className="text-xs text-stone-400 italic">Has utilizado el {Math.round((user.diagnoses_count / (user.license_limit === 20 ? 5 : user.license_limit)) * 100)}% de tu capacidad mensual.</p>
            </div>

            <div className="pt-4 flex gap-4">
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[#10069f] text-white rounded-xl font-bold hover:bg-[#0a0466] transition-all"
              >
                Mejorar plan
              </a>
              <button className="px-8 py-3 bg-white text-stone-600 border border-stone-200 rounded-xl font-bold hover:bg-stone-50 transition-all">
                Ver facturación
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm flex flex-col">
            <h4 className="text-sm font-bold text-stone-900 mb-6 flex items-center gap-2">
              <BarChart3 size={18} className="text-[#10069f]" />
              Historial de Consumo
            </h4>
            <div className="flex-1 space-y-4">
              {[
                { date: "24 Feb", company: "Tech Solutions", type: "Diagnóstico IA" },
                { date: "20 Feb", company: "Global Logistics", type: "Diagnóstico IA" },
                { date: "15 Feb", company: "Eco Mart", type: "Diagnóstico IA" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-stone-900">{item.company}</p>
                    <p className="text-[10px] text-stone-400 uppercase font-bold">{item.type}</p>
                  </div>
                  <span className="text-xs font-medium text-stone-500">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-stone-900">Preguntas Frecuentes</h3>
          <p className="text-stone-500">Todo lo que necesita saber sobre nuestro modelo de licencias.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-stone-50 transition-colors"
              >
                <span className="font-bold text-stone-900">{item.q}</span>
                {openFaq === i ? <ChevronUp className="text-stone-400" /> : <ChevronDown className="text-stone-400" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-stone-600 border-t border-stone-50 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#10069f] rounded-3xl p-12 text-center text-white space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] rotate-12 bg-linear-to-b from-white to-transparent" />
        </div>
        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight">¿Necesita una solución a medida?</h3>
          <p className="text-white/70 max-w-xl mx-auto">
            Hable con nuestros expertos para diseñar un plan que se ajuste perfectamente a las necesidades de su organización.
          </p>
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#32cd32] text-[#10069f] px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#28a428] transition-all shadow-2xl"
          >
            <MessageCircle size={20} />
            Contactar con Ventas
          </a>
        </div>
      </div>
    </div>
  );
}
