import React, { useState } from 'react';
import {
  Smartphone,
  Wifi,
  WifiOff,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  LogOut,
  Search,
  CheckCircle2,
  Clock,
  PlayCircle,
  XCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  CloudCheck,
  RefreshCw,
  Info
} from 'lucide-react';

export interface EventoItem {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADO' | 'CANCELADO';
  usuarioId: string;
  fechaCreacion: number;
  synced: boolean;
}

const INITIAL_EVENTOS: EventoItem[] = [
  {
    id: 'evt_001',
    titulo: 'Conferencia Anual de Cloud Computing',
    descripcion: 'Presentación sobre arquitecturas serverless y optimización de base de datos en São Paulo.',
    fecha: '2026-11-20',
    estado: 'EN_PROGRESO',
    usuarioId: 'usr_org_01',
    fechaCreacion: Date.now() - 86400000 * 3,
    synced: true,
  },
  {
    id: 'evt_002',
    titulo: 'Auditoría de Seguridad y Reglas Firestore',
    descripcion: 'Revisión técnica de reglas de seguridad e indexación en Firebase Spark Plan.',
    fecha: '2026-11-25',
    estado: 'PENDIENTE',
    usuarioId: 'usr_org_01',
    fechaCreacion: Date.now() - 86400000 * 2,
    synced: true,
  },
  {
    id: 'evt_003',
    titulo: 'Taller de Jetpack Compose & StateFlow',
    descripcion: 'Capacitación al equipo de desarrollo móvil sobre Material Design 3 y Clean Architecture.',
    fecha: '2026-10-15',
    estado: 'COMPLETADO',
    usuarioId: 'usr_org_01',
    fechaCreacion: Date.now() - 86400000 * 10,
    synced: true,
  },
  {
    id: 'evt_004',
    titulo: 'Simulacro de Contingencia Operativa',
    descripcion: 'Prueba de failover cancelada y reprogramada para el siguiente trimestre.',
    fecha: '2026-10-01',
    estado: 'CANCELADO',
    usuarioId: 'usr_org_01',
    fechaCreacion: Date.now() - 86400000 * 15,
    synced: true,
  }
];

