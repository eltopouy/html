# 🚀 EduCode Studio - Editor Web de Código HTML, CSS y JS

**EduCode Studio** es una plataforma de práctica de código web en vivo orientada a estudiantes e instructores. Permite escribir, probar y ver el resultado de proyectos **HTML5**, **CSS3** y **JavaScript (ES6+)** en tiempo real con una interfaz moderna y profesional similar a OneCompiler, CodePen o VS Code.

![EduCode Studio Preview](https://img.shields.io/badge/Status-Public-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## ✨ Características Principales

- 💻 **Monaco Editor Integrado**: El mismo motor de código que impulsa **Visual Studio Code**, con resaltado de sintaxis preciso, temas oscuros (`vs-dark`), números de línea y autocompletado.
- 📂 **Pestañas por Lenguaje**: Pestañas independientes para `index.html`, `styles.css` y `script.js`.
- ⚡ **Ejecución en Vivo (Auto-run)**: Actualiza la vista previa automáticamente mientras escribes o permite ejecución manual.
- 🖥️ **Consola Virtual Interactiva**: Intercepta y muestra llamadas a `console.log()`, `console.warn()`, `console.error()` y fallos de ejecución.
- 🎯 **Plantillas Educativas**: Incluye ejercicios prácticos listos para ser utilizados en clase (Estructura HTML, Tarjeta con Flexbox, Contador DOM, Animación en Canvas 2D).
- 💾 **Persistencia Automática**: Guarda el trabajo del estudiante en el almacenamiento local (`localStorage`) para no perder progresos al recargar.
- 📦 **Exportación en ZIP y HTML**: Descarga el código estructurado en archivos `.zip` o como un documento `.html` independiente.
- 🌐 **100% Estático y Gratuito**: No requiere servidores backend, ideal para alojar sin costo en **GitHub Pages**.

---

## 🛠️ Cómo Ejecutar Localmente

### Opción 1: Abrir directamente en el navegador
Puedes hacer doble clic en el archivo `index.html` o arrastrarlo a cualquier navegador web (Google Chrome, Firefox, Edge, Safari). 

### Opción 2: Usar una extensión de Servidor Estático (Recomendado)
Para la mejor experiencia con módulos ES:
- **VS Code**: Instala la extensión **Live Server** y haz clic en *"Go Live"*.
- **Python**: En la terminal ejecuta `python -m http.server 8080` y abre `http://localhost:8080`.

---

## 🌐 Paso a Paso para Subir a GitHub y Publicar en GitHub Pages

Para publicar tu editor en internet y compartir el enlace con tus estudiantes:

### 1. Inicializar Git y realizar el commit inicial
Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
git init
git add .
git commit -m "Inicializar EduCode Studio"
```

### 2. Crear el repositorio en GitHub
1. Ve a [GitHub](https://github.com) e inicia sesión.
2. Haz clic en el botón **"+"** en la esquina superior derecha y selecciona **"New repository"**.
3. Nombra tu repositorio (por ejemplo: `editor-web` o `educode-studio`).
4. Déjalo en modo **Public** (Público).
5. Haz clic en **"Create repository"**.

### 3. Vincular y subir tu código
Copia las instrucciones que te da GitHub y ejecútalas en tu terminal:

```bash
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITY.git
git push -u origin main
```
*(Asegúrate de cambiar `TU-USUARIO` y `TU-REPOSITY` por los tuyos).*

### 4. Activar GitHub Pages
1. En tu repositorio en GitHub, ve a la pestaña **Settings** (Configuración).
2. En el menú de la izquierda, haz clic en **Pages**.
3. En la sección **Build and deployment** -> **Source**, selecciona **"Deploy from a branch"**.
4. En **Branch**, selecciona `main` y la carpeta `/ (root)`.
5. Haz clic en **Save** (Guardar).

¡Listo! En unos pocos minutos, GitHub generará tu enlace público (por ejemplo: `https://tu-usuario.github.io/editor-web/`) donde tú y tus estudiantes podrán ingresar libremente desde cualquier dispositivo.

---

## 📁 Estructura del Proyecto

```
editor-web/
├── index.html          # Estructura principal de la aplicación SPA
├── css/
│   └── style.css       # Sistema de diseño, tema oscuro y layout responsivo
├── js/
│   ├── app.js          # Coordinador principal de la app y persistencia
│   ├── editor.js       # Integración con Monaco Editor (VS Code Engine)
│   ├── runner.js       # Ejecutor de código en iframe y consola virtual
│   ├── templates.js    # Ejercicios y plantillas de inicio para alumnos
│   └── exporter.js     # Módulo para exportar e importar proyectos (.zip / .html)
├── package.json        # Configuración del paquete
├── .gitignore          # Archivos ignorados por git
└── README.md           # Guía del proyecto
```

---

## 🤝 Licencia y Créditos

Creado con tecnología abierta (Monaco Editor, Lucide Icons, JSZip). Libre para uso educativo y personal.
