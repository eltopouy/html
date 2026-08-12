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

    var styleBlock = safeCss ? '\n  <style>\n' + safeCss + '\n  </style>' : '';
    var scriptBlock = safeJs ? '\n  <script>\n' + safeJs + '\n  </script>' : '';

    var fullContent = '';
    var isFullDocument = /<!DOCTYPE|<html/i.test(html);

    if (isFullDocument) {
      fullContent = html;
      if (styleBlock) {
        if (/<\/head>/i.test(fullContent)) {
          fullContent = fullContent.replace(/<\/head>/i, styleBlock + '\n</head>');
        } else if (/<head[^>]*>/i.test(fullContent)) {
          fullContent = fullContent.replace(/(<head[^>]*>)/i, '$1\n' + styleBlock);
        } else if (/<!DOCTYPE[^>]*>/i.test(fullContent)) {
          fullContent = fullContent.replace(/(<!DOCTYPE[^>]*>)/i, '$1\n' + styleBlock);
        } else {
          fullContent = styleBlock + '\n' + fullContent;
        }
      }
      if (scriptBlock) {
        if (/<\/body>/i.test(fullContent)) {
          fullContent = fullContent.replace(/<\/body>/i, scriptBlock + '\n</body>');
        } else {
          fullContent = fullContent + '\n' + scriptBlock;
        }
      }
    } else {
      fullContent =
        '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>EduCode Proyecto</title>' +
        styleBlock +
        '\n</head>\n<body>\n' +
        html +
        scriptBlock +
        '\n</body>\n</html>';
    }

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
    var html = (code && code.html) || '';
    var css = (code && code.css) || '';
    var js = (code && code.js) || '';

    function doZip() {
      var zip = new JSZip();

      var cssRef = '\n  <link rel="stylesheet" href="styles.css">';
      var jsRef = '\n  <script src="script.js"><\/script>';
      var htmlContent = '';
      var isFullDocument = /<!DOCTYPE|<html/i.test(html);

      if (isFullDocument) {
        htmlContent = html;
        if (/<\/head>/i.test(htmlContent)) {
          htmlContent = htmlContent.replace(/<\/head>/i, cssRef + '\n</head>');
        } else if (/<head[^>]*>/i.test(htmlContent)) {
          htmlContent = htmlContent.replace(/(<head[^>]*>)/i, '$1\n' + cssRef);
        } else if (/<!DOCTYPE[^>]*>/i.test(htmlContent)) {
          htmlContent = htmlContent.replace(/(<!DOCTYPE[^>]*>)/i, '$1\n' + cssRef);
        } else {
          htmlContent = cssRef + '\n' + htmlContent;
        }
        if (/<\/body>/i.test(htmlContent)) {
          htmlContent = htmlContent.replace(/<\/body>/i, jsRef + '\n</body>');
        } else {
          htmlContent = htmlContent + '\n' + jsRef;
        }
      } else {
        htmlContent =
          '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Proyecto EduCode</title>' +
          cssRef +
          '\n</head>\n<body>\n' +
          html +
          jsRef +
          '\n</body>\n</html>';
      }

      zip.file('index.html', htmlContent);
      zip.file('styles.css', css);
      zip.file('script.js', js);

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

    var fileName = file.name || '';
    var parts = fileName.split('.');
    var extension = parts.length > 1 ? parts.pop().toLowerCase() : '';
    var allowedExts = ['html', 'css', 'js'];

    if (!extension || allowedExts.indexOf(extension) === -1) {
      alert('Tipo de archivo no permitido. Solo se pueden subir archivos .html, .css y .js.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo es demasiado grande. El tamaño máximo permitido es 10 MB.');
      return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      var content = e.target.result || '';
      var targetTab = 'html';
      if (extension === 'css') targetTab = 'css';
      if (extension === 'js') targetTab = 'js';
      if (callback) callback({ type: targetTab, content: content, filename: fileName });
    };

    reader.onerror = function () {
      alert('Error al abrir el archivo seleccionado.');
    };

    reader.readAsText(file);
  },

  downloadRepoZip: function (callback) {
    function doZip() {
      fetch('/api/source-files')
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(function (data) {
          if (!data.success || !data.files) {
            throw new Error(data.error || 'No se pudieron obtener los archivos del servidor');
          }

          var zip = new JSZip();
          data.files.forEach(function (fileObj) {
            zip.file(fileObj.path, fileObj.content);
          });

          return zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 }
          });
        })
        .then(function (blob) {
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'educode-studio-v3.0.0-repo.zip';
          document.body.appendChild(a);
          a.click();
          setTimeout(function () {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 300);
          if (callback) callback(null);
        })
        .catch(function (err) {
          alert('Error al generar el paquete ZIP del repositorio: ' + err.message);
          if (callback) callback(err);
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
  }
};
