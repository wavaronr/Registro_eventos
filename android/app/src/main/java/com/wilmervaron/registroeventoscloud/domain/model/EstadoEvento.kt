package com.wilmervaron.registroeventoscloud.domain.model

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
