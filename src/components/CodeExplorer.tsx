import React, { useState } from 'react';
import { ANDROID_FILES, AndroidFile } from '../data/androidProjectFiles';
import { downloadAndroidProjectZip } from '../utils/zipExporter';
import {
  FileCode,
  Download,
  Copy,
  Check,
  Search,
  FolderTree,
  ShieldAlert,
  Layers,
  Sparkles
} from 'lucide-react';

export const CodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<AndroidFile>(ANDROID_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDownloading, setIsDownloading] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos los Archivos' },
    { id: 'presentation', label: 'Compose & UI' },
    { id: 'domain', label: 'Domain & UseCases' },
    { id: 'data', label: 'Data & Firestore' },
    { id: 'gradle', label: 'Gradle & Config' },
    { id: 'rules', label: 'Firestore Rules' },
    { id: 'core', label: 'Core & Arch' },
  ];

  const filteredFiles = ANDROID_FILES.filter(file => {
    const matchCat = selectedCategory === 'all' || file.category === selectedCategory;
    const matchSearch =
      search === '' ||
      file.name.toLowerCase().includes(search.toLowerCase()) ||
      file.path.toLowerCase().includes(search.toLowerCase()) ||
      file.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadAndroidProjectZip();
    } finally {
      setIsDownloading(false);
    }
  };

  const lineCount = selectedFile.content.split('\n').length;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
      {/* Header con botón de descarga del proyecto completo */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Clean Architecture + Jetpack Compose
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Kotlin 2.1 & Material 3
            </span>
          </div>
          <h2 className="text-2xl font-bold">Explorador de Código Fuente Android</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Estructura completa lista para abrir en Android Studio. Mapeo reactivo con Firestore usando 
            <span className="text-cyan-300 font-mono"> callbackFlow</span>, corrutinas y ViewModel con 
            <span className="text-cyan-300 font-mono"> StateFlow</span>.
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isDownloading}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg transition active:scale-95 disabled:opacity-50 shrink-0"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? 'Generando ZIP...' : 'Descargar Proyecto Completo (.ZIP)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Panel lateral: Lista y Categorías de Archivos */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-4 shadow-sm flex flex-col space-y-3 max-h-[750px]">
          {/* Buscador de archivos */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar archivo (ej: Repository, ViewModel)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Categorías */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Lista de archivos */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {filteredFiles.map(file => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-3 rounded-2xl transition flex items-start gap-2.5 border ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700'
                  }`}
                >
                  <FileCode
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isSelected ? 'text-indigo-600' : 'text-slate-400'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate">{file.name}</p>
                    <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">{file.path}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-1">{file.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel Principal: Visor de Código Fuente */}
        <div className="lg:col-span-8 bg-slate-950 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col max-h-[750px]">
          {/* Header del archivo seleccionado */}
          <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-cyan-400 font-semibold truncate">{selectedFile.path}</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                {lineCount} líneas
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium active:scale-95 text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? '¡Copiado!' : 'Copiar Código'}
              </button>
            </div>
          </div>

          {/* Descripción del componente */}
          <div className="bg-slate-900/40 px-5 py-2.5 border-b border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{selectedFile.description}</span>
          </div>

          {/* Bloque de código con numeración de líneas */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 bg-slate-950 leading-relaxed selection:bg-indigo-900 selection:text-white">
            <pre className="grid grid-cols-[auto_1fr] gap-x-4">
              <code className="text-slate-600 select-none text-right pr-2 border-r border-slate-800/80">
                {selectedFile.content.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </code>
              <code className="overflow-x-auto text-slate-200">
                {selectedFile.content}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
