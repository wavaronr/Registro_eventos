package com.wilmervaron.registroeventoscloud.presentation

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.lifecycle.lifecycleScope
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.wilmervaron.registroeventoscloud.core.common.Resource
import com.wilmervaron.registroeventoscloud.data.repository.EventoRepositoryImpl
import com.wilmervaron.registroeventoscloud.domain.model.EstadoEvento
import com.wilmervaron.registroeventoscloud.domain.model.Evento
import com.wilmervaron.registroeventoscloud.presentation.auth.login.LoginScreen
import com.wilmervaron.registroeventoscloud.presentation.auth.login.LoginUiState
import com.wilmervaron.registroeventoscloud.presentation.eventos.create_edit.CreateEditEventoScreen
import com.wilmervaron.registroeventoscloud.presentation.eventos.list.EventosListScreen
import com.wilmervaron.registroeventoscloud.presentation.eventos.list.EventosUiState
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    private val auth by lazy { FirebaseAuth.getInstance() }
    private val eventoRepository by lazy { EventoRepositoryImpl() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            var currentUser by remember { mutableStateOf<FirebaseUser?>(auth.currentUser) }
            var currentScreen by remember { mutableStateOf("home") } // "home", "create_evento", "edit_evento"
            var loginState by remember { mutableStateOf(LoginUiState()) }
            var eventosState by remember { mutableStateOf(EventosUiState()) }

            // Estado para crear/editar evento
            var tituloEvento by remember { mutableStateOf("") }
            var descripcionEvento by remember { mutableStateOf("") }
            var fechaEvento by remember { mutableStateOf("") }
            var estadoEvento by remember { mutableStateOf(EstadoEvento.PENDIENTE) }
            var eventoEnEdicionId by remember { mutableStateOf<String?>(null) }
            var isSavingEvento by remember { mutableStateOf(false) }

            // Escuchar cambios de autenticación
            DisposableEffect(Unit) {
                val listener = FirebaseAuth.AuthStateListener { firebaseAuth ->
                    currentUser = firebaseAuth.currentUser
                }
                auth.addAuthStateListener(listener)
                onDispose { auth.removeAuthStateListener(listener) }
            }

            // Escuchar eventos en tiempo real desde Firestore cuando el usuario esté autenticado
            LaunchedEffect(currentUser?.uid) {
                val user = currentUser
                if (user != null) {
                    eventoRepository.getEventos(user.uid).collect { resource ->
                        when (resource) {
                            is Resource.Loading -> {
                                eventosState = eventosState.copy(isLoading = true)
                            }
                            is Resource.Success -> {
                                eventosState = eventosState.copy(eventos = resource.data, isLoading = false, errorMessage = null)
                            }
                            is Resource.Error -> {
                                eventosState = eventosState.copy(isLoading = false, errorMessage = resource.message)
                            }
                        }
                    }
                }
            }

            MaterialTheme {
                Surface(color = MaterialTheme.colorScheme.background) {
                    val user = currentUser
                    if (user == null) {
                        // Pantalla de Inicio de Sesión
                        LoginScreen(
                            state = loginState,
                            onEmailChange = { loginState = loginState.copy(email = it, errorMessage = null) },
                            onPasswordChange = { loginState = loginState.copy(pass = it, errorMessage = null) },
                            onLoginClick = {
                                if (loginState.email.isBlank() || loginState.pass.isBlank()) {
                                    loginState = loginState.copy(errorMessage = "Ingresa correo y contraseña")
                                    return@LoginScreen
                                }
                                loginState = loginState.copy(isLoading = true, errorMessage = null)
                                auth.signInWithEmailAndPassword(loginState.email.trim(), loginState.pass)
                                    .addOnSuccessListener {
                                        loginState = loginState.copy(isLoading = false, isSuccess = true)
                                    }
                                    .addOnFailureListener { exc ->
                                        loginState = loginState.copy(isLoading = false, errorMessage = exc.localizedMessage ?: "Error al iniciar sesión")
                                    }
                            },
                            onNavigateToRegister = {
                                if (loginState.email.isBlank() || loginState.pass.isBlank()) {
                                    loginState = loginState.copy(errorMessage = "Ingresa correo y contraseña para registrarte")
                                    return@LoginScreen
                                }
                                loginState = loginState.copy(isLoading = true, errorMessage = null)
                                auth.createUserWithEmailAndPassword(loginState.email.trim(), loginState.pass)
                                    .addOnSuccessListener {
                                        Toast.makeText(this, "Registro exitoso", Toast.LENGTH_SHORT).show()
                                        loginState = loginState.copy(isLoading = false)
                                    }
                                    .addOnFailureListener { exc ->
                                        loginState = loginState.copy(isLoading = false, errorMessage = exc.localizedMessage ?: "Error en el registro")
                                    }
                            },
                            onNavigateToForgotPassword = {
                                if (loginState.email.isBlank()) {
                                    loginState = loginState.copy(errorMessage = "Ingresa tu correo para recuperar contraseña")
                                    return@LoginScreen
                                }
                                auth.sendPasswordResetEmail(loginState.email.trim())
                                    .addOnSuccessListener {
                                        Toast.makeText(this, "Correo de recuperación enviado", Toast.LENGTH_LONG).show()
                                    }
                                    .addOnFailureListener { exc ->
                                        loginState = loginState.copy(errorMessage = exc.localizedMessage)
                                    }
                            }
                        )
                    } else {
                        // Usuario Autenticado
                        when (currentScreen) {
                            "home" -> {
                                EventosListScreen(
                                    state = eventosState,
                                    onFilterChange = { eventosState = eventosState.copy(filtroEstado = it) },
                                    onSearchChange = { eventosState = eventosState.copy(queryBusqueda = it) },
                                    onEventoClick = { evento ->
                                        eventoEnEdicionId = evento.id
                                        tituloEvento = evento.titulo
                                        descripcionEvento = evento.descripcion
                                        fechaEvento = evento.fecha
                                        estadoEvento = evento.estado
                                        currentScreen = "edit_evento"
                                    },
                                    onDeleteEvento = { id ->
                                        lifecycleScope.launch {
                                            eventoRepository.deleteEvento(id)
                                        }
                                    },
                                    onCreateClick = {
                                        eventoEnEdicionId = null
                                        tituloEvento = ""
                                        descripcionEvento = ""
                                        fechaEvento = "2026-10-07"
                                        estadoEvento = EstadoEvento.PENDIENTE
                                        currentScreen = "create_evento"
                                    },
                                    onSignOutClick = {
                                        auth.signOut()
                                    }
                                )
                            }
                            "create_evento", "edit_evento" -> {
                                CreateEditEventoScreen(
                                    esEdicion = eventoEnEdicionId != null,
                                    titulo = tituloEvento,
                                    descripcion = descripcionEvento,
                                    fecha = fechaEvento,
                                    estado = estadoEvento,
                                    isLoading = isSavingEvento,
                                    errorMessage = null,
                                    onTituloChange = { tituloEvento = it },
                                    onDescripcionChange = { descripcionEvento = it },
                                    onFechaChange = { fechaEvento = it },
                                    onEstadoChange = { estadoEvento = it },
                                    onGuardarClick = {
                                        isSavingEvento = true
                                        lifecycleScope.launch {
                                            val nuevoEvento = Evento(
                                                id = eventoEnEdicionId ?: "",
                                                titulo = tituloEvento,
                                                descripcion = descripcionEvento,
                                                fecha = fechaEvento,
                                                estado = estadoEvento,
                                                usuarioId = user.uid
                                            )
                                            if (eventoEnEdicionId != null) {
                                                eventoRepository.updateEvento(nuevoEvento)
                                            } else {
                                                eventoRepository.createEvento(nuevoEvento)
                                            }
                                            isSavingEvento = false
                                            currentScreen = "home"
                                        }
                                    },
                                    onBackClick = {
                                        currentScreen = "home"
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
