package com.wilmervaron.registroeventoscloud.domain.repository

import com.wilmervaron.registroeventoscloud.core.common.Resource
import com.wilmervaron.registroeventoscloud.domain.model.Evento
import kotlinx.coroutines.flow.Flow

interface EventoRepository {
    fun getEventos(usuarioId: String): Flow<Resource<List<Evento>>>
    suspend fun getEventoById(id: String): Resource<Evento>
    suspend fun createEvento(evento: Evento): Resource<String>
    suspend fun updateEvento(evento: Evento): Resource<Unit>
    suspend fun deleteEvento(id: String): Resource<Unit>
}
