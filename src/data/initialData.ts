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
    titulo: "Graduación y Titulación",
    resumen: "Protocolo oficial del Portal de Titulación ENAP: desde la solicitud del estudiante hasta la emisión de diplomas por Estadística y la entrega en ceremonia solemne.",
    descripcion: "Tercer eslabón culminante del proceso académico de la ENAP. Flujo oficial estructurado en seis etapas secuenciales obligatorias según el Protocolo Institucional de Grados y Diplomas.",
    estado: "documentado",
    badgeText: "Protocolo Oficial ENAP",
    subprocesos: [
      {
        id: "3.1",
        stepNum: 1,
        titulo: "1. Solicitud de titulación por el estudiante",
        resumen: "El estudiante radica su solicitud formal en línea adjuntando datos de filiación, autorización de datos y documentos obligatorios.",
        responsable: "Estudiante / Candidato a Grado",
        queSeHace: [
          "Ingreso al Portal Público de Titulación ENAP y selección del programa académico oficial.",
          "Diligenciamiento de datos de filiación, lugar de expedición del documento y autorización de tratamiento de datos personales.",
          "Cargue digital de los documentos en formato PDF (máximo 15 MB por archivo): cédula al 150%, comprobantes de pago de derechos y estampilla, diploma anterior y Saber Pro si aplica.",
          "Generación automática del código de radicado institucional único (formato SG-AAAAMMDD-HHMMSS).",
          "Recepción de confirmación por correo electrónico y notificación a la facultad respectiva para inicio de trámite."
        ],
        queSeNecesita: [
          "Documento de Identidad (ambas caras ampliado al 150%)",
          "Comprobante de Pago de Derechos de Grado",
          "Comprobante de Pago Estampilla Procultura",
          "Diploma o Acta de Grado Anterior (Bachiller para Pregrado / Pregrado para Posgrado)",
          "Resultados Pruebas Saber Pro / TyT (Pregrado)",
          "Constancia de Diplomado (si aplica)",
          "Autorización formal de tratamiento de datos personales"
        ],
        terminaCuando: "El estudiante recibe su número de radicado SG-... y el expediente queda en estado 'Radicada por el estudiante'."
      },
      {
        id: "3.2",
        stepNum: 2,
        titulo: "2. Aprobación y complemento de información por Jefatura de Programa",
        resumen: "El jefe de programa aprueba la solicitud, audita el plan de estudios, completa los documentos institucionales y otorga avales individuales.",
        responsable: "Jefe de Programa Académico",
        queSeHace: [
          "Ingreso al Panel de Facultades mediante código de seguridad OTP de 6 dígitos enviado al correo institucional.",
          "Auditoría académica integral: validación del 100% de créditos aprobados y cumplimiento de requisitos curriculares (inglés CIEN, bienestar).",
          "Cargue y complemento de la información institucional: Balance Académico, Formato de Calificación de Grado, Certificado de Promedio y Actas de Sustentación (Anexo 2).",
          "Revisión y emisión obligatoria de aval individual para cada documento del expediente.",
          "Verificación de méritos para el Artículo 91 (Graduado de Honor: Promedio > 9.5 y distinción en trabajo de grado).",
          "Unificación del expediente en PDF con portada oficial A4 y ejecución de la acción 'Solicitar Titulación'."
        ],
        queSeNecesita: [
          "Balance Académico oficial con 100% de créditos culminados",
          "Formato oficial de Calificación de Grado",
          "Certificado de Promedio Ponderado Acumulado",
          "Certificación de Idioma Extranjero (Inglés / CIEN)",
          "Evaluación de Trabajo de Grado — Anexo 2 (Evaluadores 1 y 2)",
          "Solicitud de Reconocimiento / Distinción (si aplica)",
          "Código OTP de autenticación institucional"
        ],
        terminaCuando: "El expediente queda 100% completado, avalado, unificado en PDF con respaldo en OneDrive y enviado a Secretaría Académica."
      },
      {
        id: "3.3",
        stepNum: 3,
        titulo: "3. Validación de solicitudes y trámite ante Comité de Decanos y Consejo Académico",
        resumen: "El Secretario Académico valida las solicitudes completas y tramita la sustentación ante el Comité de Decanos y Consejo Académico.",
        responsable: "Secretario Académico",
        queSeHace: [
          "Recepción y validación jurídica y académica de todas las solicitudes en estado 'Completa' enviadas por las facultades.",
          "Verificación de los expedientes unificados en PDF, comprobación de paz y salvos y ordenación institucional.",
          "Convocatoria y presentación del consolidado de aspirantes a grado ante el Comité de Decanos de Facultad.",
          "Sustanciación y radicación del orden del día formal para la sesión del Consejo Académico.",
          "Estructuración del proyecto de Resolución de Grado con el listado definitivo de graduandos y distinciones postuladas."
        ],
        queSeNecesita: [
          "Expedientes consolidados en estado 'Completa' de todas las facultades",
          "Informes de aval de las decanaturas",
          "Bases de datos de aspirantes a grado",
          "Proyecto de orden del día y proyecto de Resolución de Grado"
        ],
        terminaCuando: "El Secretario Académico radica los expedientes validados y el proyecto de resolución en el orden del día del Consejo Académico."
      },
      {
        id: "3.4",
        stepNum: 4,
        titulo: "4. Aprobación de grados por el Consejo Académico",
        resumen: "El Consejo Académico sesiona, delibera, aprueba los grados y promulga la Resolución de Grado oficial de la ENAP.",
        responsable: "Consejo Académico (Presidido por el Director ENAP)",
        queSeHace: [
          "Instalación de la sesión del Consejo Académico presidida por el señor Contralmirante Director de la ENAP.",
          "Revisión y deliberación de los candidatos postulados por las facultades y sustentados por el Secretario Académico.",
          "Votación formal y aprobación unánime de los títulos académicos a otorgar en los programas de pregrado y posgrado.",
          "Aprobación formal de las distinciones académicas (Cum Laude, Magna Cum Laude, Summa Cum Laude y Graduado de Honor Art. 91).",
          "Emisión, firma y promulgación de la Resolución de Grado de la ENAP como acto administrativo legal vinculante."
        ],
        queSeNecesita: [
          "Expedientes completos avalados por el Comité de Decanos",
          "Actas de sustentación y conceptos de honor",
          "Quórum reglamentario del Consejo Académico",
          "Proyecto de Resolución de Grado"
        ],
        terminaCuando: "Queda firmada y promulgada la Resolución de Grado de la Escuela Naval de Cadetes 'Almirante Padilla'."
      },
      {
        id: "3.5",
        stepNum: 5,
        titulo: "5. Registro institucional y emisión de diplomas por la Oficina de Estadística",
        resumen: "La Oficina de Estadística registra a los graduandos en los sistemas y en el SNIES del MEN, caligrafía y emite los diplomas y actas oficiales.",
        responsable: "Oficina de Estadística y Registro",
        queSeHace: [
          "Recepción de la Resolución de Grado promulgada y depuración final de datos de filiación contra Registraduría Nacional.",
          "Registro institucional de los graduandos y precargue oficial de variables en el Sistema Nacional de Información de la Educación Superior (SNIES) del MEN.",
          "Emisión de los diplomas de grado oficiales en cartulinas institucionales con hologramas, medidas de seguridad y sellos de agua.",
          "Elaboración y emisión de las Actas de Grado individuales foliadas según el Libro General de Grados.",
          "Gestión del caligrafiado protocolario y recolección de las firmas autógrafas del Mando Naval (Director ENAP, Decano Académico y Secretario Académico).",
          "Entrega formal de los diplomas y actas emitidos a la Secretaría Académica para custodia protocolaria previa a la ceremonia."
        ],
        queSeNecesita: [
          "Resolución de Grado oficial aprobada y firmada",
          "Cartulinas oficiales de diplomas institucionales con sellos de seguridad y holograma",
          "Plataforma SNIES del Ministerio de Educación Nacional",
          "Libro General de Grados de la ENAP",
          "Firmas autógrafas del Director de la ENAP, Decano Académico y Secretario Académico"
        ],
        terminaCuando: "Los diplomas y actas de grado están emitidos, caligrafiados, firmados por las tres autoridades y entregados para ceremonia."
      },
      {
        id: "3.6",
        stepNum: 6,
        titulo: "6. Entrega solemne de diplomas en ceremonia militar y académica",
        resumen: "El Secretario Académico coordina la ceremonia militar y académica, da lectura a la resolución y efectúa la entrega de diplomas a los graduados.",
        responsable: "Secretario Académico (con el Mando Naval)",
        queSeHace: [
          "Coordinación y ejecución de la solemne Ceremonia Militar y Académica de Graduación con honores navales en el Campo de Paradas / Aula Máxima.",
          "Lectura solemne de la Resolución de Grado y del Acta General por parte del Secretario Académico.",
          "Toma del juramento profesional y militar a los graduandos.",
          "Entrega personal de diplomas y actas de grado por parte del Director de la ENAP y autoridades académicas.",
          "Imposición de medallas y entrega de reconocimientos especiales a los 'Graduados de Honor' (Artículo 91).",
          "Firma de la planilla oficial de entrega y constancia de recepción de títulos por cada graduado ante la Secretaría Académica.",
          "Cierre definitivo de historias académicas y reporte final de graduados consolidados en el SNIES del MEN."
        ],
        queSeNecesita: [
          "Diplomas y actas oficiales emitidos por la Oficina de Estadística",
          "Guión protocolario naval militar y orden del día",
          "Medallas y distintivos de honor",
          "Planilla oficial de firmas de entrega y recepción de diplomas",
          "Sello seco institucional"
        ],
        terminaCuando: "Cada graduado firma la recepción de su diploma, adquiere formalmente la calidad de Egresado/Titulado y se cierra el ciclo de titulación."
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
