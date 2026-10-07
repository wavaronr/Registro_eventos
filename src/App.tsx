import React, { useState } from 'react';
import { AndroidSimulator } from './components/AndroidSimulator';
import { CodeExplorer } from './components/CodeExplorer';
import { ArchitectureView } from './components/ArchitectureView';
import { SecurityRulesView } from './components/SecurityRulesView';
import { SetupGuideView } from './components/SetupGuideView';
import { downloadAndroidProjectZip } from './utils/zipExporter';
import {
  Smartphone,
  FolderCode,
  Layers,
  ShieldCheck,
  BookOpen,
  Download,
  Flame,
  Globe,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'architecture' | 'rules' | 'guide'>('simulator');
  const [downloadingZip, setDownloadingZip] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setDownloadingZip(true);
      await downloadAndroidProjectZip();
    } finally {
      setDownloadingZip(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Barra de Navegación Superior */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo y Título */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900 tracking-tight">RegistroEventosCloud</span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Plan Spark Gratuito
                </span>
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span>Android Jetpack Compose</span>
                <span>•</span>
                <span className="text-cyan-700 font-medium">southamerica-east1 (São Paulo)</span>
              </p>
            </div>
          </div>

          {/* Botón Descargar Proyecto Completo */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={downloadingZip}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>{downloadingZip ? 'Descargando...' : 'Descargar Proyecto (.ZIP)'}</span>
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación Principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 border-t border-slate-100 overflow-x-auto no-scrollbar py-2 text-xs">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Simulador Android M3</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FolderCode className="w-4 h-4" />
            <span>Código Fuente & Gradle</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Arquitectura Clean & MVVM</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
              activeTab === 'rules'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Reglas de Firestore</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Guía de Configuración</span>
          </button>
        </div>
      </header>

      {/* Contenido Dinámico de la Pestaña Activa */}
      <main className="flex-1 py-6">
        {activeTab === 'simulator' && <AndroidSimulator />}
        {activeTab === 'code' && <CodeExplorer />}
        {activeTab === 'architecture' && <ArchitectureView />}
        {activeTab === 'rules' && <SecurityRulesView />}
        {activeTab === 'guide' && <SetupGuideView />}
      </main>

      {/* Pie de Página */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            RegistroEventosCloud • Desarrollado con Kotlin, Jetpack Compose, Material 3 y Firebase Cloud Firestore.
          </p>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Región: southamerica-east1</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">Plan Spark Gratuito</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
