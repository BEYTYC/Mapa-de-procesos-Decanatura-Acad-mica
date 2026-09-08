/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight,
  ArrowDown,
  CornerDownLeft,
  User, 
  FileText,
  CheckCircle2,
  Box,
  Layers,
  Sparkles,
  Menu,
  X,
  Search,
  ChevronDown,
  Compass,
  Award,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Lock,
  Edit3,
  Plus
} from 'lucide-react';
import { cn } from './lib/utils';
import { AppData, Process, SubProcess, FlowGateData, GeneralMapHeader } from './types';
import { INITIAL_APP_DATA } from './data/initialData';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminToolbar } from './components/AdminToolbar';
import { EditGateModal } from './components/EditGateModal';
import { EditProcessModal } from './components/EditProcessModal';
import { EditSubprocessModal } from './components/EditSubprocessModal';
import { EditHeaderModal } from './components/EditHeaderModal';
import { ProtocoloTitulacionModal } from './components/ProtocoloTitulacionModal';

// --- Fondo Institucional con Marca de Agua Protocolaria ---
const ProtocolBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F4F6F9]">
    {/* Fondo base con sutil degradado institucional */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.95)_0%,rgba(244,246,249,0.85)_55%,rgba(228,235,244,0.75)_100%)]" />

    {/* Marca de agua central ENAP: grande y transparente como estaba antes */}
    <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
      <img 
        src="https://i.ibb.co/p6wfvf20/logo.png" 
        alt="" 
        className="w-[850px] h-[850px] md:w-[1050px] md:h-[1050px] lg:w-[1300px] lg:h-[1300px] max-w-none object-contain opacity-[0.035] select-none"
      />
    </div>
  </div>
);

