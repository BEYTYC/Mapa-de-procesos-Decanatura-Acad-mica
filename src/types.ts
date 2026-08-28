/**
 * Tipos de datos para el Mapa de Procesos de la Decanatura Académica ENAP
 */

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

export interface FlowGateData {
  tag: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  pie: string;
}

export interface GeneralMapHeader {
  badge: string;
  titulo: string;
  descripcion: string;
}

export interface AppData {
  procesos: Record<string, Process>;
  entrada: FlowGateData;
  salida: FlowGateData;
  headerNivel1: GeneralMapHeader;
}
