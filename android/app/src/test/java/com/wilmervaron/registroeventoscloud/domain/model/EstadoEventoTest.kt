package com.wilmervaron.registroeventoscloud.domain.model

import org.junit.Assert.assertEquals
import org.junit.Test

class EstadoEventoTest {

    @Test
    fun `fromString convierte cadenas exactas a sus respectivos valores de enum`() {
        assertEquals(EstadoEvento.PENDIENTE, EstadoEvento.fromString("PENDIENTE"))
        assertEquals(EstadoEvento.EN_PROGRESO, EstadoEvento.fromString("EN_PROGRESO"))
        assertEquals(EstadoEvento.COMPLETADO, EstadoEvento.fromString("COMPLETADO"))
        assertEquals(EstadoEvento.CANCELADO, EstadoEvento.fromString("CANCELADO"))
    }

    @Test
    fun `fromString es insensible a mayusculas y minusculas`() {
        assertEquals(EstadoEvento.PENDIENTE, EstadoEvento.fromString("pendiente"))
        assertEquals(EstadoEvento.EN_PROGRESO, EstadoEvento.fromString("En_Progreso"))
        assertEquals(EstadoEvento.COMPLETADO, EstadoEvento.fromString("completado"))
        assertEquals(EstadoEvento.CANCELADO, EstadoEvento.fromString("cAnCeLaDo"))
    }

    @Test
    fun `fromString retorna PENDIENTE por defecto ante valores nulos o desconocidos`() {
        assertEquals(EstadoEvento.PENDIENTE, EstadoEvento.fromString(null))
        assertEquals(EstadoEvento.PENDIENTE, EstadoEvento.fromString("ESTADO_INEXISTENTE"))
        assertEquals(EstadoEvento.PENDIENTE, EstadoEvento.fromString(""))
    }
}
