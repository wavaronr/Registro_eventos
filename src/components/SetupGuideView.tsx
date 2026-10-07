import React from 'react';
import {
  FileText,
  FolderOpen,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Smartphone,
  Flame,
  ArrowRight
} from 'lucide-react';
import { downloadAndroidProjectZip } from '../utils/zipExporter';

export const SetupGuideView: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-6 space-y-8">
      {/* Cabecera */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl p-6 lg:p-8 text-white border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-cyan-400">
          <Smartphone className="w-4 h-4" />
          <span>Guía de Conexión & Ejecución</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold">
          Paso a Paso: Android Studio + google-services.json
        </h2>
        <p className="text-slate-300 text-xs lg:text-sm mt-2 max-w-2xl leading-relaxed">
          Sigue estas instrucciones para abrir el proyecto en Android Studio, conectar tu archivo existente <span className="text-cyan-300 font-mono">google-services.json</span> del proyecto Firebase "RegistroEventosCloud" y compilar la APK de forma inmediata.
        </p>

        <div className="mt-5">
          <button
            onClick={() => downloadAndroidProjectZip()}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition active:scale-95 flex items-center gap-2"
          >
            📦 Descargar Archivos del Proyecto (.ZIP)
          </button>
        </div>
      </div>

      {/* Pasos Numerados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paso 1 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Descargar y Descomprimir</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Descarga el archivo ZIP del proyecto con el botón superior o clona el repositorio. Descomprímelo en una ruta sin caracteres especiales ni espacios (ej: <code className="text-indigo-600 font-mono">C:\AndroidProjects\RegistroEventosCloud</code>).
          </p>
        </div>

        {/* Paso 2 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Copiar google-services.json</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Toma el archivo <code className="text-indigo-600 font-mono">google-services.json</code> que ya descargaste desde Firebase y cópialo directamente dentro de la carpeta:
          </p>
          <div className="bg-slate-100 p-2.5 rounded-xl font-mono text-xs text-slate-800 border border-slate-200">
            RegistroEventosCloud/app/google-services.json
          </div>
          <p className="text-[11px] text-slate-500">
            ⚠️ Asegúrate de que el paquete en el JSON sea <code className="font-mono">com.registro.eventoscloud</code>.
          </p>
        </div>

        {/* Paso 3 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Abrir en Android Studio</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Abre Android Studio (Ladybug, Hedgehog, Koala o superior):
          </p>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>Haz clic en <span className="font-semibold text-slate-800">File &gt; Open</span>.</li>
            <li>Selecciona la carpeta raíz <span className="font-semibold text-slate-800">RegistroEventosCloud</span>.</li>
            <li>Espera a que Gradle sincronice las dependencias de <code className="font-mono text-indigo-600">libs.versions.toml</code>.</li>
          </ul>
        </div>

        {/* Paso 4 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Publicar Reglas de Firestore</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            En la consola de Firebase del proyecto "RegistroEventosCloud":
          </p>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>Entra en <strong>Firestore Database</strong> &gt; pestaña <strong>Reglas</strong>.</li>
            <li>Pega el contenido del archivo <code className="font-mono text-indigo-600">firestore.rules</code>.</li>
            <li>Presiona <strong>Publicar</strong>.</li>
          </ul>
        </div>
      </div>

      {/* Verificación de compatibilidad con Plan Spark */}
      <div className="bg-amber-50 rounded-3xl border border-amber-200 p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Garantía Plan Spark (Cero Costes / 100% Gratuito)
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          La aplicación utiliza exclusivamente las API cliente estándar de Firebase:
          <strong> Firebase Authentication</strong> (cuentas de correo ilimitadas) y
          <strong> Cloud Firestore</strong> con consultas filtradas directamente por <code className="font-mono">whereEqualTo("usuarioId", uid)</code>.
          No requiere Cloud Functions pagas ni extensiones de facturación Blaze.
        </p>
      </div>
    </div>
  );
};
