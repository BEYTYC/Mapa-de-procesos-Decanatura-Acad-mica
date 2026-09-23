import { AppData, Process, FlowGateData, GeneralMapHeader } from '../types';

export const INITIAL_PROCESOS: Record<string, Process> = {
  "admisiones": {
    "id": "admisiones",
    "codigo": "PROC-01",
    "titulo": "Admisiones",
    "resumen": "Atracción, inscripción, pruebas de selección e incorporación de aspirantes.",
    "descripcion": "Primer eslabón del proceso académico. Abarca desde la promoción de carreras hasta la matrícula oficial de los cadetes.",
    "estado": "borrador",
    "badgeText": "Borrador · por validar",
    "subprocesos": [
      {
        "id": "1.1",
        "stepNum": 1,
        "titulo": "Divulgación y promoción",
        "resumen": "Difusión de la oferta académica militar y naval en colegios y medios.",
        "responsable": "Oficina de Admisiones y Comunicaciones",
        "queSeHace": [
          "Diseño de campañas institucionales vocacionales",
          "Visitas a colegios y ferias vocacionales a nivel nacional",
          "Atención a aspirantes por medios digitales y presenciales"
        ],
        "queSeNecesita": [
          "Calendario de convocatorias",
          "Material publicitario autorizado"
        ],
        "terminaCuando": "Se inicia formalmente la fase de inscripción con la apertura de la plataforma."
      },
      {
        "id": "1.2",
        "stepNum": 2,
        "titulo": "Inscripción del aspirante",
        "resumen": "Radicación de documentos y pago de derechos de inscripción.",
        "responsable": "Aspirante y Oficina de Admisiones",
        "queSeHace": [
          "Diligenciamiento de formulario en línea en el portal web",
          "Pago de derechos de inscripción en tesorería o banco",
          "Cargue digital y verificación inicial de requisitos"
        ],
        "queSeNecesita": [
          "Documento de identidad",
          "Pruebas Saber 11 / ICFES",
          "Comprobante de pago"
        ],
        "terminaCuando": "El aspirante recibe su credencial digital de inscripción con código único."
      },
      {
        "id": "1.3",
        "stepNum": 3,
        "titulo": "Pruebas de selección",
        "resumen": "Evaluaciones académicas, psicotécnicas, médicas y físicas.",
        "responsable": "Jefatura de Selección y Depto. Médico",
        "queSeHace": [
          "Aplicación de exámenes académicos e intelectuales",
          "Evaluación psicológica clínica y psicotécnica",
          "Chequeo médico integral de aptitud psicofísica",
          "Pruebas de aptitud física naval y natación"
        ],
        "queSeNecesita": [
          "Aspirante citado con credencial",
          "Formatos de evaluación médica"
        ],
        "terminaCuando": "Se consolidan los conceptos de 'Apto' o 'No Apto' en el expediente del aspirante."
      },
      {
        "id": "1.4",
        "stepNum": 4,
        "titulo": "Entrevista y junta de selección",
        "resumen": "Valoración personal e institucional por la Junta Admisionadora.",
        "responsable": "Junta de Selección de la ENAP",
        "queSeHace": [
          "Entrevista personal institucional del aspirante",
          "Revisión de perfil psicofísico, académico y antecedentes",
          "Deliberación y asignación de puntajes por la Junta"
        ],
        "queSeNecesita": [
          "Expediente consolidado del aspirante",
          "Acta de citación a junta"
        ],
        "terminaCuando": "La Junta firma el acta formal con la lista ponderada de seleccionados."
      },
      {
        "id": "1.5",
        "stepNum": 5,
        "titulo": "Publicación de admitidos",
        "resumen": "Oficialización del listado de admitidos y citación a incorporación.",
        "responsable": "Decanatura Académica",
        "queSeHace": [
          "Verificación final de cupos autorizados por el Mando Naval",
          "Publicación oficial en el portal web de la ENAP",
          "Notificación individual por correo con instrucciones de ingreso"
        ],
        "queSeNecesita": [
          "Acta firmada por la Junta de Selección",
          "Resolución de aprobación"
        ],
        "terminaCuando": "Se emiten y notifican las cartas formales de admisión."
      },
      {
        "id": "1.6",
        "stepNum": 6,
        "titulo": "Matrícula e incorporación",
        "resumen": "Formalización de ingreso e inicio del periodo de adaptación.",
        "responsable": "Jefatura de Instrucción y Registro Académico",
        "queSeHace": [
          "Revisión de paz y salvo financiero de la matrícula",
          "Firma del compromiso institucional y reglamentos",
          "Ingreso físico del contingente a las instalaciones de la ENAP"
        ],
        "queSeNecesita": [
          "Soportes de pago de matrícula",
          "Póliza de seguro médico",
          "Documentación física"
        ],
        "terminaCuando": "El aspirante sienta plaza oficialmente como Cadete de la ENAP."
      }
    ]
  },
  "formacion": {
    "id": "formacion",
    "codigo": "PROC-02",
    "titulo": "Formación",
    "resumen": "Desarrollo del proyecto educativo curricular, militar, científico y naval.",
    "descripcion": "Segundo eslabón del proceso académico. Gestiona la programación, desarrollo de materias, evaluación continua y acompañamiento al estudiante.",
    "estado": "borrador",
    "badgeText": "Borrador · por validar",
    "subprocesos": [
      {
        "id": "2.1",
        "stepNum": 1,
        "titulo": "Programación académica",
        "resumen": "Asignación de asignaturas, aulas, simuladores y docentes.",
        "responsable": "Decanatura Académica y Directores de Programa",
        "queSeHace": [
          "Definición de horarios teóricos y prácticos del semestre",
          "Asignación de laboratorios, simuladores de navegación y aulas",
          "Publicación del calendario académico semestral"
        ],
        "queSeNecesita": [
          "Malla curricular vigente",
          "Disponibilidad de docentes y espacios"
        ],
        "terminaCuando": "Se aprueba y publica la programación académica del semestre."
      },
      {
        "id": "2.2",
        "stepNum": 2,
        "titulo": "Registro y matrícula académica",
        "resumen": "Inscripción formal de asignaturas por el estudiante.",
        "responsable": "Registro y Control Académico",
        "queSeHace": [
          "Apertura del portal para inscripción de asignaturas",
          "Verificación del cumplimiento de prerrequisitos",
          "Consolidación y entrega de listas de clase a docentes"
        ],
        "queSeNecesita": [
          "Paz y salvo del periodo anterior",
          "Plan de estudios del cadete"
        ],
        "terminaCuando": "El estudiante cuenta con su horario confirmado en el sistema."
      },
      {
        "id": "2.3",
        "stepNum": 3,
        "titulo": "Desarrollo curricular",
        "resumen": "Ejecución de actividades lectivas, laboratorios y navegación.",
        "responsable": "Cuerpo Docente y Jefaturas de Departamento",
        "queSeHace": [
          "Impartición de clases magistrales y talleres prácticos",
          "Prácticas en simuladores navales y maniobras de mar",
          "Atención a tutorías y proyectos de investigación formativa"
        ],
        "queSeNecesita": [
          "Sílabos de asignatura",
          "Aulas y recursos pedagógicos"
        ],
        "terminaCuando": "Se cumplen las semanas reglamentarias del periodo escolar."
      },
      {
        "id": "2.4",
        "stepNum": 4,
        "titulo": "Evaluación y seguimiento",
        "resumen": "Valoración del rendimiento académico y competencias adquiridas.",
        "responsable": "Docentes y Comité de Evaluación Académica",
        "queSeHace": [
          "Aplicación de exámenes parciales, quices y proyectos finales",
          "Cargue periódico de notas en la plataforma institucional",
          "Reporte de alertas tempranas sobre bajo rendimiento"
        ],
        "queSeNecesita": [
          "Criterios de evaluación definidos",
          "Plataforma de notas activa"
        ],
        "terminaCuando": "Se registran y cierran las actas con notas definitivas del semestre."
      },
      {
        "id": "2.5",
        "stepNum": 5,
        "titulo": "Permanencia y acompañamiento",
        "resumen": "Estrategias de tutoría y bienestar pedagógico para estudiantes.",
        "responsable": "Bienestar Naval y Decanatura Académica",
        "queSeHace": [
          "Tutorías académicas de nivelación en áreas complejas",
          "Acompañamiento psicológico y orientación pedagógica",
          "Seguimiento a cadetes en condición de prueba académica"
        ],
        "queSeNecesita": [
          "Alertas tempranas de evaluación",
          "Planes de mejoramiento docente"
        ],
        "terminaCuando": "Se emite el informe semestral de retención y éxito académico."
      },
      {
        "id": "2.6",
        "stepNum": 6,
        "titulo": "Movilidad e internacionalización",
        "resumen": "Intercambios académicos con academias navales internacionales.",
        "responsable": "Oficina de Relaciones Internacionales",
        "queSeHace": [
          "Gestión de convenios marco interinstitucionales",
          "Selección de cadetes para cruceros de instrucción e intercambios",
          "Homologación formal de créditos aprobados en el exterior"
        ],
        "queSeNecesita": [
          "Convenio vigente",
          "Soportes de rendimiento académico"
        ],
        "terminaCuando": "Se expide la resolución de homologación de créditos."
      }
    ]
  },
  "graduacion": {
    "id": "graduacion",
    "codigo": "PROC-03",
    "titulo": "Graduación y Titulación",
    "resumen": "Manual detallado etapa por etapa: desde la apertura de la ceremonia por Secretaría Académica hasta la resolución y entrega de diplomas.",
    "descripcion": "Proceso oficial de diez (10) etapas agrupadas en cuatro (4) fases institucionales: Apertura y radicación, Validación académica, Aprobación institucional y Formalización y cierre.",
    "estado": "documentado",
    "badgeText": "Manual Oficial de Graduación y Titulación ENAP",
    "subprocesos": [
      {
        "id": "Etapa 0",
        "stepNum": 1,
        "fase": "Fase 1 · Apertura y radicación",
        "titulo": "0. Apertura de la ceremonia",
        "resumen": "La Secretaría Académica programa la ceremonia de grados, definiendo la fecha tentativa del evento y la ventana de fechas para radicar solicitudes.",
        "responsable": "Secretaría Académica",
        "queSeHace": [
          "Programación oficial de la ceremonia de grados en el calendario institucional.",
          "Definición de la fecha tentativa del evento y la ventana de fechas para radicación de solicitudes de grado por ceremonia.",
          "Habilitación de la opción 'grado por ceremonia' para los estudiantes en el Portal Estadístico ENAP (intranet institucional o acceso externo en enap.vercel.app).",
          "Mantenimiento permanente de la opción de radicación por ventanilla disponible en todo momento, independiente de la apertura de ceremonia."
        ],
        "queSeNecesita": [
          "Calendario académico institucional aprobado",
          "Portal Estadístico ENAP — módulo de gestión de ceremonias, panel de la Secretaría Académica (SAC)"
        ],
        "terminaCuando": "Ceremonia habilitada y ventana de radicación definida y activa en el sistema.",
        "entradas": ["Calendario académico institucional"],
        "salidas": ["Ceremonia habilitada y ventana de radicación definida en el sistema"],
        "sistemaApoyo": "Portal Estadístico ENAP - módulo de gestión de ceremonias, panel de la Secretaría Académica (SAC)"
      },
      {
        "id": "Etapa 1",
        "stepNum": 2,
        "fase": "Fase 1 · Apertura y radicación",
        "titulo": "1. Radicación de la solicitud",
        "resumen": "El estudiante radica su solicitud, carga documentos según nivel y condición, y autoriza con un clic el tratamiento de datos personales (sin firmas).",
        "responsable": "Estudiante",
        "queSeHace": [
          "Inicio de solicitud de grado por ceremonia (si la fecha vigente lo permite) o por ventanilla (disponible en todo momento).",
          "Diligenciamiento de datos personales y selección de programa académico para determinar nivel (Pregrado o Posgrado).",
          "Cargue digital de documentos de soporte según nivel y condición (Civil o Militar): Cédula/Pasaporte, pago Derechos de Grado, pago Estampilla Procultura, Diploma/Acta anterior, Saber Pro (pregrado) y fotografía formal 3x4 fondo azul (militares: uniforme 3A).",
          "Generación automática por el sistema del formato de autorización de tratamiento de datos personales con la información suministrada.",
          "Aceptación de la autorización de datos por parte del estudiante dando un clic (el estudiante no firma nada, solo le da clic a la autorización de datos).",
          "Recepción de correo de confirmación de radicado institucional con la autorización adjunta."
        ],
        "queSeNecesita": [
          "Cédula de ciudadanía o Pasaporte vigente",
          "Comprobante de Pago de Derechos de Grado",
          "Comprobante de Pago Estampilla Procultura",
          "Diploma o Acta de Grado anterior (Bachiller para Pregrado / Pregrado para Posgrado)",
          "Resultados Pruebas Saber Pro (Pregrado) / Constancias de diplomado, ponencia o producción científica si aplica",
          "Fotografía formal 3x4 fondo azul (militares: en uniforme 3A)",
          "Clic de aceptación a la autorización de tratamiento de datos personales"
        ],
        "terminaCuando": "Solicitud radicada, autorización de tratamiento de datos aceptada con un clic y correo de confirmación de radicado emitido.",
        "entradas": ["Documentos de soporte según nivel y condición", "Datos personales del estudiante"],
        "salidas": ["Solicitud radicada", "Autorización de tratamiento de datos autorizada con un clic", "Correo de confirmación de radicado"],
        "sistemaApoyo": "Portal Estadístico ENAP — módulo de radicación de grados; correo institucional"
      },
      {
        "id": "Etapa 2",
        "stepNum": 3,
        "fase": "Fase 2 · Validación académica",
        "titulo": "2. Validación de programa",
        "resumen": "El Jefe de Programa revisa la documentación radicada del estudiante, solicita ajustes si aplica, completa y carga los documentos institucionales al expediente.",
        "responsable": "Jefe de Programa",
        "queSeHace": [
          "Revisión de la documentación radicada por cada estudiante de su programa y aprobación de lo cargado (o solicitud de ajustes).",
          "Garantía y responsabilidad de que toda la documentación cargada esté correcta y libre de errores.",
          "Elaboración y cargue del Balance Académico (firmado por Jefe de Programa y Decano de la Facultad).",
          "Diligenciamiento del Formato de Calificación de Grado a nivel de programa.",
          "Cargue del Certificado de Promedio Ponderado elaborado por el Jefe de Estadística.",
          "Cargue de la Señal de Certificación de Idioma (emitida por el Centro de Idiomas / CIEN, no el certificado de nivel).",
          "Cargue de la Evaluación de Trabajo de Grado — Anexo 2 (Evaluación 1 y 2 firmadas).",
          "Verificación del Soporte de Paz y Salvo financiera emitido por la Oficina de Tesorería.",
          "Cargue de la Solicitud de Reconocimiento — Evaluador 1 y 2 (aplica únicamente cuando el graduando es meritorio).",
          "Disparo automático de notificación por correo electrónico al Decano de Facultad al aprobar el registro."
        ],
        "queSeNecesita": [
          "Solicitudes radicadas por los estudiantes del programa",
          "Balance Académico firmado por Jefe de Programa y Decano de Facultad",
          "Formato de Calificación de Grado diligenciado",
          "Certificado de Promedio Ponderado (Jefe de Estadística)",
          "Señal de Certificación de Idioma (Centro de Idiomas / CIEN)",
          "Evaluación de Trabajo de Grado — Anexo 2 firmado",
          "Soporte de Paz y Salvo financiera (Tesorería)",
          "Solicitud de Reconocimiento (si el graduando es meritorio)"
        ],
        "terminaCuando": "Registros individuales validados y aprobados a nivel de programa, documentos institucionales completados y notificación automática enviada al Decano de Facultad.",
        "entradas": ["Solicitudes radicadas por los estudiantes del programa"],
        "salidas": ["Registros individuales validados a nivel de programa", "Documentos institucionales del expediente completados", "Notificación automática al Decano de Facultad"],
        "sistemaApoyo": "Portal Estadístico ENAP — módulo de aprobaciones de grado; correo institucional"
      },
      {
        "id": "Etapa 3",
        "stepNum": 4,
        "fase": "Fase 2 · Validación académica",
        "titulo": "3. Revisión y aprobación de facultad",
        "resumen": "El Decano de Facultad revisa el grupo completo de graduandos de su facultad, lo aprueba en bloque con un clic y firma digitalmente el formato de calificación.",
        "responsable": "Decano de Facultad",
        "queSeHace": [
          "Recepción de notificación automática por correo electrónico indicando que el grupo de graduandos de su facultad está listo para revisión.",
          "Revisión del grupo completo de graduandos de su facultad a través del panel ejecutivo del Decano.",
          "Aprobación en bloque con un solo clic, actualizando el estado de las solicitudes a 'Documentación completada'.",
          "Firma digital del formato de calificación de grado correspondiente a su facultad.",
          "Asunción de la responsabilidad de que cada graduando cumple con los requisitos académicos para optar al título.",
          "Envío automático de notificación por correo electrónico al Decano Académico."
        ],
        "queSeNecesita": [
          "Registros aprobados por los jefes de programa de la facultad",
          "Notificación automática por correo electrónico",
          "Panel ejecutivo del Decano en Portal Estadístico ENAP",
          "Firma digital del Decano de Facultad"
        ],
        "terminaCuando": "Grupo de graduandos de la facultad aprobado en bloque, formato de calificación de grado firmado digitalmente y notificación enviada al Decano Académico.",
        "entradas": ["Registros aprobados por los jefes de programa de la facultad", "Notificación por correo electrónico"],
        "salidas": ["Grupo de graduandos de la facultad aprobado", "Formato de calificación de grado de facultad firmado digitalmente", "Notificación automática al Decano Académico"],
        "sistemaApoyo": "Portal Estadístico ENAP — panel ejecutivo del Decano; correo electrónico institucional"
      },
      {
        "id": "Etapa 4",
        "stepNum": 5,
        "fase": "Fase 2 · Validación académica",
        "titulo": "4. Validación y firma del Decano Académico",
        "resumen": "El Decano Académico revisa el consolidado institucional de graduandos de todas las facultades, aprueba en bloque con un clic y firma digitalmente a nivel institucional.",
        "responsable": "Decano Académico",
        "queSeHace": [
          "Recepción de notificación automática por correo indicando que hay un grupo consolidado a nivel institucional listo para revisión.",
          "Revisión del grupo completo de graduandos de toda la institución (consolidado de todas las facultades).",
          "Aprobación en bloque institucional con un solo clic, actualizando el estado a 'Documentación completada' a nivel institucional.",
          "Firma digital del formato de calificación de grado a nivel institucional consolidado.",
          "Envío automático de notificación por correo electrónico al Secretario Académico para dar inicio a la aprobación institucional."
        ],
        "queSeNecesita": [
          "Grupos de graduandos aprobados y firmados por los respectivos Decanos de Facultad",
          "Notificación automática por correo electrónico",
          "Panel ejecutivo del Decano Académico en Portal Estadístico ENAP",
          "Firma digital institucional del Decano Académico"
        ],
        "terminaCuando": "Grupo de graduandos de toda la institución aprobado, formato de calificación de grado institucional firmado digitalmente y notificación enviada al Secretario Académico.",
        "entradas": ["Grupos de graduandos aprobados y firmados por los respectivos Decanos de Facultad", "Notificación automática por correo"],
        "salidas": ["Grupo de graduandos de toda la institución aprobado", "Formato de calificación institucional firmado digitalmente", "Notificación automática al Secretario Académico"],
        "sistemaApoyo": "Portal Estadístico ENAP — panel ejecutivo del Decano Académico; correo electrónico institucional"
      },
      {
        "id": "Etapa 5",
        "stepNum": 6,
        "fase": "Fase 3 · Aprobación institucional",
        "titulo": "5. Validación institucional",
        "resumen": "El Secretario Académico verifica carpetas digitales completas y formatos firmados, generando el reporte y solicitando sesión formal al Consejo Académico.",
        "responsable": "Secretario Académico",
        "queSeHace": [
          "Verificación de que las carpetas digitales de cada graduando contengan la documentación completa (sin revalidar requisitos académicos ya asumidos por Decanaturas).",
          "Verificación de que el Formato de Calificación de Grado esté firmado digitalmente para cada estudiante por las instancias previas.",
          "Aprobación o devolución formal de solicitudes incompletas.",
          "Generación del reporte descargable con información consolidada de cada graduando (tipo de grado, nombres, apellidos, sexo, cédula/pasaporte, programa, título, fecha de grado y promedio).",
          "Elaboración del formato oficial de presentación para el Consejo Académico.",
          "Solicitud formal al Consejo Académico para programar la sesión de aprobación del listado."
        ],
        "queSeNecesita": [
          "Grupo de graduandos aprobado por el Decano Académico con formato de calificación firmado",
          "Notificación automática por correo electrónico",
          "Reporte descargable consolidado del Portal Estadístico ENAP",
          "Formato de presentación para el Consejo Académico"
        ],
        "terminaCuando": "Reporte de graduandos generado, formato de presentación elaborado y sesión formal solicitada al Consejo Académico.",
        "entradas": ["Grupo de graduandos aprobado por el Decano Académico", "Formatos de calificación de grado firmados"],
        "salidas": ["Reporte de graduandos", "Formato de presentación al Consejo Académico", "Solicitud formal de sesión al Consejo Académico"],
        "sistemaApoyo": "Portal Estadístico ENAP; correo institucional"
      },
      {
        "id": "Etapa 6",
        "stepNum": 7,
        "fase": "Fase 3 · Aprobación institucional",
        "titulo": "6. Aprobación del Consejo Académico",
        "resumen": "El Consejo Académico revisa y aprueba formalmente en sesión el listado de graduandos presentado por la Secretaría Académica, autorizando el cierre académico.",
        "responsable": "Consejo Académico (Secretario Académico como Secretario)",
        "queSeHace": [
          "Instalación de la sesión formal del Consejo Académico con quórum reglamentario.",
          "Presentación del listado formal de graduandos y expedientes por parte de la Secretaría Académica.",
          "Revisión y deliberación institucional de los candidatos postulados por las facultades.",
          "Aprobación formal en sesión del listado de graduandos, autorizando el cierre académico del proceso de grado.",
          "Elaboración y suscripción del Acta de Aprobación del Consejo Académico por parte del Secretario Académico."
        ],
        "queSeNecesita": [
          "Reporte de graduandos y formato de presentación de la Secretaría Académica",
          "Sesión formal con quórum estatutario del Consejo Académico",
          "Libro de actas institucionales"
        ],
        "terminaCuando": "Acta de aprobación del Consejo Académico elaborada y suscrita, autorizando el cierre académico del proceso.",
        "entradas": ["Reporte de graduandos y formato de presentación de la Secretaría Académica"],
        "salidas": ["Acta de aprobación del Consejo Académico elaborada por el Secretario Académico"],
        "sistemaApoyo": "Sesión formal del Consejo Académico"
      },
      {
        "id": "Etapa 7",
        "stepNum": 8,
        "fase": "Fase 4 · Formalización y cierre",
        "titulo": "7. Gestión de cierre",
        "resumen": "Jefe de Estadística actualiza el sistema a 'Aprobado', envía correos de felicitación y acceso, actualiza SharePoint, gestiona firmas en Xertify y reporta a SNIES.",
        "responsable": "Jefe de Estadística",
        "queSeHace": [
          "Actualización del estado del registro a 'Aprobado por Consejo Académico' en el Portal Estadístico ENAP con acta en mano.",
          "Disparo automático del correo institucional de felicitación e invitación a la ceremonia de grado a cada estudiante.",
          "Envío automático de correo a los jefes de programa y decanos informando que los grados fueron aprobados y habilitándoles acceso para descargar documentos individuales.",
          "Integración y actualización de la información consolidada en el libro de graduados en SharePoint.",
          "Generación del reporte oficial para el cargue de variables en el SNIES del Ministerio de Educación Nacional.",
          "Gestión del trámite interno para emisión del diploma mediante el aplicativo Xertify para recolección de todas las firmas digitales requeridas."
        ],
        "queSeNecesita": [
          "Acta formal de aprobación del Consejo Académico",
          "Portal Estadístico ENAP",
          "Libro de graduados en SharePoint",
          "Aplicativo Xertify de diplomas digitales",
          "Plataforma SNIES del Ministerio de Educación Nacional"
        ],
        "terminaCuando": "Estado del registro actualizado a 'Aprobado por Consejo Académico', correos automáticos enviados, SharePoint y SNIES actualizados y firmas digitales gestionadas en Xertify.",
        "entradas": ["Acta de aprobación del Consejo Académico"],
        "salidas": [
          "Estado del registro actualizado a 'Aprobado por Consejo Académico'",
          "Correo de felicitación e invitación a la ceremonia enviado a los estudiantes",
          "Correo a jefes de programa y decanos con acceso a descarga de documentos",
          "Libro de graduados actualizado en SharePoint",
          "Firmas digitales gestionadas en Xertify",
          "Reporte oficial para el cargue al SNIES"
        ],
        "sistemaApoyo": "Portal Estadístico ENAP; SharePoint; Xertify; correo institucional; SNIES"
      },
      {
        "id": "Etapa 8",
        "stepNum": 9,
        "fase": "Fase 4 · Formalización y cierre",
        "titulo": "8. Resolución de grado",
        "resumen": "La Secretaría Académica elabora y expide la resolución de grado: acto administrativo formal que reconoce y otorga el título académico a cada graduando.",
        "responsable": "Secretaría Académica",
        "queSeHace": [
          "Consolidación de la información validada y aprobada en las etapas 4 a 7.",
          "Verificación del respaldo formal en los formatos de calificación de grado firmados por Jefe de Programa, Decano de Facultad y Decano Académico.",
          "Redacción, sustentación y expedición de la Resolución de Grado institucional.",
          "Promulgación oficial del acto administrativo formal que reconoce y otorga el título académico a cada graduando."
        ],
        "queSeNecesita": [
          "Información validada y aprobada en las etapas 4 a 7",
          "Formatos de calificación de grado firmados por las tres instancias",
          "Marco normativo y numeración oficial de resoluciones de la ENAP"
        ],
        "terminaCuando": "Resolución de grado oficial expedida, numerada y firmada como acto administrativo formal vinculante.",
        "entradas": ["Información validada y aprobada en las etapas 4 a 7", "Formatos de calificación de grado firmados"],
        "salidas": ["Resolución de grado"],
        "sistemaApoyo": "Secretaría Académica"
      },
      {
        "id": "Etapa 9",
        "stepNum": 10,
        "fase": "Fase 4 · Formalización y cierre",
        "titulo": "9. Impresión y entrega de diplomas",
        "resumen": "El Jefe de Estadística imprime diplomas con firmas en Xertify; Secretaría Académica entrega en ceremonia y remite no reclamados mediante Señal para entrega directa.",
        "responsable": "Jefe de Estadística (impresión) — Secretaría Académica (entrega)",
        "queSeHace": [
          "Impresión de los diplomas de cada graduando por el Jefe de Estadística una vez expedida la resolución y reunidas todas las firmas digitales necesarias en Xertify.",
          "Entrega física solemne de los diplomas a cada graduando durante la ceremonia de grado, a cargo de la Secretaría Académica.",
          "Identificación y custodia de los diplomas de los graduandos que no fueron entregados en la ceremonia.",
          "Remisión de los diplomas no reclamados por parte de la Secretaría Académica a la Oficina de Estadística mediante una Señal interna institucional.",
          "Entrega directa posterior de diplomas no reclamados al graduando por parte de la Oficina de Estadística, con lo cual se cierra formalmente el proceso."
        ],
        "queSeNecesita": [
          "Resolución de grado expedida",
          "Firmas digitales completas gestionadas a través de Xertify",
          "Ceremonia oficial de grado",
          "Formato institucional de Señal de entrega"
        ],
        "terminaCuando": "Diplomas entregados en ceremonia por Secretaría Académica o entregados directamente por Oficina de Estadística mediante Señal, cerrando formalmente el proceso.",
        "entradas": ["Resolución de grado", "Firmas digitales gestionadas en Xertify"],
        "salidas": [
          "Diplomas impresos",
          "Diplomas entregados en ceremonia",
          "Señal de entrega de diplomas no reclamados en ceremonia, remitidos a la Oficina de Estadística"
        ],
        "sistemaApoyo": "Plataforma Xertify (impresión); ceremonia de grado (entrega); Oficina de Estadística (entrega posterior de diplomas no reclamados)"
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
  descripcion: "Oficiales y civiles graduados con título profesional y formación militar naval acreditada.",
  pie: "Proceso Completo"
};

export const INITIAL_HEADER_NIVEL_1: GeneralMapHeader = {
  badge: "Flujo Académico Institucional ENAP",
  titulo: "Mapa General de Procesos",
  descripcion: "Secuencia directa desde la Entrada de Aspirantes, a través de los Procesos Académicos, hasta la Salida de Egresados. Haga clic en cualquiera de los procesos para explorar sus subprocesos."
};

export const INITIAL_APP_DATA: AppData = {
  procesos: INITIAL_PROCESOS,
  entrada: INITIAL_ENTRADA,
  salida: INITIAL_SALIDA,
  headerNivel1: INITIAL_HEADER_NIVEL_1
};
