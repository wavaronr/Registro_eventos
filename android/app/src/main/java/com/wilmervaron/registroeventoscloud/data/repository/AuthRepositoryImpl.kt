package com.wilmervaron.registroeventoscloud.data.repository

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.FirebaseAuthUserCollisionException
import com.google.firebase.auth.FirebaseUser
import com.wilmervaron.registroeventoscloud.core.common.Resource
import com.wilmervaron.registroeventoscloud.domain.repository.AuthRepository
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
