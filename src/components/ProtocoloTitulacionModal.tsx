import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  FileText, 
  Award, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Search,
  ExternalLink,
  BookOpen,
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface ProtocoloTitulacionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PROGRAMAS_ENAP = [
  {
    nombre: 'Ciencias Navales para Oficiales Navales',
    nivel: 'Pregrado',
    titulo: 'Profesional en Ciencias Navales',
    facultad: 'Ciencias Navales',
    sigla: 'NAV',
    correos: ['cadoctoradocm@enap.edu.co', 'jpcna@enap.edu.co', 'jcley@enap.edu.co', 'dfcn@enap.edu.co']
  },
  {
    nombre: 'Ciencias Navales para Oficiales de Infantería de Marina',
    nivel: 'Pregrado',
    titulo: 'Profesional en Ciencias Navales',
    facultad: 'Infantería de Marina',
    sigla: 'IM',
    correos: ['cpmim@enap.edu.co', 'jpfim@enap.edu.co', 'dfim@enap.edu.co']
  },
  {
    nombre: 'Ciencias Náuticas para Oficiales Mercantes',
    nivel: 'Pregrado',
    titulo: 'Profesional en Ciencias Náuticas',
    facultad: 'Marina Mercante',
    sigla: 'MC',
    correos: ['jpcn@enap.edu.co', 'dfmm@enap.edu.co']
  },
  {
    nombre: 'Ciencias Náuticas para Oficiales Mercantes de Máquinas',
    nivel: 'Pregrado',
    titulo: 'Profesional en Ciencias Náuticas',
    facultad: 'Marina Mercante',
    sigla: 'MM',
    correos: ['jpcn@enap.edu.co', 'dfmm@enap.edu.co']
  },
  {
    nombre: 'Administración',
    nivel: 'Pregrado',
    titulo: 'Administrador',
    facultad: 'Administración',
    sigla: 'CCPAD',
    correos: ['posfam@enap.edu.co', 'cpadm@enap.edu.co', 'dfam@enap.edu.co']
  },
  {
    nombre: 'Administración Marítima',
    nivel: 'Pregrado',
    titulo: 'Administrador Marítimo',
    facultad: 'Administración',
    sigla: 'CCPAM',
    correos: ['posfam@enap.edu.co', 'cpadm@enap.edu.co', 'dfam@enap.edu.co']
  },
  {
    nombre: 'Oceanografía Física',
    nivel: 'Pregrado',
    titulo: 'Oceanógrafo Físico',
    facultad: 'Oceanografía',
    sigla: 'CCPOF',
    correos: ['jpfof@enap.edu.co', 'maestriaoceanografia@enap.edu.co']
  },
  {
    nombre: 'Ingeniería Naval',
    nivel: 'Pregrado',
    titulo: 'Ingeniero Naval',
    facultad: 'Ingeniería',
    sigla: 'CCPIN',
    correos: ['maestriaingnaval@enap.edu.co', 'jdiv.electronica@enap.edu.co', 'jdivmecanica@enap.edu.co', 'dfin@enap.edu.co']
  },
  {
    nombre: 'Ingeniería Electrónica',
    nivel: 'Pregrado',
    titulo: 'Ingeniero Electrónico',
    facultad: 'Ingeniería',
    sigla: 'CCPEL',
    correos: ['maestriaingnaval@enap.edu.co', 'jdiv.electronica@enap.edu.co', 'jdivmecanica@enap.edu.co', 'dfin@enap.edu.co']
  },
  {
    nombre: 'Especialización en Logística',
    nivel: 'Posgrado',
    titulo: 'Especialista en Logística',
    facultad: 'Administración',
    sigla: 'ESP.LOG',
    correos: ['posfam@enap.edu.co', 'cpadm@enap.edu.co', 'dfam@enap.edu.co']
  },
  {
    nombre: 'Especialización en Política y Estrategia Marítima',
    nivel: 'Posgrado',
    titulo: 'Especialista en Política y Estrategia Marítima',
    facultad: 'Ciencias Navales',
    sigla: 'ESP. POL',
    correos: ['cadoctoradocm@enap.edu.co', 'jpcna@enap.edu.co', 'jcley@enap.edu.co', 'dfcn@enap.edu.co']
  },
  {
    nombre: 'Maestría en Gestión Logística',
    nivel: 'Posgrado',
    titulo: 'Magíster en Gestión Logística',
    facultad: 'Administración',
    sigla: 'MSC. LOG',
    correos: ['posfam@enap.edu.co', 'cpadm@enap.edu.co', 'dfam@enap.edu.co']
  },
  {
    nombre: 'Maestría en Oceanografía',
    nivel: 'Posgrado',
    titulo: 'Magíster en Oceanografía',
    facultad: 'Oceanografía',
    sigla: 'MSC. OCE',
    correos: ['jpfof@enap.edu.co', 'maestriaoceanografia@enap.edu.co']
  },
  {
    nombre: 'Maestría en Ingeniería Naval',
    nivel: 'Posgrado',
    titulo: 'Magíster en Ingeniería Naval',
    facultad: 'Ingeniería',
    sigla: 'MSC. ING',
    correos: ['maestriaingnaval@enap.edu.co', 'jdiv.electronica@enap.edu.co', 'jdivmecanica@enap.edu.co', 'dfin@enap.edu.co']
  },
  {
    nombre: 'Doctorado en Ciencias del Mar',
    nivel: 'Posgrado',
    titulo: 'Doctor en Ciencias del Mar',
    facultad: 'Ciencias Navales',
    sigla: 'DOCTORADO',
    correos: ['cadoctoradocm@enap.edu.co', 'jpcna@enap.edu.co', 'jcley@enap.edu.co', 'dfcn@enap.edu.co']
  }
];

