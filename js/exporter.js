/**
 * EduCode Studio - File Import / Export Module
 */

var Exporter = {

  downloadSingleHTML: function (code, filename) {
    filename = filename || 'educode-proyecto.html';
    var css = (code && code.css) || '';
    var html = (code && code.html) || '';
    var js = (code && code.js) || '';

    // Prevent tag breakout in generated HTML file
    var safeCss = css.replace(/<\/style>/gi, '<\\/style>');
    var safeJs = js.replace(/<\/script>/gi, '<\\/script>');

    var fullContent =
      '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>EduCode Proyecto</title>\n  <style>\n' +
      safeCss +
      '\n  </style>\n</head>\n<body>\n' +
      html +
      '\n\n  <script>\n' +
      safeJs +
      '\n  <\/script>\n</body>\n</html>';

    var blob = new Blob([fullContent], { type: 'text/html;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },

  downloadZip: function (code, zipFilename) {
    zipFilename = zipFilename || 'educode-proyecto.zip';

    function doZip() {
      var zip = new JSZip();

      var htmlContent =
        '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Proyecto EduCode</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n' +
        ((code && code.html) || '') +
        '\n\n  <script src="script.js"><\/script>\n</body>\n</html>';

      zip.file('index.html', htmlContent);
      zip.file('styles.css', (code && code.css) || '');
      zip.file('script.js', (code && code.js) || '');

      zip.generateAsync({ type: 'blob' }).then(function (content) {
        var url = URL.createObjectURL(content);
        var link = document.createElement('a');
        link.href = url;
        link.download = zipFilename;
        link.click();
        URL.revokeObjectURL(url);
      });
    }

    if (typeof JSZip === 'undefined') {
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      script.onload = doZip;
      document.head.appendChild(script);
    } else {
      doZip();
    }
  },

  importFile: function (file, callback) {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo es demasiado grande. El tamaño máximo permitido es 10 MB.');
      return;
    }

    var reader = new FileReader();
    var extension = file.name.split('.').pop().toLowerCase();

    reader.onload = function (e) {
      var content = e.target.result || '';
      var targetTab = 'html';
      if (extension === 'css') targetTab = 'css';
      if (extension === 'js') targetTab = 'js';
      if (callback) callback({ type: targetTab, content: content });
    };

    reader.onerror = function () {
      alert('Error al abrir el archivo seleccionado.');
    };

    reader.readAsText(file);
  }
};
