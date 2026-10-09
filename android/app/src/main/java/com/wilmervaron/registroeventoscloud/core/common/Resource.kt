package com.wilmervaron.registroeventoscloud.core.common

/**
 * Clase sellada para encapsular los estados de operaciones asíncronas
 * con Firebase y la capa de dominio.
 */
sealed class Resource<out T> {
    data class Success<out T>(val data: T) : Resource<T>()
    data class Error(val message: String, val cause: Throwable? = null) : Resource<Nothing>()
    data object Loading : Resource<Nothing>()
}
