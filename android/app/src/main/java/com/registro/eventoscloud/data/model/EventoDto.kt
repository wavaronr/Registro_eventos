package com.registro.eventoscloud.data.model

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
