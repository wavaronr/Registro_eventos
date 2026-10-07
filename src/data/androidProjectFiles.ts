export interface AndroidFile {
  path: string;
  name: string;
  category: 'gradle' | 'manifest' | 'core' | 'data' | 'domain' | 'presentation' | 'rules' | 'docs';
  description: string;
  content: string;
}

export const ANDROID_FILES: AndroidFile[] = [
  {
    path: 'gradle/libs.versions.toml',
    name: 'libs.versions.toml',
    category: 'gradle',
    description: 'Catálogo de versiones centralizado (Version Catalog) con dependencias modernas para Compose y Firebase.',
    content: `[versions]
agp = "8.8.2"
kotlin = "2.1.10"
coreKtx = "1.15.0"
lifecycleRuntimeKtx = "2.8.7"
activityCompose = "1.10.1"
composeBom = "2025.02.00"
navigationCompose = "2.8.8"
coroutines = "1.10.1"
googleServices = "4.4.2"
firebaseBom = "33.10.0"
materialIconsExtended = "1.7.8"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleRuntimeKtx" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-material-icons-extended = { group = "androidx.compose.material", name = "material-icons-extended", version.ref = "materialIconsExtended" }
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }

# Kotlin Coroutines
kotlinx-coroutines-core = { group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-core", version.ref = "coroutines" }
kotlinx-coroutines-android = { group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-android", version.ref = "coroutines" }
kotlinx-coroutines-play-services = { group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-play-services", version.ref = "coroutines" }

# Firebase (Plan Spark - BOM gestiona las versiones compatibles)
firebase-bom = { group = "com.google.firebase", name = "firebase-bom", version.ref = "firebaseBom" }
firebase-auth-ktx = { group = "com.google.firebase", name = "firebase-auth-ktx" }
firebase-firestore-ktx = { group = "com.google.firebase", name = "firebase-firestore-ktx" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
google-services = { id = "com.google.gms.google-services", version.ref = "googleServices" }
`
  },
  {
    path: 'settings.gradle.kts',
    name: 'settings.gradle.kts',
    category: 'gradle',
    description: 'Configuración raíz del proyecto con repositorios Google y Maven Central.',
    content: `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "RegistroEventosCloud"
include(":app")
`
  },
  {
    path: 'build.gradle.kts',
    name: 'build.gradle.kts (Raíz)',
    category: 'gradle',
    description: 'Script de construcción raíz con plugins de Android, Kotlin Compose y Google Services.',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.google.services) apply false
}
`
  },
  {
    path: 'app/build.gradle.kts',
    name: 'app/build.gradle.kts',
    category: 'gradle',
    description: 'Dependencias del módulo app con Jetpack Compose Material 3, Navigation y Firebase.',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.google.services)
}

android {
    namespace = "com.registro.eventoscloud"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.registro.eventoscloud"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        debug {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.activity.compose)

    // Jetpack Compose BOM
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.material.icons.extended)
    implementation(libs.androidx.navigation.compose)

    // Coroutines
    implementation(libs.kotlinx.coroutines.core)
    implementation(libs.kotlinx.coroutines.android)
    implementation(libs.kotlinx.coroutines.play.services)

    // Firebase (Plan Spark - Auth + Firestore)
    implementation(platform(libs.firebase.bom))
    implementation(libs.firebase.auth.ktx)
    implementation(libs.firebase.firestore.ktx)

    debugImplementation(libs.androidx.ui.tooling)
}
`
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    category: 'manifest',
    description: 'Manifiesto de la aplicación con permisos de Internet y configuración de MainActivity.',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Permisos requeridos para Firebase y sincronización en la nube -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:name=".RegistroEventosApp"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.RegistroEventosCloud">
        
        <activity
            android:name=".presentation.MainActivity"
            android:exported="true"
            android:theme="@style/Theme.RegistroEventosCloud"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`
  },
  {
    path: 'firestore.rules',
    name: 'firestore.rules',
    category: 'rules',
    description: 'Reglas de seguridad de Cloud Firestore para Plan Spark en southamerica-east1.',
    content: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Función de ayuda para verificar autenticación
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Función para validar que el usuario actual es dueño del documento
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Colección de eventos
    match /eventos/{eventoId} {
      
      // LECTURA: Solo el usuario que creó el evento puede consultarlo
      allow read: if isAuthenticated() && resource.data.usuarioId == request.auth.uid;
      
      // CREACIÓN: Usuario autenticado, debe asignar su propio UID y campos requeridos
      allow create: if isAuthenticated() 
                    && request.resource.data.usuarioId == request.auth.uid
                    && request.resource.data.titulo is string
                    && request.resource.data.titulo.size() >= 3
                    && request.resource.data.estado in ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADO', 'CANCELADO'];
      
      // ACTUALIZACIÓN: Solo el dueño puede modificar el evento y no puede cambiar el usuarioId
      allow update: if isAuthenticated()
                    && resource.data.usuarioId == request.auth.uid
                    && request.resource.data.usuarioId == request.auth.uid;
      
      // ELIMINACIÓN: Solo el dueño puede eliminar el evento
      allow delete: if isAuthenticated() && resource.data.usuarioId == request.auth.uid;
    }

    // Bloquear acceso a cualquier otra colección por defecto
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/core/common/Resource.kt',
    name: 'Resource.kt',
    category: 'core',
    description: 'Sellado generico de estados (Success, Error, Loading) para ViewModels y Repositorios.',
    content: `package com.registro.eventoscloud.core.common

