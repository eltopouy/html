/**
 * EduCode Studio - Currículum Pedagógico Estructurado (HTML → CSS → JS)
 * Desarrollado por Andrés Franchi Ugartemendía para estudiantes de Liceos y UTU.
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

  // =========================================================================
  // 📘 MÓDULO 1: CURSO DE HTML (ESTRUCTURA, ENLACES, LISTAS, TABLAS, FORMS)
  // =========================================================================

  // 1.1 Estructura Básica y Texto
  'n6-html-structure': {
    name: '📄 HTML 1: Estructura Completa HTML5',
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mi Sitio Web - Uruguay</title>\n</head>\n<body>\n  Contenido de la página web...\n</body>\n</html>',
    css: '',
    js: '',
    explanation: 'Estructura estándar de un documento HTML5: <!DOCTYPE html> declara la versión, <html> engloba la página, <head> contiene metadatos y <body> contiene el contenido visible.'
  },
  'n5-html-headings': {
    name: '📄 HTML 1: Encabezados (h1 a h6)',
    html: '<h1>Encabezado Principal h1</h1>\n<h2>Subtítulo h2</h2>\n<h3>Sección h3</h3>',
    css: '',
    js: '',
    explanation: 'Las etiquetas <h1> a <h6> definen los encabezados de mayor a menor jerarquía visual y semántica en la página HTML.'
  },
  'n5-html-paragraphs': {
    name: '📄 HTML 1: Párrafos (<p>)',
    html: '<p>Este es un párrafo de ejemplo para estudiantes de Liceo y UTU.</p>\n<p>Cada párrafo crea un bloque de texto independiente.</p>',
    css: '',
    js: '',
    explanation: 'La etiqueta <p> representa un párrafo de texto. Los navegadores agregan automáticamente un margen vertical antes y después de cada párrafo.'
  },
  'n5-html-emphasis': {
    name: '📄 HTML 1: Formato de Texto (strong, em, mark)',
    html: '<p>Texto con <strong>negrita (importancia)</strong>, <em>cursiva (énfasis)</em> y <mark>resaltado</mark>.</p>',
    css: '',
    js: '',
    explanation: '<strong> resalta texto con fuerte importancia (negrita), <em> añade énfasis (cursiva) y <mark> resalta como con marcador fluorescente.'
  },
  'n5-html-break': {
    name: '📄 HTML 1: Salto de Línea (<br>)',
    html: 'Primer renglón de texto<br>\nSegundo renglón de texto sin cambiar de párrafo',
    css: '',
    js: '',
    explanation: 'La etiqueta <br> inserta un salto de línea simple dentro del mismo bloque de texto sin crear un nuevo párrafo.'
  },
  'n5-html-hr': {
    name: '📄 HTML 1: Separador Horizontal (<hr>)',
    html: '<h1>Sección Superior</h1>\n<hr>\n<h1>Sección Inferior</h1>',
    css: '',
    js: '',
    explanation: 'La etiqueta <hr> dibuja una regla horizontal para separar visualmente distintas secciones temáticas en el documento.'
  },

  // 1.2 Enlaces e Imágenes
  'html-enlaces': {
    name: '🔗 HTML 2: Enlaces e Hipervínculos (<a>)',
    html: '<a href="https://html.servicioti.com.uy" target="_blank">\n  Visitar EduCode Studio (Abre en nueva pestaña)\n</a>',
    css: '',
    js: '',
    explanation: 'La etiqueta <a> crea hipervínculos. El atributo href define la dirección de destino y target="_blank" abre el enlace en una pestaña nueva.'
  },
  'n8-img-basic': {
    name: '🖼️ HTML 2: Imagen Simple (<img>)',
    html: '<img src="https://picsum.photos/350/200" alt="Fotografía de paisaje">\n<p>Imagen cargada desde una dirección web.</p>',
    css: '',
    js: '',
    explanation: 'La etiqueta <img> incrusta imágenes. El atributo src indica la ruta de la imagen y alt proporciona un texto alternativo accesible.'
  },
  'n8-img-width': {
    name: '🖼️ HTML 2: Dimensiones de Imagen (width / height)',
    html: '<img src="https://picsum.photos/400/200" width="100%" alt="Imagen fluida">\n<p>La imagen se adapta al 100% del ancho disponible.</p>',
    css: '',
    js: '',
    explanation: 'Los atributos width y height permiten controlar el ancho y alto en píxeles o porcentaje de forma fluida.'
  },
  'html-figure': {
    name: '🖼️ HTML 2: Figura con Leyenda (<figure> y <figcaption>)',
    html: '<figure>\n  <img src="https://picsum.photos/320/200" alt="Palacio Salvo">\n  <figcaption>Fotografía de ejemplo con pie de foto descriptivo.</figcaption>\n</figure>',
    css: '',
    js: '',
    explanation: '<figure> agrupa una imagen o ilustración y <figcaption> le asigna una leyenda o pie de foto semántico.'
  },
  'n8-picture': {
    name: '🖼️ HTML 2: Etiqueta Adaptativa (<picture>)',
    html: '<picture>\n  <img src="https://picsum.photos/400/200" alt="Imagen responsive">\n</picture>',
    css: '',
    js: '',
    explanation: 'La etiqueta <picture> permite ofrecer múltiples variantes de una imagen optimizadas según la resolución o dispositivo del usuario.'
  },

  // 1.3 Listas
  'html-listas-ul': {
    name: '📋 HTML 3: Lista Desordenada (<ul> y <li>)',
    html: '<ul>\n  <li>Montevideo</li>\n  <li>Canelones</li>\n  <li>Maldonado</li>\n  <li>Salto</li>\n</ul>',
    css: '',
    js: '',
    explanation: '<ul> crea una lista desordenada con viñetas o puntos, y cada elemento dentro de ella se define con la etiqueta <li>.'
  },
  'html-listas-ol': {
    name: '📋 HTML 3: Lista Ordenada / Numerada (<ol> y <li>)',
    html: '<ol>\n  <li>Planificar la estructura HTML</li>\n  <li>Aplicar estilos con CSS</li>\n  <li>Agregar interactividad con JavaScript</li>\n</ol>',
    css: '',
    js: '',
    explanation: '<ol> genera una lista ordenada numéricamente (1, 2, 3...) de forma automática para enumerar pasos o elementos jerárquicos.'
  },
  'html-listas-dl': {
    name: '📋 HTML 3: Lista de Definiciones (<dl>, <dt>, <dd>)',
    html: '<dl>\n  <dt>HTML</dt>\n  <dd>Lenguaje de marcado para la estructura y contenido web.</dd>\n  <dt>CSS</dt>\n  <dd>Lenguaje de hojas de estilo para diseño visual y tipografía.</dd>\n  <dt>JavaScript</dt>\n  <dd>Lenguaje de programación para la interactividad y lógica.</dd>\n</dl>',
    css: '',
    js: '',
    explanation: '<dl> crea una lista de definiciones: <dt> representa el término o concepto y <dd> contiene la explicación o definición asociada.'
  },

  // 1.4 Tablas
  'html-tabla-basica': {
    name: '📊 HTML 4: Tabla de Datos Simple (<table>, <tr>, <td>)',
    html: '<table border="1" cellpadding="8">\n  <tr>\n    <th>Materia</th>\n    <th>Calificación</th>\n  </tr>\n  <tr>\n    <td>Informática</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>Programación Web</td>\n    <td>11</td>\n  </tr>\n</table>',
    css: '',
    js: '',
    explanation: 'Las tablas se declaran con <table>, las filas con <tr>, los encabezados con <th> y las celdas de datos con <td>.'
  },
  'html-tabla-completa': {
    name: '📊 HTML 4: Tabla Completa (thead, tbody, caption)',
    html: '<table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">\n  <caption>Horario de Clases - UTU / Liceo</caption>\n  <thead>\n    <tr style="background: #e2e8f0;">\n      <th>Día</th>\n      <th>Materia</th>\n      <th>Docente</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Lunes</td>\n      <td>Desarrollo Web</td>\n      <td>Prof. Franchi</td>\n    </tr>\n    <tr>\n      <td>Miércoles</td>\n      <td>Base de Datos</td>\n      <td>Prof. García</td>\n    </tr>\n  </tbody>\n</table>',
    css: '',
    js: '',
    explanation: '<caption> titula la tabla, <thead> agrupa la cabecera semántica de columnas y <tbody> engloba las filas de datos.'
  },

  // 1.5 Formularios y Controles de Usuario
  'n9-form-simple': {
    name: '📝 HTML 5: Formulario Simple (<form>)',
    html: '<form>\n  <input type="text" placeholder="Escribe tu nombre">\n  <input type="submit" value="Enviar">\n</form>',
    css: '',
    js: '',
    explanation: 'La etiqueta <form> sirve como contenedor que agrupa campos de entrada e instrucciones para el envío de datos.'
  },
  'n9-input-text': {
    name: '📝 HTML 5: Campo de Texto (<input type="text">)',
    html: '<input type="text" placeholder="Escribe tu nombre completo aquí">',
    css: '',
    js: '',
    explanation: '<input type="text"> crea una caja de texto simple de una sola línea para que el usuario ingrese información.'
  },
  'html-input-password': {
    name: '📝 HTML 5: Campo Contraseña (<input type="password">)',
    html: '<input type="password" placeholder="Ingresa tu contraseña secreta">',
    css: '',
    js: '',
    explanation: '<input type="password"> oculta los caracteres ingresados con puntos o asteriscos para proteger datos confidenciales.'
  },
  'n9-input-number': {
    name: '📝 HTML 5: Campo Numérico (<input type="number">)',
    html: '<input type="number" min="1" max="100" placeholder="Ingresa tu edad">',
    css: '',
    js: '',
    explanation: '<input type="number"> crea un campo numérico con flechas de incremento y validación automática contra letras.'
  },
  'n9-input-date': {
    name: '📝 HTML 5: Selector de Fecha (<input type="date">)',
    html: '<input type="date">',
    css: '',
    js: '',
    explanation: '<input type="date"> abre un calendario emergente nativo para seleccionar día, mes y año.'
  },
  'html-input-checkbox': {
    name: '📝 HTML 5: Casilla de Selección (<input type="checkbox">)',
    html: '<label><input type="checkbox" checked> Acepto los términos y condiciones</label><br>\n<label><input type="checkbox"> Recibir novedades por correo</label>',
    css: '',
    js: '',
    explanation: '<input type="checkbox"> permite seleccionar una o múltiples opciones independientes.'
  },
  'html-input-radio': {
    name: '📝 HTML 5: Botones de Radio (<input type="radio">)',
    html: '<label><input type="radio" name="turno" checked> Matutino</label><br>\n<label><input type="radio" name="turno"> Vespertino</label><br>\n<label><input type="radio" name="turno"> Nocturno</label>',
    css: '',
    js: '',
    explanation: 'Al compartir el mismo atributo name, los botones <input type="radio"> son mutuamente excluyentes (solo se elige uno).'
  },
  'html-select': {
    name: '📝 HTML 5: Menú Desplegable (<select> y <option>)',
    html: '<label for="depto">Selecciona tu departamento:</label><br>\n<select id="depto">\n  <option value="mvd">Montevideo</option>\n  <option value="can">Canelones</option>\n  <option value="mal">Maldonado</option>\n  <option value="sal">Salto</option>\n</select>',
    css: '',
    js: '',
    explanation: '<select> crea un menú desplegable y cada opción seleccionable se declara mediante una etiqueta <option>.'
  },
  'html-textarea': {
    name: '📝 HTML 5: Área de Texto Multilínea (<textarea>)',
    html: '<textarea rows="4" cols="40" placeholder="Escribe aquí tu consulta o mensaje detallado..."></textarea>',
    css: '',
    js: '',
    explanation: '<textarea> permite redactar párrafos y textos largos en múltiples líneas a diferencia de los inputs comunes.'
  },
  'n10-fieldset': {
    name: '📝 HTML 5: Agrupación con <fieldset> y <legend>',
    html: '<fieldset>\n  <legend>Datos Académicos</legend>\n  <label>Orientación: <input type="text" placeholder="Informática"></label><br><br>\n  <label>Año: <input type="number" min="1" max="6" value="1"></label>\n</fieldset>',
    css: '',
    js: '',
    explanation: '<fieldset> dibuja un recuadro contenedor para agrupar campos relacionados y <legend> le coloca un título en su borde superior.'
  },
  'n9-input-submit': {
    name: '📝 HTML 5: Botón de Envío (<input type="submit">)',
    html: '<input type="submit" value="Enviar Formulario">',
    css: '',
    js: '',
    explanation: '<input type="submit"> crea un botón de acción destinado a procesar o transmitir los datos del formulario.'
  },
  'n9-input-required': {
    name: '📝 HTML 5: Atributo Required (Campo Obligatorio)',
    html: '<input type="text" required placeholder="Cédula de Identidad (Obligatorio)">',
    css: '',
    js: '',
    explanation: 'El atributo required exige que el campo esté completado antes de que el formulario pueda ser enviado.'
  },
  'n9-input-disabled': {
    name: '📝 HTML 5: Atributo Disabled (Campo Deshabilitado)',
    html: '<input type="text" disabled value="Campo bloqueado / solo lectura">',
    css: '',
    js: '',
    explanation: 'El atributo disabled desactiva el campo, impidiendo que el usuario pueda hacer foco, escribir o modificar su contenido.'
  },
  'n9-input-size': {
    name: '📝 HTML 5: Atributo Size (Ancho en Caracteres)',
    html: '<input type="text" size="8" placeholder="Código">',
    css: '',
    js: '',
    explanation: 'El atributo size define visualmente el ancho del campo expresado en cantidad de caracteres de texto.'
  },

  // 1.6 Multimedia, Semántica y Metadatos
  'n11-video': {
    name: '🎬 HTML 6: Video con Controles (<video>)',
    html: '<video controls width="320">\n  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">\n  Tu navegador no soporta video HTML5.\n</video>',
    css: '',
    js: '',
    explanation: 'La etiqueta <video> reproduce videos nativamente. El atributo controls habilita los botones de reproducir, pausar y volumen.'
  },
  'html-audio': {
    name: '🎵 HTML 6: Audio Nativo (<audio controls>)',
    html: '<audio controls>\n  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">\n  Tu navegador no soporta audio HTML5.\n</audio>',
    css: '',
    js: '',
    explanation: 'La etiqueta <audio controls> reproduce pistas de audio con barra de tiempo, control de volumen y botón de reproducción.'
  },
  'n11-embed-video': {
    name: '🎬 HTML 6: Incrustación Multimedia (<embed>)',
    html: '<embed src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" width="320">',
    css: '',
    js: '',
    explanation: '<embed> incrusta recursos multimedia o reproductores externos de forma directa en el documento.'
  },
  'n11-embed-image': {
    name: '🎬 HTML 6: Incrustación Gráfica (<embed>)',
    html: '<embed src="https://picsum.photos/300/200" type="image/jpeg" width="320">',
    css: '',
    js: '',
    explanation: '<embed> también puede utilizarse para incrustar archivos gráficos o vectores SVG directamente.'
  },
  'html-semantica': {
    name: '🏛️ HTML 6: Estructura Semántica HTML5 (header, main, footer)',
    html: '<header>\n  <h1>Portal Estudiantil</h1>\n  <nav><a href="#">Inicio</a> | <a href="#">Cursos</a></nav>\n</header>\n<main>\n  <article>\n    <h2>Noticia del Día</h2>\n    <p>Aprender desarrollo web abre grandes oportunidades en Uruguay.</p>\n  </article>\n</main>\n<footer>\n  <p>© 2026 Liceos y UTU</p>\n</footer>',
    css: '',
    js: '',
    explanation: 'Las etiquetas semánticas (<header>, <nav>, <main>, <article>, <footer>) aportan valor semántico, accesibilidad y mejoran el SEO.'
  },
  'html-details': {
    name: '🔽 HTML 6: Acordeón Interactivo (<details> y <summary>)',
    html: '<details>\n  <summary>¿Qué es EduCode Studio? (Haz clic aquí)</summary>\n  <p>Es una plataforma didáctica diseñada para enseñar programación web paso a paso sin boilerplate innecesario.</p>\n</details>',
    css: '',
    js: '',
    explanation: '<details> y <summary> crean un acordeón desplegable nativo sin necesidad de escribir código JavaScript.'
  },
  'n13-dialog-basic': {
    name: '🪟 HTML 6: Ventana Modal Nativa (<dialog open>)',
    html: '<dialog open>\n  <h2>¡Hola Uruguay!</h2>\n  <p>Esta es una ventana modal nativa de HTML5.</p>\n  <button>Aceptar</button>\n</dialog>',
    css: '',
    js: '',
    explanation: '<dialog> representa un cuadro de diálogo o ventana emergente modal. El atributo open lo mantiene visible de forma predeterminada.'
  },
  'n7-meta-charset': {
    name: '🏷️ HTML 7: Meta Charset UTF-8',
    html: '<meta charset="UTF-8">\n<p>Permite visualizar tildes: á, é, í, ó, ú y la letra ñ correctamente.</p>',
    css: '',
    js: '',
    explanation: '<meta charset="UTF-8"> define la codificación de caracteres universal para mostrar correctamente tildes, la letra ñ y emojis.'
  },
  'n7-meta-description': {
    name: '🏷️ HTML 7: Meta Description (SEO)',
    html: '<meta name="description" content="Plataforma educativa de programación para estudiantes de Liceo y UTU">',
    css: '',
    js: '',
    explanation: 'La meta descripción proporciona un resumen breve de la página web que Google y buscadores muestran en los resultados.'
  },
  'n7-meta-keywords': {
    name: '🏷️ HTML 7: Meta Keywords',
    html: '<meta name="keywords" content="html, css, javascript, uruguay, educacion">',
    css: '',
    js: '',
    explanation: 'Define una lista de palabras clave relevantes asociadas a la temática de la página separadas por comas.'
  },
  'n7-meta-author': {
    name: '🏷️ HTML 7: Meta Author',
    html: '<meta name="author" content="Estudiante de Liceo / UTU">',
    css: '',
    js: '',
    explanation: 'Especifica el nombre del autor o desarrollador creador del documento web en sus metadatos.'
  },
  'n7-meta-viewport': {
    name: '🏷️ HTML 7: Meta Viewport (Diseño Móvil)',
    html: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    css: '',
    js: '',
    explanation: 'Fundamental para Responsive Design: ajusta la escala y anchura del sitio a la pantalla de celulares y tablets.'
  },

  // =========================================================================
  // 🎨 MÓDULO 2: CURSO DE CSS (SELECTORES, BOX MODEL, FLEXBOX, GRID, ANIM)
  // =========================================================================

  // 2.1 Fundamentos y Selectores
  'n1-selector-basic': {
    name: '🎨 CSS 1: Selector Básico (h1)',
    html: '',
    css: 'h1 {\n  color: red;\n}',
    js: '',
    explanation: 'El selector h1 aplica las reglas de estilo (en este caso cambiar el color del texto a rojo) a todos los títulos <h1>.'
  },
  'n1-color': {
    name: '🎨 CSS 1: Color de Texto (p)',
    html: '',
    css: 'p {\n  color: red;\n}',
    js: '',
    explanation: 'La propiedad color determina el color de la tipografía del elemento en CSS (ej. color: red;).'
  },
  'n1-background': {
    name: '🎨 CSS 1: Color de Fondo (h2)',
    html: '',
    css: 'h2 {\n  background: yellow;\n}',
    js: '',
    explanation: 'La propiedad background define el color o imagen de fondo del elemento seleccionado (ej. background: yellow;).'
  },
  'n1-background-rgb': {
    name: '🎨 CSS 1: Color con Modelo RGB',
    html: '',
    css: 'h2 {\n  background: rgb(255, 0, 0);\n}',
    js: '',
    explanation: 'Permite especificar un color utilizando el modelo RGB con niveles de rojo, verde y azul de 0 a 255. rgb(255, 0, 0) es rojo puro.'
  },
  'n1-color-hex': {
    name: '🎨 CSS 1: Colores Hexadecimales (#ffa500)',
    html: '',
    css: 'h1 {\n  background: #ffa500;\n}',
    js: '',
    explanation: 'Los colores en formato Hexadecimal usan # seguido de 6 caracteres. #ffa500 corresponde al color naranja.'
  },
  'n2-selector-element': {
    name: '🎨 CSS 2: Selector de Elemento (p)',
    html: '<p>Este párrafo recibe el estilo directamente.</p>',
    css: 'p {\n  color: red;\n}',
    js: '',
    explanation: 'Un selector de etiqueta (como p) aplica el estilo a todos los párrafos de la página.'
  },
  'n2-selector-class': {
    name: '🎨 CSS 2: Selector de Clase (.center)',
    html: '',
    css: '.center {\n  text-align: center;\n}',
    js: '',
    explanation: 'Las clases en CSS inician con un punto (ej. .center). Se pueden reutilizar en múltiples elementos HTML.'
  },
  'n2-usage-class': {
    name: '🎨 CSS 2: Uso de Clase (class="center")',
    html: '<h1 class="center">Encabezado Centrado</h1>',
    css: '.center {\n  text-align: center;\n  color: #2563eb;\n}',
    js: '',
    explanation: 'En HTML se asigna la clase mediante el atributo class="center" para recibir las reglas CSS de .center.'
  },
  'n2-selector-id': {
    name: '🎨 CSS 2: Selector de ID (#para)',
    html: '',
    css: '#para {\n  color: blue;\n}',
    js: '',
    explanation: 'Los selectores de ID inician con un numeral (#para) y deben aplicarse a un único elemento exclusivo.'
  },
  'n2-usage-id': {
    name: '🎨 CSS 2: Uso de ID (id="para")',
    html: '<p id="para">Primer párrafo con id exclusivo.</p>',
    css: '#para {\n  color: blue;\n  font-weight: bold;\n}',
    js: '',
    explanation: 'En HTML se le da identidad única a un elemento con id="para" para vincularlo con el selector #para en CSS.'
  },
  'n2-selectors-grouped': {
    name: '🎨 CSS 2: Selectores Agrupados (h1, h2, p)',
    html: '<h1>Primer Encabezado</h1>\n<h2>Segundo Encabezado</h2>\n<p>Párrafo de ejemplo.</p>',
    css: 'h1, h2, p {\n  text-align: center;\n  color: cyan;\n}',
    js: '',
    explanation: 'Separar selectores por comas (h1, h2, p) permite aplicar las mismas reglas CSS a varias etiquetas al mismo tiempo.'
  },
  'css-hover': {
    name: '🎨 CSS 2: Pseudoclase :hover (Botón Interactivo)',
    html: '<button class="btn-demo">Pasa el cursor por aquí</button>',
    css: '.btn-demo {\n  background: #2563eb;\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: bold;\n  transition: background 0.3s ease;\n}\n.btn-demo:hover {\n  background: #1d4ed8;\n}',
    js: '',
    explanation: 'La pseudoclase :hover aplica estilos cuando el usuario coloca el cursor del mouse sobre el elemento.'
  },

  // 2.2 Tipografía y Textos
  'n1-text-align': {
    name: '🔤 CSS 3: Alineación de Texto (text-align)',
    html: '',
    css: 'h1 {\n  text-align: center;\n}',
    js: '',
    explanation: 'text-align: center; alinea el texto en el centro horizontal de su contenedor.'
  },
  'n1-font-size': {
    name: '🔤 CSS 3: Tamaño de Fuente (font-size)',
    html: '',
    css: 'h1 {\n  font-size: 30px;\n}',
    js: '',
    explanation: 'font-size define el tamaño de la tipografía en píxeles (px), rem o porcentaje.'
  },
  'n1-font-weight': {
    name: '🔤 CSS 3: Grosor de Letra (font-weight: bold)',
    html: '',
    css: 'h1 {\n  font-weight: bold;\n}',
    js: '',
    explanation: 'font-weight: bold; hace que el texto adquiera mayor grosor o peso visual (negrita).'
  },
  'css-font-family': {
    name: '🔤 CSS 3: Familia Tipográfica (font-family)',
    html: '<h1>Tipografía Moderna</h1>\n<p>Texto estilizado con tipografía de sistema limpia y legible.</p>',
    css: 'body {\n  font-family: system-ui, -apple-system, sans-serif;\n  line-height: 1.6;\n}',
    js: '',
    explanation: 'font-family especifica la familia de fuentes o tipografía empleada para representar el texto.'
  },

  // 2.3 Modelo de Caja (Box Model)
  'n1-border': {
    name: '📦 CSS 4: Bordes (border: 4px solid red)',
    html: '',
    css: 'h1 {\n  border: 4px solid red;\n}',
    js: '',
    explanation: 'border define a la vez el grosor (4px), estilo (solid) y color (red) del borde de un elemento.'
  },
  'css-border-radius': {
    name: '📦 CSS 4: Bordes Redondeados (border-radius)',
    html: '<div class="caja-redonda">Caja con esquinas redondeadas</div>',
    css: '.caja-redonda {\n  background: #0ea5e9;\n  color: white;\n  padding: 20px;\n  border-radius: 14px;\n  text-align: center;\n  font-weight: bold;\n}',
    js: '',
    explanation: 'border-radius redondea los vértices o esquinas rectangulares de cualquier contenedor.'
  },
  'css-padding-margin': {
    name: '📦 CSS 4: Espaciado Interno y Externo (padding y margin)',
    html: '<div class="caja-a">Caja A</div>\n<div class="caja-b">Caja B</div>',
    css: '.caja-a {\n  background: #f59e0b;\n  color: white;\n  padding: 16px; /* Espacio interno */\n  margin-bottom: 20px; /* Separación con la siguiente */\n}\n.caja-b {\n  background: #10b981;\n  color: white;\n  padding: 16px;\n}',
    js: '',
    explanation: 'padding añade espacio interno dentro del borde, mientras que margin separa el elemento de otros componentes exteriores.'
  },
  'css-box-shadow': {
    name: '📦 CSS 4: Sombras Realistas (box-shadow)',
    html: '<div class="tarjeta-sombra">Tarjeta con efecto de elevación 3D</div>',
    css: '.tarjeta-sombra {\n  background: white;\n  padding: 24px;\n  border-radius: 12px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\n  font-family: sans-serif;\n  color: #1e293b;\n}',
    js: '',
    explanation: 'box-shadow proyecta sombras personalizadas dando sensación de profundidad y elevación.'
  },
  'n1-opacity': {
    name: '📦 CSS 4: Transparencia (opacity: 0.1)',
    html: '',
    css: 'h1 {\n  background: cyan;\n  opacity: 0.1;\n}',
    js: '',
    explanation: 'opacity establece la transparencia. Un valor de 0.1 hace que el elemento sea casi transparente (10% visible).'
  },
  'n3-css-combined': {
    name: '📦 CSS 4: Componente Tarjeta Combinada (.car)',
    html: '<div class="car">Auto de Ejemplo</div>',
    css: '.car {\n  text-align: center;\n  color: white;\n  background: green;\n  font-size: 30px;\n  font-weight: bold;\n  padding: 10px;\n}',
    js: '',
    explanation: 'Demuestra la combinación de múltiples propiedades (color, fondo, relleno, alineación) para crear un componente estilizado.'
  },
  'n4-inline-paragraph': {
    name: '📦 CSS 4: Estilo Inline en Párrafo',
    html: '<p style="color: white; background: blue; padding: 10px;">\n  Mi Sitio Web\n</p>',
    css: '',
    js: '',
    explanation: 'El atributo style="" permite escribir reglas CSS inline dentro del propio elemento HTML.'
  },
  'n4-inline-heading': {
    name: '📦 CSS 4: Estilo Inline en Encabezado',
    html: '<h1 style="color: red;">\n  ¡Hola!\n</h1>',
    css: '',
    js: '',
    explanation: 'Ejemplo de estilo inline aplicado directamente sobre un encabezado <h1>.'
  },

  // 2.4 Layout Moderno: Flexbox y Grid
  'css-flexbox': {
    name: '📐 CSS 5: Layout con Flexbox (display: flex)',
    html: '<div class="fila-flex">\n  <div class="caja">Caja 1</div>\n  <div class="caja">Caja 2</div>\n  <div class="caja">Caja 3</div>\n</div>',
    css: '.fila-flex {\n  display: flex;\n  justify-content: space-around;\n  gap: 12px;\n}\n.caja {\n  background: #6366f1;\n  color: white;\n  padding: 20px;\n  border-radius: 8px;\n  font-weight: bold;\n}',
    js: '',
    explanation: 'display: flex; distribuye elementos hijos a lo largo de una fila horizontal con alineación y separación flexible (gap).'
  },
  'css-grid': {
    name: '📐 CSS 5: Cuadrícula con CSS Grid (display: grid)',
    html: '<div class="rejilla">\n  <div class="item">Item 1</div>\n  <div class="item">Item 2</div>\n  <div class="item">Item 3</div>\n  <div class="item">Item 4</div>\n</div>',
    css: '.rejilla {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n}\n.item {\n  background: #8b5cf6;\n  color: white;\n  padding: 24px;\n  text-align: center;\n  border-radius: 8px;\n  font-weight: bold;\n}',
    js: '',
    explanation: 'display: grid; organiza elementos en una matriz bidimensional con columnas fraccionales (1fr) y filas automáticas.'
  },

  // 2.5 Animaciones, Responsive y Buenas Prácticas
  'css-keyframes': {
    name: '✨ CSS 6: Animación con @keyframes (Latido)',
    html: '<div class="pulso">Animación CSS</div>',
    css: '.pulso {\n  width: 140px;\n  margin: 20px auto;\n  padding: 16px;\n  background: #f97316;\n  color: white;\n  text-align: center;\n  border-radius: 8px;\n  font-weight: bold;\n  animation: latido 1.5s infinite ease-in-out;\n}\n@keyframes latido {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}',
    js: '',
    explanation: '@keyframes define secuencias de fotogramas clave para animar transformaciones y propiedades visuales suavemente.'
  },
  'n12-css-comment': {
    name: '💡 CSS 6: Comentarios en CSS (/* ... */)',
    html: '<h1>Encabezado de Ejemplo</h1>',
    css: '/* Este es un comentario en CSS */\n\nh1 {\n  color: red;\n}',
    js: '',
    explanation: 'Los comentarios en CSS van entre /* y */ y sirven para anotar notas explicativas que el navegador ignora al ejecutar.'
  },
  'n12-css-error-semicolon': {
    name: '💡 CSS 6: Error Común (Falta de Punto y Coma)',
    html: '<p>Este texto debería tener varios estilos.</p>',
    css: '/* ¿Puedes encontrar el error de sintaxis? */\np {\n  color: red\n  text-align: center;\n  background: yellow;\n}',
    js: '',
    explanation: 'En CSS omitir el punto y coma (;) al final de una línea impide interpretar correctamente las siguientes propiedades.'
  },

  // =========================================================================
  // ⚡ MÓDULO 3: CURSO DE JAVASCRIPT (DOM, EVENTOS, MODALES, GRÁFICOS)
  // =========================================================================

  // 3.1 Consola y Salida
  'js-console-log': {
    name: '⚡ JS 1: Mensajes en Consola (console.log y alert)',
    html: '<button id="btn-saludo">Saludar con JavaScript</button>',
    css: 'button { padding: 12px 20px; font-size: 16px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; }',
    js: 'const boton = document.getElementById(\'btn-saludo\');\n\nboton.addEventListener(\'click\', function() {\n  console.log(\'¡Hola desde JavaScript en EduCode Studio!\');\n  alert(\'¡Bienvenido al curso de programación interactiva!\');\n});',
    explanation: 'console.log() imprime datos en la consola integrada para depurar y alert() muestra un aviso emergente.'
  },

  // 3.2 Manipulación del DOM y Estilos
  'js-dom-text': {
    name: '⚡ JS 2: Modificar Texto del DOM (.textContent)',
    html: '<h1 id="titulo">Texto Original</h1>\n<button id="btn-cambiar">Cambiar Texto</button>',
    css: 'button { padding: 8px 16px; cursor: pointer; }',
    js: 'const boton = document.getElementById(\'btn-cambiar\');\nconst titulo = document.getElementById(\'titulo\');\n\nboton.addEventListener(\'click\', function() {\n  titulo.textContent = \'¡Texto modificado con JavaScript! 🚀\';\n});',
    explanation: 'document.getElementById() obtiene una referencia al elemento HTML y .textContent actualiza su texto en vivo.'
  },
  'js-modo-oscuro': {
    name: '⚡ JS 2: Alternar Clases CSS (.classList.toggle)',
    html: '<div id="tarjeta" class="caja">\n  <h2>Tarjeta Interactiva</h2>\n  <button id="btn-tema">Alternar Modo Oscuro</button>\n</div>',
    css: '.caja { padding: 24px; border-radius: 8px; font-family: sans-serif; background: #f1f5f9; color: #1e293b; }\n.caja.oscuro { background: #0f172a; color: #f8fafc; }\nbutton { padding: 8px 16px; margin-top: 10px; cursor: pointer; }',
    js: 'const boton = document.getElementById(\'btn-tema\');\nconst tarjeta = document.getElementById(\'tarjeta\');\n\nboton.addEventListener(\'click\', function() {\n  tarjeta.classList.toggle(\'oscuro\');\n});',
    explanation: '.classList.toggle(\'clase\') añade o retira la clase CSS con cada clic permitiendo alternar estados visuales como el modo oscuro.'
  },

  // 3.3 Eventos e Interactividad
  'js-contador': {
    name: '⚡ JS 3: Contador Interactivo (+1 / -1)',
    html: '<h2>Contador: <span id="contador-val">0</span></h2>\n<button id="btn-sumar">+1 Sumar</button>\n<button id="btn-restar">-1 Restar</button>',
    css: 'button { padding: 10px 18px; margin-right: 8px; font-size: 16px; cursor: pointer; font-weight: bold; }',
    js: 'let cuenta = 0;\nconst valEl = document.getElementById(\'contador-val\');\n\ndocument.getElementById(\'btn-sumar\').addEventListener(\'click\', function() {\n  cuenta++;\n  valEl.textContent = cuenta;\n});\n\ndocument.getElementById(\'btn-restar\').addEventListener(\'click\', function() {\n  cuenta--;\n  valEl.textContent = cuenta;\n});',
    explanation: 'Demuestra el manejo de variables numéricas, suma/resta y actualización en tiempo real de la pantalla con event listeners.'
  },
  'n13-dialog-interactive': {
    name: '⚡ JS 3: Control de Ventana Modal (.showModal / .close)',
    html: '<button command="show-modal" commandfor="dialog">Abrir Ventana Modal</button>\n\n<dialog id="dialog">\n  <h3>Ventana Modal Interactiva</h3>\n  <p>Controlada con métodos nativos de JavaScript.</p>\n  <button command="close" commandfor="dialog">Cerrar</button>\n</dialog>',
    css: '',
    js: 'const dialog = document.getElementById(\'dialog\');\nconst openBtn = document.querySelector(\'[command="show-modal"]\');\nconst closeBtn = document.querySelector(\'[command="close"]\');\n\nif (openBtn && dialog) {\n  openBtn.addEventListener(\'click\', () => dialog.showModal());\n}\nif (closeBtn && dialog) {\n  closeBtn.addEventListener(\'click\', () => dialog.close());\n}',
    explanation: 'Muestra cómo abrir y cerrar ventanas modales emergentes mediante los métodos nativos .showModal() y .close() de JavaScript.'
  },

  // 3.4 Gráficos en Tiempo Real
  'js-canvas-animacion': {
    name: '⚡ JS 4: Gráficos en Canvas (<canvas> y requestAnimationFrame)',
    html: '<canvas id="lienzo" width="300" height="160" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px;"></canvas>',
    css: '',
    js: 'const canvas = document.getElementById(\'lienzo\');\nconst ctx = canvas.getContext(\'2d\');\nlet x = 20, vx = 2;\n\nfunction animar() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  ctx.fillStyle = \'#2563eb\';\n  ctx.beginPath();\n  ctx.arc(x, 80, 16, 0, Math.PI * 2);\n  ctx.fill();\n  x += vx;\n  if (x > canvas.width - 16 || x < 16) vx = -vx;\n  requestAnimationFrame(animar);\n}\nanimar();',
    explanation: 'El elemento <canvas> y su contexto 2D permiten dibujar formas vectoriales y crear animaciones en tiempo real con requestAnimationFrame.'
  }
};
