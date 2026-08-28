import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, FileText } from 'lucide-react';
import { GeneralMapHeader } from '../types';

interface EditHeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: GeneralMapHeader;
  onSave: (updatedHeader: GeneralMapHeader) => void;
}

export const EditHeaderModal: React.FC<EditHeaderModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave
}) => {
  const [formData, setFormData] = useState<GeneralMapHeader>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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
          className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-[#0A1F3C] overflow-hidden"
        >
          <div className="bg-[#0A1F3C] px-6 py-4 text-white flex items-center justify-between border-b border-[#C6A15B]/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#C6A15B]/20 rounded-xl text-[#C6A15B]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">
                  Editar Encabezado del Mapa General
                </h3>
                <span className="text-xs text-slate-300">
                  Configure los títulos y descripción principal
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

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                Etiqueta Superior (Badge)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                placeholder="ej. Nivel 1 — Flujo Académico Institucional ENAP"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                Título Principal
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-extrabold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                placeholder="ej. Mapa General de Procesos"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                Descripción / Texto explicativo
              </label>
              <textarea
                rows={4}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0A1F3C]"
                placeholder="Descripción del mapa..."
                required
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
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
                Guardar Cambios
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
