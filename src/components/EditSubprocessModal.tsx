import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Layers, Trash2, Plus, CheckCircle2, FileText } from 'lucide-react';
import { SubProcess } from '../types';

interface EditSubprocessModalProps {
  isOpen: boolean;
  onClose: () => void;
  subProcessData?: SubProcess | null;
  stepCount: number;
  onSave: (updatedSub: SubProcess, isNew: boolean) => void;
  onDelete?: (subId: string) => void;
  isNew?: boolean;
}

export const EditSubprocessModal: React.FC<EditSubprocessModalProps> = ({
  isOpen,
  onClose,
  subProcessData,
  stepCount,
  onSave,
  onDelete,
  isNew = false
}) => {
  const [id, setId] = useState('');
  const [stepNum, setStepNum] = useState<number>(1);
  const [titulo, setTitulo] = useState('');
  const [resumen, setResumen] = useState('');
  const [responsable, setResponsable] = useState('');
  const [queSeHace, setQueSeHace] = useState<string[]>([]);
  const [newItemQueSeHace, setNewItemQueSeHace] = useState('');
  const [queSeNecesita, setQueSeNecesita] = useState<string[]>([]);
  const [newItemQueSeNecesita, setNewItemQueSeNecesita] = useState('');
  const [terminaCuando, setTerminaCuando] = useState('');

  useEffect(() => {
    if (subProcessData && !isNew) {
      setId(subProcessData.id);
      setStepNum(subProcessData.stepNum);
      setTitulo(subProcessData.titulo);
      setResumen(subProcessData.resumen);
      setResponsable(subProcessData.responsable);
      setQueSeHace([...subProcessData.queSeHace]);
      setQueSeNecesita([...subProcessData.queSeNecesita]);
      setTerminaCuando(subProcessData.terminaCuando);
    } else if (isNew) {
      const nextNum = stepCount + 1;
      setId(`Paso ${nextNum}`);
      setStepNum(nextNum);
      setTitulo('');
      setResumen('');
      setResponsable('');
      setQueSeHace(['Actividad principal del paso']);
      setQueSeNecesita(['Requisitos del paso']);
      setTerminaCuando('Criterio de finalización del paso.');
    }
  }, [subProcessData, isNew, stepCount, isOpen]);

  if (!isOpen) return null;

  const handleAddQueSeHace = () => {
    if (newItemQueSeHace.trim()) {
      setQueSeHace([...queSeHace, newItemQueSeHace.trim()]);
      setNewItemQueSeHace('');
    }
  };

  const handleRemoveQueSeHace = (index: number) => {
    setQueSeHace(queSeHace.filter((_, i) => i !== index));
  };

  const handleAddQueSeNecesita = () => {
    if (newItemQueSeNecesita.trim()) {
      setQueSeNecesita([...queSeNecesita, newItemQueSeNecesita.trim()]);
      setNewItemQueSeNecesita('');
    }
  };

  const handleRemoveQueSeNecesita = (index: number) => {
    setQueSeNecesita(queSeNecesita.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    const updated: SubProcess = {
      id: id.trim() || `Paso ${stepNum}`,
      stepNum,
      titulo: titulo.trim(),
      resumen: resumen.trim(),
      responsable: responsable.trim(),
      queSeHace: queSeHace.length > 0 ? queSeHace : ['Actividad requerida'],
      queSeNecesita: queSeNecesita.length > 0 ? queSeNecesita : ['Requisito básico'],
      terminaCuando: terminaCuando.trim() || 'El paso se da por concluido.'
    };

    onSave(updated, isNew);
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
          className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-[#0A1F3C] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0A1F3C] px-6 py-4 text-white flex items-center justify-between border-b border-[#C6A15B]/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#C6A15B]/20 rounded-xl text-[#C6A15B]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">
                  {isNew ? "Nuevo Subproceso / Paso" : `Editar Subproceso: ${titulo || subProcessData?.titulo}`}
                </h3>
                <span className="text-xs text-slate-300">
                  Configure los detalles, actividades y requisitos de este paso
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
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                  ID / Código
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                  placeholder="ej. 1.1"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                  Número de Paso
                </label>
                <input
                  type="number"
                  min={1}
                  value={stepNum}
                  onChange={(e) => setStepNum(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                  Responsable
                </label>
                <input
                  type="text"
                  value={responsable}
                  onChange={(e) => setResponsable(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                  placeholder="ej. Decanatura Académica"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                Título del Subproceso
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C]"
                placeholder="ej. Inscripción del aspirante"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                Resumen del Paso
              </label>
              <textarea
                rows={2}
                value={resumen}
                onChange={(e) => setResumen(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0A1F3C]"
                placeholder="Breve resumen de la etapa..."
                required
              />
            </div>

            {/* Lista: ¿Qué se hace? */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-[#0A1F3C] uppercase mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0A1F3C]" />
                ¿Qué se hace en este paso? (Lista de Actividades)
              </label>

              <div className="space-y-1.5 mb-3">
                {queSeHace.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-700 flex-1">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQueSeHace(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                      title="Eliminar actividad"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemQueSeHace}
                  onChange={(e) => setNewItemQueSeHace(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddQueSeHace();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  placeholder="Escriba nueva actividad y presione Agregar..."
                />
                <button
                  type="button"
                  onClick={handleAddQueSeHace}
                  className="px-3 py-1.5 bg-[#0A1F3C] text-white text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar
                </button>
              </div>
            </div>

            {/* Lista: ¿Qué se necesita? */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-[#0A1F3C] uppercase mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#0A1F3C]" />
                Documentos y Requisitos necesarios
              </label>

              <div className="space-y-1.5 mb-3">
                {queSeNecesita.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-700 flex-1">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQueSeNecesita(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                      title="Eliminar requisito"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemQueSeNecesita}
                  onChange={(e) => setNewItemQueSeNecesita(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddQueSeNecesita();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  placeholder="Escriba nuevo requisito y presione Agregar..."
                />
                <button
                  type="button"
                  onClick={handleAddQueSeNecesita}
                  className="px-3 py-1.5 bg-[#0A1F3C] text-white text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar
                </button>
              </div>
            </div>

            {/* Criterio de Finalización */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1">
                Criterio de Finalización del Paso
              </label>
              <textarea
                rows={2}
                value={terminaCuando}
                onChange={(e) => setTerminaCuando(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0A1F3C]"
                placeholder="Indique la condición bajo la cual este paso se da por concluido..."
                required
              />
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                {!isNew && onDelete && subProcessData && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`¿Está seguro de eliminar el subproceso "${subProcessData.titulo}"?`)) {
                        onDelete(subProcessData.id);
                        onClose();
                      }
                    }}
                    className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar Paso
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
                  {isNew ? "Crear Paso" : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
