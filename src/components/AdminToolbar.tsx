import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  Edit3, 
  Download, 
  Upload, 
  RotateCcw, 
  LogOut, 
  Check, 
  HelpCircle,
  FileJson
} from 'lucide-react';
import { AppData } from '../types';

interface AdminToolbarProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onLogout: () => void;
  appData: AppData;
  onRestoreDefaults: () => void;
  onImportData: (data: AppData) => void;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({
  isEditMode,
  onToggleEditMode,
  onLogout,
  appData,
  onRestoreDefaults,
  onImportData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `enap_mapa_procesos_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.procesos && parsed.entrada && parsed.salida) {
            onImportData(parsed as AppData);
            alert('¡Configuración importada exitosamente!');
          } else {
            alert('El archivo no contiene la estructura válida de mapa de procesos ENAP.');
          }
        } catch {
          alert('Error al leer el archivo JSON.');
        }
      };
    }
  };

  return (
    <div className="bg-[#0A1F3C] text-white border-b-2 border-[#C6A15B] px-4 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md z-40 relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Info de Administrador */}
      <div className="flex items-center gap-2.5">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-200">
          <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
          <span>ADMINISTRADOR ACTIVO</span>
        </div>
        <span className="hidden sm:inline text-slate-400 text-xs">|</span>
        <span className="hidden md:inline text-[11px] text-slate-300 font-medium">
          Cambios sincronizados automáticamente
        </span>
      </div>

      {/* Controles de Acción */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Toggle de Modo Edición */}
        <button
          onClick={onToggleEditMode}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
            isEditMode 
              ? "bg-[#C6A15B] text-[#0A1F3C] border-[#C6A15B] shadow-sm font-extrabold" 
              : "bg-white/10 text-slate-200 border-white/20 hover:bg-white/20"
          }`}
          title="Activar/desactivar botones de edición en todas las cajas y textos"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Modo Edición: {isEditMode ? "ACTIVADO" : "DESACTIVADO"}</span>
        </button>

        {/* Exportar JSON */}
        <button
          onClick={handleExportJSON}
          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Descargar copia de seguridad en JSON"
        >
          <Download className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span className="hidden sm:inline">Exportar</span>
        </button>

        {/* Importar JSON */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Cargar copia de seguridad desde JSON"
        >
          <Upload className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span className="hidden sm:inline">Importar</span>
        </button>

        {/* Restablecer Valores Iniciales */}
        <button
          onClick={() => {
            if (window.confirm('¿Está seguro de restablecer todos los textos y cajas a los valores iniciales de fábrica de la ENAP?')) {
              onRestoreDefaults();
            }
          }}
          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Restablecer textos a configuración por defecto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Restablecer</span>
        </button>

        {/* Cerrar Sesión */}
        <button
          onClick={onLogout}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600/90 hover:bg-rose-700 text-white border border-rose-500 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ml-1"
          title="Cerrar sesión de administrador"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Salir</span>
        </button>
      </div>
    </div>
  );
};
