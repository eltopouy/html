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

      if (event.data && event.data.type === 'CONSOLE_LOG') {
        if (self.onConsoleLog) {
          self.onConsoleLog(event.data);
        }
      }
    });
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
      '    if (typeof arg === "object") {' +
      '      try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }' +
      '    }' +
      '    return String(arg);' +
      '  };' +
      '  var sendLog = function(level, args) {' +
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
      '  window.addEventListener("error", function(e) {' +
      '    sendLog("error", ["Error: " + e.message + " (línea " + e.lineno + ")"]);' +
      '  });' +
      '})();' +
      '<\/script>';

    var fullSource =
      '<!DOCTYPE html>' +
      '<html lang="es">' +
      '<head>' +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<style>' + safeCss + '</style>' +
      consoleInterceptor +
      '</head>' +
      '<body>' +
      html +
      '<script>' +
      'try {' + safeJs + '} catch (err) { console.error("Error al ejecutar JavaScript: " + err.message); }' +
      '<\/script>' +
      '</body></html>';

    this.iframe.srcdoc = fullSource;
  };

  return CodeRunner;
})();
