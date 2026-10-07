# RegistroEventosCloud - Aplicación Android con Jetpack Compose & Firebase

Aplicación nativa Android desarrollada en **Kotlin**, **Jetpack Compose (Material Design 3)** y **Firebase (Authentication & Cloud Firestore)** bajo **Clean Architecture** y patrón **MVVM + StateFlow**.

---

## 🚀 Pasos para ejecutar en Android Studio

1. **Descarga o clona este proyecto.**
2. Copia tu archivo existente `google-services.json` dentro de la carpeta:
   `app/google-services.json`
3. Abre **Android Studio** (Koala / Ladybug o superior).
4. Selecciona **Open** y elige la carpeta raíz del proyecto.
5. Permite que Gradle sincronice las dependencias del archivo `libs.versions.toml`.
6. Conecta un dispositivo físico o inicia un Emulador Android (API 24 o superior).
7. Haz clic en **Run 'app'** (`Shift + F10`).

---

## 🛡️ Reglas de Seguridad de Cloud Firestore

En la consola de Firebase (`southamerica-east1` São Paulo):
1. Ve a **Firestore Database** > pestaña **Reglas**.
2. Copia y pega el contenido del archivo `firestore.rules` incluido en este repositorio.
3. Haz clic en **Publicar**.

Cada usuario autenticado solo podrá leer, crear, actualizar y eliminar sus propios eventos.
