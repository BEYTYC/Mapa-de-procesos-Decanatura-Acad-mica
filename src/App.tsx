/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight,
  ArrowDown,
  CornerDownLeft,
  User, 
  FileText,
  CheckCircle2,
  Box,
  Layers,
  Sparkles,
  Menu,
  X,
  Search,
  ChevronDown,
  Compass,
  Award,
  GraduationCap,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
export interface SubProcess {
  id: string;
  stepNum: number;
  titulo: string;
  resumen: string;
  responsable: string;
  queSeHace: string[];
  queSeNecesita: string[];
  terminaCuando: string;
}

export interface Process {
  id: string;
  codigo: string;
  titulo: string;
  resumen: string;
  descripcion: string;
  estado: 'borrador' | 'documentado';
  badgeText: string;
  subprocesos: SubProcess[];
}

// --- Data: Objeto PROCESOS oficial de la ENAP ---
export const PROCESOS: Record<string, Process> = {
  "admisiones": {
    id: "admisiones",
    codigo: "PROC-01",
    titulo: "Admisiones",
    resumen: "Atracción, inscripción, pruebas de selección e incorporación de nuevos aspirantes.",
    descripcion: "Primer eslabón del proceso académico. Abarca desde la promoción de carreras hasta la matrícula oficial de los cadetes.",
    estado: "borrador",
    badgeText: "Borrador · por validar",
    subprocesos: [
      {
        id: "1.1",
        stepNum: 1,
        titulo: "Divulgación y promoción",
        resumen: "Difusión de la oferta académica militar y naval en colegios y medios.",
        responsable: "Oficina de Admisiones y Comunicaciones",
        queSeHace: [
          "Diseño de campañas institucionales vocacionales",
          "Visitas a colegios y ferias vocacionales a nivel nacional",
          "Atención a aspirantes por medios digitales y presenciales"
        ],
        queSeNecesita: ["Calendario de convocatorias", "Material publicitario autorizado"],
        terminaCuando: "Se inicia formalmente la fase de inscripción con la apertura de la plataforma."
      },
      {
        id: "1.2",
        stepNum: 2,
        titulo: "Inscripción del aspirante",
        resumen: "Radicación de documentos y pago de derechos de inscripción.",
        responsable: "Aspirante y Oficina de Admisiones",
        queSeHace: [
          "Diligenciamiento de formulario en línea en el portal web",
          "Pago de derechos de inscripción en tesorería o banco",
          "Cargue digital y verificación inicial de requisitos"
        ],
        queSeNecesita: ["Documento de identidad", "Pruebas Saber 11 / ICFES", "Comprobante de pago"],
        terminaCuando: "El aspirante recibe su credencial digital de inscripción con código único."
      },
      {
        id: "1.3",
        stepNum: 3,
        titulo: "Pruebas de selección",
        resumen: "Evaluaciones académicas, psicotécnicas, médicas y físicas.",
        responsable: "Jefatura de Selección y Depto. Médico",
        queSeHace: [
          "Aplicación de exámenes académicos e intelectuales",
          "Evaluación psicológica clínica y psicotécnica",
          "Chequeo médico integral de aptitud psicofísica",
          "Pruebas de aptitud física naval y natación"
        ],
        queSeNecesita: ["Aspirante citado con credencial", "Formatos de evaluación médica"],
        terminaCuando: "Se consolidan los conceptos de 'Apto' o 'No Apto' en el expediente del aspirante."
      },
      {
        id: "1.4",
        stepNum: 4,
        titulo: "Entrevista y junta de selección",
        resumen: "Valoración personal e institucional por la Junta Admisionadora.",
        responsable: "Junta de Selección de la ENAP",
        queSeHace: [
          "Entrevista personal institucional del aspirante",
          "Revisión de perfil psicofísico, académico y antecedentes",
          "Deliberación y asignación de puntajes por la Junta"
        ],
        queSeNecesita: ["Expediente consolidado del aspirante", "Acta de citación a junta"],
        terminaCuando: "La Junta firma el acta formal con la lista ponderada de seleccionados."
      },
      {
        id: "1.5",
        stepNum: 5,
        titulo: "Publicación de admitidos",
        resumen: "Oficialización del listado de admitidos y citación a incorporación.",
        responsable: "Decanatura Académica",
        queSeHace: [
          "Verificación final de cupos autorizados por el Mando Naval",
          "Publicación oficial en el portal web de la ENAP",
          "Notificación individual por correo con instrucciones de ingreso"
        ],
        queSeNecesita: ["Acta firmada por la Junta de Selección", "Resolución de aprobación"],
        terminaCuando: "Se emiten y notifican las cartas formales de admisión."
      },
      {
        id: "1.6",
        stepNum: 6,
        titulo: "Matrícula e incorporación",
        resumen: "Formalización de ingreso e inicio del periodo de adaptación.",
        responsable: "Jefatura de Instrucción y Registro Académico",
        queSeHace: [
          "Revisión de paz y salvo financiero de la matrícula",
          "Firma del compromiso institucional y reglamentos",
          "Ingreso físico del contingente a las instalaciones de la ENAP"
        ],
        queSeNecesita: ["Soportes de pago de matrícula", "Póliza de seguro médico", "Documentación física"],
        terminaCuando: "El aspirante sienta plaza oficialmente como Cadete de la ENAP."
      }
    ]
  },
  "formacion": {
    id: "formacion",
    codigo: "PROC-02",
    titulo: "Formación",
    resumen: "Desarrollo del proyecto educativo curricular, militar, científico y naval.",
    descripcion: "Segundo eslabón del proceso académico. Gestiona la programación, desarrollo de materias, evaluación continua y acompañamiento al estudiante.",
    estado: "borrador",
    badgeText: "Borrador · por validar",
    subprocesos: [
      {
        id: "2.1",
        stepNum: 1,
        titulo: "Programación académica",
        resumen: "Asignación de asignaturas, aulas, simuladores y docentes.",
        responsable: "Decanatura Académica y Directores de Programa",
        queSeHace: [
          "Definición de horarios teóricos y prácticos del semestre",
          "Asignación de laboratorios, simuladores de navegación y aulas",
          "Publicación del calendario académico semestral"
        ],
        queSeNecesita: ["Malla curricular vigente", "Disponibilidad de docentes y espacios"],
        terminaCuando: "Se aprueba y publica la programación académica del semestre."
      },
      {
        id: "2.2",
        stepNum: 2,
        titulo: "Registro y matrícula académica",
        resumen: "Inscripción formal de asignaturas por el estudiante.",
        responsable: "Registro y Control Académico",
        queSeHace: [
          "Apertura del portal para inscripción de asignaturas",
          "Verificación del cumplimiento de prerrequisitos",
          "Consolidación y entrega de listas de clase a docentes"
        ],
        queSeNecesita: ["Paz y salvo del periodo anterior", "Plan de estudios del cadete"],
        terminaCuando: "El estudiante cuenta con su horario confirmado en el sistema."
      },
      {
        id: "2.3",
        stepNum: 3,
        titulo: "Desarrollo curricular",
        resumen: "Ejecución de actividades lectivas, laboratorios y navegación.",
        responsable: "Cuerpo Docente y Jefaturas de Departamento",
        queSeHace: [
          "Impartición de clases magistrales y talleres prácticos",
          "Prácticas en simuladores navales y maniobras de mar",
          "Atención a tutorías y proyectos de investigación formativa"
        ],
        queSeNecesita: ["Sílabos de asignatura", "Aulas y recursos pedagógicos"],
        terminaCuando: "Se cumplen las semanas reglamentarias del periodo escolar."
      },
      {
        id: "2.4",
        stepNum: 4,
        titulo: "Evaluación y seguimiento",
        resumen: "Valoración del rendimiento académico y competencias adquiridas.",
        responsable: "Docentes y Comité de Evaluación Académica",
        queSeHace: [
          "Aplicación de exámenes parciales, quices y proyectos finales",
          "Cargue periódico de notas en la plataforma institucional",
          "Reporte de alertas tempranas sobre bajo rendimiento"
        ],
        queSeNecesita: ["Criterios de evaluación definidos", "Plataforma de notas activa"],
        terminaCuando: "Se registran y cierran las actas con notas definitivas del semestre."
      },
      {
        id: "2.5",
        stepNum: 5,
        titulo: "Permanencia y acompañamiento",
        resumen: "Estrategias de tutoría y bienestar pedagógico para estudiantes.",
        responsable: "Bienestar Naval y Decanatura Académica",
        queSeHace: [
          "Tutorías académicas de nivelación en áreas complejas",
          "Acompañamiento psicológico y orientación pedagógica",
          "Seguimiento a cadetes en condición de prueba académica"
        ],
        queSeNecesita: ["Alertas tempranas de evaluación", "Planes de mejoramiento docente"],
        terminaCuando: "Se emite el informe semestral de retención y éxito académico."
      },
      {
        id: "2.6",
        stepNum: 6,
        titulo: "Movilidad e internacionalización",
        resumen: "Intercambios académicos con academias navales internacionales.",
        responsable: "Oficina de Relaciones Internacionales",
        queSeHace: [
          "Gestión de convenios marco interinstitucionales",
          "Selección de cadetes para cruceros de instrucción e intercambios",
          "Homologación formal de créditos aprobados en el exterior"
        ],
        queSeNecesita: ["Convenio vigente", "Soportes de rendimiento académico"],
        terminaCuando: "Se expide la resolución de homologación de créditos."
      }
    ]
  },
  "graduacion": {
    id: "graduacion",
    codigo: "PROC-03",
    titulo: "Graduación",
    resumen: "Verificación de requisitos, aprobación de títulos, expedición y ceremonia.",
    descripcion: "Tercer eslabón culminante. Flujo formal verificado de seis etapas secuenciales obligatorias para la expedición de títulos en la ENAP.",
    estado: "documentado",
    badgeText: "Proceso documentado",
    subprocesos: [
      {
        id: "3.1",
        stepNum: 1,
        titulo: "Solicitud de grado",
        resumen: "Radicación de la solicitud por el estudiante tras cumplir los requisitos.",
        responsable: "Estudiante / Candidato a Grado",
        queSeHace: [
          "Verificación personal del cumplimiento del plan de estudios y créditos aprobados.",
          "Pago de los derechos de grado correspondientes en la tesorería o banco.",
          "Consolidación de soportes documentales y radicación ante la facultad.",
          "Diligenciamiento del formulario oficial de solicitud de grado."
        ],
        queSeNecesita: [
          "Certificado de promedio ponderado acumulado",
          "Comprobante de pago de derechos de grado",
          "Estampilla Procultura",
          "Soporte de la opción de grado (trabajo de grado o diplomado)",
          "Diploma o acta de pregrado (si aplica para posgrados)"
        ],
        terminaCuando: "La solicitud queda radicada formalmente en el sistema."
      },
      {
        id: "3.2",
        stepNum: 2,
        titulo: "Aprobación del Jefe de Programa",
        resumen: "Revisión documental integral, balance académico y propuestas de honor.",
        responsable: "Jefe de Programa Académico",
        queSeHace: [
          "Revisión de vigencia y completitud de la documentación presentada.",
          "Verificación del balance académico: notas finales y créditos aprobados vs. plan de estudios.",
          "Evaluación de requisitos para distinciones académicas (Cum Laude, Magna Cum Laude, Summa Cum Laude).",
          "Cargue de documentación validada en el repositorio central de grados.",
          "Consolidación de la lista oficial de candidatos del programa."
        ],
        queSeNecesita: [
          "Expediente completo del estudiante radicado en el paso 1",
          "Pruebas Saber Pro / Estado (si aplica)",
          "Paz y salvo institucional (biblioteca, finanzas, armamento)"
        ],
        terminaCuando: "Se firma y remite el listado consolidado de candidatos aprobados a la Decanatura Académica."
      },
      {
        id: "3.3",
        stepNum: 3,
        titulo: "Consejo Académico",
        resumen: "Convocatoria y presentación oficial de la lista de candidatos.",
        responsable: "Decanatura Académica / Consejo Académico",
        queSeHace: [
          "Convocatoria a sesión ordinaria o extraordinaria del Consejo Académico.",
          "Presentación del listado consolidado por programas académicos.",
          "Exposición de las propuestas de distinciones académicas recibidas.",
          "Registro de observaciones, subsanaciones o casos aplazados.",
          "Votación de los miembros del consejo."
        ],
        queSeNecesita: [
          "Listados firmados por los Jefes de Programa",
          "Informes analíticos de distinciones académicas",
          "Orden del día del Consejo Académico"
        ],
        terminaCuando: "Finaliza la sesión del Consejo Académico con el registro en borrador de deliberación."
      },
      {
        id: "3.4",
        stepNum: 4,
        titulo: "Aprobación del grado",
        resumen: "Emisión del acto administrativo y formalización de la lista definitiva.",
        responsable: "Consejo Académico / Director ENAP",
        queSeHace: [
          "El Consejo aprueba formalmente el otorgamiento de títulos.",
          "Otorgamiento oficial de distinciones académicas mediante acuerdo.",
          "Redacción y firma del Acta de Consejo Académico.",
          "Expedición del acto administrativo (Resolución de Grado).",
          "Cierre del listado definitivo e inmodificable de graduandos."
        ],
        queSeNecesita: [
          "Acta de la sesión del Consejo Académico",
          "Proyecto de Resolución de Grado"
        ],
        terminaCuando: "Queda firmado el acto administrativo que autoriza la expedición de los diplomas."
      },
      {
        id: "3.5",
        stepNum: 5,
        titulo: "Emisión de diplomas",
        resumen: "Elaboración de diplomas y actas, firma y registro en libro de grados.",
        responsable: "Registro y Control Académico",
        queSeHace: [
          "Elaboración de diplomas y actas con nombres idénticos al documento de identidad.",
          "Recolección de firmas institucionales autorizadas (Director, Decano, Registro).",
          "Verificación de seguridad de cada ejemplar impreso o digital.",
          "Asignación de folios y registro oficial en el Libro General de Grados de la ENAP."
        ],
        queSeNecesita: [
          "Resolución de Grado expedida en el paso 4",
          "Formatos de diplomas y caligrafía institucional",
          "Libro de Grados físico y digital"
        ],
        terminaCuando: "Los diplomas y actas quedan debidamente firmados, foliados y listos para la ceremonia."
      },
      {
        id: "3.6",
        stepNum: 6,
        titulo: "Entrega de diplomas",
        resumen: "Ceremonia solemne de graduación y cierre del registro académico.",
        responsable: "Decanatura Académica y Dirección ENAP",
        queSeHace: [
          "Realización de la Ceremonia Militar y Académica de Graduación.",
          "Entrega personal e individual del diploma y acta de grado al graduando.",
          "Proclamación e imposición de distinciones académicas.",
          "Cierre definitivo e inmutable de la historia académica del estudiante en el sistema."
        ],
        queSeNecesita: [
          "Diplomas y actas firmados del paso 5",
          "Protocolo y guión de ceremonia militar"
        ],
        terminaCuando: "Se firma el libro de entrega de diplomas y el registro académico del estudiante pasa a estado 'Graduado'."
      }
    ]
  }
};