export const DOCUMENTOS_EXPEDIENTE = [
  {
    id: 'cedula',
    nombre: '1. Documento de Identidad (ambas caras al 150%)',
    condicion: 'Obligatorio en todas las solicitudes',
    etapa: 'Estudiante (Portal Público)',
    requiereAval: true,
    icono: 'id'
  },
  {
    id: 'pago_derechos',
    nombre: '2. Comprobante de Pago de Derechos de Grado',
    condicion: 'Obligatorio en todas las solicitudes',
    etapa: 'Estudiante (Portal Público)',
    requiereAval: true,
    icono: 'pago'
  },
  {
    id: 'estampilla',
    nombre: '3. Comprobante de Pago Estampilla Procultura',
    condicion: 'Obligatorio en todas las solicitudes',
    etapa: 'Estudiante (Portal Público)',
    requiereAval: true,
    icono: 'pago'
  },
  {
    id: 'diploma_anterior',
    nombre: '4. Diploma o Acta de Grado Anterior (Bachiller / Pregrado)',
    condicion: 'Bachiller para Pregrado / Pregrado para Posgrado',
    etapa: 'Estudiante (Portal Público)',
    requiereAval: true,
    icono: 'diploma'
  },
  {
    id: 'saber_pro',
    nombre: '5. Resultados Pruebas Saber Pro / TyT',
    condicion: 'Exclusivo para programas de Pregrado',
    etapa: 'Estudiante (Portal Público)',
    requiereAval: true,
    icono: 'prueba'
  },
  {
    id: 'constancia_diplomado',
    nombre: '6. Constancia Diplomado',
    condicion: 'Solo si la opción de grado elegida es diplomado',
    etapa: 'Estudiante (Portal Público)',
    requiereAval: true,
    icono: 'curso'
  },
  {
    id: 'balance',
    nombre: '1. Balance Académico Oficial',
    condicion: 'Verificación del 100% de créditos aprobados',
    etapa: 'Jefe de Programa (Panel Facultades)',
    requiereAval: false,
    icono: 'balance'
  },
  {
    id: 'calificacion_grado',
    nombre: '2. Formato de Calificación de Grado',
    condicion: 'Obligatorio en todas las solicitudes',
    etapa: 'Jefe de Programa (Panel Facultades)',
    requiereAval: false,
    icono: 'eval'
  },
  {
    id: 'promedio',
    nombre: '3. Certificado de Promedio Ponderado Acumulado',
    condicion: 'Obligatorio en todas las solicitudes',
    etapa: 'Jefe de Programa (Panel Facultades)',
    requiereAval: false,
    icono: 'promedio'
  },
  {
    id: 'idioma',
    nombre: '4. Certificación de Idioma Extranjero (Inglés / CIEN)',
    condicion: 'Obligatorio en todas las solicitudes',
    etapa: 'Jefe de Programa (Panel Facultades)',
    requiereAval: false,
    icono: 'idioma'
  },
  {
    id: 'anexo2_1',
    nombre: '5. Evaluación Trabajo de Grado — Anexo 2 (Evaluador 1)',
    condicion: 'Solo si la opción de grado es Trabajo de Grado',
    etapa: 'Jefe de Programa (Panel Facultades)',
    requiereAval: false,
    icono: 'anexo'
  },
  {
    id: 'anexo2_2',
    nombre: '6. Evaluación Trabajo de Grado — Anexo 2 (Evaluador 2)',
    condicion: 'Solo si la opción de grado es Trabajo de Grado',
    etapa: 'Jefe de Programa (Panel Facultades)',
    requiereAval: false,
    icono: 'anexo'
  },
  {
    id: 'reconocimiento_1',
    nombre: '7. Solicitud de Reconocimiento / Distinción (Evaluador 1)',
    condicion: 'Solo si postula a distinciones Cum Laude / Magna / Summa',
    etapa: 'Jefe de Programa (Panel Facultades)',
    requiereAval: false,
    icono: 'honor'
  },
  {
    id: 'reconocimiento_2',
    nombre: '8. Solicitud de Reconocimiento / Distinción (Evaluador 2)',
    condicion: 'Solo si postula a distinciones Cum Laude / Magna / Summa',
    etapa: 'Jefe de Programa (Panel Facultades)',
    requiereAval: false,
    icono: 'honor'
  }
];

