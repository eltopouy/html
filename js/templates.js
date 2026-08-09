/**
 * EduCode Studio - Ejercicios Didácticos por Niveles Pedagógicos
 * Desarrollado por Andrés Franchi Ugartemendía para estudiantes de Liceos y UTU
 * Principio: Concepto -> Código Mínimo Didáctico -> Resultado Visual
 */

var TEMPLATES = {
  'blank': {
    name: '📝 Documento en Blanco',
    html: '',
    css: '',
    js: ''
  },

  // ==========================================
  // NIVEL 1 — CSS FUNDAMENTAL Y MUY VISUAL
  // ==========================================
  'n1-selector-basic': {
    name: '🟢 N1: 1. Selector Básico (h1)',
    html: '',
    css: 'h1 {\n  color: red;\n}',
    js: ''
  },
  'n1-color': {
    name: '🟢 N1: 2. Color (p)',
    html: '',
    css: 'p {\n  color: red;\n}',
    js: ''
  },
  'n1-background': {
    name: '🟢 N1: 3. Background (h2)',
    html: '',
    css: 'h2 {\n  background: yellow;\n}',
    js: ''
  },
  'n1-background-rgb': {
    name: '🟢 N1: 4. Background con RGB',
    html: '',
    css: 'h2 {\n  background: rgb(255, 0, 0);\n}',
    js: ''
  },
  'n1-color-hex': {
    name: '🟢 N1: 5. Colores HEX (#ffa500)',
    html: '',
    css: 'h1 {\n  background: #ffa500;\n}',
    js: ''
  },
  'n1-text-align': {
    name: '🟢 N1: 6. Text-align (center)',
    html: '',
    css: 'h1 {\n  text-align: center;\n}',
    js: ''
  },
  'n1-font-size': {
    name: '🟢 N1: 7. Font-size (30px)',
    html: '',
    css: 'h1 {\n  font-size: 30px;\n}',
    js: ''
  },
  'n1-font-weight': {
    name: '🟢 N1: 8. Font-weight (bold)',
    html: '',
    css: 'h1 {\n  font-weight: bold;\n}',
    js: ''
  },
  'n1-border': {
    name: '🟢 N1: 9. Border (4px solid red)',
    html: '',
    css: 'h1 {\n  border: 4px solid red;\n}',
    js: ''
  },
  'n1-opacity': {
    name: '🟢 N1: 10. Opacity (0.1)',
    html: '',
    css: 'h1 {\n  background: cyan;\n  opacity: 0.1;\n}',
    js: ''
  },

  // ==========================================
  // NIVEL 2 — SELECTORES CSS
  // ==========================================
  'n2-selector-element': {
    name: '🟢 N2: Selector de Elemento (p)',
    html: '<p>Este párrafo recibe el estilo directamente.</p>',
    css: 'p {\n  color: red;\n}',
    js: ''
  },
  'n2-selector-class': {
    name: '🟢 N2: Selector de Clase (.center)',
    html: '',
    css: '.center {\n  text-align: center;\n}',
    js: ''
  },
  'n2-usage-class': {
    name: '🟢 N2: Uso de Clase (class="center")',
    html: '<h1 class="center">Heading</h1>',
    css: '.center {\n  text-align: center;\n  color: #2563eb;\n}',
    js: ''
  },
  'n2-selector-id': {
    name: '🟢 N2: Selector ID (#para)',
    html: '',
    css: '#para {\n  color: blue;\n}',
    js: ''
  },
  'n2-usage-id': {
    name: '🟢 N2: Uso de ID (id="para")',
    html: '<p id="para">First Paragraph.</p>',
    css: '#para {\n  color: blue;\n  font-weight: bold;\n}',
    js: ''
  },
  'n2-selectors-grouped': {
    name: '🟢 N2: Selectores Agrupados (h1, h2, p)',
    html: '<h1>Primer Encabezado</h1>\n<h2>Segundo Encabezado</h2>\n<p>Párrafo de ejemplo.</p>',
    css: 'h1, h2, p {\n  text-align: center;\n  color: cyan;\n}',
    js: ''
  },

  // ==========================================
  // NIVEL 3 — CSS COMBINADO
  // ==========================================
  'n3-css-combined': {
    name: '🟡 N3: CSS Combinado (.car)',
    html: '<div class="car">Auto de Ejemplo</div>',
    css: '.car {\n  text-align: center;\n  color: white;\n  background: green;\n  font-size: 30px;\n  font-weight: bold;\n  padding: 10px;\n}',
    js: ''
  },

  // ==========================================
  // NIVEL 4 — CSS INLINE
  // ==========================================
  'n4-inline-paragraph': {
    name: '🟡 N4: CSS Inline en Párrafo',
    html: '<p style="color: white; background: blue; padding: 10px;">\n  My Website\n</p>',
    css: '',
    js: ''
  },
  'n4-inline-heading': {
    name: '🟡 N4: CSS Inline en Encabezado',
    html: '<h1 style="color: red;">\n  Hello\n</h1>',
    css: '',
    js: ''
  },

  // ==========================================
  // NIVEL 5 — HTML FUNDAMENTAL
  // ==========================================
  'n5-html-headings': {
    name: '🟡 N5: Encabezados <h1>',
    html: '<h1>Hello</h1>',
    css: '',
    js: ''
  },
  'n5-html-paragraphs': {
    name: '🟡 N5: Párrafos <p>',
    html: '<p>This is a paragraph.</p>',
    css: '',
    js: ''
  },
  'n5-html-break': {
    name: '🟡 N5: Salto de Línea <br>',
    html: 'Primer renglón<br>\nSegundo renglón',
    css: '',
    js: ''
  },
  'n5-html-hr': {
    name: '🟡 N5: Línea Horizontal <hr>',
    html: '<h1>I am ok...</h1>\n<hr>\n<h1>I am ok...</h1>',
    css: '',
    js: ''
  },
  'n5-html-emphasis': {
    name: '🟡 N5: Énfasis <em>',
    html: '<em>emphasised text</em>',
    css: '',
    js: ''
  },

  // ==========================================
  // NIVEL 6 — ESTRUCTURA HTML
  // ==========================================
  'n6-html-structure': {
    name: '🟡 N6: Estructura Completa HTML',
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Title of document</title>\n</head>\n<body>\n  Content of document...\n</body>\n</html>',
    css: '',
    js: ''
  },

  // ==========================================
  // NIVEL 7 — META TAGS
  // ==========================================
  'n7-meta-charset': {
    name: '🟠 N7: Meta Charset UTF-8',
    html: '<meta charset="UTF-8">',
    css: '',
    js: ''
  },
  'n7-meta-description': {
    name: '🟠 N7: Meta Description',
    html: '<meta name="description" content="Mi sitio educativo">',
    css: '',
    js: ''
  },
  'n7-meta-keywords': {
    name: '🟠 N7: Meta Keywords',
    html: '<meta name="keywords" content="html, css, javascript">',
    css: '',
    js: ''
  },
  'n7-meta-author': {
    name: '🟠 N7: Meta Author',
    html: '<meta name="author" content="Andrés Franchi Ugartemendía">',
    css: '',
    js: ''
  },
  'n7-meta-viewport': {
    name: '🟠 N7: Meta Viewport',
    html: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    css: '',
    js: ''
  },

  // ==========================================
  // NIVEL 8 — IMÁGENES
  // ==========================================
  'n8-img-basic': {
    name: '🟠 N8: Imagen Simple <img>',
    html: '<img src="https://picsum.photos/300/200">',
    css: '',
    js: ''
  },
  'n8-img-width': {
    name: '🟠 N8: Imagen con Ancho (width="100%")',
    html: '<img src="https://picsum.photos/400/200" width="100%">',
    css: '',
    js: ''
  },
  'n8-picture': {
    name: '🟠 N8: Etiqueta <picture>',
    html: '<picture>\n  <img src="https://picsum.photos/400/200">\n</picture>',
    css: '',
    js: ''
  },

  // ==========================================
  // NIVEL 9 — FORMULARIOS
  // ==========================================
  'n9-input-text': {
    name: '🟠 N9: Input Text',
    html: '<input type="text">',
    css: '',
    js: ''
  },
  'n9-input-number': {
    name: '🟠 N9: Input Number',
    html: '<input type="number">',
    css: '',
    js: ''
  },
  'n9-input-date': {
    name: '🟠 N9: Input Date',
    html: '<input type="date">',
    css: '',
    js: ''
  },
  'n9-input-submit': {
    name: '🟠 N9: Input Submit',
    html: '<input type="submit">',
    css: '',
    js: ''
  },
  'n9-input-required': {
    name: '🟠 N9: Atributo Required',
    html: '<input type="text" required>',
    css: '',
    js: ''
  },
  'n9-input-disabled': {
    name: '🟠 N9: Atributo Disabled',
    html: '<input type="text" disabled>',
    css: '',
    js: ''
  },
  'n9-input-size': {
    name: '🟠 N9: Atributo Size',
    html: '<input type="text" size="12">',
    css: '',
    js: ''
  },
  'n9-form-simple': {
    name: '🟠 N9: Formulario Simple <form>',
    html: '<form>\n  <input type="text">\n  <input type="submit">\n</form>',
    css: '',
    js: ''
  },

  // ==========================================
  // NIVEL 10 — FIELDSET
  // ==========================================
  'n10-fieldset': {
    name: '🟠 N10: Fieldset y Legend',
    html: '<fieldset>\n  <legend>Choose Language</legend>\n  <input type="radio" name="lang"> HTML\n  <input type="radio" name="lang"> JavaScript\n  <input type="radio" name="lang"> CSS\n</fieldset>',
    css: '',
    js: ''
  },

  // ==========================================
  // NIVEL 11 — MULTIMEDIA
  // ==========================================
  'n11-video': {
    name: '🔵 N11: Video con Controles',
    html: '<video controls width="320">\n  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">\n</video>',
    css: '',
    js: ''
  },
  'n11-embed-video': {
    name: '🔵 N11: Embed de Video',
    html: '<embed src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" width="320">',
    css: '',
    js: ''
  },
  'n11-embed-image': {
    name: '🔵 N11: Embed de Imagen',
    html: '<embed src="https://picsum.photos/300/200" type="image/jpeg" width="320">',
    css: '',
    js: ''
  },

  // ==========================================
  // NIVEL 12 — ERRORES Y COMENTARIOS CSS
  // ==========================================
  'n12-css-comment': {
    name: '🔵 N12: Comentarios CSS',
    html: '<h1>Encabezado de Ejemplo</h1>',
    css: '/* Multiline comment here */\n\nh1 {\n  color: red;\n}',
    js: ''
  },
  'n12-css-error-semicolon': {
    name: '🔵 N12: Error CSS (Falta Punto y Coma)',
    html: '<p>Este texto debería tener varios estilos.</p>',
    css: '/* ¿Puedes encontrar el error de sintaxis? */\np {\n  color: red\n  text-align: center;\n  background: yellow;\n}',
    js: ''
  },

  // ==========================================
  // NIVEL 13 — MODAL / DIALOG
  // ==========================================
  'n13-dialog-basic': {
    name: '🔴 N13: Dialog Básico (<dialog open>)',
    html: '<dialog open>\n  <h1>Hello World!</h1>\n  <button>OK</button>\n</dialog>',
    css: '',
    js: ''
  },
  'n13-dialog-interactive': {
    name: '🔴 N13: Dialog Interactivo (Open / Close)',
    html: '<button command="show-modal" commandfor="dialog">Open</button>\n\n<dialog id="dialog">\n  This is modal...\n  <button command="close" commandfor="dialog">Close</button>\n</dialog>',
    css: '',
    js: 'const dialog = document.getElementById(\'dialog\');\nconst openBtn = document.querySelector(\'[command="show-modal"]\');\nconst closeBtn = document.querySelector(\'[command="close"]\');\n\nif (openBtn && dialog) {\n  openBtn.addEventListener(\'click\', () => dialog.showModal());\n}\nif (closeBtn && dialog) {\n  closeBtn.addEventListener(\'click\', () => dialog.close());\n}'
  }
};
