/**
 * EduCode Studio - Ejercicios Didácticos por Niveles Pedagógicos
 * Desarrollado por Andrés Franchi Ugartemendía para estudiantes de Liceos y UTU
 * Principio: Concepto -> Código Mínimo Didáctico -> Resultado Visual
 */

var TEMPLATES = {
  'blank': {
    name: '📝 Documento en Blanco (index.html)',
    html: '',
    css: '',
    js: '',
    explanation: 'Documento en blanco para crear proyectos web desde cero escribiendo HTML, CSS y JavaScript sin plantillas previas.'
  },

  // ==========================================
  // SECCIÓN HTML — ESTRUCTURA, ETIQUETAS Y FORMULARIOS
  // ==========================================

  // NIVEL 5 — HTML FUNDAMENTAL
  'n5-html-headings': {
    name: '🟡 N5: Encabezados <h1>',
    html: '<h1>¡Hola Uruguay!</h1>',
    css: '',
    js: '',
    explanation: 'La etiqueta <h1> define el título o encabezado principal de mayor importancia visual y semántica en la página HTML. Existen desde <h1> hasta <h6>.'
  },
  'n5-html-paragraphs': {
    name: '🟡 N5: Párrafos <p>',
    html: '<p>Este es un párrafo de ejemplo para estudiantes de Liceo y UTU.</p>',
    css: '',
    js: '',
    explanation: 'La etiqueta <p> representa un párrafo de texto. Los navegadores agregan un margen vertical automático alrededor de cada párrafo.'
  },
  'n5-html-break': {
    name: '🟡 N5: Salto de Línea <br>',
    html: 'Primer renglón de texto<br>\nSegundo renglón de texto',
    css: '',
    js: '',
    explanation: 'La etiqueta <br> inserta un salto de línea dentro de un bloque de texto sin necesidad de iniciar un nuevo párrafo.'
  },
  'n5-html-hr': {
    name: '🟡 N5: Línea Horizontal <hr>',
    html: '<h1>Sección Superior</h1>\n<hr>\n<h1>Sección Inferior</h1>',
    css: '',
    js: '',
    explanation: 'La etiqueta <hr> dibuja una regla horizontal para separar visualmente distintas secciones o contenidos en el documento.'
  },
  'n5-html-emphasis': {
    name: '🟡 N5: Énfasis <em>',
    html: '<p>Este es un <em>texto con énfasis</em> dentro de la oración.</p>',
    css: '',
    js: '',
    explanation: 'La etiqueta <em> destaca una palabra o frase con énfasis. Los navegadores la representan por defecto con fuente cursiva (itálica).'
  },

  // NIVEL 6 — ESTRUCTURA HTML
  'n6-html-structure': {
    name: '🟡 N6: Estructura Completa HTML',
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mi Sitio Web - Uruguay</title>\n</head>\n<body>\n  Contenido de la página web...\n</body>\n</html>',
    css: '',
    js: '',
    explanation: 'Estructura estándar de un documento HTML5: <!DOCTYPE html> declara la versión, <html> engloba la página, <head> contiene metadatos y <body> contiene el contenido visible.'
  },

  // NIVEL 7 — META TAGS
  'n7-meta-charset': {
    name: '🟠 N7: Meta Charset UTF-8',
    html: '<meta charset="UTF-8">',
    css: '',
    js: '',
    explanation: 'La etiqueta <meta charset="UTF-8"> define la codificación de caracteres universal para mostrar correctamente tildes, la letra ñ y símbolos especiales.'
  },
  'n7-meta-description': {
    name: '🟠 N7: Meta Description',
    html: '<meta name="description" content="Sitio educativo de programación para estudiantes de Liceo y UTU en Uruguay">',
    css: '',
    js: '',
    explanation: 'La meta descripción proporciona un resumen breve de la página web para los motores de búsqueda como Google.'
  },
  'n7-meta-keywords': {
    name: '🟠 N7: Meta Keywords',
    html: '<meta name="keywords" content="html, css, javascript, uruguay, educacion">',
    css: '',
    js: '',
    explanation: 'Define una lista de palabras clave relevantes asociadas al contenido de la página separadas por comas.'
  },
  'n7-meta-author': {
    name: '🟠 N7: Meta Author',
    html: '<meta name="author" content="Estudiante de Liceo / UTU">',
    css: '',
    js: '',
    explanation: 'Especifica el nombre del autor o creador del documento web en sus metadatos.'
  },
  'n7-meta-viewport': {
    name: '🟠 N7: Meta Viewport',
    html: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    css: '',
    js: '',
    explanation: 'Crucial para el diseño adaptativo (Responsive Design). Escala la página al tamaño de la pantalla del dispositivo (móviles y tablets).'
  },

  // NIVEL 8 — IMÁGENES
  'n8-img-basic': {
    name: '🟠 N8: Imagen Simple <img>',
    html: '<img src="https://picsum.photos/300/200" alt="Imagen de ejemplo">',
    css: '',
    js: '',
    explanation: 'La etiqueta <img> incrusta una imagen en la página. El atributo src indica la ruta o dirección web (URL) del archivo de imagen.'
  },
  'n8-img-width': {
    name: '🟠 N8: Imagen con Ancho (width="100%")',
    html: '<img src="https://picsum.photos/400/200" width="100%" alt="Imagen fluida">',
    css: '',
    js: '',
    explanation: 'El atributo width="100%" ajusta la anchura de la imagen para que ocupe todo el ancho de su contenedor de forma fluida.'
  },
  'n8-picture': {
    name: '🟠 N8: Etiqueta <picture>',
    html: '<picture>\n  <img src="https://picsum.photos/400/200" alt="Imagen adaptativa">\n</picture>',
    css: '',
    js: '',
    explanation: 'La etiqueta <picture> actúa como contenedor para ofrecer diferentes fuentes de imágenes adaptadas a distintas resoluciones de pantalla.'
  },

  // NIVEL 9 — FORMULARIOS
  'n9-input-text': {
    name: '🟠 N9: Input Text',
    html: '<input type="text" placeholder="Escribe tu nombre aquí">',
    css: '',
    js: '',
    explanation: '<input type="text"> crea una caja de texto simple de una sola línea para que el usuario ingrese información.'
  },
  'n9-input-number': {
    name: '🟠 N9: Input Number',
    html: '<input type="number" placeholder="Ingresa tu edad">',
    css: '',
    js: '',
    explanation: '<input type="number"> crea un campo que solo acepta valores numéricos y suele mostrar botones para subir o bajar el número.'
  },
  'n9-input-date': {
    name: '🟠 N9: Input Date',
    html: '<input type="date">',
    css: '',
    js: '',
    explanation: '<input type="date"> abre un selector de fecha en forma de calendario interactivo en el navegador.'
  },
  'n9-input-submit': {
    name: '🟠 N9: Input Submit',
    html: '<input type="submit" value="Enviar Formulario">',
    css: '',
    js: '',
    explanation: '<input type="submit"> crea un botón destinado a enviar la información ingresada en un formulario.'
  },
  'n9-input-required': {
    name: '🟠 N9: Atributo Required',
    html: '<input type="text" required placeholder="Campo obligatorio (ej. C.I.)">',
    css: '',
    js: '',
    explanation: 'El atributo required exige que el usuario complete el campo antes de poder procesar o enviar el formulario.'
  },
  'n9-input-disabled': {
    name: '🟠 N9: Atributo Disabled',
    html: '<input type="text" disabled value="Campo no modificable">',
    css: '',
    js: '',
    explanation: 'El atributo disabled desactiva el campo de entrada, impidiendo que el usuario haga clic o escriba en él.'
  },
  'n9-input-size': {
    name: '🟠 N9: Atributo Size',
    html: '<input type="text" size="12" placeholder="Cédula">',
    css: '',
    js: '',
    explanation: 'El atributo size="12" define el ancho visual en cantidad de caracteres para el campo de entrada.'
  },
  'n9-form-simple': {
    name: '🟠 N9: Formulario Simple <form>',
    html: '<form>\n  <input type="text" placeholder="Escribe tu nombre">\n  <input type="submit" value="Enviar">\n</form>',
    css: '',
    js: '',
    explanation: 'La etiqueta <form> sirve como contenedor que agrupa campos de entrada e instrucciones para el envío de datos.'
  },

  // NIVEL 10 — FIELDSET
  'n10-fieldset': {
    name: '🟠 N10: Fieldset y Legend',
    html: '<fieldset>\n  <legend>Elige tu materia o lenguaje</legend>\n  <input type="radio" name="lang"> HTML\n  <input type="radio" name="lang"> JavaScript\n  <input type="radio" name="lang"> CSS\n</fieldset>',
    css: '',
    js: '',
    explanation: '<fieldset> crea una caja con borde para agrupar elementos de un formulario, y <legend> le coloca un título en el borde superior.'
  },

  // NIVEL 11 — MULTIMEDIA
  'n11-video': {
    name: '🔵 N11: Video con Controles',
    html: '<video controls width="320">\n  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">\n</video>',
    css: '',
    js: '',
    explanation: 'La etiqueta <video> reproduce videos nativamente. El atributo controls habilita los botones de reproducir, pausar y volumen.'
  },
  'n11-embed-video': {
    name: '🔵 N11: Embed de Video',
    html: '<embed src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" width="320">',
    css: '',
    js: '',
    explanation: '<embed> inserta recursos multimedia o reproductores externos directamente dentro de la página.'
  },
  'n11-embed-image': {
    name: '🔵 N11: Embed de Imagen',
    html: '<embed src="https://picsum.photos/300/200" type="image/jpeg" width="320">',
    css: '',
    js: '',
    explanation: '<embed> también se utiliza para incrustar archivos gráficos de forma directa.'
  },

  // NIVEL 13 — MODAL / DIALOG
  'n13-dialog-basic': {
    name: '🔴 N13: Dialog Básico (<dialog open>)',
    html: '<dialog open>\n  <h1>¡Hola Uruguay!</h1>\n  <p>Esta es una ventana modal de bienvenida.</p>\n  <button>Aceptar</button>\n</dialog>',
    css: '',
    js: '',
    explanation: '<dialog> representa una ventana modal o cuadro emergente. El atributo open hace que permanezca visible.'
  },
  'n13-dialog-interactive': {
    name: '🔴 N13: Dialog Interactivo (Open / Close)',
    html: '<button command="show-modal" commandfor="dialog">Abrir Ventana</button>\n\n<dialog id="dialog">\n  <p>Esta es una ventana emergente interactiva...</p>\n  <button command="close" commandfor="dialog">Cerrar</button>\n</dialog>',
    css: '',
    js: 'const dialog = document.getElementById(\'dialog\');\nconst openBtn = document.querySelector(\'[command="show-modal"]\');\nconst closeBtn = document.querySelector(\'[command="close"]\');\n\nif (openBtn && dialog) {\n  openBtn.addEventListener(\'click\', () => dialog.showModal());\n}\nif (closeBtn && dialog) {\n  closeBtn.addEventListener(\'click\', () => dialog.close());\n}',
    explanation: 'Muestra cómo controlar una ventana modal (<dialog>) mediante código JavaScript con los métodos .showModal() y .close().'
  },

  // ==========================================
  // SECCIÓN CSS — ESTILOS Y SELECTORES
  // ==========================================

  // NIVEL 1 — CSS FUNDAMENTAL Y VISUAL
  'n1-selector-basic': {
    name: '🟢 N1: 1. Selector Básico (h1)',
    html: '',
    css: 'h1 {\n  color: red;\n}',
    js: '',
    explanation: 'El selector h1 aplica las reglas de estilo (en este caso cambiar el color del texto a rojo) a todos los títulos <h1>.'
  },
  'n1-color': {
    name: '🟢 N1: 2. Color (p)',
    html: '',
    css: 'p {\n  color: red;\n}',
    js: '',
    explanation: 'La propiedad color determina el color de la tipografía del elemento en CSS (ej. color: red;).'
  },
  'n1-background': {
    name: '🟢 N1: 3. Background (h2)',
    html: '',
    css: 'h2 {\n  background: yellow;\n}',
    js: '',
    explanation: 'La propiedad background define el color o imagen de fondo del elemento seleccionado (ej. background: yellow;).'
  },
  'n1-background-rgb': {
    name: '🟢 N1: 4. Background con RGB',
    html: '',
    css: 'h2 {\n  background: rgb(255, 0, 0);\n}',
    js: '',
    explanation: 'Permite especificar un color utilizando el modelo RGB con niveles de rojo, verde y azul de 0 a 255. rgb(255, 0, 0) es rojo puro.'
  },
  'n1-color-hex': {
    name: '🟢 N1: 5. Colores HEX (#ffa500)',
    html: '',
    css: 'h1 {\n  background: #ffa500;\n}',
    js: '',
    explanation: 'Los colores en formato Hexadecimal usan # seguido de 6 caracteres. #ffa500 corresponde al color naranja.'
  },
  'n1-text-align': {
    name: '🟢 N1: 6. Text-align (center)',
    html: '',
    css: 'h1 {\n  text-align: center;\n}',
    js: '',
    explanation: 'text-align: center; alinea el texto en el centro horizontal de su contenedor.'
  },
  'n1-font-size': {
    name: '🟢 N1: 7. Font-size (30px)',
    html: '',
    css: 'h1 {\n  font-size: 30px;\n}',
    js: '',
    explanation: 'font-size define el tamaño de la fuente o letra en píxeles (px) o unidades relativas.'
  },
  'n1-font-weight': {
    name: '🟢 N1: 8. Font-weight (bold)',
    html: '',
    css: 'h1 {\n  font-weight: bold;\n}',
    js: '',
    explanation: 'font-weight: bold; hace que el texto sea más grueso (negrita).'
  },
  'n1-border': {
    name: '🟢 N1: 9. Border (4px solid red)',
    html: '',
    css: 'h1 {\n  border: 4px solid red;\n}',
    js: '',
    explanation: 'border define a la vez el grosor (4px), estilo (solid) y color (red) del borde de un elemento.'
  },
  'n1-opacity': {
    name: '🟢 N1: 10. Opacity (0.1)',
    html: '',
    css: 'h1 {\n  background: cyan;\n  opacity: 0.1;\n}',
    js: '',
    explanation: 'opacity establece la transparencia. Un valor de 0.1 hace que el elemento sea casi transparente (10% visible).'
  },

  // NIVEL 2 — SELECTORES CSS
  'n2-selector-element': {
    name: '🟢 N2: Selector de Elemento (p)',
    html: '<p>Este párrafo recibe el estilo directamente.</p>',
    css: 'p {\n  color: red;\n}',
    js: '',
    explanation: 'Un selector de etiqueta (como p) aplica el estilo a todos los párrafos de la página.'
  },
  'n2-selector-class': {
    name: '🟢 N2: Selector de Clase (.center)',
    html: '',
    css: '.center {\n  text-align: center;\n}',
    js: '',
    explanation: 'Las clases en CSS inician con un punto (ej. .center). Se pueden reusar en múltiples elementos HTML.'
  },
  'n2-usage-class': {
    name: '🟢 N2: Uso de Clase (class="center")',
    html: '<h1 class="center">Encabezado Centrado</h1>',
    css: '.center {\n  text-align: center;\n  color: #2563eb;\n}',
    js: '',
    explanation: 'En HTML se asigna la clase mediante el atributo class="center" para recibir las reglas CSS de .center.'
  },
  'n2-selector-id': {
    name: '🟢 N2: Selector ID (#para)',
    html: '',
    css: '#para {\n  color: blue;\n}',
    js: '',
    explanation: 'Los selectores de ID inician con un numeral (#para) y deben aplicarse a un único elemento exclusivo.'
  },
  'n2-usage-id': {
    name: '🟢 N2: Uso de ID (id="para")',
    html: '<p id="para">Primer párrafo con id exclusivo.</p>',
    css: '#para {\n  color: blue;\n  font-weight: bold;\n}',
    js: '',
    explanation: 'En HTML se le da identidad única a un elemento con id="para" para vincularlo con el selector #para en CSS.'
  },
  'n2-selectors-grouped': {
    name: '🟢 N2: Selectores Agrupados (h1, h2, p)',
    html: '<h1>Primer Encabezado</h1>\n<h2>Segundo Encabezado</h2>\n<p>Párrafo de ejemplo.</p>',
    css: 'h1, h2, p {\n  text-align: center;\n  color: cyan;\n}',
    js: '',
    explanation: 'Separar selectores por comas (h1, h2, p) permite aplicar las mismas reglas CSS a varias etiquetas al mismo tiempo.'
  },

  // NIVEL 3 — CSS COMBINADO
  'n3-css-combined': {
    name: '🟡 N3: CSS Combinado (.car)',
    html: '<div class="car">Auto de Ejemplo</div>',
    css: '.car {\n  text-align: center;\n  color: white;\n  background: green;\n  font-size: 30px;\n  font-weight: bold;\n  padding: 10px;\n}',
    js: '',
    explanation: 'Demuestra la combinación de múltiples propiedades (color, fondo, relleno, alineación) para crear un componente estilizado.'
  },

  // NIVEL 4 — CSS INLINE
  'n4-inline-paragraph': {
    name: '🟡 N4: CSS Inline en Párrafo',
    html: '<p style="color: white; background: blue; padding: 10px;">\n  Mi Sitio Web\n</p>',
    css: '',
    js: '',
    explanation: 'El atributo style="" permite escribir reglas CSS inline dentro del propio elemento HTML.'
  },
  'n4-inline-heading': {
    name: '🟡 N4: CSS Inline en Encabezado',
    html: '<h1 style="color: red;">\n  ¡Hola!\n</h1>',
    css: '',
    js: '',
    explanation: 'Ejemplo de estilo inline aplicado directamente sobre un encabezado <h1>.'
  },

  // ==========================================
  // SECCIÓN BUENAS PRÁCTICAS, ERRORES Y MODALES
  // ==========================================

  // NIVEL 12 — ERRORES Y COMENTARIOS CSS
  'n12-css-comment': {
    name: '🔵 N12: Comentarios CSS',
    html: '<h1>Encabezado de Ejemplo</h1>',
    css: '/* Este es un comentario en CSS */\n\nh1 {\n  color: red;\n}',
    js: '',
    explanation: 'Los comentarios en CSS van entre /* y */ y sirven para anotar notas explicativas que no se ejecutan.'
  },
  'n12-css-error-semicolon': {
    name: '🔵 N12: Error CSS (Falta Punto y Coma)',
    html: '<p>Este texto debería tener varios estilos.</p>',
    css: '/* ¿Puedes encontrar el error de sintaxis? */\np {\n  color: red\n  text-align: center;\n  background: yellow;\n}',
    js: '',
    explanation: 'En CSS omitir el punto y coma (;) al final de una línea rompe la lectura de las siguientes propiedades.'
  }
};