export const PASOS_OFICIALES_GRADUACION = [
  {
    num: 1,
    titulo: 'El estudiante solicita',
    responsable: 'Estudiante / Candidato a Grado',
    entidad: 'Portal Público de Titulación ENAP',
    descripcion: 'El estudiante solicita formalmente la titulación a través del portal público institucional, diligencia sus datos de filiación, autoriza el tratamiento de datos y adjunta los soportes requeridos (cédula al 150%, comprobantes de pago de derechos de grado y estampilla, diploma anterior y Saber Pro / TyT si aplica). Se le expide el radicado oficial SG-AAAAMMDD.',
    icono: 'user'
  },
  {
    num: 2,
    titulo: 'El jefe de programa aprueba y completa la información',
    responsable: 'Jefe de Programa Académico',
    entidad: 'Panel de Facultades (Autenticación OTP)',
    descripcion: 'El jefe de programa accede con código OTP institucional de 6 dígitos, audita el cumplimiento del 100% del plan de estudios y requisitos de egreso, complementa la información cargando el balance académico, notas, certificado de promedio y actas de sustentación, otorga avales individuales a cada documento y solicita formalmente la titulación.',
    icono: 'check'
  },
  {
    num: 3,
    titulo: 'El secretario Académico valida las solicitudes y solicita comité de decanos y consejo académico',
    responsable: 'Secretario Académico',
    entidad: 'Secretaría Académica ENAP',
    descripcion: 'El Secretario Académico revisa y valida jurídicamente las solicitudes completas remitidas por los programas, coordina con el Comité de Decanos de Facultad y sustancía la inclusión del listado oficial de graduandos en el orden del día del Consejo Académico, estructurando el proyecto de Resolución de Grado.',
    icono: 'file'
  },
  {
    num: 4,
    titulo: 'El consejo aprueba grados',
    responsable: 'Consejo Académico (Presidido por el Director ENAP)',
    entidad: 'Consejo Académico ENAP',
    descripcion: 'El Consejo Académico sesiona bajo la presidencia del señor Contralmirante Director de la ENAP, delibera sobre los expedientes presentados, aprueba formalmente el otorgamiento de los títulos de pregrado y posgrado y las distinciones de honor (Art. 91), y promulga la Resolución de Grado como acto administrativo oficial vinculante.',
    icono: 'award'
  },
  {
    num: 5,
    titulo: 'La oficina de Estadística registra y emite diplomas',
    responsable: 'Oficina de Estadística y Registro',
    entidad: 'Oficina de Estadística ENAP & SNIES / MEN',
    descripcion: 'La Oficina de Estadística recibe la Resolución de Grado, efectúa el cotejo final con Registraduría Nacional, registra a los graduandos en los sistemas institucionales y en el SNIES del Ministerio de Educación Nacional, y EMITE los diplomas oficiales en cartulinas con hologramas de seguridad, gestionando su caligrafiado protocolario, folios en el Libro de Grados y las tres firmas del Mando Naval.',
    destacado: true,
    icono: 'diploma'
  },
  {
    num: 6,
    titulo: 'El secretario académico entrega diplomas en ceremonia',
    responsable: 'Secretario Académico & Mando Naval',
    entidad: 'Campo de Paradas / Aula Máxima ENAP',
    descripcion: 'El Secretario Académico coordina el protocolo de la solemne Ceremonia Militar y Académica de Graduación, da lectura solemne a la Resolución de Grado y al Acta General, y acompaña la entrega personal de los diplomas y actas de grado a los nuevos egresados, formalizando la firma del libro y cierre del ciclo de titulación.',
    icono: 'grad'
  }
];