// Componente de Fondo de Protocolos Oficial (Fondo "Blanuzco Grisáceo" Institucional con Marca de Agua de Logo/Escudo Grande)
const ProtocolBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F4F6F9]">
    {/* Marca de agua central gigante del Escudo ENAP */}
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] select-none">
      <img 
        src="https://i.ibb.co/p6wfvf20/logo.png" 
        alt="" 
        className="w-[750px] h-[750px] md:w-[850px] md:h-[850px] object-contain filter text-[#0A1F3C]"
      />
    </div>

    {/* Resplandor radial de luz protocolo suave */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.92)_0%,rgba(244,246,249,0.75)_60%,rgba(230,235,242,0.5)_100%)]" />
  </div>
);

export default function App() {
  // Nivel de navegación: 1 = Mapa General (Cuadros de Procesos), 2 = Dentro de la Caja (Subcajas), 3 = Detalle del Subproceso
  const [level, setLevel] = useState<number>(1);
  const [activeProcessKey, setActiveProcessKey] = useState<string>("admisiones");
  const [activeSubIndex, setActiveSubIndex] = useState<number>(0);
  const [openingKey, setOpeningKey] = useState<string | null>(null);
  const [dimmedKey, setDimmedKey] = useState<string | null>(null);
  const [openingSubIndex, setOpeningSubIndex] = useState<number | null>(null);

  // Menú Lateral Sidebar State (Sólo activo en Nivel 2 y 3, NUNCA en Nivel 1)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPhaseInSidebar, setExpandedPhaseInSidebar] = useState<string | null>("admisiones");

  const activeProcess = PROCESOS[activeProcessKey] || PROCESOS["admisiones"];
  const activeSubprocess = activeProcess.subprocesos[activeSubIndex] || activeProcess.subprocesos[0];

  // Teclado: Tecla ESC para subir nivel, Flechas para cambiar subproceso en Nivel 3
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        goBack();
      } else if (level === 3) {
        if (e.key === 'ArrowRight' && activeSubIndex < activeProcess.subprocesos.length - 1) {
          setActiveSubIndex(prev => prev + 1);
        } else if (e.key === 'ArrowLeft' && activeSubIndex > 0) {
          setActiveSubIndex(prev => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [level, activeSubIndex, activeProcessKey]);

  // Abrir Proceso desde Nivel 1 con animación de Piñata
  const openProcessBox = (key: string) => {
    if (openingKey) return;
    setOpeningKey(key);
    setActiveProcessKey(key);
    setExpandedPhaseInSidebar(key);

    // Reproduce la animación de apertura de la caja desplazándose hacia arriba como piñata
    setTimeout(() => {
      setLevel(2);
      setActiveSubIndex(0);
      setOpeningKey(null);
    }, 450);
  };

  // Abrir Subproceso desde Nivel 2
  const openSubBox = (procKey: string, index: number) => {
    setActiveProcessKey(procKey);
    setExpandedPhaseInSidebar(procKey);
    setActiveSubIndex(index);
    setLevel(3);
  };

  // Subir nivel
  const goBack = () => {
    if (level === 3) {
      setLevel(2);
    } else if (level === 2) {
      setLevel(1);
    }
  };

  const processKeys = Object.keys(PROCESOS);

  // Determinar si debemos mostrar el sidebar (SÓLO en Nivel 2 y Nivel 3, NUNCA en Nivel 1)
  const shouldShowSidebar = level >= 2 && isSidebarOpen;

  return (
    <div className="min-h-screen text-[#0A1F3C] font-sora relative flex flex-col overflow-x-hidden bg-[#EEF4FA]">
      <ProtocolBackground />

      {/* CABECERA INSTITUCIONAL EN AZUL NAVY */}
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#0A1F3C] border-b border-[#1E3A8A]/40 z-50 px-4 lg:px-8 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          {/* Botón Toggle para Menú Lateral (Visible sólo si estamos en Nivel 2 o 3) */}
          {level >= 2 && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-xs font-semibold mr-1 border border-white/10"
              title="Alternar Menú Lateral"
            >
              {isSidebarOpen ? <X className="w-5 h-5 text-slate-300" /> : <Menu className="w-5 h-5 text-slate-300" />}
              <span className="hidden sm:inline text-slate-200 text-xs font-mono">Menú</span>
            </button>
          )}

          <img 
            id="escudo"
            src="https://i.ibb.co/p6wfvf20/logo.png" 
            alt="Escudo ENAP" 
            className="h-[58px] md:h-[62px] w-auto object-contain transition-all"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-base tracking-tight leading-tight flex items-center gap-2">
              Decanatura Académica
              {/* Toque dorado sutil en la sigla ENAP */}
              <span className="text-[10px] font-mono text-[#C6A15B] bg-[#C6A15B]/15 border border-[#C6A15B]/40 px-2 py-0.5 rounded-full font-bold">
                ENAP
              </span>
            </h1>
            <span className="text-slate-300 text-[11px] font-normal tracking-wide">
              Escuela Naval de Cadetes «Almirante Padilla»
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-[11px] font-mono font-semibold text-slate-200 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
            MAPA DE PROCESOS ACADÉMICOS
          </div>
        </div>
      </header>

      {/* BARRA DE MIGAS DE PAN (BREADCRUMBS) */}
      <nav className={cn(
        "fixed top-[72px] left-0 right-0 h-[44px] bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-4 lg:px-8 flex items-center justify-between text-xs transition-all duration-300",
        shouldShowSidebar ? "lg:pl-[310px]" : "pl-6"
      )}>
        <ul className="flex items-center gap-2 list-none">
          <li>
            <button 
              onClick={() => setLevel(1)} 
              className={cn(
                "px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5",
                level === 1 ? "bg-[#0A1F3C] text-white font-bold shadow-sm" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
              Mapa General
            </button>
          </li>

          {level >= 2 && (
            <li className="flex items-center gap-2 text-slate-400">
              <span className="text-slate-400 font-bold">›</span>
              <button 
                onClick={() => setLevel(2)} 
                className={cn(
                  "px-2.5 py-1 rounded-md transition-all font-medium",
                  level === 2 ? "bg-[#0A1F3C] text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <span>{activeProcess.titulo}</span>
              </button>
            </li>
          )}

          {level === 3 && (
            <li className="flex items-center gap-2 text-slate-400">
              <span className="text-slate-400 font-bold">›</span>
              <button 
                className="px-2.5 py-1 rounded-md bg-[#0A1F3C] text-white font-bold cursor-default shadow-sm"
              >
                Subproceso <span className="text-[#C6A15B] font-mono">{activeSubprocess.id}</span>
              </button>
            </li>
          )}
        </ul>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-500">
          <span>Subir nivel:</span>
          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-bold text-slate-700">ESC</kbd>
        </div>
      </nav>

      {/* MENÚ LATERAL INTERACTIVO (Sólo aparece en Nivel 2 y 3, NUNCA en Nivel 1) */}
      <AnimatePresence>
        {shouldShowSidebar && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed left-0 top-[116px] bottom-0 w-[290px] bg-white border-r border-slate-200 z-30 p-4 flex flex-col shadow-xl overflow-hidden"
          >
            {/* Header del Sidebar */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-extrabold text-[#0A1F3C] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#0A1F3C]" />
                  Índice de Procesos
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Nivel 2 & 3 · ENAP</span>
              </div>

              <button 
                onClick={() => setLevel(1)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200"
                title="Volver al Mapa General"
              >
                <Layers className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Buscador de Subprocesos en Sidebar */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar subproceso..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#0A1F3C] placeholder:text-slate-400 focus:outline-none focus:border-[#0A1F3C] focus:bg-white transition-all"
              />
            </div>

            {/* Botón Volver al Mapa General */}
            <button
              onClick={() => setLevel(1)}
              className="w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between mb-3 text-xs font-bold bg-[#0A1F3C] text-white shadow-sm hover:bg-[#102A50]"
            >
              <span className="flex items-center gap-2">
                <Box className="w-4 h-4 text-[#C6A15B]" />
                Volver al Mapa General
              </span>
              <span className="font-mono text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-bold">N1</span>
            </button>

            {/* Lista Acordeón de Procesos y Subprocesos */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              {processKeys.map((pKey) => {
                const proc = PROCESOS[pKey];
                const isProcActive = activeProcessKey === pKey && level >= 2;
                const isExpanded = expandedPhaseInSidebar === pKey || searchQuery.trim().length > 0;

                const filteredSubs = proc.subprocesos.filter(s => 
                  searchQuery === "" || 
                  s.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  s.id.includes(searchQuery)
                );

                if (searchQuery.trim().length > 0 && filteredSubs.length === 0) {
                  return null;
                }

                return (
                  <div key={pKey} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    {/* Header del Proceso */}
                    <button
                      onClick={() => {
                        setActiveProcessKey(pKey);
                        setLevel(2);
                        setExpandedPhaseInSidebar(isExpanded && searchQuery === "" ? null : pKey);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 flex items-center justify-between text-xs font-bold transition-all",
                        isProcActive
                          ? "bg-[#0A1F3C] text-white"
                          : "text-[#0A1F3C] hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Box className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                        <span>{proc.titulo}</span>
                      </div>
                      <ChevronDown className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200 text-slate-400",
                        isExpanded ? "rotate-180" : ""
                      )} />
                    </button>

                    {/* Subprocesos interiores */}
                    {isExpanded && (
                      <div className="p-1.5 space-y-0.5 bg-slate-50 border-t border-slate-100">
                        {filteredSubs.map((sub) => {
                          const subIdx = proc.subprocesos.findIndex(s => s.id === sub.id);
                          const isSubActive = level === 3 && activeProcessKey === pKey && activeSubIndex === subIdx;

                          return (
                            <button
                              key={sub.id}
                              onClick={() => openSubBox(pKey, subIdx)}
                              className={cn(
                                "w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-between group",
                                isSubActive
                                  ? "bg-[#0A1F3C] text-white font-bold shadow-sm"
                                  : "text-slate-700 hover:text-[#0A1F3C] hover:bg-white"
                              )}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className={cn(
                                  "font-mono text-[10px] px-1 py-0.2 rounded font-bold",
                                  isSubActive ? "bg-[#C6A15B] text-[#0A1F3C]" : "bg-slate-200 text-slate-700"
                                )}>
                                  {sub.id}
                                </span>
                                <span className="truncate">{sub.titulo}</span>
                              </div>
                              <ChevronRight className={cn(
                                "w-3 h-3 transition-transform",
                                isSubActive ? "text-white" : "text-slate-400 group-hover:translate-x-0.5"
                              )} />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer del Sidebar */}
            <div className="pt-3 mt-auto border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between font-mono">
              <span>Decanatura ENAP © 2026</span>
              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">v3.4</span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ESCENA PRINCIPAL */}
      <main className={cn(
        "mt-[116px] p-6 lg:p-10 z-10 flex-1 flex flex-col items-center transition-all duration-300",
        shouldShowSidebar ? "lg:pl-[310px]" : "pl-6"
      )}>
        <div className="w-full max-w-[1240px]">
          <AnimatePresence mode="wait">
            
            {/* ==========================================
                NIVEL 1: MAPA GENERAL — DIAGRAMA DE FLUJO CON CAJAS DE CARTÓN
                ========================================== */}
            {level === 1 && (
              <motion.div
                key="level-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center w-full"
              >
                {/* Encabezado Institucional Centrado */}
                <div className="text-center mb-8 max-w-3xl mx-auto">
                  <span className="font-mono text-xs font-bold text-[#0A1F3C] uppercase tracking-widest bg-white border border-slate-200 px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-3 shadow-sm">
                    <Award className="w-3.5 h-3.5 text-[#C6A15B]" />
                    Nivel 1 — Flujo Académico Institucional ENAP
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0A1F3C] tracking-tight mb-2">
                    Mapa General de Procesos
                  </h2>
                  <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                    Secuencia directa desde la <strong className="text-[#0A1F3C]">Entrada de Aspirantes</strong>, a través de los <strong className="text-[#8A651E]">Procesos Académicos</strong>, hasta la <strong className="text-[#8A651E]">Salida de Egresados</strong>. Haga clic en cualquiera de los procesos para explorar sus subprocesos.
                  </p>
                </div>

                {/* SECUENCIA CONTINUA HORIZONTAL: ENTRADA ➔ PROCESOS ACADÉMICOS ➔ SALIDA */}
                <div className="w-full box-perspective-container pt-4">
                  <div className="flex flex-col xl:flex-row items-stretch justify-between gap-4 relative z-10 w-full">
                    
                    {/* BLOQUE DE ENTRADA (LADO IZQUIERDO) */}
                    <div className="xl:w-[220px] shrink-0 bg-white border-2 border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-md relative group hover:border-[#0A1F3C] transition-all">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono font-extrabold text-[#0A1F3C] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md uppercase tracking-wider">
                            ORIGEN
                          </span>
                          <User className="w-4 h-4 text-[#0A1F3C]" />
                        </div>
                        <h3 className="text-lg font-extrabold text-[#0A1F3C] mb-1 leading-tight">
                          ENTRADA
                        </h3>
                        <p className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider mb-2">
                          Aspirantes
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Jóvenes bachilleres y profesionales postulados para la carrera naval militar.
                        </p>
                      </div>

                      <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                        <span>Punto de Inicio</span>
                        <ArrowRight className="w-4 h-4 text-[#C6A15B] animate-pulse hidden xl:block" />
                        <ArrowDown className="w-4 h-4 text-[#C6A15B] animate-pulse xl:hidden" />
                      </div>

                      {/* Flecha Conectora de Salida de Entrada (Desktop) */}
                      <div className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <div className="bg-[#0A1F3C] text-[#C6A15B] border-2 border-[#C6A15B] rounded-full p-1.5 shadow-lg">
                          <ArrowRight className="w-4 h-4 animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* TARJETAS DE PROCESOS (CENTRO) - CAJAS 3D CON TAPA QUE SE ABREN AL TOCAR */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 relative box-perspective-container">
                      {processKeys.map((key, idx) => {
                        const proc = PROCESOS[key];
                        const isOpening = openingKey === key;
                        const isLastProc = idx === processKeys.length - 1;

                        return (
                          <div key={key} className="relative flex flex-col w-full">
                            {/* CAJA 3D DE PROCESO COMPACTA CON TAPA SUPERIOR */}
                            <motion.button
                              onClick={() => openProcessBox(key)}
                              whileHover={{ y: -4, rotateX: 2 }}
                              whileTap={{ scale: 0.98 }}
                              className={cn(
                                "process-box-card w-full text-left pt-12 pb-4 px-5 relative flex flex-col justify-between transition-all cursor-pointer outline-none group min-h-[180px] h-full overflow-hidden",
                                isOpening ? "is-opening border-[#0A1F3C] ring-2 ring-[#C6A15B]" : ""
                              )}
                            >
                              {/* TAPA SUPERIOR FÍSICA DE LA CAJA */}
                              <div className="process-box-lid">
                                <span className="font-mono text-[11px] font-extrabold text-[#C6A15B] tracking-wider uppercase flex items-center gap-1.5">
                                  <Box className="w-3.5 h-3.5 text-[#C6A15B]" />
                                  CAJA DE PROCESO
                                </span>
                                <div className="process-box-lid-latch" title="Pestaña de Apertura" />
                              </div>

                              {/* INTERIOR RESPLANDECIENTE Y DOCUMENTOS QUE SALEN CUANDO LA CAJA SE ABRE */}
                              <div className="process-box-interior">
                                <motion.div
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: [0, -6, 0], opacity: 1 }}
                                  transition={{ duration: 0.45 }}
                                  className="flex flex-col items-center justify-center text-center p-3 text-white"
                                >
                                  <motion.div 
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="bg-[#C6A15B] text-[#0A1F3C] p-2.5 rounded-xl shadow-lg mb-2"
                                  >
                                    <Box className="w-6 h-6" />
                                  </motion.div>
                                  <span className="font-mono text-xs font-black text-[#C6A15B] uppercase tracking-wider mb-0.5">
                                    ¡Abre la Caja!
                                  </span>
                                  <span className="text-[11px] font-medium text-slate-200">
                                    Saliendo {proc.subprocesos.length} subprocesos...
                                  </span>
                                </motion.div>
                              </div>

                              {/* CUERPO PRINCIPAL DE LA CAJA */}
                              <div className="flex flex-col relative z-10 w-full mt-1">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                                    Contenido Interno:
                                  </span>
                                  <span className="font-mono text-[11px] font-extrabold text-[#0A1F3C] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                                    {proc.subprocesos.length} Subprocesos
                                  </span>
                                </div>

                                {/* Título del Proceso */}
                                <h3 className="text-base sm:text-lg font-extrabold text-[#0A1F3C] group-hover:text-[#102A50] transition-colors leading-snug mb-1.5">
                                  {proc.titulo}
                                </h3>

                                <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                                  {proc.resumen}
                                </p>
                              </div>

                              {/* Pie de la Caja - Botón/Indicador de Apertura */}
                              <div className="relative z-10 pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-extrabold text-[#0A1F3C] group-hover:text-[#102A50] flex items-center gap-1 transition-transform group-hover:translate-x-1 ml-auto">
                                  Abrir Caja <ChevronRight className="w-4 h-4 text-[#C6A15B]" />
                                </span>
                              </div>
                            </motion.button>

                            {/* Flechas Conectoras entre Procesos */}
                            {!isLastProc && (
                              <>
                                {/* Conector Desktop entre procesos */}
                                <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                                  <div className="bg-[#0A1F3C] text-[#C6A15B] border-2 border-[#C6A15B] rounded-full p-1.5 shadow-lg">
                                    <ArrowRight className="w-4 h-4 animate-pulse" />
                                  </div>
                                </div>

                                {/* Conector Móvil entre procesos */}
                                <div className="flex md:hidden justify-center my-3 z-20">
                                  <div className="bg-[#0A1F3C] text-[#C6A15B] border-2 border-[#C6A15B] px-3 py-1 rounded-full shadow-md flex items-center gap-2 text-xs font-mono font-bold">
                                    <span>Siguiente proceso</span>
                                    <ArrowDown className="w-4 h-4 text-[#C6A15B] animate-bounce" />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* BLOQUE DE SALIDA (LADO DERECHO) CON ÍCONO DE GRADUADO */}
                    <div className="xl:w-[220px] shrink-0 bg-[#FEF8EC] border-2 border-[#C6A15B] rounded-2xl p-5 flex flex-col justify-between shadow-md relative group hover:shadow-xl transition-all">
                      {/* Flecha Conectora de Entrada a la Salida (Desktop) */}
                      <div className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <div className="bg-[#0A1F3C] text-[#C6A15B] border-2 border-[#C6A15B] rounded-full p-1.5 shadow-lg">
                          <ArrowRight className="w-4 h-4 animate-pulse" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono font-extrabold text-[#8A651E] bg-[#C6A15B]/20 border border-[#C6A15B]/40 px-2.5 py-1 rounded-md uppercase tracking-wider">
                            DESTINO FINAL
                          </span>
                          <GraduationCap className="w-5 h-5 text-[#8A651E]" />
                        </div>
                        <h3 className="text-lg font-extrabold text-[#0A1F3C] mb-1 leading-tight">
                          SALIDA
                        </h3>
                        <p className="text-xs font-bold text-[#8A651E] uppercase tracking-wider mb-2">
                          Egresados ENAP
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          Oficiales graduados con título profesional y formación militar naval acreditada.
                        </p>
                      </div>

                      <div className="pt-3 mt-4 border-t border-[#C6A15B]/30 flex items-center justify-between text-xs font-mono font-bold text-[#8A651E]">
                        <span>Proceso Completo</span>
                        <CheckCircle2 className="w-4 h-4 text-[#8A651E]" />
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* ==========================================
                NIVEL 2: INTERIOR DEL PROCESO — FLUJO DE SUBPROCESOS
                ========================================== */}
            {level === 2 && (
              <motion.div
                key={`level-2-${activeProcessKey}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="w-full flex flex-col items-center"
              >
                {/* BARRA SUPERIOR DE SALIDA FÁCIL AL MAPA GENERAL */}
                <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                  <button 
                    onClick={() => setLevel(1)}
                    className="bg-[#0A1F3C] text-white hover:bg-[#102A50] px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <CornerDownLeft className="w-4 h-4 text-[#C6A15B]" />
                    ← Volver al Mapa General de Procesos
                  </button>

                  <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="text-xs font-bold text-[#0A1F3C] bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Menu className="w-4 h-4 text-[#0A1F3C]" />
                    <span>{isSidebarOpen ? "Cerrar Menú Lateral" : "Ver Menú / Índice de Procesos"}</span>
                  </button>
                </div>

                {/* Encabezado Nivel 2 */}
                <div className="text-center mb-6 relative">
                  <motion.div 
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="flex items-center justify-center gap-2 mb-2"
                  >
                    <span className="font-mono text-xs font-bold text-[#0A1F3C] uppercase tracking-widest bg-white px-3.5 py-1 rounded-full border border-slate-200 shadow-sm inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                      Nivel 2 — Secuencia de Subprocesos
                    </span>
                  </motion.div>
                  <h2 className="text-3xl font-extrabold text-[#0A1F3C] mb-2">
                    <span>{activeProcess.titulo}</span>
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                    {activeProcess.descripcion} Seleccione cualquiera de los pasos para ver sus detalles completos.
                  </p>
                </div>

                {/* Contenedor de Subprocesos Desplegados */}
                <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xl relative overflow-hidden">
                  <div className="box-interior-floor p-4 md:p-5 rounded-xl relative overflow-visible">
                    {/* Flowchart Grid con animación Staggered de caída/vaciado de la caja */}
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.05
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 relative z-10 box-perspective-container"
                    >
                      {activeProcess.subprocesos.map((sub, idx) => {
                        const isLast = idx === activeProcess.subprocesos.length - 1;
                        const nextSub = !isLast ? activeProcess.subprocesos[idx + 1] : null;

                        return (
                          <motion.div 
                            key={sub.id} 
                            variants={{
                              hidden: { y: -25, opacity: 0, scale: 0.95 },
                              show: { 
                                y: 0, 
                                opacity: 1, 
                                scale: 1,
                                transition: { type: "spring", stiffness: 300, damping: 22 }
                              }
                            }}
                            className="relative flex flex-col"
                          >
                            {/* Tarjeta Compacta y Minimalista de Subproceso */}
                            <button
                              onClick={() => openSubBox(activeProcessKey, idx)}
                              className="flow-subcard text-left bg-white p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-md transition-all relative border-2 border-slate-200 hover:border-[#0A1F3C] rounded-xl h-full min-h-[120px]"
                            >
                              {/* Cabecera: Paso */}
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="font-mono text-[11px] font-extrabold text-[#0A1F3C] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                                    Paso {sub.stepNum} ({sub.id})
                                  </span>
                                  <span className="text-[10px] font-mono font-bold text-[#C6A15B] bg-[#0A1F3C] px-2 py-0.5 rounded-full">
                                    {sub.stepNum} / {activeProcess.subprocesos.length}
                                  </span>
                                </div>

                                {/* Título Claro del Subproceso */}
                                <h4 className="text-sm sm:text-base font-extrabold text-[#0A1F3C] group-hover:text-[#102A50] transition-colors leading-snug my-1">
                                  {sub.titulo}
                                </h4>
                              </div>

                              {/* Pie de Tarjeta Compacta: Responsable */}
                              <div className="pt-2 mt-2 border-t border-slate-100 text-xs font-semibold text-[#0A1F3C] flex items-center justify-between">
                                <span className="text-[11px] text-slate-600 font-medium truncate max-w-[170px]" title={sub.responsable}>
                                  <span className="text-slate-400 font-bold">Resp:</span> {sub.responsable}
                                </span>
                                <span className="flex items-center gap-0.5 font-extrabold text-[#0A1F3C] group-hover:text-[#102A50] text-[11px]">
                                  Ver <ChevronRight className="w-3.5 h-3.5 text-[#C6A15B] group-hover:translate-x-0.5 transition-transform" />
                                </span>
                              </div>
                            </button>

                            {/* FLECHAS MARCADAS DEL PROCESO (CONECTORES DESTACADOS) */}
                            {!isLast && (
                              <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center">
                                <div className="bg-[#0A1F3C] text-[#C6A15B] border-2 border-[#C6A15B] rounded-full p-1.5 shadow-md flex items-center justify-center">
                                  <ArrowRight className="w-4 h-4 text-[#C6A15B] stroke-[2.5]" />
                                </div>
                              </div>
                            )}

                            {!isLast && (
                              <div className="flex lg:hidden justify-center my-1.5 z-20">
                                <div className="bg-[#0A1F3C] text-[#C6A15B] border border-[#C6A15B] px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 text-[11px] font-mono font-bold">
                                  <span>Paso {sub.stepNum}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B] sm:inline hidden" />
                                  <ArrowDown className="w-3.5 h-3.5 text-[#C6A15B] sm:hidden" />
                                  <span className="text-white">Paso {nextSub?.stepNum}</span>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==========================================
                NIVEL 3: DETALLE DEL SUBPROCESO DENTRO DEL FLUJO
                ========================================== */}
            {level === 3 && (
              <motion.div
                key="level-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center"
              >
                {/* BARRA SUPERIOR DE NAVEGACIÓN Y SALIDA EN NIVEL 3 */}
                <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      onClick={() => setLevel(1)}
                      className="bg-[#0A1F3C] text-white hover:bg-[#102A50] px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <CornerDownLeft className="w-4 h-4 text-[#C6A15B]" />
                      ← Volver al Mapa General
                    </button>
                    <button 
                      onClick={() => setLevel(2)}
                      className="bg-slate-100 hover:bg-slate-200 text-[#0A1F3C] px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#0A1F3C]" />
                      Volver a {activeProcess.titulo}
                    </button>
                  </div>

                  <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="text-xs font-bold text-[#0A1F3C] bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Menu className="w-4 h-4 text-[#0A1F3C]" />
                    <span>{isSidebarOpen ? "Cerrar Menú" : "Ver Menú / Índice"}</span>
                  </button>
                </div>
                {/* Tracker Visual de Pasos del Flujo */}
                <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono font-bold text-[#0A1F3C] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C6A15B]" />
                    <span>POSICIÓN EN EL FLUJO:</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {activeProcess.subprocesos.map((sub, i) => {
                      const isActive = i === activeSubIndex;
                      const isPast = i < activeSubIndex;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveSubIndex(i)}
                          className={cn(
                            "px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1",
                            isActive 
                              ? "bg-[#0A1F3C] text-[#C6A15B] shadow-sm border border-[#0A1F3C]" 
                              : isPast
                              ? "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                              : "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50"
                          )}
                        >
                          <span>{sub.stepNum}.</span>
                          <span className="hidden sm:inline">{sub.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="detail-card w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-xl">
                  {/* Encabezado del Detalle */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#0A1F3C] bg-slate-100 px-3 py-1 rounded-md border border-slate-200 inline-block mb-1">
                        SUBPROCESO <span className="text-[#C6A15B]">{activeSubprocess.id}</span> · PASO {activeSubprocess.stepNum} DE {activeProcess.subprocesos.length}
                      </span>
                      <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0A1F3C] tracking-tight mt-1">
                        {activeSubprocess.titulo}
                      </h2>
                      <p className="text-sm text-slate-600 mt-1 font-medium">
                        {activeSubprocess.resumen}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
                      <User className="w-4 h-4 text-[#0A1F3C]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Responsable</span>
                        <span className="text-xs font-bold text-[#0A1F3C]">{activeSubprocess.responsable}</span>
                      </div>
                    </div>
                  </div>

                  {/* Grid de 2 Columnas: Qué se hace vs Qué se necesita */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    {/* Sección: Qué se hace */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold text-[#0A1F3C] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0A1F3C]" />
                        ¿Qué se hace en este paso?
                      </h4>
                      <ul className="bullet-list space-y-2.5">
                        {activeSubprocess.queSeHace.map((item, i) => (
                          <li key={i} className="text-xs text-slate-700 leading-relaxed pl-4 relative font-normal">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sección: Qué se necesita */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold text-[#0A1F3C] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#0A1F3C]" />
                        Documentos y Requisitos necesarios
                      </h4>
                      <ul className="bullet-list space-y-2.5">
                        {activeSubprocess.queSeNecesita.map((item, i) => (
                          <li key={i} className="text-xs text-slate-700 leading-relaxed pl-4 relative font-normal">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cuadro de Criterio de Finalización */}
                  <div className="finish-condition-box bg-[#F0F5FA] border border-slate-200 rounded-xl p-4">
                    <span className="finish-label block font-mono text-[11px] font-bold text-[#0A1F3C] uppercase tracking-wider mb-1">
                      Criterio de finalización del paso
                    </span>
                    <p className="finish-text text-xs text-slate-800 font-semibold leading-relaxed">
                      {activeSubprocess.terminaCuando}
                    </p>
                  </div>

                  {/* Navegación Secuencial del Flujo */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
                    <button
                      onClick={() => setActiveSubIndex(prev => Math.max(0, prev - 1))}
                      disabled={activeSubIndex === 0}
                      className="bg-white border border-slate-200 text-[#0A1F3C] text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-500" />
                      Anterior ({activeSubIndex > 0 ? activeProcess.subprocesos[activeSubIndex - 1].id : 'Inicio'})
                    </button>

                    {/* Indicador de progreso */}
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-[#0A1F3C]">
                        Paso {activeSubIndex + 1} de {activeProcess.subprocesos.length}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveSubIndex(prev => Math.min(activeProcess.subprocesos.length - 1, prev + 1))}
                      disabled={activeSubIndex === activeProcess.subprocesos.length - 1}
                      className="bg-[#0A1F3C] hover:bg-[#102A50] text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      Siguiente ({activeSubIndex < activeProcess.subprocesos.length - 1 ? activeProcess.subprocesos[activeSubIndex + 1].id : 'Fin'})
                      <ChevronRight className="w-4 h-4 text-[#C6A15B]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
