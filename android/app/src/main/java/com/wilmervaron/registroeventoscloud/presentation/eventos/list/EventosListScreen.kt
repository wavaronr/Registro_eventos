package com.wilmervaron.registroeventoscloud.presentation.eventos.list

import androidx.compose.animation.*
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ExitToApp
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.wilmervaron.registroeventoscloud.domain.model.EstadoEvento
import com.wilmervaron.registroeventoscloud.domain.model.Evento

data class EventosUiState(
    val eventos: List<Evento> = emptyList(),
    val isLoading: Boolean = false,
    val filtroEstado: EstadoEvento? = null,
    val queryBusqueda: String = "",
    val errorMessage: String? = null
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EventosListScreen(
    state: EventosUiState,
    onFilterChange: (EstadoEvento?) -> Unit,
    onSearchChange: (String) -> Unit,
    onEventoClick: (Evento) -> Unit,
    onDeleteEvento: (String) -> Unit,
    onCreateClick: () -> Unit,
    onSignOutClick: () -> Unit
) {
    var eventoAEliminar by remember { mutableStateOf<Evento?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text("RegistroEventosCloud", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                        Text("Sincronizado con Firestore", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                },
                actions = {
                    IconButton(onClick = onSignOutClick) {
                        Icon(Icons.AutoMirrored.Filled.ExitToApp, contentDescription = "Cerrar sesión")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = onCreateClick,
                containerColor = MaterialTheme.colorScheme.primaryContainer,
                contentColor = MaterialTheme.colorScheme.onPrimaryContainer
            ) {
                Icon(Icons.Default.Add, contentDescription = "Crear nuevo evento")
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Buscador rápido
            OutlinedTextField(
                value = state.queryBusqueda,
                onValueChange = onSearchChange,
                placeholder = { Text("Buscar evento por título...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                trailingIcon = {
                    if (state.queryBusqueda.isNotEmpty()) {
                        IconButton(onClick = { onSearchChange("") }) {
                            Icon(Icons.Default.Clear, contentDescription = "Limpiar")
                        }
                    }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                singleLine = true
            )

            // Filtros de estado por Chips
            LazyRow(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                item {
                    FilterChip(
                        selected = state.filtroEstado == null,
                        onClick = { onFilterChange(null) },
                        label = { Text("Todos") }
                    )
                }
                items(EstadoEvento.entries) { estado ->
                    FilterChip(
                        selected = state.filtroEstado == estado,
                        onClick = { onFilterChange(if (state.filtroEstado == estado) null else estado) },
                        label = { Text(estado.titulo) }
                    )
                }
            }

            // Contenido principal
            Box(modifier = Modifier.fillMaxSize()) {
                if (state.isLoading) {
                    CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                } else if (state.eventos.isEmpty()) {
                    EmptyEventosView(modifier = Modifier.align(Alignment.Center))
                } else {
                    LazyColumn(
                        modifier = Modifier.fillMaxSize(),
                        contentPadding = PaddingValues(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        items(state.eventos, key = { it.id }) { evento ->
                            EventoItemCard(
                                evento = evento,
                                onClick = { onEventoClick(evento) },
                                onDelete = { eventoAEliminar = evento }
                            )
                        }
                    }
                }
            }
        }

        // Diálogo de confirmación de eliminación
        eventoAEliminar?.let { evento ->
            AlertDialog(
                onDismissRequest = { eventoAEliminar = null },
                title = { Text("Eliminar Evento") },
                text = { Text("¿Deseas eliminar permanentemente '${evento.titulo}'? Esta acción se sincronizará con Firestore.") },
                confirmButton = {
                    TextButton(
                        onClick = {
                            onDeleteEvento(evento.id)
                            eventoAEliminar = null
                        }
                    ) {
                        Text("Eliminar", color = MaterialTheme.colorScheme.error)
                    }
                },
                dismissButton = {
                    TextButton(onClick = { eventoAEliminar = null }) {
                        Text("Cancelar")
                    }
                }
            )
        }
    }
}

@Composable
fun EventoItemCard(
    evento: Evento,
    onClick: () -> Unit,
    onDelete: () -> Unit,
    modifier: Modifier = Modifier
) {
    val (estadoColor, estadoBg) = when (evento.estado) {
        EstadoEvento.PENDIENTE -> Color(0xFFD97706) to Color(0xFFFEF3C7)
        EstadoEvento.EN_PROGRESO -> Color(0xFF2563EB) to Color(0xFFDBEAFE)
        EstadoEvento.COMPLETADO -> Color(0xFF16A34A) to Color(0xFFDCFCE7)
        EstadoEvento.CANCELADO -> Color(0xFFDC2626) to Color(0xFFFEE2E2)
    }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onClick() },
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Surface(
                    color = estadoBg,
                    shape = MaterialTheme.shapes.small
                ) {
                    Text(
                        text = evento.estado.titulo,
                        color = estadoColor,
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }

                IconButton(onClick = onDelete) {
                    Icon(
                        Icons.Default.Delete,
                        contentDescription = "Eliminar",
                        tint = MaterialTheme.colorScheme.error
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = evento.titulo,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )

            if (evento.descripcion.isNotBlank()) {
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = evento.descripcion,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    Icons.Default.DateRange,
                    contentDescription = null,
                    modifier = Modifier.size(16.dp),
                    tint = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = evento.fecha,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}

@Composable
fun EmptyEventosView(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier.padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(
            Icons.Default.EventNote,
            contentDescription = null,
            modifier = Modifier.size(64.dp),
            tint = MaterialTheme.colorScheme.outline
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = "No hay eventos registrados",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.SemiBold
        )
        Text(
            text = "Presiona el botón '+' para crear tu primer evento.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