export const AndroidSimulator: React.FC = () => {
  // Estado de sesión
  const [currentUser, setCurrentUser] = useState<{ email: string; uid: string } | null>({
    email: 'admin@organizacion.com',
    uid: 'usr_org_01'
  });

  // Pantallas: 'login' | 'register' | 'forgot' | 'list' | 'create' | 'edit'
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register' | 'forgot' | 'list' | 'create' | 'edit'>('list');

  // Estado offline simulado de Firestore
  const [isOffline, setIsOffline] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Formulario Auth
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Eventos
  const [eventos, setEventos] = useState<EventoItem[]>(INITIAL_EVENTOS);
  const [filtroEstado, setFiltroEstado] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');

  // Formulario Crear / Editar Evento
  const [editingEventoId, setEditingEventoId] = useState<string | null>(null);
  const [formTitulo, setFormTitulo] = useState('');
  const [formDescripcion, setFormDescripcion] = useState('');
  const [formFecha, setFormFecha] = useState('');
  const [formEstado, setFormEstado] = useState<'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADO' | 'CANCELADO'>('PENDIENTE');
  const [formError, setFormError] = useState<string | null>(null);

  // Eliminar modal
  const [deleteModalEvento, setDeleteModalEvento] = useState<EventoItem | null>(null);

  const showNotification = (msg: string) => {
    setSyncToast(msg);
    setTimeout(() => setSyncToast(null), 3500);
  };

  const handleToggleOffline = () => {
    if (isOffline) {
      setIsOffline(false);
      // Sincronizar eventos pendientes
      setEventos(prev => prev.map(e => ({ ...e, synced: true })));
      showNotification('📶 Conexión restaurada: Firestore sincronizó todos los cambios con la nube (southamerica-east1).');
    } else {
      setIsOffline(true);
      showNotification('📴 Modo Offline activado: Firestore usa caché local persistente (SQLite).');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.includes('@') || authPassword.length < 6) {
      setAuthError('Correo inválido o contraseña menor a 6 caracteres.');
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setCurrentUser({ email: authEmail, uid: 'usr_' + Math.random().toString(36).substring(7) });
      setCurrentScreen('list');
      setAuthError(null);
      showNotification('Sesión iniciada con Firebase Authentication.');
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.includes('@')) {
      setAuthError('Introduce un correo electrónico válido.');
      return;
    }
    if (authPassword.length < 6) {
      setAuthError('La contraseña debe tener mínimo 6 caracteres.');
      return;
    }
    if (authPassword !== authConfirmPassword) {
      setAuthError('Las contraseñas no coinciden.');
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setCurrentUser({ email: authEmail, uid: 'usr_' + Math.random().toString(36).substring(7) });
      setCurrentScreen('list');
      setAuthError(null);
      showNotification('¡Cuenta registrada exitosamente en Firebase Auth!');
    }, 600);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.includes('@')) {
      setAuthError('Introduce un correo válido para recuperar tu clave.');
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      showNotification(`Enlace de restablecimiento enviado a ${authEmail}`);
      setCurrentScreen('login');
      setAuthError(null);
    }, 600);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    showNotification('Sesión cerrada correctamente.');
  };

  const openCreateScreen = () => {
    setEditingEventoId(null);
    setFormTitulo('');
    setFormDescripcion('');
    setFormFecha(new Date().toISOString().split('T')[0]);
    setFormEstado('PENDIENTE');
    setFormError(null);
    setCurrentScreen('create');
  };

  const openEditScreen = (evento: EventoItem) => {
    setEditingEventoId(evento.id);
    setFormTitulo(evento.titulo);
    setFormDescripcion(evento.descripcion);
    setFormFecha(evento.fecha);
    setFormEstado(evento.estado);
    setFormError(null);
    setCurrentScreen('edit');
  };

  const handleSaveEvento = (e: React.FormEvent) => {
    e.preventDefault();
    if (formTitulo.trim().length < 3) {
      setFormError('El título debe tener al menos 3 caracteres.');
      return;
    }
    if (!formFecha) {
      setFormError('La fecha es obligatoria.');
      return;
    }

    if (editingEventoId) {
      // Editar
      setEventos(prev =>
        prev.map(ev =>
          ev.id === editingEventoId
            ? {
                ...ev,
                titulo: formTitulo.trim(),
                descripcion: formDescripcion.trim(),
                fecha: formFecha,
                estado: formEstado,
                synced: !isOffline
              }
            : ev
        )
      );
      showNotification(
        isOffline
          ? 'Evento modificado localmente (pendiente de sincronización).'
          : 'Evento actualizado en Cloud Firestore.'
      );
    } else {
      // Crear
      const nuevo: EventoItem = {
        id: 'evt_' + Date.now().toString(36),
        titulo: formTitulo.trim(),
        descripcion: formDescripcion.trim(),
        fecha: formFecha,
        estado: formEstado,
        usuarioId: currentUser?.uid || 'usr_org_01',
        fechaCreacion: Date.now(),
        synced: !isOffline
      };
      setEventos(prev => [nuevo, ...prev]);
      showNotification(
        isOffline
          ? 'Evento creado en caché offline de Firestore.'
          : 'Evento guardado en Cloud Firestore (São Paulo).'
      );
    }

    setCurrentScreen('list');
  };

  const handleDeleteEvento = (id: string) => {
    setEventos(prev => prev.filter(e => e.id !== id));
    setDeleteModalEvento(null);
    showNotification(
      isOffline
        ? 'Eliminación registrada en caché local (se aplicará al conectar).'
        : 'Evento eliminado de Cloud Firestore.'
    );
  };

  // Filtrado
  const eventosFiltrados = eventos.filter(ev => {
    const matchEstado = filtroEstado === 'TODOS' || ev.estado === filtroEstado;
    const matchSearch =
      searchQuery === '' ||
      ev.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchEstado && matchSearch;
  });

  const getBadgeStyle = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE':
        return { bg: 'bg-amber-100 text-amber-800 border-amber-300', icon: Clock, label: 'Pendiente' };
      case 'EN_PROGRESO':
        return { bg: 'bg-blue-100 text-blue-800 border-blue-300', icon: PlayCircle, label: 'En Progreso' };
      case 'COMPLETADO':
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2, label: 'Completado' };
      case 'CANCELADO':
        return { bg: 'bg-rose-100 text-rose-800 border-rose-300', icon: XCircle, label: 'Cancelado' };
      default:
        return { bg: 'bg-slate-100 text-slate-800 border-slate-300', icon: Clock, label: estado };
    }
  };

  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 p-4 lg:p-6 w-full max-w-7xl mx-auto">
      {/* Columna Izquierda: Información técnica en vivo */}
      <div className="w-full xl:w-96 space-y-4">
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
              Simulador Compose M3
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sandbox
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">RegistroEventosCloud</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Interactúa con la interfaz nativa en Jetpack Compose construida con Material 3, arquitectura MVVM, StateFlow y Firestore SDK.
          </p>

          <div className="mt-4 pt-4 border-t border-slate-800 space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span>Backend Nube:</span>
              <span className="font-mono text-cyan-400 font-medium">Cloud Firestore</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>Región:</span>
              <span className="font-mono text-slate-200">southamerica-east1 (São Paulo)</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>Plan Firebase:</span>
              <span className="text-emerald-400 font-semibold">Spark (100% Gratuito)</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>Usuario Autenticado:</span>
              <span className="font-mono text-slate-300 truncate max-w-[140px]">
                {currentUser ? currentUser.email : 'Sin sesión'}
              </span>
            </div>
          </div>
        </div>

        {/* Panel de Control de Sincronización Offline */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-600" />
              Sincronización Offline
            </h4>
            <button
              onClick={handleToggleOffline}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isOffline
                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-300'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              {isOffline ? 'Offline (Caché Activo)' : 'En línea (Nube)'}
            </button>
          </div>
          <p className="text-xs text-slate-600">
            Prueba cómo la persistencia offline de Firestore almacena mutaciones locales en SQLite y las transmite a la nube automáticamente cuando se restaura la conexión.
          </p>

          <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 border border-slate-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              {isOffline
                ? 'Los eventos creados o editados ahora se marcan como pendientes y se encolan localmente.'
                : 'Cualquier modificación se replica en tiempo real mediante SnapshotListener.'}
            </span>
          </div>
        </div>

        {/* Accesos rápidos de simulación */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Navegación de Pantallas
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                if (!currentUser) setCurrentUser({ email: 'admin@organizacion.com', uid: 'usr_01' });
                setCurrentScreen('list');
              }}
              className={`p-2 rounded-lg font-medium text-left transition ${
                currentScreen === 'list'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              📋 Listado Eventos
            </button>
            <button
              onClick={openCreateScreen}
              className={`p-2 rounded-lg font-medium text-left transition ${
                currentScreen === 'create'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              ➕ Nuevo Evento
            </button>
            <button
              onClick={() => {
                setCurrentUser(null);
                setCurrentScreen('login');
              }}
              className={`p-2 rounded-lg font-medium text-left transition ${
                currentScreen === 'login'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🔑 Login Screen
            </button>
            <button
              onClick={() => {
                setCurrentUser(null);
                setCurrentScreen('register');
              }}
              className={`p-2 rounded-lg font-medium text-left transition ${
                currentScreen === 'register'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              📝 Registro Screen
            </button>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Marco de Smartphone Android Material Design 3 */}
      <div className="relative">
        {/* Notificación Toast flotante */}
        {syncToast && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-full shadow-2xl border border-slate-700 flex items-center gap-2 animate-bounce">
            <CloudCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">{syncToast}</span>
          </div>
        )}

        <div className="w-[375px] h-[760px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 ring-1 ring-slate-800 flex flex-col relative select-none">
          {/* Bocina y Cámara frontal (Punch hole) */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full flex items-center justify-center z-30">
            <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700"></div>
          </div>

          {/* Pantalla Interna (Material 3 Canvas) */}
          <div className="w-full h-full bg-[#fbfdf9] rounded-[38px] overflow-hidden flex flex-col relative text-slate-800">
            {/* Barra de Estado Android */}
            <div className="h-7 px-5 pt-1.5 flex justify-between items-center text-[11px] font-semibold text-slate-600 shrink-0 bg-[#f0f4ec]">
              <span>10:30</span>
              <div className="flex items-center gap-1.5">
                {isOffline ? (
                  <WifiOff className="w-3 h-3 text-rose-600" />
                ) : (
                  <Wifi className="w-3 h-3 text-slate-700" />
                )}
                <span className="text-[10px]">LTE</span>
                <span className="text-[10px]">95%</span>
              </div>
            </div>

            {/* CONTENIDO DE PANTALLAS SEGÚN ESTADO DE NAVEGACIÓN */}

            {/* PANTALLA: LOGIN */}
            {currentScreen === 'login' && (
              <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                <div className="my-auto">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-md">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">RegistroEventosCloud</h2>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Sincronización en tiempo real con Cloud Firestore
                  </p>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700">Correo Electrónico</label>
                      <input
                        type="email"
                        value={authEmail}
                        onChange={e => setAuthEmail(e.target.value)}
                        placeholder="usuario@organizacion.com"
                        className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700">Contraseña</label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={authPassword}
                          onChange={e => setAuthPassword(e.target.value)}
                          placeholder="Mínimo 6 caracteres"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {authError && (
                      <p className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                        {authError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs shadow-md transition disabled:opacity-50"
                    >
                      {authLoading ? 'Verificando...' : 'Iniciar Sesión'}
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthError(null);
                          setCurrentScreen('forgot');
                        }}
                        className="text-[11px] text-indigo-600 hover:underline font-medium"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>

                    <div className="text-center pt-4 border-t border-slate-200 text-xs text-slate-600">
                      ¿No tienes cuenta?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthError(null);
                          setCurrentScreen('register');
                        }}
                        className="text-indigo-600 font-bold hover:underline"
                      >
                        Regístrate aquí
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* PANTALLA: REGISTRO */}
            {currentScreen === 'register' && (
              <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                <div className="my-auto">
                  <button
                    onClick={() => setCurrentScreen('login')}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 mb-4"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Volver al login
                  </button>
                  <h2 className="text-2xl font-bold text-slate-900">Crear Cuenta</h2>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Registro en Firebase Authentication
                  </p>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700">Correo Electrónico</label>
                      <input
                        type="email"
                        value={authEmail}
                        onChange={e => setAuthEmail(e.target.value)}
                        placeholder="usuario@organizacion.com"
                        className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700">Contraseña</label>
                      <input
                        type="password"
                        value={authPassword}
                        onChange={e => setAuthPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700">Confirmar Contraseña</label>
                      <input
                        type="password"
                        value={authConfirmPassword}
                        onChange={e => setAuthConfirmPassword(e.target.value)}
                        placeholder="Repite la contraseña"
                        className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                      />
                    </div>

                    {authError && (
                      <p className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                        {authError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs shadow-md transition disabled:opacity-50"
                    >
                      {authLoading ? 'Registrando...' : 'Registrar Cuenta'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* PANTALLA: FORGOT PASSWORD */}
            {currentScreen === 'forgot' && (
              <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                <div className="my-auto">
                  <button
                    onClick={() => setCurrentScreen('login')}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 mb-4"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Volver al login
                  </button>
                  <h2 className="text-2xl font-bold text-slate-900">Recuperar Acceso</h2>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Te enviaremos un correo con un enlace seguro de Firebase.
                  </p>

                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700">Correo Electrónico</label>
                      <input
                        type="email"
                        value={authEmail}
                        onChange={e => setAuthEmail(e.target.value)}
                        placeholder="usuario@organizacion.com"
                        className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                      />
                    </div>

                    {authError && (
                      <p className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                        {authError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs shadow-md transition disabled:opacity-50"
                    >
                      {authLoading ? 'Enviando...' : 'Enviar Correo de Recuperación'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* PANTALLA: LISTADO DE EVENTOS */}
            {currentScreen === 'list' && (
              <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* TopAppBar Material 3 */}
                <div className="bg-[#e9efe6] px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
                  <div>
                    <h1 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      RegistroEventosCloud
                      {isOffline && (
                        <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-normal">
                          Offline
                        </span>
                      )}
                    </h1>
                    <p className="text-[10px] text-slate-500 truncate max-w-[200px]">
                      {currentUser?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    title="Cerrar Sesión"
                    className="p-1.5 text-slate-600 hover:text-rose-600 rounded-full hover:bg-white/60 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Buscador Rápido */}
                <div className="p-3 pb-1 shrink-0">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar evento..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Filter Chips Material 3 */}
                <div className="px-3 py-2 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[11px]">
                  {[
                    { id: 'TODOS', label: 'Todos' },
                    { id: 'PENDIENTE', label: 'Pendientes' },
                    { id: 'EN_PROGRESO', label: 'En Progreso' },
                    { id: 'COMPLETADO', label: 'Completados' },
                    { id: 'CANCELADO', label: 'Cancelados' },
                  ].map(tab => {
                    const isSelected = filtroEstado === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setFiltroEstado(tab.id)}
                        className={`px-2.5 py-1 rounded-full whitespace-nowrap transition font-medium text-xs ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Lista de Eventos (LazyColumn Compose) */}
                <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5">
                  {eventosFiltrados.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                      <Clock className="w-10 h-10 stroke-1 mb-2 text-slate-300" />
                      <p className="text-xs font-semibold text-slate-600">No hay eventos que coincidan</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Toca el botón '+' para crear un nuevo evento.
                      </p>
                    </div>
                  ) : (
                    eventosFiltrados.map(evento => {
                      const badge = getBadgeStyle(evento.estado);
                      const BadgeIcon = badge.icon;
                      return (
                        <div
                          key={evento.id}
                          className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-sm hover:shadow transition relative"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}
                            >
                              <BadgeIcon className="w-2.5 h-2.5" />
                              {badge.label}
                            </span>

                            <div className="flex items-center gap-1">
                              {!evento.synced && (
                                <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                                  Pendiente Sync
                                </span>
                              )}
                              <button
                                onClick={() => openEditScreen(evento)}
                                className="p-1 text-slate-400 hover:text-indigo-600 transition"
                                title="Editar"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteModalEvento(evento)}
                                className="p-1 text-slate-400 hover:text-rose-600 transition"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h3 className="text-xs font-bold text-slate-900 leading-snug">
                            {evento.titulo}
                          </h3>

                          {evento.descripcion && (
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                              {evento.descripcion}
                            </p>
                          )}

                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                            <div className="flex items-center gap-1 text-indigo-700 font-medium">
                              <Calendar className="w-3 h-3" />
                              <span>{evento.fecha}</span>
                            </div>
                            <span>ID: {evento.id}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Floating Action Button (FAB M3) */}
                <button
                  onClick={openCreateScreen}
                  className="absolute bottom-5 right-5 w-13 h-13 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl flex items-center justify-center transition active:scale-95"
                  title="Nuevo Evento"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* PANTALLA: CREAR O EDITAR EVENTO */}
            {(currentScreen === 'create' || currentScreen === 'edit') && (
              <div className="flex-1 flex flex-col overflow-hidden bg-white">
                <div className="bg-[#e9efe6] px-4 py-3 border-b border-slate-200 flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setCurrentScreen('list')}
                    className="p-1 text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h1 className="text-sm font-bold text-slate-900">
                    {currentScreen === 'edit' ? 'Editar Evento' : 'Nuevo Evento'}
                  </h1>
                </div>

                <form onSubmit={handleSaveEvento} className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Título del Evento *</label>
                    <input
                      type="text"
                      value={formTitulo}
                      onChange={e => setFormTitulo(e.target.value)}
                      placeholder="Ej. Revisión trimestral de presupuesto"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Fecha Programada *</label>
                    <input
                      type="date"
                      value={formFecha}
                      onChange={e => setFormFecha(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Estado</label>
                    <select
                      value={formEstado}
                      onChange={e => setFormEstado(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                    >
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="EN_PROGRESO">En Progreso</option>
                      <option value="COMPLETADO">Completado</option>
                      <option value="CANCELADO">Cancelado</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Descripción</label>
                    <textarea
                      rows={4}
                      value={formDescripcion}
                      onChange={e => setFormDescripcion(e.target.value)}
                      placeholder="Detalles adicionales del evento..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                      {formError}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs shadow-md transition"
                    >
                      {currentScreen === 'edit' ? 'Guardar Cambios' : 'Registrar en Firestore'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Modal de confirmación de eliminación (Material 3 AlertDialog) */}
            {deleteModalEvento && (
              <div className="absolute inset-0 bg-slate-900/60 z-40 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-5 shadow-2xl max-w-[280px] w-full text-center animate-scaleIn">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">¿Eliminar Evento?</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4">
                    "{deleteModalEvento.titulo}" será eliminado de Cloud Firestore.
                  </p>
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => setDeleteModalEvento(null)}
                      className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleDeleteEvento(deleteModalEvento.id)}
                      className="flex-1 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Barra de Navegación del Sistema Android (Pill indicator) */}
            <div className="h-4 bg-[#f0f4ec] flex items-center justify-center shrink-0">
              <div className="w-24 h-1 bg-slate-400/80 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
