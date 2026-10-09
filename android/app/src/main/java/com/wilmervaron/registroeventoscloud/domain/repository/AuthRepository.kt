package com.wilmervaron.registroeventoscloud.domain.repository

import com.google.firebase.auth.FirebaseUser
import com.wilmervaron.registroeventoscloud.core.common.Resource
import kotlinx.coroutines.flow.Flow

interface AuthRepository {
    val currentUser: FirebaseUser?
    val authState: Flow<FirebaseUser?>
    
    suspend fun login(email: String, password: String): Resource<FirebaseUser>
    suspend fun register(email: String, password: String): Resource<FirebaseUser>
    suspend fun sendPasswordResetEmail(email: String): Resource<Unit>
    fun signOut()
}
