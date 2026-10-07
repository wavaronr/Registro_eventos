import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Flame,
  Globe
} from 'lucide-react';

export const SecurityRulesView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSimulation, setActiveSimulation] = useState<number>(0);

  const firestoreRulesContent = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Función de ayuda para verificar autenticación activa
    function isAuthenticated() {
      return request.auth != null;
    }

    // Reglas para la colección 'eventos'
    match /eventos/{eventoId} {
      
      // LECTURA: Solo el usuario dueño del documento puede leerlo
      allow read: if isAuthenticated() && resource.data.usuarioId == request.auth.uid;
      
      // CREACIÓN: El usuario debe estar autenticado, asignar su propio UID y cumplir validación de esquema
      allow create: if isAuthenticated() 
                    && request.resource.data.usuarioId == request.auth.uid
                    && request.resource.data.titulo is string
                    && request.resource.data.titulo.size() >= 3
                    && request.resource.data.fecha is string
                    && request.resource.data.estado in ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADO', 'CANCELADO'];
      
      // ACTUALIZACIÓN: Solo el propietario puede editar y no puede alterar la autoría (usuarioId)
      allow update: if isAuthenticated()
                    && resource.data.usuarioId == request.auth.uid
                    && request.resource.data.usuarioId == request.auth.uid;
      
      // ELIMINACIÓN: Solo el propietario puede borrar su evento
      allow delete: if isAuthenticated() && resource.data.usuarioId == request.auth.uid;
    }

    // Denegar cualquier otra colección no autorizada
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`;

  const simulationScenarios = [
    {
      title: 'Lectura de Evento Propio',
      actor: 'Usuario "usr_001" autenticado',
      operation: 'get /eventos/evt_123 (usuarioId: "usr_001")',
      allowed: true,
      reason: 'request.auth.uid coincide exactamente con resource.data.usuarioId.',
    },
    {
      title: 'Intento de Lectura Anónima',
      actor: 'Visitante sin autenticar',
      operation: 'list /eventos',
      allowed: false,
      reason: 'request.auth es null. isAuthenticated() rechaza la solicitud.',
    },
    {
      title: 'Intento de Lectura de Evento Ajeno',
      actor: 'Usuario "usr_002" autenticado',
      operation: 'get /eventos/evt_123 (usuarioId: "usr_001")',
      allowed: false,
      reason: 'Violación de propiedad: request.auth.uid ("usr_002") != resource.data.usuarioId ("usr_001").',
    },
    {
      title: 'Creación de Evento con Estado Inválido',
      actor: 'Usuario "usr_001" autenticado',
      operation: 'create /eventos con estado: "ESTADO_DESCONOCIDO"',
      allowed: false,
      reason: 'Rechazado por regla de validación: el estado debe pertenecer a la lista permitida.',
    },
    {
      title: 'Modificación de Propiedad (Spoofing de UID)',
      actor: 'Usuario "usr_001" autenticado',
      operation: 'update /eventos/evt_123 intentando cambiar usuarioId a "usr_999"',
      allowed: false,
      reason: 'request.resource.data.usuarioId debe coincidir con request.auth.uid, impidiendo transferencias ilícitas.',
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(firestoreRulesContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-6 space-y-8">
      {/* Banner Principal */}
      <div className="bg-slate-900 rounded-3xl p-6 lg:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Firebase Security Rules
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Globe className="w-3.5 h-3.5" />
              southamerica-east1
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold">Reglas de Seguridad de Cloud Firestore</h2>
          <p className="text-xs lg:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Garantizan que ningún usuario pueda leer ni modificar datos de otros miembros de la organización. Validación a nivel de base de datos sin depender exclusivamente del cliente.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg transition active:scale-95 shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copied ? '¡Reglas Copiadas!' : 'Copiar Reglas para Consola'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Código de las Reglas */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
            <span className="font-mono text-cyan-400 font-semibold">firestore.rules</span>
            <span className="text-slate-500 font-mono text-[11px]">Sintaxis rules_version = '2'</span>
          </div>
          <pre className="font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed p-2 selection:bg-indigo-900">
            <code>{firestoreRulesContent}</code>
          </pre>
        </div>

        {/* Simulador de Pruebas de Seguridad */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              Simulador de Evaluación de Reglas
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Selecciona un escenario para verificar cómo evalúa Cloud Firestore las solicitudes entrantes:
            </p>

            <div className="space-y-2">
              {simulationScenarios.map((sc, index) => {
                const isSelected = activeSimulation === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveSimulation(index)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold truncate">{sc.title}</p>
                      <p
                        className={`text-[10px] truncate mt-0.5 ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {sc.actor}
                      </p>
                    </div>
                    {sc.allowed ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
                        PERMITIDO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 shrink-0">
                        DENEGADO
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Resultado del Escenario Seleccionado */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                {simulationScenarios[activeSimulation].allowed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600" />
                )}
                <span className="font-bold text-slate-800">
                  {simulationScenarios[activeSimulation].allowed ? 'Operación Autorizada' : 'Acceso Denegado por Firestore'}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-600 bg-white p-2 rounded-xl border border-slate-200">
                {simulationScenarios[activeSimulation].operation}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">Motivo:</span> {simulationScenarios[activeSimulation].reason}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
