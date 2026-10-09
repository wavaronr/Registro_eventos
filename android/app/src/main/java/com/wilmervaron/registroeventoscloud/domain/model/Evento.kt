package com.wilmervaron.registroeventoscloud.domain.model

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
