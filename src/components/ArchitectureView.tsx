import React from 'react';
import {
  Layers,
  Cpu,
  Database,
  Shield,
  Smartphone,
  ArrowDown,
  ArrowRight,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-6 space-y-8">
      {/* Banner Introductorio */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 lg:p-8 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-emerald-400">
          <Layers className="w-4 h-4" />
          <span>Clean Architecture & MVVM Pattern</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold">
          Arquitectura de RegistroEventosCloud
        </h2>
        <p className="text-slate-300 text-xs lg:text-sm mt-2 max-w-3xl leading-relaxed">
          Diseñado bajo los principios de Clean Architecture recomendados por Google: separación estricta de responsabilidades, alta testabilidad, flujo unidireccional de datos (UDF) con <span className="text-cyan-400 font-mono">StateFlow</span> y sincronización reactiva en tiempo real mediante <span className="text-cyan-400 font-mono">callbackFlow</span> de Kotlin Coroutines con el SDK de Firestore.
        </p>
      </div>

      {/* Diagrama Arquitectónico Interactivo */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-600" />
          Flujo Unidireccional de Datos (UDF) & Capas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Capa 1: Presentation (Compose UI) */}
          <div className="bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="font-bold text-indigo-950 text-sm">Presentation Layer</h4>
            <span className="text-[10px] bg-indigo-200/80 text-indigo-800 px-2 py-0.5 rounded-full font-semibold">
              Jetpack Compose M3
            </span>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-indigo-200/60">
              <li>• <span className="font-semibold text-slate-800">EventosListScreen</span></li>
              <li>• <span className="font-semibold text-slate-800">CreateEditScreen</span></li>
              <li>• <span className="font-semibold text-slate-800">Login / Register</span></li>
              <li>• Observa <span className="font-mono text-indigo-600">uiState: StateFlow</span></li>
            </ul>
          </div>

          {/* Capa 2: Presentation (ViewModels) */}
          <div className="bg-purple-50/70 border-2 border-purple-200 rounded-2xl p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="font-bold text-purple-950 text-sm">ViewModel (MVVM)</h4>
            <span className="text-[10px] bg-purple-200/80 text-purple-800 px-2 py-0.5 rounded-full font-semibold">
              StateFlow & Coroutines
            </span>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-purple-200/60">
              <li>• <span className="font-semibold text-slate-800">EventosListViewModel</span></li>
              <li>• <span className="font-semibold text-slate-800">LoginViewModel</span></li>
              <li>• Manejo de estado inmutable</li>
              <li>• Exposición de <span className="font-mono text-purple-700">Resource&lt;T&gt;</span></li>
            </ul>
          </div>

          {/* Capa 3: Domain (Use Cases & Entities) */}
          <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h4 className="font-bold text-emerald-950 text-sm">Domain Layer</h4>
            <span className="text-[10px] bg-emerald-200/80 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
              Puro Kotlin (Sin Framework)
            </span>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-emerald-200/60">
              <li>• <span className="font-semibold text-slate-800">GetEventosUseCase</span></li>
              <li>• <span className="font-semibold text-slate-800">CreateEventoUseCase</span></li>
              <li>• Entidad <span className="font-semibold text-slate-800">Evento</span> & <span className="font-semibold text-slate-800">EstadoEvento</span></li>
              <li>• Contrato <span className="font-mono text-emerald-700">EventoRepository</span></li>
            </ul>
          </div>

          {/* Capa 4: Data (Repository & Firestore) */}
          <div className="bg-amber-50/70 border-2 border-amber-200 rounded-2xl p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h4 className="font-bold text-amber-950 text-sm">Data Layer</h4>
            <span className="text-[10px] bg-amber-200/80 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
              Firebase SDK & Offline
            </span>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-amber-200/60">
              <li>• <span className="font-semibold text-slate-800">EventoRepositoryImpl</span></li>
              <li>• <span className="font-semibold text-slate-800">AuthRepositoryImpl</span></li>
              <li>• <span className="font-mono text-amber-800">EventoDto (Firestore)</span></li>
              <li>• SnapshotListener en tiempo real</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Código del Diagrama Mermaid */}
      <div className="bg-slate-950 rounded-3xl p-6 text-white border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">Diagrama Mermaid de Arquitectura (Copiar para documentación)</span>
          <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded-full font-mono">
            Mermaid 10.x
          </span>
        </div>
        <pre className="font-mono text-xs text-cyan-300 bg-slate-900 p-4 rounded-2xl overflow-x-auto leading-relaxed border border-slate-800">
{`graph TD
    subgraph PRESENTATION["Presentation Layer (Jetpack Compose & Material 3)"]
        UI[Pantallas Compose: EventosList, CreateEdit, Auth]
        VM[ViewModels con StateFlow & viewModelScope]
        UI -->|Eventos de Usuario / Intents| VM
        VM -->|Emite UiState Inmutable| UI
    end

    subgraph DOMAIN["Domain Layer (Reglas de Negocio Puras)"]
        UC[Casos de Uso: GetEventos, CreateEvento, Login...]
        MODELS[Modelos de Dominio: Evento, EstadoEvento]
        IREPO[Interfaces: EventoRepository, AuthRepository]
        VM -->|Ejecuta Use Cases| UC
        UC -->|Define Contratos| IREPO
        UC -.-> MODELS
    end

    subgraph DATA["Data Layer (Implementación & Mapeo)"]
        REPO_IMPL[Implementaciones: EventoRepositoryImpl, AuthRepositoryImpl]
        DTO[Data Transfer Objects: EventoDto]
        IREPO -.->|Implementado por| REPO_IMPL
        REPO_IMPL -->|Serializa/Deserializa| DTO
    end

    subgraph FIREBASE["Firebase Backend (Plan Spark Gratuito)"]
        FAUTH[Firebase Authentication: Email & Pass]
        CF[Cloud Firestore southamerica-east1]
        CACHE[(Firestore Local Persistent SQLite Cache)]
        REPO_IMPL --> FAUTH
        REPO_IMPL <-->|addSnapshotListener / Flow| CF
        CF <-->|Sync Bidireccional Automático| CACHE
    end`}
        </pre>
      </div>

      {/* Tabla de Ventajas de la Arquitectura */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Reactividad Pura</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Los cambios en Cloud Firestore son transmitidos instantáneamente mediante <code className="text-indigo-600 font-mono">callbackFlow</code> hacia <code className="text-indigo-600 font-mono">StateFlow</code> sin recargas manuales.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Resiliencia Offline</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            La base de datos local SQLite de Firestore permite lecturas y escrituras sin internet. Al reconectar, la sincronización es automática y libre de conflictos.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Plan Spark 100% Gratuito</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Optimizado para mantenerse holgadamente dentro de los límites gratuitos: 50,000 lecturas diarias, 20,000 escrituras diarias y 1 GB de almacenamiento.
          </p>
        </div>
      </div>
    </div>
  );
};
