package com.wilmervaron.registroeventoscloud.core.common

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class ResourceTest {

    @Test
    fun `Resource Success encapsula los datos correctamente`() {
        val result: Resource<String> = Resource.Success("Datos cargados")
        when (result) {
            is Resource.Success -> assertEquals("Datos cargados", result.data)
            else -> throw AssertionError("Se esperaba Resource.Success")
        }
    }

    @Test
    fun `Resource Error encapsula mensaje de error y causa opcional`() {
        val exception = IllegalArgumentException("Parámetro inválido")
        val result: Resource<String> = Resource.Error("Error al procesar", exception)
        
        when (result) {
            is Resource.Error -> {
                assertEquals("Error al procesar", result.message)
                assertEquals(exception, result.cause)
            }
            else -> throw AssertionError("Se esperaba Resource.Error")
        }
    }

    @Test
    fun `Resource Loading representa el estado de carga`() {
        val result: Resource<String> = Resource.Loading
        assertTrue(result is Resource.Loading)
    }
}
