/**
 * EduCode Studio - Share Link Utilities
 */

var ShareLink = (function () {

  function encode(codeObj) {
    if (!codeObj) return '';
    try {
      var data = {
        h: codeObj.html || '',
        c: codeObj.css || '',
        j: codeObj.js || ''
      };
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
      var jsonStr = decodeURIComponent(atob(cleanHash));
      var data = JSON.parse(jsonStr);
      return {
        html: data.h || '',
        css: data.c || '',
        js: data.j || ''
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
    generateShareUrl: generateShareUrl
  };
})();
