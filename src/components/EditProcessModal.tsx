import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Box, Trash2, Plus } from 'lucide-react';
import { Process } from '../types';

interface EditProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  processData?: Process | null;
  onSave: (processKey: string, updatedProcess: Process) => void;
  onDelete?: (processKey: string) => void;
  isNew?: boolean;
}

export const EditProcessModal: React.FC<EditProcessModalProps> = ({
  isOpen,
  onClose,
  processData,
  onSave,
  onDelete,
  isNew = false
}) => {
  const [key, setKey] = useState('');
  const [codigo, setCodigo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [resumen, setResumen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState<'borrador' | 'documentado'>('documentado');
  const [badgeText, setBadgeText] = useState('Proceso documentado');

  useEffect(() => {
    if (processData && !isNew) {
      setKey(processData.id);
      setCodigo(processData.codigo);
      setTitulo(processData.titulo);
      setResumen(processData.resumen);
      setDescripcion(processData.descripcion);
      setEstado(processData.estado);
      setBadgeText(processData.badgeText);
    } else if (isNew) {
      const randomId = `proc_${Date.now()}`;
      setKey(randomId);
      setCodigo('PROC-NEW');
      setTitulo('');
      setResumen('');
      setDescripcion('');
      setEstado('documentado');
      setBadgeText('Proceso documentado');
    }
  }, [processData, isNew, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    const finalKey = isNew 
      ? (key.trim().toLowerCase().replace(/\s+/g, '_') || `proc_${Date.now()}`)
      : (processData?.id || key);

    const updatedProcess: Process = {
      id: finalKey,
      codigo: codigo || 'PROC-01',
      titulo: titulo.trim(),
      resumen: resumen.trim(),
      descripcion: descripcion.trim(),
      estado,
      badgeText: badgeText.trim() || (estado === 'documentado' ? 'Proceso documentado' : 'Borrador · por validar'),
      subprocesos: processData?.subprocesos && !isNew ? processData.subprocesos : [
        {
          id: "1.1",
          stepNum: 1,
          titulo: "Inicio de actividades",
          resumen: "Primer paso del nuevo proceso.",
          responsable: "Responsable asignado",
          queSeHace: ["Ejecución de actividades iniciales"],
          queSeNecesita: ["Documentación y soportes iniciales"],
          terminaCuando: "Se completa satisfactoriamente el primer hito."
        }
      ]
    };

    onSave(finalKey, updatedProcess);
    onClose();
  };

  const handleDelete = () => {
    if (!processData || !onDelete) return;
    if (window.confirm(`¿Está seguro de eliminar la caja de proceso "${processData.titulo}" y todos sus subprocesos?`)) {
      onDelete(processData.id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border-2 border-[#0A1F3C] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0A1F3C] px-6 py-4 text-white flex items-center justify-between border-b border-[#C6A15B]/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#C6A15B]/20 rounded-xl text-[#C6A15B]">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">
                  {isNew ? "Nueva Caja de Proceso" : `Editar Proceso: ${titulo || processData?.titulo}`}
                </h3>
                <span className="text-xs text-slate-300">
                  Configure los textos de la caja principal
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                  Título del Proceso
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                  placeholder="ej. Admisiones, Formación, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                  Código Identificador
                </label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                  placeholder="ej. PROC-01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                Resumen Breve (Visible en la Tarjeta/Caja)
              </label>
              <textarea
                rows={2}
                value={resumen}
                onChange={(e) => setResumen(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0A1F3C]"
                placeholder="Breve resumen del objetivo de este proceso..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                Descripción Detallada (Visible en el Nivel 2)
              </label>
              <textarea
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0A1F3C]"
                placeholder="Descripción completa del alcance y responsabilidades del proceso..."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                  Estado Institucional
                </label>
                <select
                  value={estado}
                  onChange={(e) => {
                    const newEst = e.target.value as 'borrador' | 'documentado';
                    setEstado(newEst);
                    setBadgeText(newEst === 'documentado' ? 'Proceso documentado' : 'Borrador · por validar');
                  }}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                >
                  <option value="documentado">Documentado</option>
                  <option value="borrador">Borrador / Por validar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                  Texto del Badge de Estado
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0A1F3C]"
                  placeholder="ej. Proceso documentado"
                />
              </div>
            </div>

            {/* Footer con Botones */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                {!isNew && onDelete && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar Caja
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0A1F3C] hover:bg-[#102A50] text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-2 border border-[#C6A15B]/50 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#C6A15B]" />
                  {isNew ? "Crear Proceso" : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
