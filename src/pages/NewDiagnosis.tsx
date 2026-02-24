import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Save, Loader2, Info, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateFinancialDiagnosis, FinancialData } from "../services/geminiService";
import { CIIU_CODES, CIIU_SECTIONS } from "../constants/ciiuCodes";
import { ChevronDown, ChevronUp } from "lucide-react";

const STEPS = ["Datos Generales", "Estado de Resultados", "Balance General", "Cartera y Proveedores"];

export default function NewDiagnosis({ user, onUpdateUser }: { user: any; onUpdateUser: (data: any) => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [numPeriods, setNumPeriods] = useState(3);
  const [ciiuSearch, setCiiuSearch] = useState("");
  const [omitAdditional, setOmitAdditional] = useState(false);
  const [isCiiuOpen, setIsCiiuOpen] = useState(false);

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    sector: "",
    activity: "",
    companySize: "",
    contactName: "",
    contactEmail: "",
    periodType: "Anual",
    yearConstituted: new Date().getFullYear(),
    responsible: user.username,
  });

  const groupedCiiu = useMemo(() => {
    const filtered = CIIU_CODES.filter(c => 
      c.code.includes(ciiuSearch) || 
      c.description.toLowerCase().includes(ciiuSearch.toLowerCase())
    );

    const groups: { section: typeof CIIU_SECTIONS[0], codes: typeof CIIU_CODES }[] = [];

    CIIU_SECTIONS.forEach(section => {
      const codesInSection = filtered.filter(c => {
        const prefix = parseInt(c.code.substring(0, 2));
        return prefix >= section.range[0] && prefix <= section.range[1];
      });

      if (codesInSection.length > 0) {
        groups.push({ section, codes: codesInSection });
      }
    });

    return groups;
  }, [ciiuSearch]);

  const selectedCiiu = useMemo(() => 
    CIIU_CODES.find(c => c.code === companyInfo.activity),
  [companyInfo.activity]);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value });
  };

  const [financialData, setFinancialData] = useState<FinancialData[]>(
    Array(3).fill(null).map((_, i) => ({
      period: `Periodo ${i + 1}`,
      incomeStatement: {
        operatingIncome: 0,
        nonOperatingIncome: 0,
        costs: 0,
        adminExpenses: 0,
        salesExpenses: 0,
        interest: 0,
        nonOperatingExpenses: 0,
        taxes: 0,
      },
      balanceSheet: {
        currentAssets: 0,
        nonCurrentAssets: 0,
        accountsReceivable: 0,
        totalAssets: 0,
        currentLiabilities: 0,
        nonCurrentLiabilities: 0,
        accountsPayable: 0,
        totalLiabilities: 0,
        equity: 0,
      },
    }))
  );

  const handleFinancialChange = (periodIdx: number, section: "incomeStatement" | "balanceSheet", field: string, value: string) => {
    const newData = [...financialData];
    const numValue = parseFloat(value) || 0;
    (newData[periodIdx][section] as any)[field] = numValue;

    // Automatic calculations for Balance Sheet
    if (section === "balanceSheet") {
      const bs = newData[periodIdx].balanceSheet;
      if (field === "currentAssets" || field === "nonCurrentAssets" || field === "accountsReceivable") {
        bs.totalAssets = bs.currentAssets + bs.nonCurrentAssets + bs.accountsReceivable;
      }
      if (field === "currentLiabilities" || field === "nonCurrentLiabilities" || field === "accountsPayable") {
        bs.totalLiabilities = bs.currentLiabilities + bs.nonCurrentLiabilities + bs.accountsPayable;
      }
    }

    setFinancialData(newData);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const activeData = financialData.slice(0, numPeriods);
      const report = await generateFinancialDiagnosis(companyInfo, activeData);
      
      const response = await fetch("/api/diagnoses", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-user-id": user.id.toString()
        },
        body: JSON.stringify({
          company_name: companyInfo.companyName,
          sector: companyInfo.sector,
          activity: companyInfo.activity,
          company_size: companyInfo.companySize,
          contact_name: companyInfo.contactName,
          contact_email: companyInfo.contactEmail,
          year_constituted: parseInt(companyInfo.yearConstituted.toString()),
          responsible: companyInfo.responsible,
          period_type: companyInfo.periodType,
          data: activeData,
          report: report
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Update local user count
        onUpdateUser({ diagnoses_count: user.diagnoses_count + 1 });
        navigate(`/report/${result.id}`);
      } else {
        const error = await response.json();
        alert(error.error || "Error al guardar el diagnóstico.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al generar el diagnóstico. Verifique su conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-stone-900">Nuevo Diagnóstico</h2>
        <div className="flex items-center gap-4 mt-4">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= i ? "bg-emerald-600 text-white" : "bg-stone-200 text-stone-500"}`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium ${step >= i ? "text-stone-900" : "text-stone-400"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className="w-12 h-px bg-stone-200 mx-2" />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        <div className="p-8 flex-1">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-indigo-900">Información de la Empresa</h3>
                  <p className="text-stone-500 text-sm">Por favor, proporciona algunos detalles generales sobre tu empresa.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Nombre de la Empresa</label>
                    <input name="companyName" value={companyInfo.companyName} onChange={handleInfoChange} className="w-full p-3 bg-white border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="ej. Innovate Inc." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Sector</label>
                    <input name="sector" value={companyInfo.sector} onChange={handleInfoChange} className="w-full p-3 bg-white border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="ej. Tecnología" />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-stone-700">Descripción de la actividad económica principal</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCiiuOpen(!isCiiuOpen)}
                        className="w-full p-3 bg-white border border-stone-200 rounded-lg text-left text-sm flex items-center justify-between focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <span className={selectedCiiu ? "text-stone-900" : "text-stone-400"}>
                          {selectedCiiu ? `${selectedCiiu.code} - ${selectedCiiu.description}` : "Selecciona una actividad"}
                        </span>
                        {isCiiuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isCiiuOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-stone-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[400px]">
                          <div className="p-3 border-b border-stone-100 bg-stone-50">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                              <input 
                                type="text"
                                placeholder="Busca una actividad..."
                                value={ciiuSearch}
                                onChange={(e) => setCiiuSearch(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                autoFocus
                              />
                            </div>
                          </div>
                          <div className="overflow-y-auto flex-1">
                            {groupedCiiu.length > 0 ? (
                              groupedCiiu.map(group => (
                                <div key={group.section.id}>
                                  <div className="px-4 py-2 bg-stone-50 text-[10px] font-bold text-stone-400 uppercase tracking-wider sticky top-0">
                                    Sección {group.section.id}: {group.section.name}
                                  </div>
                                  {group.codes.map(c => (
                                    <button
                                      key={c.code}
                                      type="button"
                                      onClick={() => {
                                        setCompanyInfo({ ...companyInfo, activity: c.code });
                                        setIsCiiuOpen(false);
                                      }}
                                      className={`w-full px-4 py-3 text-left text-sm hover:bg-emerald-50 transition-colors flex gap-3 ${
                                        companyInfo.activity === c.code ? "bg-emerald-50 text-emerald-900 font-medium" : "text-stone-700"
                                      }`}
                                    >
                                      <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${
                                        companyInfo.activity === c.code ? "bg-emerald-200" : "bg-stone-100"
                                      }`}>
                                        {c.code}
                                      </span>
                                      <span className="flex-1">{c.description}</span>
                                    </button>
                                  ))}
                                </div>
                              ))
                            ) : (
                              <div className="p-8 text-center text-stone-400 text-sm">
                                No se encontraron actividades para "{ciiuSearch}"
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {isCiiuOpen && (
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsCiiuOpen(false)}
                      />
                    )}
                    <a 
                      href="https://www.enlace-apb.com/interssi/ServletPrincipal?proceso=actividades&comando=verActividadesPRE" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-indigo-600 hover:underline flex items-center gap-1 mt-1"
                    >
                      <Info size={10} /> Buscar código CIIU oficial en el portal
                    </a>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Tamaño de la Empresa</label>
                    <select name="companySize" value={companyInfo.companySize} onChange={handleInfoChange} className="w-full p-3 bg-white border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">Selecciona un tamaño</option>
                      <option value="Microempresa">Microempresa</option>
                      <option value="Pequeña">Pequeña Empresa</option>
                      <option value="Mediana">Mediana Empresa</option>
                      <option value="Grande">Grande Empresa</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Año de Constitución</label>
                    <input name="yearConstituted" type="number" value={companyInfo.yearConstituted} onChange={handleInfoChange} className="w-full p-3 bg-white border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="ej. 2015" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Nombre de Contacto</label>
                    <input name="contactName" value={companyInfo.contactName} onChange={handleInfoChange} className="w-full p-3 bg-white border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="ej. Ana Pérez" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Email de Contacto (correo al cual requieres el envió del diagnóstico)</label>
                    <input 
                      name="contactEmail" 
                      type="email" 
                      value={companyInfo.contactEmail} 
                      onChange={handleInfoChange} 
                      className="w-full p-3 bg-stone-50/50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                      placeholder="ejemplo@correo.com" 
                    />
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-3">
                  <Info className="text-indigo-600 shrink-0" size={20} />
                  <p className="text-sm text-indigo-800">
                    <strong>Modo Comparativo:</strong> Puede analizar hasta 3 periodos. Seleccione cuántos desea ingresar.
                  </p>
                </div>
                <div className="flex gap-4">
                  {[1, 2, 3].map(n => (
                    <button 
                      key={n}
                      type="button"
                      onClick={() => setNumPeriods(n)}
                      className={`px-6 py-3 rounded-xl font-bold border transition-all ${numPeriods === n ? "bg-indigo-900 text-white border-indigo-900" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}
                    >
                      {n} Periodo{n > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-indigo-900">Tipo de Periodo</h3>
                    <p className="text-xs text-indigo-600">Selecciona la frecuencia de los datos financieros</p>
                  </div>
                  <select 
                    name="periodType" 
                    value={companyInfo.periodType} 
                    onChange={handleInfoChange}
                    className="p-3 bg-white border border-indigo-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-indigo-900 min-w-[200px]"
                  >
                    <option value="Anual">Anual</option>
                    <option value="Mensual">Mensual</option>
                    <option value="Trimestral">Trimestral</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200">
                        <th className="py-4 text-xs font-bold text-stone-400 uppercase">Concepto (Estado de Resultados)</th>
                        {Array(numPeriods).fill(0).map((_, i) => (
                          <th key={i} className="py-4 px-4 text-xs font-bold text-stone-400 uppercase text-right">Periodo {i + 1}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {[
                        { label: "Ingresos Operacionales", field: "operatingIncome" },
                        { label: "Ingresos No Operacionales", field: "nonOperatingIncome" },
                        { label: "Costos", field: "costs" },
                        { label: "Gastos Administrativos", field: "adminExpenses" },
                        { label: "Gastos de Ventas", field: "salesExpenses" },
                        { label: "Intereses", field: "interest" },
                        { label: "Gastos No Operacionales", field: "nonOperatingExpenses" },
                        { label: "Impuestos", field: "taxes" },
                      ].map((row) => (
                        <tr key={row.field}>
                          <td className="py-4 text-sm font-medium text-stone-700">{row.label}</td>
                          {Array(numPeriods).fill(0).map((_, i) => (
                            <td key={i} className="py-2 px-4">
                              <input 
                                type="text"
                                inputMode="decimal"
                                value={financialData[i].incomeStatement[row.field as keyof FinancialData['incomeStatement']]}
                                onChange={(e) => handleFinancialChange(i, "incomeStatement", row.field, e.target.value)}
                                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-right text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200">
                        <th className="py-4 text-xs font-bold text-stone-400 uppercase">Concepto (Balance General)</th>
                        {Array(numPeriods).fill(0).map((_, i) => (
                          <th key={i} className="py-4 px-4 text-xs font-bold text-stone-400 uppercase text-right">Periodo {i + 1}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {[
                        { label: "Activos Corrientes", field: "currentAssets" },
                        { label: "Activos No Corrientes", field: "nonCurrentAssets" },
                        { label: "Activos Totales", field: "totalAssets", readOnly: true },
                        { label: "Pasivos Corrientes", field: "currentLiabilities" },
                        { label: "Pasivos No Corrientes", field: "nonCurrentLiabilities" },
                        { label: "Pasivos Totales", field: "totalLiabilities", readOnly: true },
                        { label: "Patrimonio", field: "equity" },
                      ].map((row) => (
                        <tr key={row.field} className={row.readOnly ? "bg-stone-50/50" : ""}>
                          <td className={`py-4 text-sm font-medium ${row.readOnly ? "text-indigo-900 font-bold" : "text-stone-700"}`}>
                            {row.label}
                          </td>
                          {Array(numPeriods).fill(0).map((_, i) => (
                            <td key={i} className="py-2 px-4">
                              <input 
                                type="text"
                                inputMode="decimal"
                                value={financialData[i].balanceSheet[row.field as keyof FinancialData['balanceSheet']]}
                                onChange={(e) => handleFinancialChange(i, "balanceSheet", row.field, e.target.value)}
                                readOnly={row.readOnly}
                                className={`w-full p-2 border rounded-lg text-right text-sm outline-none transition-all ${
                                  row.readOnly 
                                    ? "bg-indigo-50 border-indigo-100 text-indigo-900 font-bold cursor-not-allowed" 
                                    : "bg-stone-50 border-stone-200 focus:ring-2 focus:ring-emerald-500"
                                }`}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-6 bg-amber-50 border border-amber-100 rounded-2xl">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-amber-900">Gestión de Cartera y Proveedores</h3>
                    <p className="text-xs text-amber-700">Información adicional para un análisis de liquidez más preciso.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setOmitAdditional(!omitAdditional);
                      if (!omitAdditional) {
                        const newData = [...financialData];
                        newData.forEach(d => {
                          d.balanceSheet.accountsReceivable = 0;
                          d.balanceSheet.accountsPayable = 0;
                          // Recalculate totals
                          d.balanceSheet.totalAssets = d.balanceSheet.currentAssets + d.balanceSheet.nonCurrentAssets;
                          d.balanceSheet.totalLiabilities = d.balanceSheet.currentLiabilities + d.balanceSheet.nonCurrentLiabilities;
                        });
                        setFinancialData(newData);
                      }
                    }}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border ${omitAdditional ? "bg-amber-600 text-white border-amber-600" : "bg-white text-amber-600 border-amber-200 hover:border-amber-400"}`}
                  >
                    {omitAdditional ? "Información Omitida" : "Omitir esta sección"}
                  </button>
                </div>

                {!omitAdditional && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200">
                          <th className="py-4 text-xs font-bold text-stone-400 uppercase">Concepto Adicional</th>
                          {Array(numPeriods).fill(0).map((_, i) => (
                            <th key={i} className="py-4 px-4 text-xs font-bold text-stone-400 uppercase text-right">Periodo {i + 1}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {[
                          { label: "Cartera (Cuentas por Cobrar)", field: "accountsReceivable" },
                          { label: "Cuentas por Pagar", field: "accountsPayable" },
                        ].map((row) => (
                          <tr key={row.field}>
                            <td className="py-4 text-sm font-medium text-stone-700">{row.label}</td>
                            {Array(numPeriods).fill(0).map((_, i) => (
                              <td key={i} className="py-2 px-4">
                                <input 
                                  type="text"
                                  inputMode="decimal"
                                  value={financialData[i].balanceSheet[row.field as keyof FinancialData['balanceSheet']]}
                                  onChange={(e) => handleFinancialChange(i, "balanceSheet", row.field, e.target.value)}
                                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-right text-sm outline-none focus:ring-2 focus:ring-amber-500"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {omitAdditional && (
                  <div className="py-12 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 text-stone-400 rounded-full">
                      <Search size={32} />
                    </div>
                    <p className="text-stone-500 font-medium">Has decidido omitir los campos de Cartera y Cuentas por Pagar.</p>
                    <p className="text-xs text-stone-400">Puedes volver a habilitarlos en cualquier momento usando el botón superior.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 bg-stone-50 border-t border-stone-200 flex justify-between items-center">
          <button 
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0 || loading}
            className="flex items-center gap-2 text-stone-600 font-bold disabled:opacity-30"
          >
            <ChevronLeft size={20} /> Atrás
          </button>
          
          {step < STEPS.length - 1 ? (
            <button 
              onClick={() => setStep(s => s + 1)}
              className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-800 transition-all flex items-center gap-2"
            >
              Siguiente <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {loading ? "Generando Diagnóstico..." : "Finalizar y Generar Informe"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
