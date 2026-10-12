package com.wilmervaron.registroeventoscloud.data.model

import com.wilmervaron.registroeventoscloud.domain.model.EstadoEvento
import com.wilmervaron.registroeventoscloud.domain.model.Evento
import org.junit.Assert.assertEquals
import org.junit.Test

class EventoDtoTest {

    @Test
    fun `toDomain convierte correctamente un EventoDto a modelo de dominio Evento`() {
        val dto = EventoDto(
            id = "evt_123",
            titulo = "Reunión de Proyecto",
            descripcion = "Discusión de arquitectura y seguridad",
            fecha = "2026-10-15",
            estado = "EN_PROGRESO",
            usuarioId = "usr_abc789",
            fechaCreacion = 1700000000000L
        )

        val domain = dto.toDomain()

        assertEquals("evt_123", domain.id)
        assertEquals("Reunión de Proyecto", domain.titulo)
        assertEquals("Discusión de arquitectura y seguridad", domain.descripcion)
        assertEquals("2026-10-15", domain.fecha)
        assertEquals(EstadoEvento.EN_PROGRESO, domain.estado)
        assertEquals("usr_abc789", domain.usuarioId)
        assertEquals(1700000000000L, domain.fechaCreacion)
    }

    @Test
    fun `fromDomain convierte correctamente un modelo Evento a EventoDto`() {
        val domain = Evento(
            id = "evt_456",
            titulo = "Conferencia Android",
            descripcion = "Taller de Jetpack Compose",
            fecha = "2026-11-20",
            estado = EstadoEvento.COMPLETADO,
            usuarioId = "usr_xyz123",
            fechaCreacion = 1710000000000L
        )

        val dto = EventoDto.fromDomain(domain)

        assertEquals("evt_456", dto.id)
        assertEquals("Conferencia Android", dto.titulo)
        assertEquals("Taller de Jetpack Compose", dto.descripcion)
        assertEquals("2026-11-20", dto.fecha)
        assertEquals("COMPLETADO", dto.estado)
        assertEquals("usr_xyz123", dto.usuarioId)
        assertEquals(1710000000000L, dto.fechaCreacion)
    }
}
