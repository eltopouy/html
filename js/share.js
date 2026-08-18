/**
 * EduCode Studio - Share Link Utilities
 *
 * Codifica/decodifica proyectos HTML/CSS/JS en URLs compartibles
 * usando Base64 + encodeURIComponent para soporte UTF-8 completo.
 */

var ShareLink = (function () {

  // Límites de seguridad por campo individual (bytes aprox.)
  var MAX_FIELD_LENGTH = 200 * 1024;  // 200 KB por campo (h, c, j)
  var MAX_TOTAL_LENGTH = 500 * 1024;  // 500 KB total del payload Base64

  function encode(codeObj) {
    if (!codeObj) return '';
    try {
      // Security: Truncate each field at the same limit used in decode()
      var htmlVal = typeof codeObj.html === 'string' ? codeObj.html : '';
      var cssVal  = typeof codeObj.css  === 'string' ? codeObj.css  : '';
      var jsVal   = typeof codeObj.js   === 'string' ? codeObj.js   : '';

      if (htmlVal.length > MAX_FIELD_LENGTH) htmlVal = htmlVal.substring(0, MAX_FIELD_LENGTH);
      if (cssVal.length  > MAX_FIELD_LENGTH) cssVal  = cssVal.substring(0, MAX_FIELD_LENGTH);
      if (jsVal.length   > MAX_FIELD_LENGTH) jsVal   = jsVal.substring(0, MAX_FIELD_LENGTH);

      var data = { h: htmlVal, c: cssVal, j: jsVal };
      var jsonStr = JSON.stringify(data);
      // UTF-8 friendly Base64 encoding
      var encoded = btoa(encodeURIComponent(jsonStr));
      return encoded;
    } catch (e) {
      console.error('Error encoding share link:', e);
      return '';
    }
  }

  function decode(hashStr) {
    if (!hashStr) return null;
    try {
      var cleanHash = hashStr.replace(/^#code=/, '');
      if (!cleanHash) return null;

      // Security: Limit max total payload length to prevent Memory DoS
      if (cleanHash.length > MAX_TOTAL_LENGTH) {
        console.warn('Share link payload exceeds max allowed size (500KB)');
        return null;
      }

      var jsonStr = decodeURIComponent(atob(cleanHash));
      var data = JSON.parse(jsonStr);

      if (!data || typeof data !== 'object') return null;

      // Security: Validate each field is a string and within size limits
      var htmlVal = typeof data.h === 'string' ? data.h : '';
      var cssVal  = typeof data.c === 'string' ? data.c : '';
      var jsVal   = typeof data.j === 'string' ? data.j : '';

      if (htmlVal.length > MAX_FIELD_LENGTH) {
        console.warn('Share link: campo HTML supera el límite de 200KB');
        htmlVal = htmlVal.substring(0, MAX_FIELD_LENGTH);
      }
      if (cssVal.length > MAX_FIELD_LENGTH) {
        console.warn('Share link: campo CSS supera el límite de 200KB');
        cssVal = cssVal.substring(0, MAX_FIELD_LENGTH);
      }
      if (jsVal.length > MAX_FIELD_LENGTH) {
        console.warn('Share link: campo JS supera el límite de 200KB');
        jsVal = jsVal.substring(0, MAX_FIELD_LENGTH);
      }

      return {
        html: htmlVal,
        css: cssVal,
        js: jsVal
      };
    } catch (e) {
      console.error('Error decoding share link:', e);
      return null;
    }
  }

  function generateShareUrl(codeObj) {
    var encoded = encode(codeObj);
    if (!encoded) return '';
    var baseUrl = window.location.origin + window.location.pathname;
    return baseUrl + '#code=' + encoded;
  }

  return {
    encode: encode,
    decode: decode,
    generateShareUrl: generateShareUrl,
    // Exposed for testing
    _MAX_FIELD_LENGTH: MAX_FIELD_LENGTH,
    _MAX_TOTAL_LENGTH: MAX_TOTAL_LENGTH
  };
})();
