package com.wilmervaron.registroeventoscloud.presentation.navigation

sealed class Screen(val route: String) {
    data object Login : Screen("login")
    data object Register : Screen("register")
    data object ForgotPassword : Screen("forgot_password")
    data object EventosList : Screen("eventos_list")
    data object CreateEvento : Screen("create_evento")
    data object EditEvento : Screen("edit_evento/{eventoId}") {
        fun createRoute(eventoId: String) = "edit_evento/$eventoId"
    }
}
