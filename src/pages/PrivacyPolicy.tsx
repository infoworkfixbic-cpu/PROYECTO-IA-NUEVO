import React, { useState } from "react";
import { Shield, ArrowLeft, Mail, Phone, MapPin, FileText, Scale, Target, List, UserCheck, Lock, Clock, HelpCircle, ChevronDown, ChevronUp, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    {
      icon: <Scale size={20} />,
      title: "Marco Normativo",
      content: "La presente Política se expide en cumplimiento de lo dispuesto en la Constitución Política de Colombia, la Ley Estatutaria 1581 de 2012, el Decreto 1377 de 2013, la Sentencia C-748 de 2011 y las directrices de la Superintendencia de Industria y Comercio (SIC)."
    },
    {
      icon: <Target size={20} />,
      title: "Objetivo",
      content: "Garantizar el derecho constitucional de habeas data y establecer las directrices bajo las cuales Workfix Consulting S.A.S. BIC realiza el tratamiento de los datos personales recolectados en el marco de la elaboración de diagnósticos financieros y contables para empresas y emprendedores, asegurando la confidencialidad, integridad y seguridad de la información."
    },
    {
      icon: <HelpCircle size={20} />,
      title: "Definiciones",
      content: "Se adoptan las contenidas en el artículo 3 de la Ley 1581 de 2012: dato personal, dato sensible, autorización, titular, responsable, encargado, tratamiento."
    },
    {
      icon: <FileText size={20} />,
      title: "Principios Rectores",
      content: "Los datos serán tratados conforme a los principios de legalidad, finalidad, libertad, veracidad, transparencia, acceso restringido, seguridad y confidencialidad (Ley 1581 de 2012, art. 4)."
    },
    {
      icon: <List size={20} />,
      title: "Finalidades del Tratamiento",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Elaborar diagnósticos financieros, comerciales y estratégicos.</li>
          <li>Generar informes ejecutivos con indicadores y tendencias.</li>
          <li>Diseñar planes de acción orientados a mejorar la gestión empresarial.</li>
          <li>Realizar comparativos sectoriales de desempeño.</li>
          <li>Contactar al empresario para entrega de resultados y seguimiento.</li>
          <li>Cumplir obligaciones legales ante autoridades competentes.</li>
          <li>Mantener comunicación sobre actividades, programas y capacitaciones afines.</li>
        </ul>
      )
    },
    {
      icon: <Lock size={20} />,
      title: "Tratamiento de Datos Sensibles",
      content: "Los datos financieros entregados por el empresario se consideran sensibles. Su suministro es facultativo y solo se utilizarán para las finalidades previamente informadas, garantizando mayor nivel de protección."
    },
    {
      icon: <UserCheck size={20} />,
      title: "Derechos de los Titulares",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Conocer, actualizar y rectificar sus datos.</li>
          <li>Solicitar prueba de la autorización otorgada.</li>
          <li>Ser informados sobre el uso dado a sus datos.</li>
          <li>Revocar la autorización y/o solicitar supresión cuando no exista deber legal de conservarlos.</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
        </ul>
      )
    },
    {
      icon: <Shield size={20} />,
      title: "Deberes de Workfix Consulting",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Usar los datos solo para las finalidades autorizadas.</li>
          <li>Conservar la información con medidas de seguridad adecuadas.</li>
          <li>Responder oportunamente las solicitudes de los titulares.</li>
          <li>Informar a la SIC sobre incidentes de seguridad que comprometan datos sensibles.</li>
        </ul>
      )
    },
    {
      icon: <Shield size={20} />,
      title: "Seguridad de la Información",
      content: "Workfix Consulting S.A.S. BIC cuenta con medidas técnicas, humanas y administrativas necesarias para otorgar seguridad a los registros evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento."
    },
    {
      icon: <Clock size={20} />,
      title: "Vigencia de la Política y Bases de Datos",
      content: "Los datos personales permanecerán en nuestras bases de datos mientras sean necesarios para cumplir las finalidades descritas o exista relación contractual, comercial o legal. La presente política rige a partir de su publicación y permanecerá vigente indefinidamente mientras se mantenga el uso de las bases de datos."
    }
  ];

  const toggleSection = (idx: number) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-indigo-600 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl mb-2">
            <FileText size={24} />
          </div>
          <h1 className="text-3xl font-bold text-indigo-900">Política de Tratamiento de Datos Personales</h1>
          <p className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Workfix Consulting S.A.S. BIC</p>
        </div>

        {/* Identificación del Responsable - Centered and Static */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-indigo-900">
            <UserCheck size={28} />
            <h3 className="font-bold text-2xl">Identificación del Responsable</h3>
          </div>
          
          <div className="space-y-1 text-stone-600 text-sm md:text-base">
            <p><span className="font-bold text-stone-500">Razón Social:</span> Workfix Consulting S.A.S. BIC</p>
            <p><span className="font-bold text-stone-500">NIT:</span> 900.827.878 - 3</p>
            <p><span className="font-bold text-stone-500">Domicilio Principal:</span> Calle 26 norte # 5AN-50 Santiago de Cali, Valle del Cauca, Colombia</p>
            <p><span className="font-bold text-stone-500">Correo electrónico:</span> info@workfix.com.co</p>
            <p><span className="font-bold text-stone-500">Teléfono:</span> 302 121 22 25</p>
          </div>
        </div>

        {/* Sections Accordion */}
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <button 
                onClick={() => toggleSection(idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-indigo-600">{section.icon}</span>
                  <h3 className="text-indigo-900 font-bold text-lg">{section.title}</h3>
                </div>
                {openSection === idx ? <ChevronUp size={20} className="text-stone-400" /> : <ChevronDown size={20} className="text-stone-400" />}
              </button>
              
              <AnimatePresence>
                {openSection === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-stone-50 pt-4">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Procedimiento */}
        <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 text-center space-y-4">
          <h2 className="text-indigo-900 font-bold text-lg flex items-center justify-center gap-2">
            <Mail size={20} className="text-indigo-600" /> Procedimiento para Consultas y Reclamos
          </h2>
          <p className="text-sm text-stone-600">
            El titular podrá presentar consultas o reclamos relacionados con sus datos personales a través de:
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm font-bold text-indigo-900">
            <span className="flex items-center gap-2"><Mail size={16} /> info@workfix.com.co</span>
            <span className="flex items-center gap-2"><Phone size={16} /> 302 121 22 25</span>
          </div>
          <p className="text-[10px] text-indigo-400 uppercase font-bold">
            Las consultas serán atendidas en un plazo máximo de 10 días hábiles y los reclamos en un plazo máximo de 15 días hábiles (Ley 1581 de 2012).
          </p>
        </div>

        {/* Autorización */}
        <div className="bg-white p-6 rounded-xl border border-indigo-200 text-center">
          <h3 className="text-indigo-900 font-bold text-sm mb-2 flex items-center justify-center gap-2">
            <UserCheck size={18} className="text-indigo-600" /> Autorización del Titular
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Al aceptar y recibir el Diagnóstico Financiero, el empresario manifiesta que conoce y acepta esta Política, y que autoriza a Workfix Consulting S.A.S. BIC para el tratamiento de sus datos personales conforme a las finalidades aquí descritas.
          </p>
        </div>
      </div>
    </div>
  );
}