/**
 * Clase sellada para encapsular los estados de operaciones asíncronas
 * con Firebase y la capa de dominio.
 */
sealed class Resource<out T> {
    data class Success<out T>(val data: T) : Resource<T>()
    data class Error(val message: String, val cause: Throwable? = null) : Resource<Nothing>()
    data object Loading : Resource<Nothing>()
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/domain/model/EstadoEvento.kt',
    name: 'EstadoEvento.kt',
    category: 'domain',
    description: 'Enum con los estados del ciclo de vida de un evento y nombres legibles.',
    content: `package com.registro.eventoscloud.domain.model

/**
 * Estados del ciclo de vida de un evento en RegistroEventosCloud.
 */
enum class EstadoEvento(val titulo: String) {
    PENDIENTE("Pendiente"),
    EN_PROGRESO("En Progreso"),
    COMPLETADO("Completado"),
    CANCELADO("Cancelado");

    companion object {
        fun fromString(value: String?): EstadoEvento {
            return entries.find { it.name.equals(value, ignoreCase = true) } ?: PENDIENTE
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/domain/model/Evento.kt',
    name: 'Evento.kt',
    category: 'domain',
    description: 'Entidad de Dominio que representa un evento de negocio con inmutabilidad.',
    content: `package com.registro.eventoscloud.domain.model

/**
 * Modelo de negocio que representa un evento en la aplicación.
 */
data class Evento(
    val id: String = "",
    val titulo: String,
    val descripcion: String,
    val fecha: String,
    val estado: EstadoEvento = EstadoEvento.PENDIENTE,
    val usuarioId: String,
    val fechaCreacion: Long = System.currentTimeMillis()
)
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/data/model/EventoDto.kt',
    name: 'EventoDto.kt',
    category: 'data',
    description: 'Data Transfer Object para serialización y mapeo directo con Cloud Firestore.',
    content: `package com.registro.eventoscloud.data.model

import com.google.firebase.firestore.DocumentId
import com.registro.eventoscloud.domain.model.EstadoEvento
import com.registro.eventoscloud.domain.model.Evento

/**
 * Data Transfer Object para Firestore.
 * Requiere constructor vacío para la deserialización de Firebase SDK.
 */
data class EventoDto(
    @DocumentId
    val id: String = "",
    val titulo: String = "",
    val descripcion: String = "",
    val fecha: String = "",
    val estado: String = EstadoEvento.PENDIENTE.name,
    val usuarioId: String = "",
    val fechaCreacion: Long = System.currentTimeMillis()
) {
    fun toDomain(): Evento {
        return Evento(
            id = id,
            titulo = titulo,
            descripcion = descripcion,
            fecha = fecha,
            estado = EstadoEvento.fromString(estado),
            usuarioId = usuarioId,
            fechaCreacion = fechaCreacion
        )
    }

    companion object {
        fun fromDomain(evento: Evento): EventoDto {
            return EventoDto(
                id = evento.id,
                titulo = evento.titulo,
                descripcion = evento.descripcion,
                fecha = evento.fecha,
                estado = evento.estado.name,
                usuarioId = evento.usuarioId,
                fechaCreacion = evento.fechaCreacion
            )
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/domain/repository/AuthRepository.kt',
    name: 'AuthRepository.kt',
    category: 'domain',
    description: 'Contrato de repositorio para operaciones de autenticación con Firebase Auth.',
    content: `package com.registro.eventoscloud.domain.repository

import com.google.firebase.auth.FirebaseUser
import com.registro.eventoscloud.core.common.Resource
import kotlinx.coroutines.flow.Flow

interface AuthRepository {
    val currentUser: FirebaseUser?
    val authState: Flow<FirebaseUser?>