export const ProtocoloTitulacionModal: React.FC<ProtocoloTitulacionModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'flujo' | 'programas' | 'documentos' | 'honor' | 'arquitectura'>('flujo');
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('Todas');
  const [simuladorPromedio, setSimuladorPromedio] = useState('9.6');
  const [simuladorDistincion, setSimuladorDistincion] = useState('Cum Laude');

  if (!isOpen) return null;

  const faculties = ['Todas', ...Array.from(new Set(PROGRAMAS_ENAP.map(p => p.facultad)))];

  const filteredPrograms = PROGRAMAS_ENAP.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.sigla.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFac = facultyFilter === 'Todas' || p.facultad === facultyFilter;
    return matchesSearch && matchesFac;
  });

  const numPromedio = parseFloat(simuladorPromedio.replace(',', '.')) || 0;
  const tieneDistincion = simuladorDistincion && simuladorDistincion !== 'Ninguna';
  const esGraduadoDeHonor = numPromedio > 9.5 && tieneDistincion;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1F3C]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A1F3C] text-white p-5 sm:p-6 flex items-start justify-between relative border-b-4 border-[#C6A15B]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7 text-[#C6A15B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#C6A15B] bg-[#C6A15B]/10 px-2 py-0.5 rounded border border-[#C6A15B]/30 uppercase">
                  Portal Oficial de Titulación ENAP
                </span>
                <span className="text-[10px] font-mono text-slate-300">Reglamento Académico & SNIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
                Protocolo Institucional de Grados y Diplomas
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('flujo')}
            className={`px-4 py-2.5 text-xs font-bold font-mono tracking-wide rounded-t-lg transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'flujo'
                ? 'bg-white text-[#0A1F3C] border-[#0A1F3C] shadow-2xs font-extrabold'
                : 'text-slate-500 border-transparent hover:text-[#0A1F3C] hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C6A15B]" />
            <span>Flujo Oficial (6 Pasos)</span>
          </button>

          <button
            onClick={() => setActiveTab('programas')}
            className={`px-4 py-2.5 text-xs font-bold font-mono tracking-wide rounded-t-lg transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'programas'
                ? 'bg-white text-[#0A1F3C] border-[#0A1F3C] shadow-2xs font-extrabold'
                : 'text-slate-500 border-transparent hover:text-[#0A1F3C] hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#C6A15B]" />
            <span>15 Programas y Títulos SNIES</span>
          </button>

          <button
            onClick={() => setActiveTab('documentos')}
            className={`px-4 py-2.5 text-xs font-bold font-mono tracking-wide rounded-t-lg transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'documentos'
                ? 'bg-white text-[#0A1F3C] border-[#0A1F3C] shadow-2xs font-extrabold'
                : 'text-slate-500 border-transparent hover:text-[#0A1F3C] hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-[#C6A15B]" />
            <span>Matriz de 14 Documentos</span>
          </button>

          <button
            onClick={() => setActiveTab('honor')}
            className={`px-4 py-2.5 text-xs font-bold font-mono tracking-wide rounded-t-lg transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'honor'
                ? 'bg-white text-[#0A1F3C] border-[#0A1F3C] shadow-2xs font-extrabold'
                : 'text-slate-500 border-transparent hover:text-[#0A1F3C] hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-[#C6A15B]" />
            <span>Artículo 91 (Graduado de Honor)</span>
          </button>

          <button
            onClick={() => setActiveTab('arquitectura')}
            className={`px-4 py-2.5 text-xs font-bold font-mono tracking-wide rounded-t-lg transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'arquitectura'
                ? 'bg-white text-[#0A1F3C] border-[#0A1F3C] shadow-2xs font-extrabold'
                : 'text-slate-500 border-transparent hover:text-[#0A1F3C] hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
            <span>Arquitectura Digital</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 0: FLUJO OFICIAL EN 6 PASOS */}
          {activeTab === 'flujo' && (
            <div className="space-y-5">
              {/* Highlight Banner */}
              <div className="bg-gradient-to-r from-amber-500/15 via-[#C6A15B]/20 to-amber-500/10 border-2 border-[#C6A15B] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1F3C] border-2 border-[#C6A15B] flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-6 h-6 text-[#C6A15B]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#8A651E] uppercase bg-amber-100/80 px-2 py-0.5 rounded border border-[#C6A15B]/40">
                      Disposición Institucional ENAP
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#0A1F3C] mt-0.5">
                      Los diplomas son emitidos por la Oficina de Estadística
                    </h3>
                    <p className="text-xs text-slate-700 max-w-xl leading-relaxed">
                      El proceso culmina con el registro institucional y expedición formal de diplomas y actas por parte de la <strong>Oficina de Estadística y Registro</strong>, previo a la entrega en ceremonia solemne por el Secretario Académico.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6 Steps List */}
              <div className="grid grid-cols-1 gap-3.5">
                {PASOS_OFICIALES_GRADUACION.map((paso) => (
                  <div
                    key={paso.num}
                    className={`p-4 rounded-xl border transition-all ${
                      paso.destacado
                        ? 'bg-gradient-to-r from-amber-50/90 via-white to-amber-50/50 border-[#C6A15B] shadow-sm ring-1 ring-[#C6A15B]/30'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-mono font-extrabold text-sm shadow-2xs ${
                        paso.destacado
                          ? 'bg-[#C6A15B] text-[#0A1F3C] border border-[#8A651E]'
                          : 'bg-[#0A1F3C] text-white'
                      }`}>
                        0{paso.num}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm font-bold text-[#0A1F3C] flex items-center gap-2">
                            <span>{paso.titulo}</span>
                            {paso.destacado && (
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900 border border-amber-300">
                                EMISIÓN OFICIAL
                              </span>
                            )}
                          </h4>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {paso.entidad}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-[#8A651E] font-bold mb-1.5 flex items-center gap-1.5">
                          <span>Responsable:</span>
                          <span className="text-slate-800">{paso.responsable}</span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {paso.descripcion}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 1: 15 PROGRAMAS */}
          {activeTab === 'programas' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar programa, título SNIES o sigla (ej. NAV, CCPIN)..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-sans text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-mono font-bold text-slate-500 shrink-0">Facultad:</span>
                  <select
                    value={facultyFilter}
                    onChange={(e) => setFacultyFilter(e.target.value)}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C] w-full sm:w-auto"
                  >
                    {faculties.map(fac => (
                      <option key={fac} value={fac}>{fac}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredPrograms.map((prog, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-200 hover:border-[#0A1F3C] p-4 rounded-xl shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {prog.facultad}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            prog.nivel === 'Pregrado' ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'bg-purple-50 text-purple-800 border border-purple-200'
                          }`}>
                            {prog.nivel}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                            Sigla: {prog.sigla}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-[#0A1F3C] leading-snug">
                        {prog.nombre}
                      </h3>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-start gap-2">
                        <Award className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Título Oficial Otorgado (SNIES)</span>
                          <span className="text-xs font-extrabold text-[#0A1F3C]">{prog.titulo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                      <span className="font-bold text-slate-600">Buzones autorizados: </span>
                      {prog.correos.map(c => c.replace('@enap.edu.co', '')).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 14 DOCUMENTOS */}
          {activeTab === 'documentos' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <h3 className="text-sm font-bold font-mono uppercase text-[#0A1F3C] tracking-wide">
                    Documentos cargados por el Estudiante (Portal Público - Sin Login)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DOCUMENTOS_EXPEDIENTE.filter(d => d.etapa.includes('Estudiante')).map((doc) => (
                    <div key={doc.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-1.5 py-0.2 rounded uppercase">
                            Carga Estudiante
                          </span>
                          <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 border border-amber-200 px-1.5 py-0.2 rounded">
                            Requiere Aval Jefe
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#0A1F3C] mt-1">{doc.nombre}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{doc.condicion}</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#0A1F3C]"></div>
                  <h3 className="text-sm font-bold font-mono uppercase text-[#0A1F3C] tracking-wide">
                    Documentos cargados y avalados por el Jefe de Programa (Panel Facultades con OTP)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DOCUMENTOS_EXPEDIENTE.filter(d => d.etapa.includes('Jefe')).map((doc) => (
                    <div key={doc.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-indigo-800 bg-indigo-100 border border-indigo-200 px-1.5 py-0.2 rounded uppercase">
                            Jefatura de Programa
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-200 border border-slate-300 px-1.5 py-0.2 rounded">
                            Auto-Avalado al Cargar
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#0A1F3C] mt-1">{doc.nombre}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{doc.condicion}</p>
                      </div>
                      <ShieldCheck className="w-4 h-4 text-[#0A1F3C] shrink-0 mt-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ARTÍCULO 91 (GRADUADO DE HONOR) */}
          {activeTab === 'honor' && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 border-2 border-[#C6A15B]/50 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C6A15B] text-white flex items-center justify-center font-bold">
                    §
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0A1F3C] uppercase tracking-wide">
                      Artículo No. 91 — Reglamento Académico Institucional ENAP
                    </h3>
                    <p className="text-xs text-slate-600">
                      Condiciones obligatorias y simultáneas para el otorgamiento de la distinción solemne <strong>"Graduado de Honor"</strong>.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200">
                    <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">Condición 1</span>
                    <h4 className="text-xs font-bold text-[#0A1F3C] mt-1">Promedio Ponderado Acumulado &gt; 9.5</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">El balance académico oficial debe registrar un promedio superior estricto a 9.50 sobre 10.0.</p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-amber-200">
                    <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">Condición 2</span>
                    <h4 className="text-xs font-bold text-[#0A1F3C] mt-1">Trabajo de Grado con Distinción Aprobada</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">Haber obtenido formalmente la distinción Cum Laude, Magna Cum Laude o Summa Cum Laude evaluada por jurados.</p>
                  </div>
                </div>
              </div>

              {/* Simulador Interactivo */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
                <h4 className="text-xs font-mono font-bold text-[#0A1F3C] uppercase tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                  Simulador en Vivo de Validación de Méritos (Artículo 91)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Promedio Ponderado Acumulado:</label>
                    <input
                      type="text"
                      value={simuladorPromedio}
                      onChange={(e) => setSimuladorPromedio(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#0A1F3C]"
                      placeholder="ej. 9.60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Distinción del Trabajo de Grado:</label>
                    <select
                      value={simuladorDistincion}
                      onChange={(e) => setSimuladorDistincion(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#0A1F3C]"
                    >
                      <option value="Ninguna">Ninguna</option>
                      <option value="Cum Laude">Cum Laude (Pregrado / Posgrado)</option>
                      <option value="Magna Cum Laude">Magna Cum Laude (Posgrado)</option>
                      <option value="Summa Cum Laude">Summa Cum Laude (Posgrado)</option>
                    </select>
                  </div>
                </div>

                {/* Resultado de la evaluación */}
                <div className={`p-4 rounded-xl border-2 transition-all ${
                  esGraduadoDeHonor 
                    ? 'bg-amber-50/80 border-[#C6A15B] text-amber-950'
                    : 'bg-slate-50 border-slate-300 text-slate-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {esGraduadoDeHonor ? (
                      <>
                        <Award className="w-5 h-5 text-[#C6A15B]" />
                        <span className="text-sm font-extrabold uppercase text-[#8A651E]">¡Acreedor a GRADUADO DE HONOR (Art. 91)!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-slate-400" />
                        <span className="text-sm font-bold text-slate-600">No cumple los requisitos simultáneos del Artículo 91</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed mt-1">
                    {esGraduadoDeHonor 
                      ? `De acuerdo con el Artículo No. 91, el estudiante es acreedor de la distinción "Graduado de Honor", por obtener un promedio ponderado de ${numPromedio} (superior a 9.5) y la distinción ${simuladorDistincion} en su trabajo de grado. En el PDF final se imprimirá automáticamente el recuadro protocolario dorado de honor.`
                      : numPromedio <= 9.5 && !tieneDistincion
                        ? `Su promedio es ${numPromedio} (se exige más de 9.5) y su trabajo de grado no tiene distinción aprobada.`
                        : numPromedio > 9.5 && !tieneDistincion
                          ? `Su promedio de ${numPromedio} sí supera 9.5, pero su trabajo de grado no tiene distinción de honor.`
                          : `Tiene la distinción ${simuladorDistincion}, pero su promedio es ${numPromedio} (se exige superior a 9.5).`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ARQUITECTURA DIGITAL */}
          {activeTab === 'arquitectura' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold font-mono text-[#0A1F3C] uppercase tracking-wide">
                  Módulos de Integración Digital del Portal de Titulación ENAP
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  El sistema funciona como una solución integral en Google Apps Script, Google Sheets, Microsoft Graph API y conexión al Sistema Nacional de Información de la Educación Superior (SNIES).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Seguridad OTP 6 Dígitos</span>
                    <h4 className="text-xs font-bold text-[#0A1F3C] mt-1">Acceso Administrativo Seguro</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Acceso sin contraseñas fijas: envío dinámico de código de 6 dígitos con vigencia de 10 minutos al correo institucional del Jefe de Programa o Secretario.</p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Unión por Tandas (pdf-lib)</span>
                    <h4 className="text-xs font-bold text-[#0A1F3C] mt-1">Generación de Expediente PDF</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Ensamblaje automatizado de documentos con portada oficial A4 y unificación por bloques controlados de 3.5 minutos para evitar tiempos de espera excesivos.</p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">Microsoft Graph API</span>
                    <h4 className="text-xs font-bold text-[#0A1F3C] mt-1">Custodia en OneDrive / SharePoint</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Subida particionada en bloques de 5 MB a las carpetas institucionales de SharePoint y OneDrive con nomenclatura: [SIGLA] - [APELLIDOS NOMBRES].pdf.</p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">SNIES / MEN</span>
                    <h4 className="text-xs font-bold text-[#0A1F3C] mt-1">Validación Estadística y Reporte MEN</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Jefatura de Estadística coteja bases contra Registraduría y precarga el reporte técnico de graduados ante el Ministerio de Educación Nacional.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
            <span>Escuela Naval de Cadetes "Almirante Padilla" — Sistema de Gestión de Calidad</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0A1F3C] hover:bg-[#142C4E] text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Cerrar Guía
          </button>
        </div>
      </div>
    </div>
  );
};
