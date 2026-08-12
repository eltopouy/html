/**
 * EduCode Studio - Code Runner & Sandboxed Preview Module
 */

var CodeRunner = (function () {

  function CodeRunner(iframeElement, onConsoleLog) {
    this.iframe = iframeElement;
    this.onConsoleLog = onConsoleLog;
    this._initConsoleBridge();
  }

  CodeRunner.prototype._initConsoleBridge = function () {
    var self = this;
    window.addEventListener('message', function (event) {
      // Security check: Only process messages coming from our own preview iframe contentWindow
      if (self.iframe && event.source !== self.iframe.contentWindow) return;

      if (event.data) {
        if (event.data.type === 'CONSOLE_LOG' && self.onConsoleLog) {
          self.onConsoleLog(event.data);
        } else if (event.data.type === 'CONSOLE_CLEAR' && self.onConsoleClear) {
          self.onConsoleClear();
        } else if (event.data.type === 'ELEMENT_INSPECTED' && self.onElementInspected) {
          self.onElementInspected(event.data);
        }
      }
    });
  };

  CodeRunner.prototype.setInspectorMode = function (active) {
    if (this.iframe && this.iframe.contentWindow) {
      try {
        this.iframe.contentWindow.postMessage({ type: 'SET_INSPECTOR', active: !!active }, '*');
      } catch (e) {
        console.error('Error setting inspector mode:', e);
      }
    }
  };

  CodeRunner.prototype.run = function (code) {
    var html = (code && code.html) || '';
    var css = (code && code.css) || '';
    var js = (code && code.js) || '';

    // Prevent tag breakout (closing </script> or </style> inside user code)
    var safeCss = css.replace(/<\/style>/gi, '<\\/style>');
    var safeJs = js.replace(/<\/script>/gi, '<\\/script>');

    var consoleInterceptor =
      '<script>' +
      '(function() {' +
      '  var formatArg = function(arg) {' +
      '    if (arg === null) return "null";' +
      '    if (arg === undefined) return "undefined";' +
      '    if (arg instanceof Error) return arg.stack || (arg.name + ": " + arg.message);' +
      '    if (typeof Element !== "undefined" && arg instanceof Element) {' +
      '      var tag = arg.tagName.toLowerCase();' +
      '      var id = arg.id ? \' id="\' + arg.id + \'"\' : "";' +
      '      var cls = arg.className ? \' class="\' + arg.className + \'"\' : "";' +
      '      return "<" + tag + id + cls + ">";' +
      '    }' +
      '    if (typeof arg === "object") {' +
      '      try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }' +
      '    }' +
      '    return String(arg);' +
      '  };' +
      '  var logCount = 0;' +
      '  var MAX_LOGS = 500;' +
      '  var sendLog = function(level, args) {' +
      '    logCount++;' +
      '    if (logCount > MAX_LOGS) {' +
      '      if (logCount === MAX_LOGS + 1) {' +
      '        window.parent.postMessage({ type: "CONSOLE_LOG", level: "warn", text: "[Consola pausada: superado el límite de 500 mensajes]", timestamp: new Date().toLocaleTimeString() }, "*");' +
      '      }' +
      '      return;' +
      '    }' +
      '    var text = Array.prototype.slice.call(args).map(formatArg).join(" ");' +
      '    window.parent.postMessage({' +
      '      type: "CONSOLE_LOG",' +
      '      level: level,' +
      '      text: text,' +
      '      timestamp: new Date().toLocaleTimeString()' +
      '    }, "*");' +
      '  };' +
      '  ["log", "warn", "error", "info"].forEach(function(level) {' +
      '    var original = console[level];' +
      '    console[level] = function() {' +
      '      sendLog(level, arguments);' +
      '      if (original) original.apply(console, arguments);' +
      '    };' +
      '  });' +
      '  console.clear = function() {' +
      '    window.parent.postMessage({ type: "CONSOLE_CLEAR" }, "*");' +
      '  };' +
      '  window.addEventListener("error", function(e) {' +
      '    sendLog("error", ["Error: " + e.message + " (línea " + e.lineno + ")"]);' +
      '  });' +
      '  window.addEventListener("message", function(e) {' +
      '    if (e.data && e.data.type === "SET_INSPECTOR") {' +
      '      window.__INSPECTOR_ACTIVE__ = !!e.data.active;' +
      '      if (!e.data.active && window.__CURRENT_INSPECTED_EL__) {' +
      '        window.__CURRENT_INSPECTED_EL__.style.outline = "";' +
      '        window.__CURRENT_INSPECTED_EL__ = null;' +
      '      }' +
      '    }' +
      '  });' +
      '  document.addEventListener("mouseover", function(e) {' +
      '    if (!window.__INSPECTOR_ACTIVE__) return;' +
      '    e.stopPropagation();' +
      '    var el = e.target;' +
      '    if (window.__CURRENT_INSPECTED_EL__ && window.__CURRENT_INSPECTED_EL__ !== el) {' +
      '      window.__CURRENT_INSPECTED_EL__.style.outline = "";' +
      '    }' +
      '    window.__CURRENT_INSPECTED_EL__ = el;' +
      '    el.style.outline = "2px dashed #2563eb";' +
      '  }, true);' +
      '  document.addEventListener("click", function(e) {' +
      '    if (!window.__INSPECTOR_ACTIVE__) return;' +
      '    e.preventDefault();' +
      '    e.stopPropagation();' +
      '    var el = e.target;' +
      '    if (el) {' +
      '      el.style.outline = "";' +
      '      window.__INSPECTOR_ACTIVE__ = false;' +
      '      window.parent.postMessage({' +
      '        type: "ELEMENT_INSPECTED",' +
      '        tagName: el.tagName,' +
      '        id: el.id,' +
      '        className: el.className,' +
      '        textContent: el.textContent ? el.textContent.trim().substring(0, 30) : ""' +
      '      }, "*");' +
      '    }' +
      '  }, true);' +
      '})();' +
      '<\/script>';

    var styleBlock = '<style>' + safeCss + '</style>';
    var scriptBlock = '<script>try {' + safeJs + '} catch (err) { console.error("Error al ejecutar JavaScript: " + err.message); }<\/script>';

    // Smart HTML Assembler: Check if student provided full document or fragment
    var fullSource = '';
    var isFullDocument = /<!DOCTYPE|<html/i.test(html);

    if (isFullDocument) {
      fullSource = html;
      // Inject style and consoleInterceptor before </head> if present, or after <head>, or after <!DOCTYPE>
      var headCode = styleBlock + consoleInterceptor;
      if (/<\/head>/i.test(fullSource)) {
        fullSource = fullSource.replace(/<\/head>/i, headCode + '</head>');
      } else if (/<head[^>]*>/i.test(fullSource)) {
        fullSource = fullSource.replace(/(<head[^>]*>)/i, '$1' + headCode);
      } else if (/<!DOCTYPE[^>]*>/i.test(fullSource)) {
        fullSource = fullSource.replace(/(<!DOCTYPE[^>]*>)/i, '$1' + headCode);
      } else {
        fullSource = headCode + fullSource;
      }
      // Inject script block before </body> if present, or at end
      if (/<\/body>/i.test(fullSource)) {
        fullSource = fullSource.replace(/<\/body>/i, scriptBlock + '</body>');
      } else {
        fullSource = fullSource + scriptBlock;
      }
    } else {
      var bodyContent = html.trim();

      // If HTML is empty, generate an appropriate minimal target element based on CSS selectors for instant visual feedback
      if (!bodyContent && safeCss.trim()) {
        if (/^\s*\.center/i.test(safeCss) || /class=["']center["']/i.test(safeCss)) {
          bodyContent = '<h1 class="center">Encabezado Centrado</h1>';
        } else if (/^\s*#para/i.test(safeCss) || /id=["']para["']/i.test(safeCss)) {
          bodyContent = '<p id="para">Primer Párrafo.</p>';
        } else if (/^\s*\.car/i.test(safeCss)) {
          bodyContent = '<div class="car">Auto de Ejemplo</div>';
        } else if (/^\s*p\b/i.test(safeCss)) {
          bodyContent = '<p>Este es un párrafo de prueba.</p>';
        } else if (/^\s*h2\b/i.test(safeCss)) {
          bodyContent = '<h2>Encabezado Nivel 2</h2>';
        } else if (/^\s*(h1|h2|p)\b/i.test(safeCss)) {
          bodyContent = '<h1>Primer Encabezado</h1>\n<h2>Segundo Encabezado</h2>\n<p>Párrafo de ejemplo.</p>';
        } else {
          bodyContent = '<h1>Encabezado de Prueba</h1>\n<p>Texto de prueba para visualizar el estilo.</p>';
        }
      }

      var baseStyle = '<style>body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #1e293b; line-height: 1.5; } ' + safeCss + '</style>';

      fullSource =
        '<!DOCTYPE html>' +
        '<html lang="es">' +
        '<head>' +
        '<meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        baseStyle +
        consoleInterceptor +
        '</head>' +
        '<body>' +
        bodyContent +
        scriptBlock +
        '</body></html>';
    }

    this.iframe.srcdoc = fullSource;
  };

  return CodeRunner;
})();