    suspend fun login(email: String, password: String): Resource<FirebaseUser>
    suspend fun register(email: String, password: String): Resource<FirebaseUser>
    suspend fun sendPasswordResetEmail(email: String): Resource<Unit>
    fun signOut()
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/domain/repository/EventoRepository.kt',
    name: 'EventoRepository.kt',
    category: 'domain',
    description: 'Contrato de repositorio para operaciones CRUD y flujo reactivo en tiempo real con Firestore.',
    content: `package com.registro.eventoscloud.domain.repository

import com.registro.eventoscloud.core.common.Resource
import com.registro.eventoscloud.domain.model.EstadoEvento
import com.registro.eventoscloud.domain.model.Evento
import kotlinx.coroutines.flow.Flow

interface EventoRepository {
    /**
     * Retorna un Flow reactivo en tiempo real con los eventos del usuario autenticado.
     * Soporta automáticamente la caché offline de Cloud Firestore.
     */
    fun getEventos(usuarioId: String): Flow<Resource<List<Evento>>>

    suspend fun getEventoById(id: String): Resource<Evento>
    suspend fun createEvento(evento: Evento): Resource<String>
    suspend fun updateEvento(evento: Evento): Resource<Unit>
    suspend fun deleteEvento(id: String): Resource<Unit>
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/data/repository/AuthRepositoryImpl.kt',
    name: 'AuthRepositoryImpl.kt',
    category: 'data',
    description: 'Implementación de autenticación usando Firebase Authentication con Coroutines y Flow.',
    content: `package com.registro.eventoscloud.data.repository

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.FirebaseAuthUserCollisionException
import com.google.firebase.auth.FirebaseUser
import com.registro.eventoscloud.core.common.Resource
import com.registro.eventoscloud.domain.repository.AuthRepository
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class AuthRepositoryImpl(
    private val auth: FirebaseAuth = FirebaseAuth.getInstance()
) : AuthRepository {

    override val currentUser: FirebaseUser?
        get() = auth.currentUser

    override val authState: Flow<FirebaseUser?> = callbackFlow {
        val listener = FirebaseAuth.AuthStateListener { firebaseAuth ->
            trySend(firebaseAuth.currentUser)
        }
        auth.addAuthStateListener(listener)
        awaitClose { auth.removeAuthStateListener(listener) }
    }

    override suspend fun login(email: String, password: String): Resource<FirebaseUser> {
        return try {
            val result = auth.signInWithEmailAndPassword(email.trim(), password).await()
            val user = result.user
            if (user != null) {
                Resource.Success(user)
            } else {
                Resource.Error("No se pudo obtener la sesión del usuario")
            }
        } catch (e: FirebaseAuthInvalidCredentialsException) {
            Resource.Error("Correo electrónico o contraseña incorrectos", e)
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error de autenticación", e)
        }
    }

    override suspend fun register(email: String, password: String): Resource<FirebaseUser> {
        return try {
            val result = auth.createUserWithEmailAndPassword(email.trim(), password).await()
            val user = result.user
            if (user != null) {
                Resource.Success(user)
            } else {
                Resource.Error("No se pudo completar el registro")
            }
        } catch (e: FirebaseAuthUserCollisionException) {
            Resource.Error("Ya existe una cuenta con este correo electrónico", e)
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al registrar usuario", e)
        }
    }

    override suspend fun sendPasswordResetEmail(email: String): Resource<Unit> {
        return try {
            auth.sendPasswordResetEmail(email.trim()).await()
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al enviar correo de recuperación", e)
        }
    }

    override fun signOut() {
        auth.signOut()
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/data/repository/EventoRepositoryImpl.kt',
    name: 'EventoRepositoryImpl.kt',
    category: 'data',
    description: 'Implementación del repositorio Firestore con SnapshotListener en tiempo real y soporte offline.',
    content: `package com.registro.eventoscloud.data.repository

import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.registro.eventoscloud.core.common.Resource
import com.registro.eventoscloud.data.model.EventoDto
import com.registro.eventoscloud.domain.model.Evento
import com.registro.eventoscloud.domain.repository.EventoRepository
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class EventoRepositoryImpl(
    private val firestore: FirebaseFirestore = FirebaseFirestore.getInstance()
) : EventoRepository {

    private val eventosCollection = firestore.collection("eventos")

    override fun getEventos(usuarioId: String): Flow<Resource<List<Evento>>> = callbackFlow {
        trySend(Resource.Loading)

        // Consulta filtrada por usuarioId y ordenada cronológicamente
        // Firestore offline cache funciona automáticamente con snapshot listener
        val query = eventosCollection
            .whereEqualTo("usuarioId", usuarioId)
            .orderBy("fechaCreacion", Query.Direction.DESCENDING)

        val listenerRegistration = query.addSnapshotListener { snapshot, error ->
            if (error != null) {
                trySend(Resource.Error("Error al sincronizar eventos: \${error.localizedMessage}", error))
                return@addSnapshotListener
            }

            if (snapshot != null) {
                val eventos = snapshot.documents.mapNotNull { doc ->
                    doc.toObject(EventoDto::class.java)?.copy(id = doc.id)?.toDomain()
                }
                trySend(Resource.Success(eventos))
            }
        }

        awaitClose {
            listenerRegistration.remove()
        }
    }

    override suspend fun getEventoById(id: String): Resource<Evento> {
        return try {
            val doc = eventosCollection.document(id).get().await()
            val dto = doc.toObject(EventoDto::class.java)
            if (dto != null) {
                Resource.Success(dto.copy(id = doc.id).toDomain())
            } else {
                Resource.Error("Evento no encontrado")
            }
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al obtener evento", e)
        }
    }

    override suspend fun createEvento(evento: Evento): Resource<String> {
        return try {
            val dto = EventoDto.fromDomain(evento)
            // Genera nuevo ID de documento automáticamente en Firestore
            val docRef = eventosCollection.add(dto).await()
            Resource.Success(docRef.id)
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al crear evento", e)
        }
    }

    override suspend fun updateEvento(evento: Evento): Resource<Unit> {
        return try {
            val dto = EventoDto.fromDomain(evento)
            eventosCollection.document(evento.id).set(dto).await()
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al actualizar evento", e)
        }
    }

    override suspend fun deleteEvento(id: String): Resource<Unit> {
        return try {
            eventosCollection.document(id).delete().await()
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al eliminar evento", e)
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/domain/usecase/auth/AuthUseCases.kt',
    name: 'AuthUseCases.kt',
    category: 'domain',
    description: 'Casos de uso limpios para autenticación: Login, Registro, Recuperación y Cierre de Sesión.',
    content: `package com.registro.eventoscloud.domain.usecase.auth

import com.google.firebase.auth.FirebaseUser
import com.registro.eventoscloud.core.common.Resource
import com.registro.eventoscloud.domain.repository.AuthRepository
import kotlinx.coroutines.flow.Flow

class LoginUseCase(private val repository: AuthRepository) {
    suspend operator fun invoke(email: String, pass: String): Resource<FirebaseUser> {
        if (email.isBlank() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            return Resource.Error("Por favor ingresa un correo electrónico válido")
        }
        if (pass.length < 6) {
            return Resource.Error("La contraseña debe tener al menos 6 caracteres")
        }
        return repository.login(email, pass)
    }
}

class RegisterUseCase(private val repository: AuthRepository) {
    suspend operator fun invoke(email: String, pass: String, confirmPass: String): Resource<FirebaseUser> {
        if (email.isBlank() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            return Resource.Error("Por favor ingresa un correo electrónico válido")
        }
        if (pass.length < 6) {
            return Resource.Error("La contraseña debe tener mínimo 6 caracteres")
        }
        if (pass != confirmPass) {
            return Resource.Error("Las contraseñas no coinciden")
        }
        return repository.register(email, pass)
    }
}

class ResetPasswordUseCase(private val repository: AuthRepository) {
    suspend operator fun invoke(email: String): Resource<Unit> {
        if (email.isBlank() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            return Resource.Error("Por favor ingresa un correo electrónico válido")
        }
        return repository.sendPasswordResetEmail(email)
    }
}

class SignOutUseCase(private val repository: AuthRepository) {
    operator fun invoke() = repository.signOut()
}

class GetCurrentUserUseCase(private val repository: AuthRepository) {
    operator fun invoke(): FirebaseUser? = repository.currentUser
    val authState: Flow<FirebaseUser?> = repository.authState
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/domain/usecase/evento/EventoUseCases.kt',
    name: 'EventoUseCases.kt',
    category: 'domain',
    description: 'Casos de uso para eventos: Get, Create, Update, Delete y filtrado por estado.',
    content: `package com.registro.eventoscloud.domain.usecase.evento

import com.registro.eventoscloud.core.common.Resource
import com.registro.eventoscloud.domain.model.EstadoEvento
import com.registro.eventoscloud.domain.model.Evento
import com.registro.eventoscloud.domain.repository.EventoRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class GetEventosUseCase(private val repository: EventoRepository) {
    operator fun invoke(usuarioId: String): Flow<Resource<List<Evento>>> {
        return repository.getEventos(usuarioId)
    }
}

class CreateEventoUseCase(private val repository: EventoRepository) {
    suspend operator fun invoke(
        titulo: String,
        descripcion: String,
        fecha: String,
        estado: EstadoEvento,
        usuarioId: String
    ): Resource<String> {
        if (titulo.trim().length < 3) {
            return Resource.Error("El título debe tener al menos 3 caracteres")
        }
        if (fecha.isBlank()) {
            return Resource.Error("Debes especificar la fecha del evento")
        }
        val nuevoEvento = Evento(
            titulo = titulo.trim(),
            descripcion = descripcion.trim(),
            fecha = fecha.trim(),
            estado = estado,
            usuarioId = usuarioId
        )
        return repository.createEvento(nuevoEvento)
    }
}

class UpdateEventoUseCase(private val repository: EventoRepository) {
    suspend operator fun invoke(evento: Evento): Resource<Unit> {
        if (evento.titulo.trim().length < 3) {
            return Resource.Error("El título debe tener al menos 3 caracteres")
        }
        return repository.updateEvento(evento)
    }
}

class DeleteEventoUseCase(private val repository: EventoRepository) {
    suspend operator fun invoke(id: String): Resource<Unit> {
        if (id.isBlank()) return Resource.Error("ID de evento inválido")
        return repository.deleteEvento(id)
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/presentation/navigation/Screen.kt',
    name: 'Screen.kt',
    category: 'presentation',
    description: 'Rutas selladas y argumentos seguros para Jetpack Navigation Compose.',
    content: `package com.registro.eventoscloud.presentation.navigation

sealed class Screen(val route: String) {
    data object Login : Screen("login")
    data object Register : Screen("register")
    data object ForgotPassword : Screen("forgot_password")
    data object EventosList : Screen("eventos_list")
    data object CreateEvento : Screen("create_evento")
    data object EditEvento : Screen("edit_evento/{eventoId}") {
        fun createRoute(eventoId: String) = "edit_evento/\$eventoId"
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/presentation/auth/login/LoginViewModel.kt',
    name: 'LoginViewModel.kt',
    category: 'presentation',
    description: 'ViewModel con StateFlow para gestión reactiva de inicio de sesión y validaciones.',
    content: `package com.registro.eventoscloud.presentation.auth.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.registro.eventoscloud.core.common.Resource
import com.registro.eventoscloud.domain.usecase.auth.LoginUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class LoginUiState(
    val email: String = "",
    val pass: String = "",
    val isLoading: Boolean = false,
    val errorMessage: String? = null,
    val isSuccess: Boolean = false
)

class LoginViewModel(
    private val loginUseCase: LoginUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow(LoginUiState())
    val uiState: StateFlow<LoginUiState> = _uiState.asStateFlow()

    fun onEmailChanged(email: String) {
        _uiState.update { it.copy(email = email, errorMessage = null) }
    }

    fun onPasswordChanged(pass: String) {
        _uiState.update { it.copy(pass = pass, errorMessage = null) }
    }

    fun login() {
        val email = _uiState.value.email
        val pass = _uiState.value.pass

        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }
            when (val result = loginUseCase(email, pass)) {
                is Resource.Success -> {
                    _uiState.update { it.copy(isLoading = false, isSuccess = true) }
                }
                is Resource.Error -> {
                    _uiState.update { it.copy(isLoading = false, errorMessage = result.message) }
                }
                is Resource.Loading -> {
                    _uiState.update { it.copy(isLoading = true) }
                }
            }
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/presentation/auth/login/LoginScreen.kt',
    name: 'LoginScreen.kt',
    category: 'presentation',
    description: 'Pantalla Compose con Material Design 3, campos de texto animados y validación en vivo.',
    content: `package com.registro.eventoscloud.presentation.auth.login

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp

@Composable
fun LoginScreen(
    state: LoginUiState,
    onEmailChange: (String) -> Unit,
    onPasswordChange: (String) -> Unit,
    onLoginClick: () -> Unit,
    onNavigateToRegister: () -> Unit,
    onNavigateToForgotPassword: () -> Unit,
    modifier: Modifier = Modifier
) {
    var passwordVisible by remember { mutableStateOf(false) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "RegistroEventosCloud",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        Text(
            text = "Sincronización en tiempo real con Firestore",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(top = 4.dp, bottom = 32.dp)
        )

        OutlinedTextField(
            value = state.email,
            onValueChange = onEmailChange,
            label = { Text("Correo Electrónico") },
            leadingIcon = { Icon(Icons.Default.Email, contentDescription = "Email") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = state.pass,
            onValueChange = onPasswordChange,
            label = { Text("Contraseña") },
            leadingIcon = { Icon(Icons.Default.Lock, contentDescription = "Contraseña") },
            trailingIcon = {
                IconButton(onClick = { passwordVisible = !passwordVisible }) {
                    Icon(
                        imageVector = if (passwordVisible) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                        contentDescription = "Alternar contraseña"
                    )
                }
            },
            visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        state.errorMessage?.let { error ->
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = error,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = onLoginClick,
            enabled = !state.isLoading,
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp)
        ) {
            if (state.isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp),
                    color = MaterialTheme.colorScheme.onPrimary,
                    strokeWidth = 2.dp
                )
            } else {
                Text("Iniciar Sesión", fontWeight = FontWeight.SemiBold)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        TextButton(onClick = onNavigateToForgotPassword) {
            Text("¿Olvidaste tu contraseña?")
        }

        Spacer(modifier = Modifier.height(8.dp))

        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("¿No tienes cuenta? ", style = MaterialTheme.typography.bodyMedium)
            TextButton(onClick = onNavigateToRegister) {
                Text("Regístrate aquí", fontWeight = FontWeight.Bold)
            }
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/presentation/eventos/list/EventosListViewModel.kt',
    name: 'EventosListViewModel.kt',
    category: 'presentation',
    description: 'ViewModel para listado de eventos con filtrado por estado, búsqueda y eliminación reactiva.',
    content: `package com.registro.eventoscloud.presentation.eventos.list

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.registro.eventoscloud.core.common.Resource
import com.registro.eventoscloud.domain.model.EstadoEvento
import com.registro.eventoscloud.domain.model.Evento
import com.registro.eventoscloud.domain.usecase.auth.SignOutUseCase
import com.registro.eventoscloud.domain.usecase.evento.DeleteEventoUseCase
import com.registro.eventoscloud.domain.usecase.evento.GetEventosUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class EventosUiState(
    val eventos: List<Evento> = emptyList(),
    val isLoading: Boolean = false,
    val filtroEstado: EstadoEvento? = null,
    val queryBusqueda: String = "",
    val errorMessage: String? = null
)

class EventosListViewModel(
    private val usuarioId: String,
    private val getEventosUseCase: GetEventosUseCase,
    private val deleteEventoUseCase: DeleteEventoUseCase,
    private val signOutUseCase: SignOutUseCase
) : ViewModel() {

    private val _filtroEstado = MutableStateFlow<EstadoEvento?>(null)
    private val _queryBusqueda = MutableStateFlow("")
    private val _rawEventosState = MutableStateFlow<Resource<List<Evento>>>(Resource.Loading)

    init {
        observarEventos()
    }

    private fun observarEventos() {
        viewModelScope.launch {
            getEventosUseCase(usuarioId).collect { resource ->
                _rawEventosState.value = resource
            }
        }
    }

    val uiState: StateFlow<EventosUiState> = combine(
        _rawEventosState,
        _filtroEstado,
        _queryBusqueda
    ) { resource, filtro, query ->
        when (resource) {
            is Resource.Loading -> EventosUiState(isLoading = true, filtroEstado = filtro, queryBusqueda = query)
            is Resource.Error -> EventosUiState(errorMessage = resource.message, filtroEstado = filtro, queryBusqueda = query)
            is Resource.Success -> {
                val filtrados = resource.data.filter { evento ->
                    val coincideEstado = filtro == null || evento.estado == filtro
                    val coincideQuery = query.isBlank() ||
                            evento.titulo.contains(query, ignoreCase = true) ||
                            evento.descripcion.contains(query, ignoreCase = true)
                    coincideEstado && coincideQuery
                }
                EventosUiState(
                    eventos = filtrados,
                    isLoading = false,
                    filtroEstado = filtro,
                    queryBusqueda = query
                )
            }
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = EventosUiState(isLoading = true)
    )

    fun onFiltroChanged(estado: EstadoEvento?) {
        _filtroEstado.value = estado
    }

    fun onQueryChanged(query: String) {
        _queryBusqueda.value = query
    }

    fun eliminarEvento(id: String) {
        viewModelScope.launch {
            deleteEventoUseCase(id)
        }
    }

    fun cerrarSesion() {
        signOutUseCase()
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/presentation/eventos/list/EventosListScreen.kt',
    name: 'EventosListScreen.kt',
    category: 'presentation',
    description: 'Pantalla Compose con chips de estado, tarjeta con badge de color, FAB y diálogo de confirmación.',
    content: `package com.registro.eventoscloud.presentation.eventos.list

import androidx.compose.animation.*
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.registro.eventoscloud.domain.model.EstadoEvento
import com.registro.eventoscloud.domain.model.Evento

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EventosListScreen(
    state: EventosUiState,
    onFilterChange: (EstadoEvento?) -> Unit,
    onSearchChange: (String) -> Unit,
    onEventoClick: (Evento) -> Unit,
    onDeleteEvento: (String) -> Unit,
    onCreateClick: () -> Unit,
    onSignOutClick: () -> Unit
) {
    var eventoAEliminar by remember { mutableStateOf<Evento?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text("RegistroEventosCloud", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                        Text("Sincronizado con Firestore", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                },
                actions = {
                    IconButton(onClick = onSignOutClick) {
                        Icon(Icons.Default.ExitToApp, contentDescription = "Cerrar sesión")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = onCreateClick,
                containerColor = MaterialTheme.colorScheme.primaryContainer,
                contentColor = MaterialTheme.colorScheme.onPrimaryContainer
            ) {
                Icon(Icons.Default.Add, contentDescription = "Crear nuevo evento")
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Buscador rápido
            OutlinedTextField(
                value = state.queryBusqueda,
                onValueChange = onSearchChange,
                placeholder = { Text("Buscar evento por título...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                trailingIcon = {
                    if (state.queryBusqueda.isNotEmpty()) {
                        IconButton(onClick = { onSearchChange("") }) {
                            Icon(Icons.Default.Clear, contentDescription = "Limpiar")
                        }
                    }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                singleLine = true
            )

            // Filtros de estado por Chips
            LazyRow(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                item {
                    FilterChip(
                        selected = state.filtroEstado == null,
                        onClick = { onFilterChange(null) },
                        label = { Text("Todos") }
                    )
                }
                items(EstadoEvento.entries) { estado ->
                    FilterChip(
                        selected = state.filtroEstado == estado,
                        onClick = { onFilterChange(if (state.filtroEstado == estado) null else estado) },
                        label = { Text(estado.titulo) }
                    )
                }
            }

            // Contenido principal
            Box(modifier = Modifier.fillMaxSize()) {
                if (state.isLoading) {
                    CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                } else if (state.eventos.isEmpty()) {
                    EmptyEventosView(modifier = Modifier.align(Alignment.Center))
                } else {
                    LazyColumn(
                        modifier = Modifier.fillMaxSize(),
                        contentPadding = PaddingValues(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        items(state.eventos, key = { it.id }) { evento ->
                            EventoItemCard(
                                evento = evento,
                                onClick = { onEventoClick(evento) },
                                onDelete = { eventoAEliminar = evento }
                            )
                        }
                    }
                }
            }
        }

        // Diálogo de confirmación de eliminación
        eventoAEliminar?.let { evento ->
            AlertDialog(
                onDismissRequest = { eventoAEliminar = null },
                title = { Text("Eliminar Evento") },
                text = { Text("¿Deseas eliminar permanentemente '\${evento.titulo}'? Esta acción se sincronizará con Firestore.") },
                confirmButton = {
                    TextButton(
                        onClick = {
                            onDeleteEvento(evento.id)
                            eventoAEliminar = null
                        }
                    ) {
                        Text("Eliminar", color = MaterialTheme.colorScheme.error)
                    }
                },
                dismissButton = {
                    TextButton(onClick = { eventoAEliminar = null }) {
                        Text("Cancelar")
                    }
                }
            )
        }
    }
}

@Composable
fun EventoItemCard(
    evento: Evento,
    onClick: () -> Unit,
    onDelete: () -> Unit,
    modifier: Modifier = Modifier
) {
    val (estadoColor, estadoBg) = when (evento.estado) {
        EstadoEvento.PENDIENTE -> Color(0xFFD97706) to Color(0xFFFEF3C7)
        EstadoEvento.EN_PROGRESO -> Color(0xFF2563EB) to Color(0xFFDBEAFE)
        EstadoEvento.COMPLETADO -> Color(0xFF16A34A) to Color(0xFFDCFCE7)
        EstadoEvento.CANCELADO -> Color(0xFFDC2626) to Color(0xFFFEE2E2)
    }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onClick() },
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Surface(
                    color = estadoBg,
                    shape = MaterialTheme.shapes.small
                ) {
                    Text(
                        text = evento.estado.titulo,
                        color = estadoColor,
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }

                IconButton(onClick = onDelete) {
                    Icon(
                        Icons.Default.Delete,
                        contentDescription = "Eliminar",
                        tint = MaterialTheme.colorScheme.error
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = evento.titulo,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )

            if (evento.descripcion.isNotBlank()) {
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = evento.descripcion,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    Icons.Default.DateRange,
                    contentDescription = null,
                    modifier = Modifier.size(16.dp),
                    tint = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = evento.fecha,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}

@Composable
fun EmptyEventosView(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier.padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(
            Icons.Default.EventNote,
            contentDescription = null,
            modifier = Modifier.size(64.dp),
            tint = MaterialTheme.colorScheme.outline
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = "No hay eventos registrados",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.SemiBold
        )
        Text(
            text = "Presiona el botón '+' para crear tu primer evento.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/presentation/eventos/create_edit/CreateEditEventoScreen.kt',
    name: 'CreateEditEventoScreen.kt',
    category: 'presentation',
    description: 'Formulario reactivo para Crear y Editar eventos con selector de estado y validaciones.',
    content: `package com.registro.eventoscloud.presentation.eventos.create_edit

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.registro.eventoscloud.domain.model.EstadoEvento

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreateEditEventoScreen(
    esEdicion: Boolean,
    titulo: String,
    descripcion: String,
    fecha: String,
    estado: EstadoEvento,
    isLoading: Boolean,
    errorMessage: String?,
    onTituloChange: (String) -> Unit,
    onDescripcionChange: (String) -> Unit,
    onFechaChange: (String) -> Unit,
    onEstadoChange: (EstadoEvento) -> Unit,
    onGuardarClick: () -> Unit,
    onBackClick: () -> Unit
) {
    var dropdownExpanded by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (esEdicion) "Editar Evento" else "Nuevo Evento") },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Regresar")
                    }
                }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(20.dp)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            OutlinedTextField(
                value = titulo,
                onValueChange = onTituloChange,
                label = { Text("Título del Evento *") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )

            OutlinedTextField(
                value = fecha,
                onValueChange = onFechaChange,
                label = { Text("Fecha (Ej: 2026-11-15) *") },
                leadingIcon = { Icon(Icons.Default.DateRange, contentDescription = null) },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )

            // Selector de Estado
            ExposedDropdownMenuBox(
                expanded = dropdownExpanded,
                onExpandedChange = { dropdownExpanded = !dropdownExpanded }
            ) {
                OutlinedTextField(
                    value = estado.titulo,
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("Estado del Evento") },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = dropdownExpanded) },
                    modifier = Modifier
                        .menuAnchor(MenuAnchorType.PrimaryNotEditable)
                        .fillMaxWidth()
                )
                ExposedDropdownMenu(
                    expanded = dropdownExpanded,
                    onDismissRequest = { dropdownExpanded = false }
                ) {
                    EstadoEvento.entries.forEach { opcion ->
                        DropdownMenuItem(
                            text = { Text(opcion.titulo) },
                            onClick = {
                                onEstadoChange(opcion)
                                dropdownExpanded = false
                            }
                        )
                    }
                }
            }

            OutlinedTextField(
                value = descripcion,
                onValueChange = onDescripcionChange,
                label = { Text("Descripción del Evento") },
                minLines = 4,
                maxLines = 6,
                modifier = Modifier.fillMaxWidth()
            )

            errorMessage?.let { error ->
                Text(
                    text = error,
                    color = MaterialTheme.colorScheme.error,
                    style = MaterialTheme.typography.bodySmall
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Button(
                onClick = onGuardarClick,
                enabled = !isLoading && titulo.isNotBlank() && fecha.isNotBlank(),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp)
            ) {
                if (isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(24.dp),
                        color = MaterialTheme.colorScheme.onPrimary
                    )
                } else {
                    Text(
                        text = if (esEdicion) "Guardar Cambios" else "Crear Evento en la Nube",
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/presentation/navigation/NavGraph.kt',
    name: 'NavGraph.kt',
    category: 'presentation',
    description: 'Grafo de navegación Compose con soporte para usuario autenticado y rutas dinámicas.',
    content: `package com.registro.eventoscloud.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.google.firebase.auth.FirebaseUser

@Composable
fun RegistroEventosNavGraph(
    currentUser: FirebaseUser?,
    navController: NavHostController = rememberNavController()
) {
    val startDestination = if (currentUser != null) Screen.EventosList.route else Screen.Login.route

    NavHost(
        navController = navController,
        startDestination = startDestination
    ) {
        composable(Screen.Login.route) {
            // Instancia de LoginScreen conectada a su ViewModel
        }
        composable(Screen.Register.route) {
            // Instancia de RegisterScreen conectada a su ViewModel
        }
        composable(Screen.ForgotPassword.route) {
            // Instancia de ForgotPasswordScreen conectada a su ViewModel
        }
        composable(Screen.EventosList.route) {
            // Instancia de EventosListScreen conectada a su ViewModel
        }
        composable(Screen.CreateEvento.route) {
            // Instancia de CreateEditEventoScreen para creación
        }
        composable(Screen.EditEvento.route) { backStackEntry ->
            val eventoId = backStackEntry.arguments?.getString("eventoId") ?: ""
            // Instancia de CreateEditEventoScreen para edición
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/RegistroEventosApp.kt',
    name: 'RegistroEventosApp.kt',
    category: 'core',
    description: 'Application class para inicialización de Firebase y persistencia offline de Firestore.',
    content: `package com.registro.eventoscloud

import android.app.Application
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FirebaseFirestoreSettings
import com.google.firebase.firestore.PersistentCacheSettings

class RegistroEventosApp : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Habilitar caché offline persistente para Cloud Firestore (Plan Spark)
        val firestore = FirebaseFirestore.getInstance()
        val settings = FirebaseFirestoreSettings.Builder()
            .setLocalCacheSettings(
                PersistentCacheSettings.newBuilder()
                    .setSizeBytes(PersistentCacheSettings.CACHE_SIZE_UNLIMITED)
                    .build()
            )
            .build()
        firestore.firestoreSettings = settings
    }
}
`
  },
  {
    path: 'app/src/main/java/com/registro/eventoscloud/presentation/MainActivity.kt',
    name: 'MainActivity.kt',
    category: 'presentation',
    description: 'Punto de entrada Activity con tema Material 3 y verificación de estado de autenticación.',
    content: `package com.registro.eventoscloud.presentation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import com.google.firebase.auth.FirebaseAuth
import com.registro.eventoscloud.presentation.navigation.RegistroEventosNavGraph

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val auth = FirebaseAuth.getInstance()
        val currentUser = auth.currentUser

        setContent {
            MaterialTheme {
                Surface(color = MaterialTheme.colorScheme.background) {
                    RegistroEventosNavGraph(currentUser = currentUser)
                }
            }
        }
    }
}
`
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'docs',
    description: 'Instrucciones paso a paso para abrir en Android Studio y conectar google-services.json.',
    content: `# RegistroEventosCloud - Aplicación Android con Jetpack Compose & Firebase

Aplicación nativa Android desarrollada en **Kotlin**, **Jetpack Compose (Material Design 3)** y **Firebase (Authentication & Cloud Firestore)** bajo **Clean Architecture** y patrón **MVVM + StateFlow**.

---

## 🚀 Pasos para ejecutar en Android Studio

1. **Descarga o clona este proyecto.**
2. Copia tu archivo existente \`google-services.json\` dentro de la carpeta:
   \`app/google-services.json\`
3. Abre **Android Studio** (Koala / Ladybug o superior).
4. Selecciona **Open** y elige la carpeta raíz del proyecto.
5. Permite que Gradle sincronice las dependencias del archivo \`libs.versions.toml\`.
6. Conecta un dispositivo físico o inicia un Emulador Android (API 24 o superior).
7. Haz clic en **Run 'app'** (\`Shift + F10\`).

---

## 🛡️ Reglas de Seguridad de Cloud Firestore

En la consola de Firebase (\`southamerica-east1\` São Paulo):
1. Ve a **Firestore Database** > pestaña **Reglas**.
2. Copia y pega el contenido del archivo \`firestore.rules\` incluido en este repositorio.
3. Haz clic en **Publicar**.

Cada usuario autenticado solo podrá leer, crear, actualizar y eliminar sus propios eventos.
`
  }
];
