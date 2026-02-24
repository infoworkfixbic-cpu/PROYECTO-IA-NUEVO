import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, FileText, TrendingUp, AlertTriangle, CheckCircle2, ArrowLeft, BarChart3, Wallet, Activity, Percent, Landmark, Shield, Lightbulb, Globe } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { calculateRatios, calculateHorizontalAnalysis } from "../utils/financialCalculations";
import { formatCurrency, formatPercent, cn } from "../utils/utils";

export default function Report({ user }: { user: any }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/diagnoses", {
      headers: { "x-user-id": user.id.toString() }
    })
      .then(res => res.json())
      .then(data => {
        const d = data.find((item: any) => item.id.toString() === id);
        if (d) {
          d.data = JSON.parse(d.data);
          d.report = JSON.parse(d.report);
          setDiagnosis(d);
        }
        setLoading(false);
      });
  }, [id, user.id]);

  const exportPDF = async () => {
    if (!reportRef.current) return;
    
    // Workaround for oklch colors in html2canvas
    const canvas = await html2canvas(reportRef.current, { 
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        const elements = clonedDoc.getElementsByTagName("*");
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLElement;
          const style = window.getComputedStyle(el);
          // Check for oklch in common color properties and replace with computed rgb
          if (style.color.includes("oklch")) el.style.color = style.color;
          if (style.backgroundColor.includes("oklch")) el.style.backgroundColor = style.backgroundColor;
          if (style.borderColor.includes("oklch")) el.style.borderColor = style.borderColor;
        }
      }
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Diagnostico_${diagnosis.company_name}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading) return <div className="p-12 text-center text-stone-400">Cargando informe...</div>;
  if (!diagnosis) return <div className="p-12 text-center text-red-500">Diagnóstico no encontrado.</div>;

  const lastPeriodData = diagnosis.data[diagnosis.data.length - 1];
  const lastRatios = calculateRatios(lastPeriodData);

  const ratios = diagnosis.data.map((d: any) => ({
    period: d.period,
    ...calculateRatios(d)
  }));

  const radarData = [
    { subject: 'Liquidez', A: Math.min(lastRatios.liquidity * 20, 100), fullMark: 100 },
    { subject: 'Margen Bruto (%)', A: lastRatios.grossMargin, fullMark: 100 },
    { subject: 'Endeudamiento', A: 100 - lastRatios.debtRatio, fullMark: 100 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium">
          <ArrowLeft size={18} /> Volver al Dashboard
        </button>
        <button 
          onClick={exportPDF}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <Download size={18} /> Descargar PDF Premium
        </button>
      </div>

      <div ref={reportRef} className="bg-white p-12 rounded-3xl border border-stone-200 shadow-xl space-y-12">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-stone-100 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <Shield size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-indigo-900 uppercase">Workfix</h1>
            </div>
            <h2 className="text-4xl font-bold text-stone-900">{diagnosis.company_name}</h2>
            <p className="text-stone-500 mt-2">{diagnosis.sector} • {diagnosis.activity} • Constituida en {diagnosis.year_constituted}</p>
          </div>
          <div className="text-right">
            <div className="inline-block p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 text-center">Score Financiero</p>
              <p className={cn(
                "text-5xl font-black text-center",
                diagnosis.report.score >= 70 ? "text-emerald-600" : diagnosis.report.score >= 40 ? "text-amber-500" : "text-red-600"
              )}>
                {diagnosis.report.score}<span className="text-xl text-stone-300">/100</span>
              </p>
              <p className="text-xs font-bold text-stone-500 mt-2 uppercase text-center">{diagnosis.report.maturityLevel}</p>
            </div>
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <div className="p-8 bg-white rounded-2xl border border-indigo-100 shadow-sm">
          <h3 className="text-indigo-900 font-bold text-xl mb-4 flex items-center gap-2">
            <FileText className="text-indigo-600" size={24} /> Resumen Ejecutivo
          </h3>
          <p className="text-stone-600 leading-relaxed text-lg">
            {diagnosis.report.executiveSummary || diagnosis.report.strategicConclusion}
          </p>
        </div>

        {/* Métricas Financieras Clave */}
        <div className="space-y-6">
          <h3 className="text-indigo-900 font-bold text-xl flex items-center gap-2">
            <Activity className="text-indigo-600" size={24} /> Métricas Financieras Clave
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm relative overflow-hidden group">
              <TrendingUp className="absolute right-4 top-4 text-indigo-200 group-hover:text-indigo-400 transition-colors" size={24} />
              <p className="text-xs font-bold text-stone-400 uppercase mb-2">Utilidad Neta</p>
              <p className="text-2xl font-bold text-stone-900">{formatCurrency(lastRatios.netProfit)}</p>
              <p className="text-[10px] text-stone-400 mt-2 leading-tight">Refleja la ganancia o pérdida final de la empresa.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm relative overflow-hidden group">
              <Wallet className="absolute right-4 top-4 text-indigo-200 group-hover:text-indigo-400 transition-colors" size={24} />
              <p className="text-xs font-bold text-stone-400 uppercase mb-2">Razón de Liquidez</p>
              <p className="text-2xl font-bold text-stone-900">{lastRatios.liquidity.toFixed(2)}</p>
              <p className="text-[10px] text-stone-400 mt-2 leading-tight">Mide la capacidad para cumplir con las obligaciones a corto plazo.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm relative overflow-hidden group">
              <Activity className="absolute right-4 top-4 text-indigo-200 group-hover:text-indigo-400 transition-colors" size={24} />
              <p className="text-xs font-bold text-stone-400 uppercase mb-2">Margen Bruto</p>
              <p className="text-2xl font-bold text-stone-900">{formatPercent(lastRatios.grossMargin)}</p>
              <p className="text-[10px] text-stone-400 mt-2 leading-tight">Indica la rentabilidad de las operaciones principales.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm relative overflow-hidden group">
              <Landmark className="absolute right-4 top-4 text-indigo-200 group-hover:text-indigo-400 transition-colors" size={24} />
              <p className="text-xs font-bold text-stone-400 uppercase mb-2">Razón de Endeudamiento</p>
              <p className="text-2xl font-bold text-stone-900">{(lastRatios.debtRatio / 100).toFixed(2)}</p>
              <p className="text-[10px] text-stone-400 mt-2 leading-tight">Muestra la proporción de activos financiados por deuda.</p>
            </div>
          </div>
        </div>

        {/* Risk Profile & Traffic Light */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col items-center">
            <h3 className="text-indigo-900 font-bold text-xl mb-6 self-start flex items-center gap-2">
              <Activity className="text-indigo-600" size={24} /> Perfil de Riesgo
            </h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Perfil"
                    dataKey="A"
                    stroke="#4f46e5"
                    fill="#4f46e5"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="text-indigo-900 font-bold text-xl mb-6 flex items-center gap-2">
              <Shield className="text-indigo-600" size={24} /> Semáforo Financiero
            </h3>
            <div className="space-y-6">
              {[
                { label: "Utilidad Neta", status: lastRatios.netProfit > 0 ? "green" : "red" },
                { label: "Liquidez", status: lastRatios.liquidity > 1.2 ? "green" : lastRatios.liquidity > 0.8 ? "yellow" : "red" },
                { label: "Margen Bruto", status: lastRatios.grossMargin > 30 ? "green" : lastRatios.grossMargin > 15 ? "yellow" : "red" },
                { label: "Endeudamiento", status: lastRatios.debtRatio < 50 ? "green" : lastRatios.debtRatio < 70 ? "yellow" : "red" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-stone-700 font-medium">{item.label}</span>
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    item.status === "green" ? "bg-emerald-500" : item.status === "yellow" ? "bg-amber-500" : "bg-red-500"
                  )} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan de Acción Estratégico */}
        <div className="p-8 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-6">
          <h3 className="text-indigo-900 font-bold text-xl flex items-center gap-2">
            <TrendingUp className="text-indigo-600" size={24} /> Plan de Acción Estratégico
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Acción</th>
                  <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider">KPI</th>
                  <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Plazo</th>
                  <th className="p-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Prioridad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {diagnosis.report.actionPlan.map((plan: any, i: number) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-bold text-stone-900">{plan.action}</p>
                      <p className="text-[10px] text-stone-400 mt-1 max-w-xs">{plan.description}</p>
                    </td>
                    <td className="p-4 text-sm text-stone-600 font-medium">{plan.kpi}</td>
                    <td className="p-4 text-sm text-stone-600">{plan.deadline}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                        plan.priority === "Alta" ? "bg-red-100 text-red-700" : plan.priority === "Media" ? "bg-stone-100 text-stone-700" : "bg-indigo-100 text-indigo-700"
                      )}>
                        {plan.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations & Sector Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-6">
            <h3 className="text-indigo-900 font-bold text-xl flex items-center gap-2">
              <Lightbulb className="text-indigo-600" size={24} /> Recomendaciones
            </h3>
            <ol className="space-y-4">
              {diagnosis.report.recommendations.map((rec: string, i: number) => (
                <li key={i} className="text-sm text-stone-600 flex gap-3">
                  <span className="font-bold text-indigo-600">{i + 1}.</span>
                  {rec}
                </li>
              ))}
            </ol>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-6">
            <h3 className="text-indigo-900 font-bold text-xl flex items-center gap-2">
              <Globe className="text-indigo-600" size={24} /> Análisis Comparativo del Sector
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {diagnosis.report.sectorComparison}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 border-t border-stone-100 flex justify-between items-center text-stone-400 text-[10px] font-bold uppercase tracking-widest">
          <span>Informe Generado por Workfix IA</span>
          <span>{new Date().toLocaleDateString()}</span>
          <span>Confidencial - Uso Estratégico</span>
        </div>
      </div>
    </div>
  );
}

