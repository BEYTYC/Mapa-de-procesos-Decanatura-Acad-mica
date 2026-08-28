import { AppData, Process, FlowGateData, GeneralMapHeader } from '../types';

export const INITIAL_PROCESOS: Record<string, Process> = {
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

export const INITIAL_ENTRADA: FlowGateData = {
  tag: "ORIGEN",
  titulo: "ENTRADA",
  subtitulo: "Aspirantes",
  descripcion: "Jóvenes bachilleres y profesionales postulados para la carrera naval militar.",
  pie: "Punto de Inicio"
};

export const INITIAL_SALIDA: FlowGateData = {
  tag: "DESTINO FINAL",
  titulo: "SALIDA",
  subtitulo: "Egresados ENAP",
  descripcion: "Oficiales graduados con título profesional y formación militar naval acreditada.",
  pie: "Proceso Completo"
};

export const INITIAL_HEADER_NIVEL_1: GeneralMapHeader = {
  badge: "Nivel 1 — Flujo Académico Institucional ENAP",
  titulo: "Mapa General de Procesos",
  descripcion: "Secuencia directa desde la Entrada de Aspirantes, a través de los Procesos Académicos, hasta la Salida de Egresados. Haga clic en cualquiera de los procesos para explorar sus subprocesos."
};

export const INITIAL_APP_DATA: AppData = {
  procesos: INITIAL_PROCESOS,
  entrada: INITIAL_ENTRADA,
  salida: INITIAL_SALIDA,
  headerNivel1: INITIAL_HEADER_NIVEL_1
};