export default function App() {
  // App Data State (persisted in localStorage)
  const [appData, setAppData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem('enap_mapa_procesos_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.procesos && parsed.entrada && parsed.salida) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    return INITIAL_APP_DATA;
  });

  // Admin Auth & Edit Mode State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('enap_admin_logged') === 'true';
    } catch {
      return false;
    }
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isProtocoloModalOpen, setIsProtocoloModalOpen] = useState<boolean>(false);

  // Modals state
  const [editingGate, setEditingGate] = useState<'entrada' | 'salida' | null>(null);
  const [editingProcessKey, setEditingProcessKey] = useState<string | null>(null);
  const [editingSubprocess, setEditingSubprocess] = useState<{ procKey: string; subIndex: number | 'new' } | null>(null);
  const [isEditingHeader, setIsEditingHeader] = useState<boolean>(false);

  // Nivel de navegación: 1 = Mapa General, 2 = Flujo de Subprocesos, 3 = Detalle del Subproceso
  const [level, setLevel] = useState<number>(1);
  const [activeProcessKey, setActiveProcessKey] = useState<string>("admisiones");
  const [activeSubIndex, setActiveSubIndex] = useState<number>(0);
  const [openingKey, setOpeningKey] = useState<string | null>(null);

  // Menú Lateral Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPhaseInSidebar, setExpandedPhaseInSidebar] = useState<string | null>("admisiones");

  const processKeys = Object.keys(appData.procesos);
  const activeProcess = appData.procesos[activeProcessKey] || appData.procesos[processKeys[0]] || INITIAL_APP_DATA.procesos["admisiones"];
  const activeSubprocess = activeProcess?.subprocesos?.[activeSubIndex] || activeProcess?.subprocesos?.[0] || {
    id: "1.1",
    stepNum: 1,
    titulo: "Sin subprocesos",
    resumen: "No hay datos para este paso.",
    responsable: "Por asignar",
    queSeHace: [],
    queSeNecesita: [],
    terminaCuando: ""
  };

  // Guardar en localStorage automáticamente cada vez que appData cambie
  useEffect(() => {
    try {
      localStorage.setItem('enap_mapa_procesos_data', JSON.stringify(appData));
    } catch (e) {
      console.warn('Error saving to localStorage', e);
    }
  }, [appData]);

  // Teclado: Tecla ESC para subir nivel, Flechas para cambiar subproceso en Nivel 3
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        goBack();
      } else if (level === 3 && activeProcess?.subprocesos) {
        if (e.key === 'ArrowRight' && activeSubIndex < activeProcess.subprocesos.length - 1) {
          setActiveSubIndex(prev => prev + 1);
        } else if (e.key === 'ArrowLeft' && activeSubIndex > 0) {
          setActiveSubIndex(prev => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [level, activeSubIndex, activeProcessKey, activeProcess]);

  // Abrir Proceso desde Nivel 1 con animación de apertura de caja
  const openProcessBox = (key: string) => {
    if (openingKey) return;
    setOpeningKey(key);
    setActiveProcessKey(key);
    setExpandedPhaseInSidebar(key);

    setTimeout(() => {
      setLevel(2);
      setActiveSubIndex(0);
      setOpeningKey(null);
    }, 450);
  };

  // Abrir Subproceso desde Nivel 2
  const openSubBox = (procKey: string, index: number) => {
    setActiveProcessKey(procKey);
    setExpandedPhaseInSidebar(procKey);
    setActiveSubIndex(index);
    setLevel(3);
  };

  // Subir nivel
  const goBack = () => {
    if (level === 3) {
      setLevel(2);
    } else if (level === 2) {
      setLevel(1);
    }
  };

  // Handlers para administración y edición
  const handleSuccessLogin = () => {
    setIsAdmin(true);
    setIsEditMode(true);
    setIsLoginModalOpen(false);
    try {
      localStorage.setItem('enap_admin_logged', 'true');
    } catch {}
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsEditMode(false);
    try {
      localStorage.removeItem('enap_admin_logged');
    } catch {}
  };

  const handleRestoreDefaults = () => {
    setAppData(INITIAL_APP_DATA);
    try {
      localStorage.setItem('enap_mapa_procesos_data', JSON.stringify(INITIAL_APP_DATA));
    } catch {}
  };

  const handleImportData = (imported: AppData) => {
    setAppData(imported);
    try {
      localStorage.setItem('enap_mapa_procesos_data', JSON.stringify(imported));
    } catch {}
  };

  const handleSaveGate = (updatedGate: FlowGateData) => {
    if (editingGate === 'entrada') {
      setAppData(prev => ({ ...prev, entrada: updatedGate }));
    } else if (editingGate === 'salida') {
      setAppData(prev => ({ ...prev, salida: updatedGate }));
    }
    setEditingGate(null);
  };

  const handleSaveProcess = (procKey: string, updatedProc: Process, targetPosition?: number) => {
    setAppData(prev => {
      const keys = Object.keys(prev.procesos);
      const isRename = editingProcessKey && editingProcessKey !== 'new' && editingProcessKey !== procKey;
      const isNew = editingProcessKey === 'new' || !prev.procesos[procKey];

      // Build ordered array of entries
      let entries = keys
        .filter(k => isRename ? k !== editingProcessKey : true)
        .map(k => ({ key: k, proc: k === procKey ? updatedProc : prev.procesos[k] }));

      if (isNew) {
        const insertIdx = targetPosition ? Math.max(0, Math.min(targetPosition - 1, entries.length)) : entries.length;
        entries.splice(insertIdx, 0, { key: procKey, proc: updatedProc });
      } else {
        const currentIdx = entries.findIndex(e => e.key === procKey);
        if (currentIdx !== -1 && targetPosition !== undefined) {
          const item = entries.splice(currentIdx, 1)[0];
          item.proc = updatedProc;
          const insertIdx = Math.max(0, Math.min(targetPosition - 1, entries.length));
          entries.splice(insertIdx, 0, item);
        } else if (currentIdx !== -1) {
          entries[currentIdx].proc = updatedProc;
        } else {
          entries.push({ key: procKey, proc: updatedProc });
        }
      }

      const nextProcesos: Record<string, Process> = {};
      entries.forEach(e => {
        nextProcesos[e.key] = e.proc;
      });

      return { ...prev, procesos: nextProcesos };
    });
    setActiveProcessKey(procKey);
    setEditingProcessKey(null);
  };

  const handleMoveProcess = (procKey: string, direction: 'left' | 'right') => {
    setAppData(prev => {
      const keys = Object.keys(prev.procesos);
      const currentIndex = keys.indexOf(procKey);
      if (currentIndex === -1) return prev;

      const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
      if (targetIndex < 0 || targetIndex >= keys.length) return prev;

      const newKeys = [...keys];
      const temp = newKeys[currentIndex];
      newKeys[currentIndex] = newKeys[targetIndex];
      newKeys[targetIndex] = temp;

      const nextProcesos: Record<string, Process> = {};
      newKeys.forEach(k => {
        nextProcesos[k] = prev.procesos[k];
      });

      return {
        ...prev,
        procesos: nextProcesos
      };
    });
  };

  const handleDeleteProcess = (procKey: string) => {
    setAppData(prev => {
      const nextProcesos = { ...prev.procesos };
      delete nextProcesos[procKey];
      return { ...prev, procesos: nextProcesos };
    });
    const remainingKeys = Object.keys(appData.procesos).filter(k => k !== procKey);
    if (remainingKeys.length > 0) {
      setActiveProcessKey(remainingKeys[0]);
    }
    setLevel(1);
    setEditingProcessKey(null);
  };

  const handleSaveSubprocess = (updatedSub: SubProcess, isNew: boolean, targetStepNum?: number) => {
    if (!editingSubprocess) return;
    const { procKey, subIndex } = editingSubprocess;
    setAppData(prev => {
      const proc = prev.procesos[procKey];
      if (!proc) return prev;

      let nextSubs = [...proc.subprocesos];
      if (isNew) {
        const insertIdx = targetStepNum ? Math.max(0, Math.min(targetStepNum - 1, nextSubs.length)) : nextSubs.length;
        nextSubs.splice(insertIdx, 0, updatedSub);
      } else if (typeof subIndex === 'number' && nextSubs[subIndex]) {
        nextSubs.splice(subIndex, 1);
        const insertIdx = targetStepNum ? Math.max(0, Math.min(targetStepNum - 1, nextSubs.length)) : subIndex;
        nextSubs.splice(insertIdx, 0, updatedSub);
      }

      nextSubs = nextSubs.map((s, i) => ({ ...s, stepNum: i + 1 }));

      return {
        ...prev,
        procesos: {
          ...prev.procesos,
          [procKey]: {
            ...proc,
            subprocesos: nextSubs
          }
        }
      };
    });
    setEditingSubprocess(null);
  };

  const handleMoveSubprocess = (procKey: string, subIndex: number, direction: 'left' | 'right') => {
    setAppData(prev => {
      const proc = prev.procesos[procKey];
      if (!proc || !proc.subprocesos) return prev;

      const targetIndex = direction === 'left' ? subIndex - 1 : subIndex + 1;
      if (targetIndex < 0 || targetIndex >= proc.subprocesos.length) return prev;

      const nextSubs = [...proc.subprocesos];
      const temp = nextSubs[subIndex];
      nextSubs[subIndex] = nextSubs[targetIndex];
      nextSubs[targetIndex] = temp;

      const reindexed = nextSubs.map((s, i) => ({ ...s, stepNum: i + 1 }));

      return {
        ...prev,
        procesos: {
          ...prev.procesos,
          [procKey]: {
            ...proc,
            subprocesos: reindexed
          }
        }
      };
    });
  };

  const handleDeleteSubprocess = (subId: string) => {
    if (!editingSubprocess) return;
    const { procKey } = editingSubprocess;
    setAppData(prev => {
      const proc = prev.procesos[procKey];
      if (!proc) return prev;

      let nextSubs = proc.subprocesos.filter(s => s.id !== subId);
      nextSubs = nextSubs.map((s, i) => ({ ...s, stepNum: i + 1 }));

      return {
        ...prev,
        procesos: {
          ...prev.procesos,
          [procKey]: {
            ...proc,
            subprocesos: nextSubs
          }
        }
      };
    });
    setActiveSubIndex(prev => Math.max(0, prev - 1));
    setEditingSubprocess(null);
  };

  const handleSaveHeader = (updatedHeader: GeneralMapHeader) => {
    setAppData(prev => ({ ...prev, headerNivel1: updatedHeader }));
    setIsEditingHeader(false);
  };

  // Determinar si debemos mostrar el sidebar (SÓLO en Nivel 2 y Nivel 3)
  const shouldShowSidebar = level >= 2 && isSidebarOpen;

  // Si hay 6 o menos subprocesos, se ajusta para verse en una sola página sin scroll
  const isSubprocessSinglePage = level === 2 && (activeProcess?.subprocesos?.length || 0) <= 6;

  return (
    <div className="h-screen w-screen text-[#0A1F3C] font-sans relative flex flex-col overflow-hidden bg-[#EEF4FA]">
      <ProtocolBackground />

      {/* CONTENEDOR FIJO SUPERIOR: HEADER + ADMIN TOOLBAR + BREADCRUMBS */}
      <div className="shrink-0 z-40 flex flex-col bg-white shadow-xs">
        {/* CABECERA INSTITUCIONAL EN AZUL NAVY */}
        <header className="h-[76px] sm:h-[80px] bg-[#0A1F3C] px-4 lg:px-8 flex items-center justify-between shadow-md relative">
          <div className="flex items-center gap-2 sm:gap-2.5 pl-4 sm:pl-8 lg:pl-14">
            {/* Logo / Escudo ENAP un tris más grande y destacado */}
            <div className="relative flex items-center justify-center shrink-0">
              <img 
                id="escudo"
                src="https://i.ibb.co/p6wfvf20/logo.png" 
                alt="Escudo ENAP" 
                className="h-[48px] md:h-[55px] w-auto object-contain enap-logo-glow select-none"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Jerarquía Institucional ENAP - pegada armoniosamente al logo */}
            <div className="flex flex-col justify-center">
              <h1 className="text-white font-bold text-xs sm:text-sm md:text-base tracking-tight leading-tight">
                Escuela Naval de Cadetes "Almirante Padilla"
              </h1>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#C6A15B] uppercase tracking-wider mt-0.5 leading-none">
                DECANATURA ACADÉMICA
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#8BB4E7] font-normal tracking-wide mt-0.5">
                Cartagena de Indias, D. T. y C.
              </span>
            </div>
          </div>

          {/* Lado derecho: Sistema Institucional alineado con Acceso Admin */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden sm:flex flex-col items-end text-right leading-tight">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Sistema Institucional
              </span>
              <span className="text-xs font-bold text-slate-200">
                Mapa de Procesos Académicos
              </span>
            </div>

            <div className="hidden sm:block h-8 w-px bg-white/20" />

            {/* Botón de Acceso Admin si no está conectado o badge */}
            {!isAdmin ? (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#C6A15B]/20 hover:bg-[#C6A15B]/30 text-[#C6A15B] hover:text-white border border-[#C6A15B]/60 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Acceso de Administrador para modificar textos y procesos"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Acceso Admin</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono font-extrabold text-[#C6A15B] bg-[#C6A15B]/15 border border-[#C6A15B]/50 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Admin
                </span>
              </div>
            )}
          </div>
        </header>

        {/* LÍNEA AMARILLA / DORADA INSTITUCIONAL VIBRANTE Y VISIBLE */}
        <div className="h-[3.5px] bg-[#C6A15B] w-full shrink-0 shadow-xs" />

        {/* TOOLBAR DE ADMINISTRADOR (SÓLO SI ESTÁ AUTENTICADO) */}
        {isAdmin && (
          <AdminToolbar
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
            onLogout={handleLogout}
            appData={appData}
            onRestoreDefaults={handleRestoreDefaults}
            onImportData={handleImportData}
          />
        )}

        {/* BARRA DE MIGAS DE PAN (BREADCRUMBS) */}
        <nav className={cn(
          "h-[42px] bg-white/98 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between text-xs transition-all duration-300",
          shouldShowSidebar ? "lg:pl-[310px]" : "pl-4 lg:pl-8"
        )}>
          <ul className="flex items-center gap-2 list-none">
            {/* Botón de Índice / Menú lateral cuando estamos en Nivel 2 o 3 */}
            {level >= 2 && (
              <li>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={cn(
                    "px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 font-bold cursor-pointer border text-xs mr-1 shadow-2xs",
                    isSidebarOpen 
                      ? "bg-[#0A1F3C] text-[#C6A15B] border-[#0A1F3C]" 
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  )}
                  title="Mostrar / Ocultar Índice lateral de procesos"
                >
                  <Menu className="w-3.5 h-3.5" />
                  <span>Índice</span>
                </button>
              </li>
            )}

            <li>
              <button 
                onClick={() => setLevel(1)} 
                className={cn(
                  "px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 cursor-pointer",
                  level === 1 ? "bg-[#0A1F3C] text-white font-bold shadow-xs" : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
                Mapa General
              </button>
            </li>

            {level >= 2 && (
              <li className="flex items-center gap-2 text-slate-400">
                <span className="text-slate-400 font-bold">›</span>
                <button 
                  onClick={() => setLevel(2)} 
                  className={cn(
                    "px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer",
                    level === 2 ? "bg-[#0A1F3C] text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <span>{activeProcess?.titulo}</span>
                </button>
              </li>
            )}

            {level === 3 && (
              <li className="flex items-center gap-2 text-slate-400">
                <span className="text-slate-400 font-bold">›</span>
                <button 
                  className="px-2.5 py-1 rounded-md bg-[#0A1F3C] text-white font-bold cursor-default shadow-xs"
                >
                  Subproceso <span className="text-[#C6A15B] font-mono">{activeSubprocess?.id}</span>
                </button>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <span>Atrás:</span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-bold text-slate-700">ESC</kbd>
            </div>
          </div>
        </nav>
      </div>

      {/* CONTENEDOR PRINCIPAL CON MENÚ LATERAL Y SCROLL INTERNO */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* MENÚ LATERAL INTERACTIVO (Sólo en Nivel 2 y 3) */}
        <AnimatePresence>
          {shouldShowSidebar && (
            <motion.aside
              initial={{ x: -290, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -290, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute lg:static left-0 top-0 bottom-0 w-[290px] shrink-0 h-full bg-white border-r border-slate-200 z-30 p-4 flex flex-col shadow-xl lg:shadow-none overflow-hidden"
            >
            {/* Header del Sidebar */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-extrabold text-[#0A1F3C] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#0A1F3C]" />
                  Índice de Procesos
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Procesos Académicos · ENAP</span>
              </div>

              <button 
                onClick={() => setLevel(1)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
                title="Volver al Mapa General"
              >
                <Layers className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Buscador de Subprocesos en Sidebar */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar subproceso..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#0A1F3C] placeholder:text-slate-400 focus:outline-none focus:border-[#0A1F3C] focus:bg-white transition-all"
              />
            </div>

            {/* Botón Volver al Mapa General */}
            <button
              onClick={() => setLevel(1)}
              className="w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between mb-3 text-xs font-bold bg-[#0A1F3C] text-white shadow-xs hover:bg-[#102A50] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Box className="w-4 h-4 text-[#C6A15B]" />
                Volver al Mapa General
              </span>
            </button>

            {/* Lista Acordeón de Procesos y Subprocesos */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              {processKeys.map((pKey) => {
                const proc = appData.procesos[pKey];
                const isProcActive = activeProcessKey === pKey && level >= 2;
                const isExpanded = expandedPhaseInSidebar === pKey || searchQuery.trim().length > 0;

                const filteredSubs = proc.subprocesos.filter(s => 
                  searchQuery === "" || 
                  s.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  s.id.includes(searchQuery)
                );

                if (searchQuery.trim().length > 0 && filteredSubs.length === 0) {
                  return null;
                }

                return (
                  <div key={pKey} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                    {/* Header del Proceso */}
                    <button
                      onClick={() => {
                        setActiveProcessKey(pKey);
                        setLevel(2);
                        setExpandedPhaseInSidebar(isExpanded && searchQuery === "" ? null : pKey);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 flex items-center justify-between text-xs font-bold transition-all cursor-pointer",
                        isProcActive
                          ? "bg-[#0A1F3C] text-white"
                          : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                      )}
                    >
                      <span className="flex items-center gap-1.5">
                        <Box className={cn("w-3.5 h-3.5", isProcActive ? "text-[#C6A15B]" : "text-[#0A1F3C]")} />
                        {proc.titulo}
                      </span>
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isExpanded ? "rotate-180" : "")} />
                    </button>

                    {/* Subprocesos del Proceso */}
                    {isExpanded && (
                      <div className="p-1 space-y-0.5 bg-slate-50/50">
                        {filteredSubs.map((sub) => {
                          const subIdx = proc.subprocesos.findIndex(s => s.id === sub.id);
                          const isSubActive = isProcActive && activeSubIndex === subIdx && level === 3;

                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setActiveProcessKey(pKey);
                                setActiveSubIndex(subIdx);
                                setLevel(3);
                              }}
                              className={cn(
                                "w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition-all flex items-center justify-between cursor-pointer",
                                isSubActive
                                  ? "bg-[#0A1F3C] text-white font-bold"
                                  : "text-slate-600 hover:bg-slate-200/60 font-medium"
                              )}
                            >
                              <span className="truncate pr-1">
                                <span className="font-mono text-[10px] text-[#C6A15B] mr-1">{sub.id}</span>
                                {sub.titulo}
                              </span>
                              <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* CONTENIDO PRINCIPAL: CENTRADO VERTICAL Y HORIZONTALMENTE EN PANTALLA */}
      <main className={cn(
        "flex-1 h-full overflow-x-hidden relative z-10 custom-scrollbar px-3 sm:px-6 lg:px-8 flex flex-col justify-center items-center",
        level === 1 
          ? "overflow-y-auto xl:overflow-y-hidden py-2" 
          : isSubprocessSinglePage
            ? "overflow-y-auto lg:overflow-y-hidden py-2"
            : "overflow-y-auto py-5 justify-start"
      )}>
        <div className={cn(
          "max-w-[1380px] 2xl:max-w-[1440px] mx-auto w-full flex flex-col items-center",
          (level === 1 || isSubprocessSinglePage)
            ? "flex-1 justify-center my-auto" 
            : "pb-12"
        )}>
          <AnimatePresence mode="wait">

            {/* ==========================================
                NIVEL 1: MAPA GENERAL (CAJAS 3D Y FLUJO)
                ========================================== */}
            {level === 1 && (
              <motion.div
                key="level-1"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center justify-center my-auto"
              >
                {/* Encabezado Nivel 1 */}
                <div className="text-center mb-3 sm:mb-3.5 relative shrink-0">
                  <div className="flex items-center justify-center gap-2 mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-[#0A1F3C] uppercase tracking-widest bg-white px-3 py-0.5 rounded-full border border-slate-200 shadow-xs inline-flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#C6A15B]" />
                      {appData.headerNivel1.badge.replace(/Nivel \d+\s*[-—–:]*\s*/gi, '')}
                    </span>
                    {isAdmin && isEditMode && (
                      <button
                        onClick={() => setIsEditingHeader(true)}
                        className="px-2 py-0.5 text-[11px] font-bold text-[#0A1F3C] bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-full transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        title="Editar textos del encabezado"
                      >
                        <Edit3 className="w-3 h-3 text-[#8A651E]" />
                        <span>Editar Encabezado</span>
                      </button>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1F3C] tracking-tight mb-1">
                    {appData.headerNivel1.titulo}
                  </h2>
                  <p className="text-xs sm:text-[12.5px] text-slate-600 max-w-2xl mx-auto leading-snug">
                    {appData.headerNivel1.descripcion}
                  </p>
                </div>

                {/* SECUENCIA HORIZONTAL: ENTRADA ➔ PROCESOS ➔ SALIDA */}
                <div className="w-full box-perspective-container pt-1">
                  <div className="flex flex-col xl:flex-row items-stretch justify-between gap-3.5 lg:gap-4 relative z-10 w-full">
                    
                    {/* BLOQUE DE ENTRADA (LADO IZQUIERDO) - MÁS GRANDE */}
                    <div className="xl:w-[245px] 2xl:w-[265px] shrink-0 bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-5 min-h-[250px] lg:min-h-[275px] xl:min-h-[295px] flex flex-col justify-between shadow-md relative group hover:border-[#0A1F3C] transition-all">
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] font-mono font-extrabold text-[#0A1F3C] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                            {appData.entrada.tag}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {isAdmin && isEditMode && (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setEditingGate('entrada'); }}
                                className="p-1 bg-amber-100 hover:bg-amber-200 text-[#0A1F3C] border border-amber-300 rounded-md text-[9px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                                title="Editar Bloque de Entrada"
                              >
                                <Edit3 className="w-3 h-3 text-[#8A651E]" />
                                <span>Editar</span>
                              </button>
                            )}
                            <User className="w-4.5 h-4.5 text-[#0A1F3C]" />
                          </div>
                        </div>
                        <h3 className="text-base sm:text-[17px] font-extrabold text-[#0A1F3C] mb-1 leading-tight">
                          {appData.entrada.titulo}
                        </h3>
                        <p className="text-[11px] sm:text-xs font-bold text-[#C6A15B] uppercase tracking-wider mb-1.5">
                          {appData.entrada.subtitulo}
                        </p>
                        <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed">
                          {appData.entrada.descripcion}
                        </p>
                      </div>

                      <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
                        <span>{appData.entrada.pie}</span>
                        <ArrowRight className="w-4 h-4 text-[#C6A15B] animate-pulse hidden xl:block" />
                        <ArrowDown className="w-4 h-4 text-[#C6A15B] animate-pulse xl:hidden" />
                      </div>

                      {/* Flecha Conectora de Salida de Entrada (Desktop) */}
                      <div className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <div className="bg-[#0A1F3C] text-[#C6A15B] border-2 border-[#C6A15B] rounded-full p-1.5 shadow-lg">
                          <ArrowRight className="w-4 h-4 animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* TARJETAS DE PROCESOS (CENTRO) - CAJAS 3D MÁS GRANDES */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-4.5 relative box-perspective-container">
                      {processKeys.map((key, idx) => {
                        const proc = appData.procesos[key];
                        const isOpening = openingKey === key;
                        const isLastProc = idx === processKeys.length - 1;

                        return (
                          <div key={key} className="relative flex flex-col w-full">
                            {/* CAJA 3D DE PROCESO CON DIMENSIONES AMPLIADAS */}
                            <motion.button
                              onClick={() => openProcessBox(key)}
                              whileHover={{ y: -4, rotateX: 2 }}
                              whileTap={{ scale: 0.98 }}
                              className={cn(
                                "process-box-card w-full text-left pt-12 sm:pt-13 pb-3.5 sm:pb-4 px-4 sm:px-5 relative flex flex-col justify-between transition-all cursor-pointer outline-none group min-h-[250px] lg:min-h-[275px] xl:min-h-[295px] h-full overflow-hidden",
                                isOpening ? "is-opening border-[#0A1F3C] ring-2 ring-[#C6A15B]" : ""
                              )}
                            >
                              {/* TAPA SUPERIOR FÍSICA DEL PROCESO */}
                              <div className="process-box-lid flex items-center justify-between">
                                <span className="font-mono text-[9px] sm:text-[10px] font-extrabold text-[#C6A15B] tracking-wider uppercase flex items-center gap-1.5">
                                  <Box className="w-3.5 h-3.5 text-[#C6A15B]" />
                                  PROCESO ACADÉMICO
                                </span>
                                
                                <div className="flex items-center gap-1.5">
                                  {isAdmin && isEditMode && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingProcessKey(key);
                                      }}
                                      className="relative z-30 px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-[#0A1F3C] border border-amber-300 rounded text-[9px] font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                                      title="Editar textos de este proceso"
                                    >
                                      <Edit3 className="w-3 h-3 text-[#8A651E]" />
                                      <span>Editar</span>
                                    </button>
                                  )}
                                  <div className="process-box-lid-latch" title="Pestaña de Apertura" />
                                </div>
                              </div>

                              {/* INTERIOR Y ANIMACIÓN DE SALIDA */}
                              <div className="process-box-interior">
                                <motion.div
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: [0, -6, 0], opacity: 1 }}
                                  transition={{ duration: 0.45 }}
                                  className="flex flex-col items-center justify-center text-center p-3 text-white"
                                >
                                  <motion.div 
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="bg-[#C6A15B] text-[#0A1F3C] p-2.5 rounded-xl shadow-lg mb-2"
                                  >
                                    <Box className="w-5 h-5" />
                                  </motion.div>
                                  <span className="font-mono text-[11px] font-black text-[#C6A15B] uppercase tracking-wider mb-0.5">
                                    ¡Abriendo Proceso!
                                  </span>
                                  <span className="text-[10px] font-medium text-slate-200">
                                    Cargando {proc.subprocesos?.length || 0} subprocesos...
                                  </span>
                                </motion.div>
                              </div>

                              {/* CUERPO PRINCIPAL DEL PROCESO */}
                              <div className="flex flex-col relative z-10 w-full mt-1">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="font-mono text-[9.5px] font-bold text-slate-500 uppercase tracking-wide">
                                    Contenido Interno:
                                  </span>
                                  <span className="font-mono text-[9.5px] sm:text-[10.5px] font-extrabold text-[#0A1F3C] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                                    {proc.subprocesos?.length || 0} Subprocesos
                                  </span>
                                </div>

                                <h3 className="text-base sm:text-[17px] font-extrabold text-[#0A1F3C] group-hover:text-[#102A50] transition-colors leading-snug mb-1.5">
                                  {proc.titulo}
                                </h3>

                                <p className="text-xs sm:text-[12.5px] text-slate-600 font-medium leading-relaxed line-clamp-4">
                                  {proc.resumen}
                                </p>
                              </div>

                              {/* Pie del Proceso - Botón de Apertura */}
                              <div className="relative z-10 pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] sm:text-xs font-extrabold text-[#0A1F3C] group-hover:text-[#102A50] flex items-center gap-1 transition-transform group-hover:translate-x-1 ml-auto">
                                  Abrir proceso <ChevronRight className="w-4 h-4 text-[#C6A15B]" />
                                </span>
                              </div>
                            </motion.button>

                            {/* Controles de Reordenación de Proceso en Modo Edición */}
                            {isAdmin && isEditMode && (
                              <div className="flex items-center justify-between mt-2 px-3 py-1 bg-amber-50/90 border border-amber-200 rounded-xl shadow-2xs">
                                <span className="text-[10px] font-mono font-bold text-slate-600">
                                  Posición <strong className="text-[#0A1F3C]">{idx + 1}</strong> de {processKeys.length}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => handleMoveProcess(key, 'left')}
                                    className="px-2 py-0.5 bg-white hover:bg-slate-100 text-[#0A1F3C] border border-slate-300 rounded text-[10px] font-bold flex items-center gap-0.5 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                                    title="Mover proceso a la izquierda (antes)"
                                  >
                                    <ChevronLeft className="w-3 h-3" />
                                    <span>Antes</span>
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === processKeys.length - 1}
                                    onClick={() => handleMoveProcess(key, 'right')}
                                    className="px-2 py-0.5 bg-white hover:bg-slate-100 text-[#0A1F3C] border border-slate-300 rounded text-[10px] font-bold flex items-center gap-0.5 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                                    title="Mover proceso a la derecha (después)"
                                  >
                                    <span>Después</span>
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Flechas Conectoras entre Procesos */}
                            {!isLastProc && (
                              <>
                                <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                                  <div className="bg-[#0A1F3C] text-[#C6A15B] border-2 border-[#C6A15B] rounded-full p-1.5 shadow-lg">
                                    <ArrowRight className="w-4 h-4 animate-pulse" />
                                  </div>
                                </div>

                                <div className="flex md:hidden justify-center my-3 z-20">
                                  <div className="bg-[#0A1F3C] text-[#C6A15B] border-2 border-[#C6A15B] px-3 py-1 rounded-full shadow-md flex items-center gap-2 text-[11px] font-mono font-bold">
                                    <span>Siguiente proceso</span>
                                    <ArrowDown className="w-3.5 h-3.5 text-[#C6A15B] animate-bounce" />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}

                      {/* Tarjeta para Agregar Nuevo Proceso en Modo Admin */}
                      {isAdmin && isEditMode && (
                        <div className="relative flex flex-col w-full">
                          <button
                            onClick={() => setEditingProcessKey('new')}
                            className="w-full h-full min-h-[250px] lg:min-h-[275px] xl:min-h-[295px] p-4 border-2 border-dashed border-[#C6A15B] hover:border-[#0A1F3C] bg-white/70 hover:bg-white rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer group shadow-xs hover:shadow-md"
                          >
                            <div className="p-2.5 bg-[#0A1F3C] text-[#C6A15B] rounded-xl shadow-md group-hover:scale-110 transition-transform mb-2">
                              <Plus className="w-5 h-5" />
                            </div>
                            <span className="font-mono text-[11px] font-black text-[#0A1F3C] uppercase tracking-wider">
                              + Agregar Nuevo Proceso
                            </span>
                            <span className="text-[10px] text-slate-500 mt-0.5">
                              Crear nuevo proceso en el flujo
                            </span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* BLOQUE DE SALIDA (LADO DERECHO) - MÁS GRANDE */}
                    <div className="xl:w-[245px] 2xl:w-[265px] shrink-0 bg-[#FEF8EC] border-2 border-[#C6A15B] rounded-2xl p-4 sm:p-5 min-h-[250px] lg:min-h-[275px] xl:min-h-[295px] flex flex-col justify-between shadow-md relative group hover:shadow-xl transition-all">
                      <div className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <div className="bg-[#0A1F3C] text-[#C6A15B] border-2 border-[#C6A15B] rounded-full p-1.5 shadow-lg">
                          <ArrowRight className="w-4 h-4 animate-pulse" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] font-mono font-extrabold text-[#8A651E] bg-[#C6A15B]/20 border border-[#C6A15B]/40 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                            {appData.salida.tag}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {isAdmin && isEditMode && (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setEditingGate('salida'); }}
                                className="p-1 bg-amber-100 hover:bg-amber-200 text-[#0A1F3C] border border-amber-300 rounded-md text-[9px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                                title="Editar Bloque de Salida"
                              >
                                <Edit3 className="w-3 h-3 text-[#8A651E]" />
                                <span>Editar</span>
                              </button>
                            )}
                            <GraduationCap className="w-4.5 h-4.5 text-[#8A651E]" />
                          </div>
                        </div>
                        <h3 className="text-base sm:text-[17px] font-extrabold text-[#0A1F3C] mb-1 leading-tight">
                          {appData.salida.titulo}
                        </h3>
                        <p className="text-[11px] sm:text-xs font-bold text-[#8A651E] uppercase tracking-wider mb-1.5">
                          {appData.salida.subtitulo}
                        </p>
                        <p className="text-xs sm:text-[12.5px] text-slate-700 leading-relaxed">
                          {appData.salida.descripcion}
                        </p>
                      </div>

                      <div className="pt-2.5 mt-2 border-t border-[#C6A15B]/30 flex items-center justify-between text-[11px] font-mono font-bold text-[#8A651E]">
                        <span>{appData.salida.pie}</span>
                        <CheckCircle2 className="w-4 h-4 text-[#8A651E]" />
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* ==========================================
                NIVEL 2: INTERIOR DEL PROCESO — SUBPROCESOS
                ========================================== */}
            {level === 2 && (
              <motion.div
                key={`level-2-${activeProcessKey}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="w-full flex flex-col items-center justify-center my-auto"
              >
                {/* Encabezado del Proceso */}
                <div className={cn(
                  "text-center relative flex flex-col items-center justify-center shrink-0",
                  isSubprocessSinglePage ? "mb-2 sm:mb-3" : "mb-5"
                )}>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <h2 className={cn(
                      "font-extrabold text-[#0A1F3C] tracking-tight",
                      isSubprocessSinglePage ? "text-xl sm:text-2xl" : "text-2xl lg:text-3xl"
                    )}>
                      {activeProcess.titulo}
                    </h2>
                    {isAdmin && isEditMode && (
                      <button
                        onClick={() => setEditingProcessKey(activeProcessKey)}
                        className="px-2 py-0.5 text-[11px] font-bold text-[#0A1F3C] bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-full transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        title="Editar título y definición del proceso"
                      >
                        <Edit3 className="w-3 h-3 text-[#8A651E]" />
                        <span>Editar</span>
                      </button>
                    )}
                  </div>
                  {/* Definición corta del proceso debajo del título */}
                  {activeProcess.resumen && (
                    <p className={cn(
                      "text-slate-600 max-w-2xl mx-auto leading-snug font-normal text-center",
                      isSubprocessSinglePage ? "text-xs sm:text-[12.5px] mt-0.5 line-clamp-2" : "text-xs sm:text-sm mt-1.5"
                    )}>
                      {activeProcess.resumen}
                    </p>
                  )}
                </div>

                {/* Grid de Subprocesos centrado */}
                <div className="w-full relative flex justify-center items-center">
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.06,
                          delayChildren: 0.03
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                    className={cn(
                      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative z-10 box-perspective-container w-full max-w-6xl justify-center",
                      isSubprocessSinglePage 
                        ? "gap-y-2.5 sm:gap-y-3.5 gap-x-5 lg:gap-x-6" 
                        : "gap-y-6 gap-x-8"
                    )}
                  >
                      {activeProcess.subprocesos.map((sub, idx) => {
                        const isLast = idx === activeProcess.subprocesos.length - 1;
                        const nextSub = !isLast ? activeProcess.subprocesos[idx + 1] : null;

                        return (
                          <motion.div 
                            key={sub.id} 
                            variants={{
                              hidden: { y: -15, opacity: 0, scale: 0.96 },
                              show: { 
                                y: 0, 
                                opacity: 1, 
                                scale: 1, 
                                transition: { type: "spring", stiffness: 320, damping: 24 }
                              }
                            }}
                            className="relative flex flex-col"
                          >
                            <button
                              onClick={() => openSubBox(activeProcessKey, idx)}
                              className={cn(
                                "flow-subcard text-left bg-white flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-md transition-all relative border-2 border-slate-200 hover:border-[#0A1F3C] rounded-2xl h-full",
                                isSubprocessSinglePage 
                                  ? "p-3.5 sm:p-4 min-h-[165px] sm:min-h-[175px] lg:min-h-[185px]" 
                                  : "p-4 sm:p-5 min-h-[220px] sm:min-h-[235px]"
                              )}
                            >
                              <div>
                                {isAdmin && isEditMode && (
                                  <div className="flex items-center justify-end mb-1">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingSubprocess({ procKey: activeProcessKey, subIndex: idx });
                                      }}
                                      className="px-1.5 py-0.5 bg-amber-100 hover:bg-amber-200 text-[#0A1F3C] border border-amber-300 rounded text-[9px] font-bold flex items-center gap-0.5 shadow-2xs transition-colors cursor-pointer"
                                      title="Editar este subproceso"
                                    >
                                      <Edit3 className="w-2.5 h-2.5 text-[#8A651E]" />
                                      <span>Editar</span>
                                    </button>
                                  </div>
                                )}

                                <h4 className={cn(
                                  "font-extrabold text-[#0A1F3C] group-hover:text-[#102A50] transition-colors leading-snug my-0.5",
                                  isSubprocessSinglePage ? "text-xs sm:text-[13.5px]" : "text-sm sm:text-base my-1"
                                )}>
                                  {sub.titulo}
                                </h4>

                                <p className={cn(
                                  "text-[11px] sm:text-[11.5px] text-slate-600 leading-relaxed",
                                  isSubprocessSinglePage ? "line-clamp-3 mb-1.5" : "line-clamp-4 mb-2"
                                )}>
                                  {sub.resumen}
                                </p>
                              </div>

                              <div className="pt-2 mt-1 border-t border-slate-100 text-xs font-semibold text-[#0A1F3C] flex items-center justify-between">
                                <span className="text-[10px] text-slate-600 font-medium truncate max-w-[170px]" title={sub.responsable}>
                                  <span className="text-slate-400 font-bold">Resp:</span> {sub.responsable}
                                </span>
                                <span className="flex items-center gap-0.5 font-extrabold text-[#0A1F3C] group-hover:text-[#102A50] text-[10px]">
                                  Ver <ChevronRight className="w-3 h-3 text-[#C6A15B] group-hover:translate-x-0.5 transition-transform" />
                                </span>
                              </div>

                              {/* Reordenación de Subprocesos en Modo Admin */}
                              {isAdmin && isEditMode && (
                                <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-amber-200/70 bg-amber-50/60 px-2 py-0.5 rounded-md">
                                  <span className="text-[9px] font-mono font-bold text-slate-500">Paso {sub.stepNum}/{activeProcess.subprocesos.length}</span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={idx === 0}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMoveSubprocess(activeProcessKey, idx, 'left');
                                      }}
                                      className="p-1 rounded bg-white hover:bg-slate-100 text-[#0A1F3C] border border-slate-300 disabled:opacity-25 disabled:cursor-not-allowed text-[9px] font-bold flex items-center cursor-pointer shadow-2xs"
                                      title="Mover paso a la izquierda (antes)"
                                    >
                                      <ChevronLeft className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={idx === activeProcess.subprocesos.length - 1}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMoveSubprocess(activeProcessKey, idx, 'right');
                                      }}
                                      className="p-1 rounded bg-white hover:bg-slate-100 text-[#0A1F3C] border border-slate-300 disabled:opacity-25 disabled:cursor-not-allowed text-[9px] font-bold flex items-center cursor-pointer shadow-2xs"
                                      title="Mover paso a la derecha (después)"
                                    >
                                      <ChevronRight className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </button>

                            {/* Conector Flecha entre subprocesos */}
                            {!isLast && (
                              <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center">
                                <div className="bg-[#0A1F3C] text-[#C6A15B] border border-[#C6A15B] rounded-full p-1 shadow-xs flex items-center justify-center">
                                  <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B] stroke-[2.5]" />
                                </div>
                              </div>
                            )}

                            {!isLast && (
                              <div className="flex lg:hidden justify-center my-1 z-20">
                                <div className="bg-[#0A1F3C] text-[#C6A15B] border border-[#C6A15B] px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1.5 text-[10px] font-mono font-bold">
                                  <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B] sm:inline hidden" />
                                  <ArrowDown className="w-3.5 h-3.5 text-[#C6A15B] sm:hidden" />
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}

                      {/* Tarjeta para Agregar Nuevo Subproceso / Paso en Modo Admin */}
                      {isAdmin && isEditMode && (
                        <div className="relative flex flex-col">
                          <button
                            onClick={() => setEditingSubprocess({ procKey: activeProcessKey, subIndex: 'new' })}
                            className={cn(
                              "w-full text-center border-2 border-dashed border-[#C6A15B] hover:border-[#0A1F3C] bg-white hover:bg-amber-50/40 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer h-full group shadow-2xs",
                              isSubprocessSinglePage 
                                ? "p-3.5 min-h-[165px] sm:min-h-[175px] lg:min-h-[185px]" 
                                : "p-6 min-h-[220px] sm:min-h-[235px]"
                            )}
                          >
                            <div className="p-2 bg-[#0A1F3C] text-[#C6A15B] rounded-xl shadow-xs group-hover:scale-110 transition-transform mb-1.5">
                              <Plus className="w-4 h-4" />
                            </div>
                            <span className="font-mono text-xs font-black text-[#0A1F3C] uppercase tracking-wider">
                              + Agregar Nuevo Paso
                            </span>
                            <span className="text-[10px] text-slate-500 mt-0.5">
                              Insertar subproceso en el flujo
                            </span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </div>
              </motion.div>
            )}

            {/* ==========================================
                NIVEL 3: DETALLE DEL SUBPROCESO
                ========================================== */}
            {level === 3 && (
              <motion.div
                key="level-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center"
              >
                {/* Tracker Visual de Pasos */}
                <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono font-bold text-[#0A1F3C] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C6A15B]" />
                    <span>POSICIÓN EN EL FLUJO:</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {activeProcess.subprocesos.map((sub, i) => {
                      const isActive = i === activeSubIndex;
                      const isPast = i < activeSubIndex;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveSubIndex(i)}
                          className={cn(
                            "px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1",
                            isActive 
                              ? "bg-[#0A1F3C] text-[#C6A15B] shadow-sm border border-[#0A1F3C]" 
                              : isPast
                              ? "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                              : "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50"
                          )}
                        >
                          <span>{sub.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tarjeta de Detalle del Subproceso */}
                <div className="detail-card w-full bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xl">
                  {/* Encabezado del Detalle */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-5 mb-5 border-b border-slate-100">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-[11px] font-bold text-[#0A1F3C] bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 inline-block">
                          SUBPROCESO <span className="text-[#C6A15B]">{activeSubprocess.id}</span>
                        </span>
                        {isAdmin && isEditMode && (
                          <button
                            onClick={() => setEditingSubprocess({ procKey: activeProcessKey, subIndex: activeSubIndex })}
                            className="px-2.5 py-0.5 bg-amber-100 hover:bg-amber-200 text-[#0A1F3C] border border-amber-300 rounded-md text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                            title="Modificar los textos y listas de este subproceso"
                          >
                            <Edit3 className="w-3 h-3 text-[#8A651E]" />
                            <span>Editar Subproceso</span>
                          </button>
                        )}
                      </div>
                      <h2 className="text-xl lg:text-2xl font-extrabold text-[#0A1F3C] tracking-tight mt-1">
                        {activeSubprocess.titulo}
                      </h2>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-1 font-medium leading-relaxed">
                        {activeSubprocess.resumen}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 bg-gradient-to-r from-[#0A1F3C]/5 via-[#C6A15B]/10 to-transparent border-2 border-[#C6A15B]/40 p-3.5 rounded-xl shadow-xs">
                      <div className="w-9 h-9 rounded-xl bg-[#0A1F3C] text-[#C6A15B] flex items-center justify-center shrink-0 shadow-sm">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold text-[#8A651E] bg-[#C6A15B]/20 border border-[#C6A15B]/40 px-2 py-0.5 rounded uppercase tracking-wider">
                            Responsable Directo / Rol
                          </span>
                        </div>
                        <span className="text-xs sm:text-[13px] font-extrabold text-[#0A1F3C] mt-0.5">
                          {activeSubprocess.responsable}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Grid de 2 Columnas: Qué se hace vs Qué se necesita */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                    {/* Sección: Qué se hace */}
                    <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
                      <h4 className="text-[11px] font-bold text-[#0A1F3C] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0A1F3C]" />
                        ¿Qué se hace en este paso?
                      </h4>
                      <ul className="bullet-list space-y-2">
                        {activeSubprocess.queSeHace.map((item, i) => (
                          <li key={i} className="text-[11px] sm:text-xs text-slate-700 leading-relaxed pl-4 relative font-normal">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sección: Qué se necesita */}
                    <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
                      <h4 className="text-[11px] font-bold text-[#0A1F3C] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#0A1F3C]" />
                        Documentos y Requisitos necesarios
                      </h4>
                      <ul className="bullet-list space-y-2">
                        {activeSubprocess.queSeNecesita.map((item, i) => (
                          <li key={i} className="text-[11px] sm:text-xs text-slate-700 leading-relaxed pl-4 relative font-normal">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cuadro de Criterio de Finalización */}
                  <div className="finish-condition-box bg-[#F0F5FA] border border-slate-200 rounded-xl p-3.5">
                    <span className="finish-label block font-mono text-[10px] font-bold text-[#0A1F3C] uppercase tracking-wider mb-0.5">
                      Criterio de finalización del paso
                    </span>
                    <p className="finish-text text-[11px] sm:text-xs text-slate-800 font-semibold leading-relaxed">
                      {activeSubprocess.terminaCuando}
                    </p>
                  </div>

                  {/* Navegación Secuencial del Flujo */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
                    <button
                      onClick={() => setActiveSubIndex(prev => Math.max(0, prev - 1))}
                      disabled={activeSubIndex === 0}
                      className="bg-white border border-slate-200 text-[#0A1F3C] text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-500" />
                      Anterior ({activeSubIndex > 0 ? activeProcess.subprocesos[activeSubIndex - 1].id : 'Inicio'})
                    </button>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-[#0A1F3C]">
                        Subproceso {activeSubIndex + 1} de {activeProcess.subprocesos.length}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveSubIndex(prev => Math.min(activeProcess.subprocesos.length - 1, prev + 1))}
                      disabled={activeSubIndex === activeProcess.subprocesos.length - 1}
                      className="bg-[#0A1F3C] hover:bg-[#102A50] text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                    >
                      Siguiente ({activeSubIndex < activeProcess.subprocesos.length - 1 ? activeProcess.subprocesos[activeSubIndex + 1].id : 'Fin'})
                      <ChevronRight className="w-4 h-4 text-[#C6A15B]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>

    {/* FRANJA AZUL INFERIOR INSTITUCIONAL FIJA (HORIZONTAL EN LA BASE DE LA PANTALLA) */}
    <footer className="w-full shrink-0 bg-[#0A1F3C] border-t-[3px] border-[#C6A15B] py-3 sm:py-3.5 min-h-[58px] sm:min-h-[62px] px-4 sm:px-8 lg:px-12 shadow-2xl z-40 text-white flex flex-col sm:flex-row items-center justify-between gap-2">
      {/* Lado Izquierdo: Escudo institucional y jerarquía en dos líneas con letra más pequeña */}
      <div className="flex items-center gap-3">
        <img 
          src="https://i.ibb.co/p6wfvf20/logo.png" 
          alt="Escudo ENAP" 
          className="h-8 sm:h-9 w-auto object-contain enap-logo-glow select-none shrink-0"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="flex flex-col justify-center">
          <span className="text-white font-bold text-[11px] sm:text-xs tracking-tight leading-tight">
            Escuela Naval de Cadetes "Almirante Padilla"
          </span>
          <span className="text-[#8BB4E7] text-[9px] sm:text-[10px] leading-tight mt-0.5">
            Decanatura Académica · Cartagena de Indias, D. T. y C.
          </span>
        </div>
      </div>

      {/* Lado Derecho: Créditos en dos líneas con letra más pequeña */}
      <div className="flex flex-col sm:items-end justify-center text-center sm:text-right leading-tight">
        <span className="text-slate-400 text-[9px] sm:text-[10px] tracking-wide">
          Sistema Institucional · Mapa de Procesos
        </span>
        <span className="text-slate-300 text-[10px] sm:text-[11px] font-medium mt-0.5">
          Desarrollado por <span className="font-bold text-white text-[10px] sm:text-[11px]">PD02 Beyty P. Camargo M.</span>
        </span>
      </div>
    </footer>

    {/* MODAL DE LOGIN ADMIN */}
    <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccessLogin={handleSuccessLogin}
      />

      {/* MODAL PARA EDITAR ENTRADA O SALIDA */}
      <EditGateModal
        isOpen={editingGate !== null}
        onClose={() => setEditingGate(null)}
        gateType={editingGate || 'entrada'}
        initialData={editingGate === 'salida' ? appData.salida : appData.entrada}
        onSave={handleSaveGate}
      />

      {/* MODAL PARA EDITAR O AGREGAR PROCESO */}
      <EditProcessModal
        isOpen={editingProcessKey !== null}
        onClose={() => setEditingProcessKey(null)}
        processData={editingProcessKey && editingProcessKey !== 'new' ? appData.procesos[editingProcessKey] : null}
        currentPosition={editingProcessKey && editingProcessKey !== 'new' ? processKeys.indexOf(editingProcessKey) + 1 : processKeys.length + 1}
        totalPositions={processKeys.length}
        onSave={handleSaveProcess}
        onDelete={handleDeleteProcess}
        isNew={editingProcessKey === 'new'}
      />

      {/* MODAL PARA EDITAR O AGREGAR SUBPROCESO */}
      <EditSubprocessModal
        isOpen={editingSubprocess !== null}
        onClose={() => setEditingSubprocess(null)}
        subProcessData={
          editingSubprocess && typeof editingSubprocess.subIndex === 'number'
            ? appData.procesos[editingSubprocess.procKey]?.subprocesos[editingSubprocess.subIndex]
            : null
        }
        stepCount={editingSubprocess ? (appData.procesos[editingSubprocess.procKey]?.subprocesos.length || 0) : 0}
        onSave={handleSaveSubprocess}
        onDelete={handleDeleteSubprocess}
        isNew={editingSubprocess?.subIndex === 'new'}
      />

      {/* MODAL PARA EDITAR ENCABEZADO DE NIVEL 1 */}
      <EditHeaderModal
        isOpen={isEditingHeader}
        onClose={() => setIsEditingHeader(false)}
        initialData={appData.headerNivel1}
        onSave={handleSaveHeader}
      />

      {/* MODAL DE PROTOCOLO Y CATÁLOGO DEL PORTAL DE TITULACIÓN ENAP */}
      <ProtocoloTitulacionModal
        isOpen={isProtocoloModalOpen}
        onClose={() => setIsProtocoloModalOpen(false)}
      />
    </div>
  );
}
