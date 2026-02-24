import React from "react";
import { Shield, Check } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Consent({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 border border-stone-200 text-center space-y-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl text-indigo-600 mb-2">
          <Shield size={32} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-indigo-900">Consentimiento para el Tratamiento de Datos</h1>
          <p className="text-stone-500 text-sm">
            Antes de continuar, necesitamos tu consentimiento para utilizar los datos que nos proporcionas.
          </p>
        </div>

        <div className="text-stone-600 text-sm leading-relaxed text-left space-y-6">
          <p>
            Al hacer clic en "Aceptar y Continuar", autorizas a Workfix Consulting a recopilar y procesar la información financiera y de contacto de tu empresa con el único propósito de generar un diagnóstico financiero y sus correspondientes recomendaciones.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Check className="text-emerald-500 shrink-0" size={18} />
              <p><strong>Confidencialidad:</strong> Tus datos serán tratados de forma estrictamente confidencial y no serán compartidos con terceros sin tu consentimiento explícito.</p>
            </div>
            <div className="flex gap-3">
              <Check className="text-emerald-500 shrink-0" size={18} />
              <p><strong>Uso:</strong> La información se utilizará exclusivamente para el análisis automatizado mediante nuestra herramienta de IA y para la generación del informe.</p>
            </div>
            <div className="flex gap-3">
              <Check className="text-emerald-500 shrink-0" size={18} />
              <p><strong>Almacenamiento:</strong> Los datos se almacenarán de forma segura en nuestra base de datos para que puedas consultarlos en el futuro.</p>
            </div>
          </div>

          <p className="text-[10px] text-stone-400 italic text-center">
            WORKFIX CONSULTING S.A.S BIC garantiza la confidencialidad, seguridad e integridad de los datos conforme a lo establecido en la Ley 1581 de 2012 y sus decretos reglamentarios. Podré ejercer mis derechos de acceso, rectificación, cancelación y oposición (ARCO) mediante solicitud escrita al correo electrónico: info@workfix.com.co
          </p>

          <p className="text-center text-xs">
            Para más información, consulta nuestra <Link to="/privacy" className="text-indigo-600 underline">Política de Tratamiento de Datos Personales</Link>.
          </p>
        </div>

        <button
          onClick={onAccept}
          className="bg-indigo-900 text-white px-12 py-4 rounded-xl font-bold hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-900/20"
        >
          Aceptar y Continuar
        </button>
      </motion.div>
    </div>
  );
}
