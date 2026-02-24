import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface FinancialData {
  period: string;
  incomeStatement: {
    operatingIncome: number;
    nonOperatingIncome: number;
    costs: number;
    adminExpenses: number;
    salesExpenses: number;
    interest: number;
    nonOperatingExpenses: number;
    taxes: number;
  };
  balanceSheet: {
    currentAssets: number;
    nonCurrentAssets: number;
    accountsReceivable: number;
    totalAssets: number;
    currentLiabilities: number;
    nonCurrentLiabilities: number;
    accountsPayable: number;
    totalLiabilities: number;
    equity: number;
  };
}

export async function generateFinancialDiagnosis(companyInfo: any, data: FinancialData[]) {
  const prompt = `
    Actúa como un Consultor Financiero Senior experto. Realiza un diagnóstico financiero profundo para la siguiente empresa:
    
    INFORMACIÓN DE LA EMPRESA:
    - Nombre: ${companyInfo.companyName}
    - Sector: ${companyInfo.sector}
    - Actividad CIIU: ${companyInfo.activity}
    - Tamaño: ${companyInfo.companySize}
    - Año de Constitución: ${companyInfo.yearConstituted}
    - Frecuencia de Datos: ${companyInfo.periodType}
    
    DATOS FINANCIEROS (Comparativo de ${data.length} periodos ${companyInfo.periodType}es):
    ${JSON.stringify(data, null, 2)}
    
    REQUERIMIENTOS DEL INFORME:
    1. Análisis de Liquidez (incluyendo gestión de Cartera y Cuentas por Pagar), Solvencia, Rentabilidad y Endeudamiento.
    2. Identificación de fortalezas y debilidades críticas.
    3. Nivel de madurez financiera (Escala 1-100).
    4. Plan de acción detallado con 5 acciones prioritarias (KPI, Plazo, Prioridad).
    5. Conclusiones estratégicas.
    
    IMPORTANTE: El análisis debe ser coherente con el sector ${companyInfo.sector} y el tamaño ${companyInfo.companySize}.

    Genera el diagnóstico en formato JSON siguiendo este esquema:
    {
      "score": number (0-100),
      "maturityLevel": string,
      "trafficLight": "green" | "yellow" | "red",
      "executiveSummary": string,
      "swot": {
        "strengths": string[],
        "weaknesses": string[],
        "opportunities": string[],
        "threats": string[]
      },
      "alerts": string[],
      "recommendations": string[],
      "sectorComparison": string,
      "structuralRisk": string,
      "actionPlan": [
        {
          "action": string,
          "description": string,
          "kpi": string,
          "deadline": string,
          "priority": "Alta" | "Media" | "Baja"
        }
      ],
      "strategicConclusion": string
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text;
  if (!text) return {};

  try {
    // Clean potential markdown code blocks
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanJson = jsonMatch ? jsonMatch[0] : text;
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Failed to parse Gemini JSON response:", text);
    throw new Error("La respuesta de la IA no es un JSON válido");
  }
}
