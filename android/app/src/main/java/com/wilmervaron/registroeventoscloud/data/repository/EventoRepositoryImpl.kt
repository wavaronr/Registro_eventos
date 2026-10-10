package com.wilmervaron.registroeventoscloud.data.repository

import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.wilmervaron.registroeventoscloud.core.common.Resource
import com.wilmervaron.registroeventoscloud.data.model.EventoDto
import com.wilmervaron.registroeventoscloud.domain.model.Evento
import com.wilmervaron.registroeventoscloud.domain.repository.EventoRepository
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class EventoRepositoryImpl(
    private val firestore: FirebaseFirestore = FirebaseFirestore.getInstance()
) : EventoRepository {

    private val eventosCollection = firestore.collection("eventos")

    override fun getEventos(usuarioId: String): Flow<Resource<List<Evento>>> = callbackFlow {
        trySend(Resource.Loading)

        // Consulta filtrada por usuarioId (ordenamiento en memoria para evitar requerir índice compuesto en Firestore)
        val query = eventosCollection
            .whereEqualTo("usuarioId", usuarioId)

        val listenerRegistration = query.addSnapshotListener { snapshot, error ->
            if (error != null) {
                trySend(Resource.Error("Error de Firestore: ${error.localizedMessage}", error))
                return@addSnapshotListener
            }

            if (snapshot != null) {
                val eventos = snapshot.documents.mapNotNull { doc ->
                    doc.toObject(EventoDto::class.java)?.copy(id = doc.id)?.toDomain()
                }.sortedByDescending { it.fechaCreacion }
                trySend(Resource.Success(eventos))
            }
        }

        awaitClose {
            listenerRegistration.remove()
        }
    }

    override suspend fun getEventoById(id: String): Resource<Evento> {
        return try {
            val doc = eventosCollection.document(id).get().await()
            val dto = doc.toObject(EventoDto::class.java)
            if (dto != null) {
                Resource.Success(dto.copy(id = doc.id).toDomain())
            } else {
                Resource.Error("Evento no encontrado")
            }
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al obtener evento", e)
        }
    }

    override suspend fun createEvento(evento: Evento): Resource<String> {
        return try {
            val dto = EventoDto.fromDomain(evento)
            // Genera nuevo ID de documento automáticamente en Firestore
            val docRef = eventosCollection.add(dto).await()
            Resource.Success(docRef.id)
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al crear evento", e)
        }
    }

    override suspend fun updateEvento(evento: Evento): Resource<Unit> {
        return try {
            val dto = EventoDto.fromDomain(evento)
            eventosCollection.document(evento.id).set(dto).await()
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al actualizar evento", e)
        }
    }

    override suspend fun deleteEvento(id: String): Resource<Unit> {
        return try {
            eventosCollection.document(id).delete().await()
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e.localizedMessage ?: "Error al eliminar evento", e)
        }
    }
}
