import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, User, Eye, EyeOff, X, KeyRound, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const ADMIN_PASSWORD = "Enap2026**";

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === ADMIN_PASSWORD) {
      setError(null);
      setPassword('');
      onSuccessLogin();
    } else {
      setError('Contraseña incorrecta. Verifique sus credenciales de administrador.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-[#0A1F3C] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0A1F3C] px-6 py-5 text-white flex items-center justify-between border-b border-[#C6A15B]/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#C6A15B]/20 border border-[#C6A15B]/50 rounded-xl text-[#C6A15B]">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight flex items-center gap-2">
                  Acceso de Administrador
                  <span className="text-[10px] font-mono text-[#C6A15B] bg-[#C6A15B]/15 px-2 py-0.5 rounded-full">
                    ENAP
                  </span>
                </h3>
                <p className="text-xs text-slate-300">
                  Edición y configuración de textos y cajas
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1.5">
                Usuario
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C] focus:ring-1 focus:ring-[#0A1F3C]"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1F3C] uppercase mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-[#0A1F3C] focus:outline-none focus:border-[#0A1F3C] focus:ring-1 focus:ring-[#0A1F3C]"
                  placeholder="Ingrese contraseña de admin..."
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0A1F3C] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0A1F3C] hover:bg-[#102A50] text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-2 border border-[#C6A15B]/50 transition-all hover:shadow-lg cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                Iniciar Sesión Admin
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
