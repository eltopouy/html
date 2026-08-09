<div align="center">

# 🚀 EduCode Studio

### 💻 Editor Web de Código HTML, CSS y JavaScript & Simulador Interactivo

**Una plataforma interactiva de práctica de desarrollo web en vivo desarrollada para estudiantes de Liceos y UTU (Uruguay)**

[![Live Demo](https://img.shields.io/badge/🌐_Sitio_Web-html.servicioti.com.uy-3b82f6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://html.servicioti.com.uy)
[![GitHub Repository](https://img.shields.io/badge/GitHub-eltopouy%2Fhtml-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/eltopouy/html)
[![License: MIT](https://img.shields.io/badge/Licencia-MIT-emerald?style=for-the-badge)](LICENSE)

---

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript ES6+](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Web Audio API Synth](https://img.shields.io/badge/Web_Audio_API-Teclado_Mec%C3%A1nico-purple?style=flat-square)
![Mobile Responsive](https://img.shields.io/badge/Mobile-Touch_Ready-brightgreen?style=flat-square)
![Status](https://img.shields.io/badge/Version-v3.0.0_Production-blue?style=flat-square)

</div>

---

## 📖 Sobre el Proyecto

**EduCode Studio** es una aplicación web SPA (*Single Page Application*) desarrollada por **Andrés Franchi Ugartemendía** diseñada específicamente para la enseñanza de programación a estudiantes de **Liceos y UTU**. 

Combina la potencia de un editor de código profesional estilo Visual Studio Code con un **Simulador de Escritura Pedagógico en Tiempo Real** que reproduce la experiencia física de teclear código en un teclado mecánico con pausas humanas y autocorrección de errores.

🌐 **Sitio Web Oficial:** [https://html.servicioti.com.uy](https://html.servicioti.com.uy)

---

## ✨ Características Destacadas

### 💡 1. Editor de Código Multilenguaje Profesional
- **CodeMirror 5 Engine:** Resaltado de sintaxis preciso para HTML5, CSS3 y JavaScript ES6+, números de línea y tema oscuro Dracula.
- **Autocompletado y Cierre Automático:** Cierre inteligente de etiquetas HTML (`xml-fold`), paréntesis, llaves y corchetes.
- **Atajos de Teclado:** Ejecución instantánea con `Ctrl + Enter` (o `Cmd + Enter` en Mac).
- **Auto-guardado en LocalStorage:** Guarda el avance del estudiante automáticamente sin perder cambios al refrescar la página.

### 🎓 2. Simulador de Tipeo & Modo Aprendizaje Realista
- **Teclado Mecánico Sintético (Web Audio API):** Audio generado por osciladores sintetizados (sin archivos `.mp3` externos) con perfiles **Cherry MX Blue (Clicky)** y **Cherry MX Brown (Tactile)**.
- **Teclado QWERTY Español:** Algoritmo de equivocaciones que presiona teclas físicamente contiguas en teclados en español y simula deslizamientos típicos (ej. la tecla `ñ` por `;` o `:`).
- **Ráfagas de Memoria Muscular (*Burst Mode*):** Escribe palabras clave comunes (`function`, `document`, `getElementById`, `addEventListener`, `return`, `class`, `style`) en ráfagas aceleradas.
- **Secuencias de Error y Borrado (*Backspace*):** Tipea 2 a 3 caracteres equivocados, duda al notar el error y borra rápidamente con la tecla *Backspace*.
- **Pausas Humanas de Reflexión:** Pausas dinámicas en saltos de línea (`\n`), llaves `{}` y cierre de etiquetas `<>`.
- **Métricas WPM:** Medidor de velocidad en Palabras por Minuto (WPM), porcentaje de avance y barra de progreso visual.

### 🛡️ 3. Vista Previa en Vivo & Consola Virtual Segura
- **Aislamiento Sandbox de Alto Nivel:** El código del estudiante corre en un iframe totalmente aislado con origen opaco (`null`), impidiendo accesos no autorizados al almacenamiento o DOM de la aplicación host.
- **Consola Virtual Interactiva:** Intercepta `console.log`, `console.warn`, `console.error`, `console.info`, `console.clear()` y errores no capturados, formateando objetos DOM y evitando congelamientos mediante límite de 500 mensajes por ejecución.

### 📱 4. Compatibilidad Móvil & Touch Completa
- **Diseño Adaptativo Responsive:** Layouts optimizados para pantallas táctiles, tablets y celulares (<900px y <600px).
- **Resizer Táctil:** Arrastre de paneles optimizado para eventos `touchstart` y `touchmove`.
- **Prevención de Zoom en iOS:** Tipografía adaptada a 16px en campos de entrada para evitar zoom no deseado en dispositivos Apple.

### 📦 5. Exportación e Importación sin Dependencias Backend
- Descarga el proyecto en paquetes `.ZIP` estructurados (`index.html`, `styles.css`, `script.js`).
- Exporta en un **único archivo `.HTML` ejecutable independiente**.
- Importa archivos `.html`, `.css` o `.js` locales de hasta 10 MB.

### 🎓 6. Sistema de Ejercicios Didácticos por Niveles (49 ejercicios)
- **13 Niveles Pedagógicos Progresivos:** Desde selectores CSS básicos hasta modales `<dialog>` interactivos.
- **Principio de Código Mínimo:** El editor y el simulador muestran únicamente el **código didáctico** del concepto — sin boilerplate, sin ruido pedagógico.
- **Ensamblado Interno Inteligente:** El runner genera automáticamente el contenedor HTML necesario para ejecutar cualquier fragmento CSS o HTML mínimo, sin que el alumno lo vea.
- **Cambio Automático de Pestaña:** Al seleccionar un ejercicio, el editor cambia automáticamente a la pestaña correspondiente (CSS, HTML o JS).

---

## 📐 Arquitectura Técnica & Seguridad

```
html/
├── index.html          # SPA principal con metadatos SEO, OpenGraph y JSON-LD
├── CNAME               # Dominio personalizado (html.servicioti.com.uy)
├── robots.txt          # Indexación habilitada para buscadores e IAs (GPTBot, ClaudeBot, etc.)
├── sitemap.xml         # Mapa del sitio XML
├── llms.txt            # Especificación de contexto para modelos de IA
├── css/
│   └── style.css       # Sistema de diseño, CSS Grid/Flexbox y media queries móviles
├── js/
│   ├── app.js          # Orquestador de UI, eventos, persistencia y puente de consola
│   ├── editor.js       # Integración con CodeMirror 5 (documentos y atajos)
│   ├── runner.js       # Ensamblador inteligente de HTML + generador de DOM automático para CSS didáctico
│   ├── simulator.js    # Motor de tipeo realista, sintetizador Web Audio API, WPM y selección de tab
│   ├── templates.js    # 49 ejercicios pedagógicos en 13 niveles con código mínimo didáctico
│   └── exporter.js     # Generador de archivos ZIP e HTML standalone
├── tests/
│   ├── run-tests.js    # Test runner CLI (Node.js) — 304 tests automatizados
│   └── educode.test.html  # Interfaz visual de tests en navegador
├── package.json        # Configuración del proyecto
└── README.md           # Documentación y Portada de GitHub
```

### 🔒 Resumen de Auditoría de Seguridad e Ingeniería
- **Iframe Sandbox:** `allow-same-origin` deshabilitado para forzar origen único `null`.
- **Inmunidad a ReDoS:** Expresiones regulares sin *backtracking* catastrófico para la extracción del `<title>`.
- **Sanitización XSS:** Escapado estricto de HTML entities (`&`, `<`, `>`, `"`, `'`) y whitelist para el nivel de consola.
- **Escape de Tags:** Neutralización de etiquetas de cierre `</script>` y `</style>` en el código fuente del alumno.
- **Validación de postMessage:** Solo se procesan mensajes provenientes del `contentWindow` del iframe de previsualización.

---

## 🧪 Sistema de Testing Automatizado

```bash
node tests/run-tests.js
```

**304 tests automatizados** organizados en 5 suites que se ejecutan en segundos con Node.js (sin dependencias externas):

| Suite | Tests | Cobertura |
|---|---|---|
| 📚 Templates | ~210 | Principio pedagógico, 13 niveles, ausencia de boilerplate |
| ⚙️ Runner | 16 | Ensamblado HTML, DOM automático para CSS, seguridad XSS |
| 🎹 Simulator | 16 | Selección de tab didáctico, reset, pause, defaults |
| 📦 Exporter | 5 | Funciones disponibles, rechazo de archivos >10MB |
| 🐛 Regresión | 6 | 6 bugs históricos no reaparecen |

Ejecutar antes de cada commit para garantizar que los cambios no rompen comportamiento existente.

---

## 📝 Historial de Cambios (Changelog)

### **v3.0.0** — *Sistema Pedagógico por Niveles + Testing Automatizado* (2026-08-09)
- 🎓 **Reestructuración Pedagógica Completa:** 49 ejercicios organizados en **13 niveles progresivos** con código mínimo didáctico. El editor y el simulador muestran únicamente el concepto a enseñar — sin boilerplate.
- 🔄 **Ensamblado Inteligente de DOM:** El runner genera automáticamente el elemento HTML necesario para visualizar cualquier regla CSS (`h1`, `p`, `h2`, `.center`, `#para`, `.car`) sin que aparezca en el editor del alumno.
- ⚡ **Selección Automática de Pestaña:** Al seleccionar un ejercicio, el editor y el simulador cambian automáticamente a la pestaña del código didáctico (CSS, HTML o JS).
- 🎹 **Simulador Corregido:** Resuelto el bug crítico por el que el simulador no tipeaba nada en ejercicios de CSS puro (leía la pestaña HTML vacía). Ahora detecta automáticamente el tab con contenido.
- 🔊 **Desbloqueo de AudioContext:** El contexto de Web Audio API se desbloquea en el gesto de clic del usuario, resolviendo el bloqueo de audio en Chrome, Safari y Edge.
- 🧪 **Sistema de Testing (304 tests):** Test runner CLI con Node.js (`tests/run-tests.js`) e interfaz visual HTML (`tests/educode.test.html`). Cubre templates, runner, simulator, exporter y regresiones.

### **v2.5.0** — *Mejoras de Posicionamiento SEO/AI & Auditoría de Ejecución* (2026-08-09)
- 🤖 **GEO & AI Indexing:** Creación de `llms.txt`, `robots.txt` habilitado para rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot) y `sitemap.xml`.
- 🏷️ **Metadatos Avanzados:** Inclusión de OpenGraph, Twitter Cards y datos estructurados Schema.org (`WebApplication`, `EducationalApplication`).
- 🐛 **Corrección de Bugs:** Error de puntero nulo en botones Lucide, condiciones de carrera en simulador y auto-scroll en CodeMirror.
- 📸 **Plantillas Educativas Extendidas:** Agregados todos los ejemplos de pantallas de referencia: `<marquee>`, `<meter>`, `<pre>`, `<dialog>`, `<dl>`, formularios, `<fieldset>`, multimedia y animaciones Canvas.

### **v2.4.0** — *Motor de Tipeo Ultra-Realista & Sintetizador de Teclado Mecánico* (2026-08-09)
- ⌨️ **Simulador QWERTY Español:** Mapa de teclas físicamente contiguas para generar equivocaciones realistas (incluyendo deslizamiento hacia la tecla `ñ`).
- 🔊 **Web Audio API Synth:** Generador de audio de switches mecánicos Cherry MX Blue y Brown sin archivos externos.
- ⚡ **Ráfagas y Pausas:** Ritmo dinámico con aceleración en palabras clave (`function`, `document`, etc.) y pausas de reflexión en etiquetas y llaves.

### **v2.2.0** — *Compatibilidad Móvil & Pantallas Táctiles* (2026-08-08)
- 📱 **Diseño Responsive:** Layouts adaptativos para pantallas de celulares y tablets.
- 👆 **Touch Events:** Soporte de arrastre táctil para el redimensionador de paneles (`pane-resizer`).

### **v2.0.0** — *Documento en Blanco & Branding Liceos/UTU* (2026-08-08)
- 🎓 **Inicio en Blanco:** Inicio predeterminado en documento vacío para fomentar el aprendizaje desde cero.
- 👨‍🏫 **Atribución Institucional:** Créditos oficiales a **Andrés Franchi Ugartemendía** para **Liceos y UTU**.
- 🌐 **Dominio Personalizado:** Configuración del dominio `https://html.servicioti.com.uy`.

### **v1.0.0** — *Lanzamiento Inicial* (2026-08-08)
- 🚀 Versión inicial con editor multi-pestaña, vista previa en iframe y consola virtual integrada.

---

## 🤝 Créditos y Licencia

**Desarrollado por [Andrés Franchi Ugartemendía](https://github.com/eltopouy)**  
Plataforma creada para la educación pública y técnica en **Liceos y UTU**.

Distribuido bajo la **Licencia MIT**. Libre para uso educativo, personal e institucional.
