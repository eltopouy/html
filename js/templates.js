/**
 * EduCode Studio - Starter Templates & Educational Exercises
 * Desarrollado por Andrés Franchi Ugartemendía para estudiantes de Liceos y UTU
 */

var TEMPLATES = {
  'blank': {
    name: '📝 Documento en Blanco',
    html: '',
    css: '',
    js: ''
  },

  'html-basic': {
    name: '🚀 Estructura Básica HTML5',
    html: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Mi Primera Página Web</title>\n</head>\n<body>\n\n  <header>\n    <h1>👋 ¡Bienvenidos a mi sitio web!</h1>\n    <nav>\n      <a href="#sobre-mi">Sobre mí</a> |\n      <a href="#tecnologias">Tecnologías</a> |\n      <a href="#contacto">Contacto</a>\n    </nav>\n  </header>\n\n  <hr>\n\n  <main>\n    <section id="sobre-mi">\n      <h2>📌 Sobre mí</h2>\n      <p>Soy un estudiante aprendiendo <strong>desarrollo web</strong>.</p>\n      <p>Esta es mi primera práctica de <em>HTML5</em> en EduCode Studio.</p>\n    </section>\n\n    <section id="tecnologias">\n      <h2>🔥 Mis Tecnologías Favoritas</h2>\n      <ul>\n        <li>HTML5 &mdash; Estructura y Contenido</li>\n        <li>CSS3 &mdash; Estilos y Diseño</li>\n        <li>JavaScript &mdash; Lógica e Interactividad</li>\n      </ul>\n    </section>\n  </main>\n\n  <hr>\n\n  <footer>\n    <p>&copy; 2026 &mdash; Creado con ❤️ en la clase de programación</p>\n  </footer>\n\n</body>\n</html>',
    css: '',
    js: ''
  },

  'html-marquee': {
    name: '🌟 HTML <marquee> Texto Animado y Rebote',
    html: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Bounce Marquee</title>\n  <style>\n    body {\n      font-family: sans-serif;\n      padding: 20px;\n      background: #f8fafc;\n    }\n    .marquee-box {\n      background: #e2e8f0;\n      padding: 20px;\n      border-radius: 12px;\n      margin-bottom: 20px;\n    }\n    h2 {\n      color: #0284c7;\n    }\n  </style>\n</head>\n<body>\n\n  <h2>Bounce Marquee (Texto con Rebote)</h2>\n  <div class="marquee-box">\n    <marquee behavior="alternate" direction="down" height="120" style="border: 1px dashed #0284c7;">\n      <marquee behavior="alternate">This text will bounce!</marquee>\n    </marquee>\n  </div>\n\n  <h2>Marquee Desplazamiento Vertical</h2>\n  <marquee direction="up" height="60" style="background: #e0f2fe; padding: 10px;">\n    scroll bottom to top\n  </marquee>\n\n  <h2>Marquee Estándar Derecha a Izquierda</h2>\n  <marquee style="background: #fef08a; padding: 10px; font-weight: bold;">\n    This text will scroll from right to left...\n  </marquee>\n\n</body>\n</html>',
    css: '',
    js: ''
  },

  'html-formatting': {
    name: '✏️ HTML Formato: <mark>, <s>, <del>, <i>, <em>',
    html: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Formato de Texto HTML</title>\n  <style>\n    body {\n      font-family: \'Segoe UI\', Tahoma, sans-serif;\n      padding: 20px;\n      line-height: 1.6;\n    }\n    .highlight {\n      background: #fef08a;\n      padding: 2px 6px;\n      border-radius: 4px;\n    }\n  </style>\n</head>\n<body>\n\n  <h2>Etiqueta &lt;s&gt; (Texto Tachado)</h2>\n  <h1>Don\'t <s>Touch</s></h1>\n  <h1>Don\'t <s>Worry</s></h1>\n  <h1>Don\'t <s>Giveup</s></h1>\n\n  <hr>\n\n  <h2>Etiquetas &lt;del&gt; y &lt;mark&gt;</h2>\n  <h2>Simple <del>Delete</del> Tag</h2>\n  <h1><mark>Coding</mark> is fun</h1>\n  <h1>Greece is <mark>beautiful</mark></h1>\n\n  <hr>\n\n  <h2>Etiquetas &lt;i&gt; y &lt;em&gt; (Cursiva y Énfasis)</h2>\n  <h1>Follow My <i>Instagram</i></h1>\n  <h1>Follow My <i>Facebook</i></h1>\n  <p>This is <em>emphasised</em> text</p>\n\n</body>\n</html>',
    css: '',
    js: ''
  },

  'html-meter-pre': {
    name: '📊 HTML <meter> Medidor y <pre> Arte ASCII',
    html: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Meter y Pre Tag</title>\n  <style>\n    body { font-family: system-ui, sans-serif; padding: 20px; }\n    pre { font-family: monospace; font-size: 1.2rem; color: #0284c7; background: #f1f5f9; padding: 15px; border-radius: 8px; inline-size: max-content; }\n  </style>\n</head>\n<body>\n\n  <h2>HTML &lt;meter&gt; Tag (Medidor de Combustible)</h2>\n  <p>Fuel Meter:</p>\n  <meter value="50" min="0" max="100" low="33" high="66" optimum="80" style="width: 200px; height: 24px;"></meter>\n  <p><strong>Nivel actual:</strong> 50%</p>\n\n  <hr>\n\n  <h2>HTML &lt;pre&gt; Tag (Texto Preformateado - Pirámide ASCII)</h2>\n  <pre>\n      *\n     ***\n    *****\n   *******\n  *********\n </pre>\n\n</body>\n</html>',
    css: '',
    js: ''
  },

  'html-dialog-modal': {
    name: '🪟 HTML <dialog> Cuadros Modales Nativos',
    html: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>HTML Dialog Modal</title>\n  <style>\n    body { font-family: sans-serif; padding: 30px; text-align: center; }\n    dialog {\n      border: 2px solid #3b82f6;\n      border-radius: 12px;\n      padding: 30px;\n      box-shadow: 0 10px 25px rgba(0,0,0,0.2);\n      width: 280px;\n    }\n    button {\n      padding: 8px 16px;\n      background: #3b82f6;\n      color: white;\n      border: none;\n      border-radius: 6px;\n      cursor: pointer;\n    }\n  </style>\n</head>\n<body>\n\n  <h2>Demostración de Diálogo Modal HTML5</h2>\n  <p>Haz clic en el botón para abrir la ventana modal nativa:</p>\n  \n  <button id="open-btn">Abrir Ventana Modal</button>\n\n  <dialog id="my-dialog">\n    <h1>Hello World!</h1>\n    <p>Este es un cuadro de diálogo modal nativo HTML5.</p>\n    <form method="dialog">\n      <button>OK / Cerrar</button>\n    </form>\n  </dialog>\n\n</body>\n</html>',
    css: '',
    js: 'const dialog = document.getElementById(\'my-dialog\');\nconst openBtn = document.getElementById(\'open-btn\');\n\nopenBtn.addEventListener(\'click\', () => {\n  dialog.showModal();\n  console.log("Modal abierto");\n});'
  },

  'html-dl-description': {
    name: '📖 HTML <dl> Listas de Descripción',
    html: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Description List</title>\n  <style>\n    body { font-family: sans-serif; padding: 20px; }\n    dt { font-weight: bold; color: #2563eb; font-size: 1.1rem; margin-top: 12px; }\n    dd { margin-left: 20px; color: #475569; }\n  </style>\n</head>\n<body>\n\n  <h2>Lista de Descripción (&lt;dl&gt;, &lt;dt&gt;, &lt;dd&gt;)</h2>\n  <dl>\n    <dt>Crow</dt>\n    <dd>A bird who flies</dd>\n    \n    <dt>Tiger</dt>\n    <dd>Animal lives in jungle</dd>\n    \n    <dt>Success</dt>\n    <dd>Hard work and perseverance</dd>\n  </dl>\n\n</body>\n</html>',
    css: '',
    js: ''
  },

  'html-forms-inputs': {
    name: '📋 HTML Formularios, Entradas e Inputs',
    html: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Formularios HTML</title>\n  <style>\n    body { font-family: sans-serif; padding: 20px; max-width: 400px; }\n    .form-group { margin-bottom: 15px; }\n    label { display: block; margin-bottom: 5px; font-weight: 600; }\n    input { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }\n    input:disabled { background: #e2e8f0; cursor: not-allowed; }\n    button { background: #16a34a; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }\n  </style>\n</head>\n<body>\n\n  <h2>Formulario de Registro</h2>\n  <form action="#" method="get">\n    <div class="form-group">\n      <label>Número (Form Number):</label>\n      <input type="number" min="1" max="100" placeholder="Ingresa un número">\n    </div>\n\n    <div class="form-group">\n      <label>Campo Requerido (Form Required):</label>\n      <input type="text" required placeholder="Este campo es obligatorio">\n    </div>\n\n    <div class="form-group">\n      <label>Fecha Deshabilitada (Disabled):</label>\n      <input type="date" disabled value="2026-08-26">\n    </div>\n\n    <button type="submit">Submit</button>\n  </form>\n\n</body>\n</html>',
    css: '',
    js: ''
  },

  'html-media-embed': {
    name: '🖼️ HTML Multimedios: <picture>, <embed> e Imágenes',
    html: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Multimedios HTML</title>\n  <style>\n    body { font-family: sans-serif; padding: 20px; text-align: center; background: #0f172a; color: white; }\n    .media-card { background: #1e293b; padding: 15px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #334155; }\n    img { max-width: 100%; border-radius: 8px; }\n  </style>\n</head>\n<body>\n\n  <h2>HTML &lt;picture&gt; Tag</h2>\n  <div class="media-card">\n    <picture>\n      <img src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600" alt="León" width="100%">\n    </picture>\n    <p>Águila / León de alta resolución</p>\n  </div>\n\n  <h2>HTML &lt;embed&gt; Imagen</h2>\n  <div class="media-card">\n    <embed type="image/jpg" src="https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600" width="100%">\n  </div>\n\n</body>\n</html>',
    css: '',
    js: ''
  },

  'html-fieldset-hr': {
    name: '🔘 HTML <fieldset>, Radio Buttons y <hr>',
    html: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Fieldset y Radio Buttons</title>\n  <style>\n    body { font-family: sans-serif; padding: 20px; }\n    fieldset {\n      border: 2px solid #2563eb;\n      border-radius: 8px;\n      padding: 15px;\n    }\n    legend {\n      font-weight: bold;\n      color: #2563eb;\n      padding: 0 8px;\n    }\n  </style>\n</head>\n<body>\n\n  <h2>Selección de Lenguaje favorita (&lt;fieldset&gt;)</h2>\n  <fieldset>\n    <legend>Choose Language</legend>\n    <label><input type="radio" name="lang" checked> HTML</label><br>\n    <label><input type="radio" name="lang"> JavaScript</label><br>\n    <label><input type="radio" name="lang"> CSS</label>\n  </fieldset>\n\n  <br><hr><br>\n\n  <h2>Separador Horizontal (&lt;hr&gt;)</h2>\n  <h1>I am ok...</h1>\n  <hr>\n  <h1>I am ok...</h1>\n  <hr>\n  <h1>I am ok...</h1>\n\n</body>\n</html>',
    css: '',
    js: ''
  },

  'css-card': {
    name: '🎨 Tarjeta Tarjeta CSS con Flexbox',
    html: '<div class="container">\n  <div class="profile-card">\n    <div class="card-header">\n      <div class="avatar">👨‍💻</div>\n    </div>\n    <div class="card-body">\n      <h3>Alex Developer</h3>\n      <p class="role">Estudiante de Programación</p>\n      <p class="bio">Apasionado por el diseño UI/UX y la creación de aplicaciones web interactivas.</p>\n\n      <div class="skills">\n        <span class="tag">HTML5</span>\n        <span class="tag">CSS3</span>\n        <span class="tag">JavaScript</span>\n      </div>\n\n      <button id="btn-like" class="btn-action">❤️ Me gusta (<span>0</span>)</button>\n    </div>\n  </div>\n</div>',
    css: ':root {\n  --primary-color: #6366f1;\n  --secondary-color: #a855f7;\n  --bg-gradient: linear-gradient(135deg, #0f172a, #1e1b4b);\n}\n\nbody {\n  font-family: \'Inter\', sans-serif;\n  background: var(--bg-gradient);\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  color: #fff;\n}\n\n.container {\n  padding: 20px;\n}\n\n.profile-card {\n  background: rgba(255, 255, 255, 0.07);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 20px;\n  width: 320px;\n  text-align: center;\n  overflow: hidden;\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.profile-card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 30px 60px rgba(99, 102, 241, 0.3);\n}\n\n.card-header {\n  height: 90px;\n  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));\n  position: relative;\n}\n\n.avatar {\n  width: 80px;\n  height: 80px;\n  background: #1e293b;\n  border-radius: 50%;\n  font-size: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  bottom: -40px;\n  left: 50%;\n  transform: translateX(-50%);\n  border: 4px solid #1e293b;\n}\n\n.card-body {\n  padding: 50px 24px 24px;\n}\n\nh3 {\n  margin: 10px 0 4px;\n  font-size: 1.3rem;\n}\n\n.role {\n  color: #a5b4fc;\n  font-size: 0.85rem;\n  margin-bottom: 12px;\n}\n\n.bio {\n  color: #cbd5e1;\n  font-size: 0.9rem;\n  line-height: 1.5;\n  margin-bottom: 20px;\n}\n\n.skills {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n  margin-bottom: 20px;\n}\n\n.tag {\n  background: rgba(99, 102, 241, 0.2);\n  color: #818cf8;\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n\n.btn-action {\n  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 25px;\n  font-weight: 600;\n  cursor: pointer;\n  width: 100%;\n  transition: opacity 0.2s ease;\n}\n\n.btn-action:hover {\n  opacity: 0.9;\n}',
    js: '// Funcionalidad del botón de Me Gusta\nlet likes = 0;\nconst btnLike = document.getElementById(\'btn-like\');\nconst countSpan = btnLike.querySelector(\'span\');\n\nbtnLike.addEventListener(\'click\', () => {\n  likes++;\n  countSpan.textContent = likes;\n  console.log("¡Nuevo Like registrado! Total:", likes);\n});'
  },

  'js-counter': {
    name: '⚡ Contador e Interacción DOM JS',
    html: '<div class="app-card">\n  <h2>🧮 Contador Interactivo</h2>\n  <div class="display" id="counter">0</div>\n  \n  <div class="buttons">\n    <button id="btn-decrement" class="btn red">- Restar</button>\n    <button id="btn-reset" class="btn gray">↺ Reset</button>\n    <button id="btn-increment" class="btn green">+ Sumar</button>\n  </div>\n\n  <hr>\n\n  <button id="btn-theme" class="btn-theme">🌓 Cambiar Fondo</button>\n</div>',
    css: 'body {\n  font-family: system-ui, sans-serif;\n  background-color: #1e1e2e;\n  color: #cdd6f4;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  transition: background-color 0.4s ease;\n}\n\nbody.light-mode {\n  background-color: #eff1f5;\n  color: #4c4f69;\n}\n\n.app-card {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  padding: 30px;\n  border-radius: 16px;\n  text-align: center;\n  width: 320px;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.3);\n}\n\nbody.light-mode .app-card {\n  background: white;\n  border-color: #ccd0da;\n}\n\n.display {\n  font-size: 4rem;\n  font-weight: bold;\n  margin: 20px 0;\n  color: #89b4fa;\n}\n\n.buttons {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n}\n\n.btn {\n  padding: 10px 16px;\n  border: none;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.1s ease;\n}\n\n.btn:active {\n  transform: scale(0.95);\n}\n\n.btn.green { background: #a6e3a1; color: #11111b; }\n.btn.red { background: #f38ba8; color: #11111b; }\n.btn.gray { background: #6c7086; color: #ffffff; }\n\nhr {\n  margin: 24px 0;\n  border: 0;\n  border-top: 1px solid rgba(255,255,255,0.1);\n}\n\n.btn-theme {\n  width: 100%;\n  padding: 10px;\n  background: #cba6f7;\n  color: #11111b;\n  border: none;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n}',
    js: '// Elementos del DOM\nconst counterDisplay = document.getElementById(\'counter\');\nconst btnIncrement = document.getElementById(\'btn-increment\');\nconst btnDecrement = document.getElementById(\'btn-decrement\');\nconst btnReset = document.getElementById(\'btn-reset\');\nconst btnTheme = document.getElementById(\'btn-theme\');\n\nlet count = 0;\n\nfunction updateDisplay() {\n  counterDisplay.textContent = count;\n  console.log("Valor actual del contador: " + count);\n}\n\nbtnIncrement.addEventListener(\'click\', () => {\n  count++;\n  updateDisplay();\n});\n\nbtnDecrement.addEventListener(\'click\', () => {\n  count--;\n  updateDisplay();\n});\n\nbtnReset.addEventListener(\'click\', () => {\n  count = 0;\n  updateDisplay();\n  console.warn("Contador reiniciado a 0");\n});\n\nbtnTheme.addEventListener(\'click\', () => {\n  document.body.classList.toggle(\'light-mode\');\n  const isLight = document.body.classList.contains(\'light-mode\');\n  console.info("Modo de color cambiado a: " + (isLight ? "Claro" : "Oscuro"));\n});'
  },

  'canvas-animation': {
    name: '🎮 Animación HTML5 Canvas 2D',
    html: '<div class="canvas-container">\n  <h2>⚽ Simulación de Pelotas Rebotando</h2>\n  <canvas id="gameCanvas" width="500" height="350"></canvas>\n  <p>Haz clic en el lienzo para agregar más pelotas.</p>\n</div>',
    css: 'body {\n  margin: 0;\n  background: #0f172a;\n  color: #f8fafc;\n  font-family: system-ui, sans-serif;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n}\n\n.canvas-container {\n  text-align: center;\n}\n\nh2 {\n  margin-bottom: 12px;\n  color: #38bdf8;\n}\n\ncanvas {\n  background: #1e293b;\n  border: 2px solid #38bdf8;\n  border-radius: 12px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n\np {\n  color: #94a3b8;\n  font-size: 0.9rem;\n  margin-top: 8px;\n}',
    js: 'const canvas = document.getElementById(\'gameCanvas\');\nconst ctx = canvas.getContext(\'2d\');\n\nconst balls = [];\n\nclass Ball {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n    this.radius = Math.random() * 15 + 10;\n    this.dx = (Math.random() - 0.5) * 6;\n    this.dy = (Math.random() - 0.5) * 6;\n    this.color = "hsl(" + Math.floor(Math.random() * 360) + ", 80%, 60%)";\n  }\n\n  draw() {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  update() {\n    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {\n      this.dx = -this.dx;\n    }\n    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {\n      this.dy = -this.dy;\n    }\n    this.x += this.dx;\n    this.y += this.dy;\n    this.draw();\n  }\n}\n\nfor (var i = 0; i < 5; i++) {\n  balls.push(new Ball(canvas.width / 2, canvas.height / 2));\n}\n\nfunction animate() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  balls.forEach(function(ball) { ball.update(); });\n  requestAnimationFrame(animate);\n}\n\nanimate();\n\ncanvas.addEventListener(\'click\', function(e) {\n  var rect = canvas.getBoundingClientRect();\n  var x = e.clientX - rect.left;\n  var y = e.clientY - rect.top;\n  balls.push(new Ball(x, y));\n  console.log("Pelota agregada en (" + Math.round(x) + ", " + Math.round(y) + "). Total pelotas: " + balls.length);\n});'
  }
};
