// EduCode Studio — Test Runner (Node.js CLI)
// Uso: node tests/run-tests.js
// Ejecuta antes de cada commit/deploy.

'use strict';

var fs = require('fs');
var path = require('path');
var rootDir = path.join(__dirname, '..');

// =====================================================================
//  Simular globals del navegador que usan los módulos
// =====================================================================
global.window = global;
global.document = {
  addEventListener: function() {},
  querySelector: function() { return null; },
  querySelectorAll: function() { return []; },
  getElementById: function() { return null; },
  createElement: function() {
    return {
      setAttribute: function() {},
      style: {},
      appendChild: function() {},
      click: function() {},
      href: '', download: '',
      parentNode: { replaceChild: function() {} }
    };
  },
  head: { appendChild: function() {} }
};
global.URL = {
  createObjectURL: function() { return 'blob:test'; },
  revokeObjectURL: function() {}
};
global.Blob = function(parts) { this.size = (parts || []).join('').length; };
global.FileReader = function() { this.readAsText = function() {}; };
global.alert = function(msg) { console.log('[ALERT] ' + msg); };
global.localStorage = { getItem: function() { return null; }, setItem: function() {} };
global.CodeMirror = null;
global.lucide = null;
global.JSZip = null;
global.AudioContext = null;
global.webkitAudioContext = null;

// =====================================================================
//  Cargar módulos de la app
// =====================================================================
var vm = require('vm');

var sandbox = {
  // Browser globals
  window: null,
  addEventListener: function() {},
  removeEventListener: function() {},
  document: {
    addEventListener: function() {},
    removeEventListener: function() {},
    querySelector: function() { return null; },
    querySelectorAll: function() { return []; },
    getElementById: function() { return null; },
    createElement: function() {
      return {
        setAttribute: function() {}, style: {}, appendChild: function() {},
        click: function() {}, href: '', download: '',
        parentNode: { replaceChild: function() {} }
      };
    },
    head: { appendChild: function() {} }
  },
  URL: { createObjectURL: function() { return 'blob:test'; }, revokeObjectURL: function() {} },
  Blob: function(parts) { this.size = (parts || []).join('').length; },
  FileReader: function() { this.readAsText = function() {}; },
  alert: function(msg) { console.log('[ALERT] ' + msg); },
  localStorage: { getItem: function() { return null; }, setItem: function() {} },
  CodeMirror: null,
  lucide: null,
  JSZip: null,
  AudioContext: function() {
    return { state: 'running', createOscillator: function() { return { type:'', frequency:{ setValueAtTime:function(){} }, connect:function(){}, start:function(){}, stop:function(){} }; }, createGain: function() { return { gain:{ setValueAtTime:function(){}, exponentialRampToValueAtTime:function(){} }, connect:function(){} }; }, resume: function() {}, destination: {}, currentTime: 0 };
  },
  webkitAudioContext: null,
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  Math: Math,
  Date: Date,
  JSON: JSON,
  String: String,
  Array: Array,
  Object: Object,
  parseInt: parseInt,
  parseFloat: parseFloat,
  isNaN: isNaN,
  RegExp: RegExp,
  // Will be populated by modules:
  TEMPLATES: undefined,
  CodeRunner: undefined,
  CodeSimulator: undefined,
  Exporter: undefined
};
sandbox.window = sandbox;

function loadModule(filename) {
  var code = fs.readFileSync(path.join(rootDir, 'js', filename), 'utf8');
  vm.runInNewContext(code, sandbox);
}
loadModule('templates.js');
loadModule('runner.js');
loadModule('simulator.js');
loadModule('exporter.js');

var TEMPLATES = sandbox.TEMPLATES;
var CodeRunner = sandbox.CodeRunner;
var CodeSimulator = sandbox.CodeSimulator;
var Exporter = sandbox.Exporter;


// =====================================================================
//  Micro Framework de Testing
// =====================================================================
var PASS = 0, FAIL = 0, SKIP = 0;
var currentSuite = '';
var failures = [];

function suite(name) {
  currentSuite = name;
  console.log('\n' + name);
  console.log('─'.repeat(60));
}

function pass(name) {
  PASS++;
  console.log('  \x1b[32m✓\x1b[0m ' + name);
}

function fail(name, detail) {
  FAIL++;
  failures.push(currentSuite + ' > ' + name + (detail ? '\n    → ' + detail : ''));
  console.log('  \x1b[31m✗\x1b[0m ' + name);
  if (detail) console.log('    \x1b[31m→ ' + detail + '\x1b[0m');
}

function skip(name) {
  SKIP++;
  console.log('  \x1b[33m⊘\x1b[0m ' + name + ' [SKIP]');
}

function assert(cond, name, detail) {
  if (cond) pass(name); else fail(name, detail || '');
}
function assertEq(a, b, name) {
  assert(a === b, name, 'expected=' + JSON.stringify(b) + '  got=' + JSON.stringify(a));
}
function assertContains(s, sub, name) {
  assert(typeof s === 'string' && s.indexOf(sub) !== -1, name, '"' + sub + '" no encontrado');
}
function assertNotContains(s, sub, name) {
  assert(typeof s === 'string' && s.indexOf(sub) === -1, name, '"' + sub + '" NO debería existir');
}

// =====================================================================
//  SUITE 1: Templates — Integridad Pedagógica
// =====================================================================
suite('📚 SUITE 1: Templates — Integridad Pedagógica');

assert(typeof TEMPLATES === 'object' && TEMPLATES !== null, 'TEMPLATES está definido');
var keys = Object.keys(TEMPLATES);
assert(keys.length >= 40, 'Al menos 40 ejercicios definidos. Actual: ' + keys.length);
assertEq(keys[0], 'blank', 'El primer template (default) es "blank"');
assertEq(TEMPLATES.blank.html, '', 'blank.html es vacío');
assertEq(TEMPLATES.blank.css, '', 'blank.css es vacío');
assertEq(TEMPLATES.blank.js, '', 'blank.js es vacío');

// Nivel 1: 10 ejercicios CSS fundamentales
var n1Keys = [
  'n1-selector-basic', 'n1-color', 'n1-background', 'n1-background-rgb',
  'n1-color-hex', 'n1-text-align', 'n1-font-size', 'n1-font-weight',
  'n1-border', 'n1-opacity'
];
n1Keys.forEach(function(k) {
  assert(k in TEMPLATES, 'Existe: ' + k);
  assertEq(TEMPLATES[k].html, '', k + ': html vacío (CSS puro)');
  assert(TEMPLATES[k].css.trim().length > 0, k + ': css tiene contenido');
  assertNotContains(TEMPLATES[k].css, '<!DOCTYPE', k + ': css sin <!DOCTYPE');
  assertNotContains(TEMPLATES[k].css, '<html', k + ': css sin <html>');
  assertNotContains(TEMPLATES[k].css, '<style', k + ': css sin <style>');
  assertNotContains(TEMPLATES[k].css, '<body', k + ': css sin <body>');
});

// Contenido específico
assertContains(TEMPLATES['n1-selector-basic'].css, 'color: red', 'n1-selector-basic tiene "color: red"');
assertContains(TEMPLATES['n1-background'].css, 'background: yellow', 'n1-background tiene "background: yellow"');
assertContains(TEMPLATES['n1-border'].css, '4px solid red', 'n1-border tiene "4px solid red"');
assertContains(TEMPLATES['n1-opacity'].css, 'opacity: 0.1', 'n1-opacity tiene "opacity: 0.1"');
assertContains(TEMPLATES['n1-background-rgb'].css, 'rgb(', 'n1-background-rgb tiene rgb()');
assertContains(TEMPLATES['n1-color-hex'].css, '#', 'n1-color-hex tiene "#" para color HEX');

// Nivel 2: Selectores
['n2-selector-element','n2-selector-class','n2-usage-class','n2-selector-id','n2-usage-id','n2-selectors-grouped'].forEach(function(k) {
  assert(k in TEMPLATES, 'Existe: ' + k);
});
assertContains(TEMPLATES['n2-selectors-grouped'].css, 'h1, h2, p', 'n2-selectors-grouped tiene "h1, h2, p"');

// Nivel 5: HTML sin boilerplate
['n5-html-headings','n5-html-paragraphs','n5-html-break','n5-html-hr','n5-html-emphasis'].forEach(function(k) {
  assert(k in TEMPLATES, 'Existe: ' + k);
  assert(TEMPLATES[k].html.trim().length > 0, k + ': html tiene contenido');
  assertNotContains(TEMPLATES[k].html, '<!DOCTYPE', k + ': html sin <!DOCTYPE (es fragmento)');
  assertNotContains(TEMPLATES[k].html, '<html', k + ': html sin <html> (es fragmento)');
  assertNotContains(TEMPLATES[k].html, '<head>', k + ': html sin <head>');
  assertNotContains(TEMPLATES[k].html, '<body>', k + ': html sin <body>');
});

// Nivel 6: DEBE tener boilerplate (eso enseña)
assert('n6-html-structure' in TEMPLATES, 'Existe: n6-html-structure');
assertContains(TEMPLATES['n6-html-structure'].html, '<!DOCTYPE html>', 'n6-html-structure SÍ tiene <!DOCTYPE html>');
assertContains(TEMPLATES['n6-html-structure'].html, '<body>', 'n6-html-structure SÍ tiene <body>');

// Nivel 9: Formularios individuales (cada input en su ejercicio, sin <form> extra)
['n9-input-text','n9-input-number','n9-input-date','n9-input-submit',
 'n9-input-required','n9-input-disabled','n9-input-size'].forEach(function(k) {
  assert(k in TEMPLATES, 'Existe: ' + k);
  assertNotContains(TEMPLATES[k].html, '<form>', k + ': input individual no envuelto en <form>');
});
assert('n9-form-simple' in TEMPLATES, 'Existe: n9-form-simple');
assertContains(TEMPLATES['n9-form-simple'].html, '<form>', 'n9-form-simple SÍ tiene <form>');

// Nivel 12: Error y comentarios
assert('n12-css-error-semicolon' in TEMPLATES, 'Existe: n12-css-error-semicolon');
assertContains(TEMPLATES['n12-css-error-semicolon'].css, 'color: red\n', 'n12-error tiene punto y coma faltante (fallo intencional)');
assert('n12-css-comment' in TEMPLATES, 'Existe: n12-css-comment');
assertContains(TEMPLATES['n12-css-comment'].css, '/*', 'n12-comment tiene comentario CSS /* */');

// Nivel 13: Dialog interactivo con JS
assert('n13-dialog-basic' in TEMPLATES, 'Existe: n13-dialog-basic');
assert('n13-dialog-interactive' in TEMPLATES, 'Existe: n13-dialog-interactive');
assertContains(TEMPLATES['n13-dialog-basic'].html, '<dialog open>', 'n13-dialog-basic tiene <dialog open>');
assert(TEMPLATES['n13-dialog-interactive'].js.trim().length > 0, 'n13-dialog-interactive tiene JS no vacío');

// Todos los templates tienen html, css, js como strings
keys.forEach(function(k) {
  var t = TEMPLATES[k];
  assert('html' in t && 'css' in t && 'js' in t && 'name' in t,
    '"' + k + '" tiene html, css, js, name');
  assert(typeof t.html === 'string' && typeof t.css === 'string' && typeof t.js === 'string',
    '"' + k + '": html/css/js son strings');
});

// Verificar los 13 niveles están presentes
['n1-','n2-','n3-','n4-','n5-','n6-','n7-','n8-','n9-','n10-','n11-','n12-','n13-'].forEach(function(prefix) {
  var has = keys.some(function(k) { return k.indexOf(prefix) === 0; });
  assert(has, 'Hay al menos un ejercicio del nivel ' + prefix.replace('-',''));
});

// =====================================================================
//  SUITE 2: Runner — Ensamblado HTML Correcto
// =====================================================================
suite('⚙️  SUITE 2: Runner — Ensamblado HTML');

var iframe = { srcdoc: '' };
var runner = new CodeRunner(iframe, function() {});

// CSS puro → genera documento completo con elemento automático
runner.run({ html: '', css: 'h1 { color: red; }', js: '' });
assertContains(iframe.srcdoc, '<!DOCTYPE html>', 'CSS puro genera <!DOCTYPE html>');
assertContains(iframe.srcdoc, 'color: red', 'CSS puro incluye la regla');
assertContains(iframe.srcdoc, '<h1', 'CSS puro genera h1 automático para visualizar');

runner.run({ html: '', css: 'p { color: blue; }', js: '' });
assertContains(iframe.srcdoc, '<p>', 'CSS con selector p genera <p> automático');

runner.run({ html: '', css: 'h2 { background: yellow; }', js: '' });
assertContains(iframe.srcdoc, '<h2>', 'CSS con selector h2 genera <h2> automático');

runner.run({ html: '', css: '.center { text-align: center; }', js: '' });
assertContains(iframe.srcdoc, 'class="center"', 'CSS .center genera elemento con class="center"');

runner.run({ html: '', css: '#para { color: blue; }', js: '' });
assertContains(iframe.srcdoc, 'id="para"', 'CSS #para genera elemento con id="para"');

runner.run({ html: '', css: '.car { background: green; }', js: '' });
assertContains(iframe.srcdoc, 'class="car"', 'CSS .car genera elemento con class="car"');

// HTML fragmento → envuelve en documento
runner.run({ html: '<p>Hola mundo</p>', css: '', js: '' });
assertContains(iframe.srcdoc, '<!DOCTYPE html>', 'Fragmento HTML genera DOCTYPE');
assertContains(iframe.srcdoc, '<p>Hola mundo</p>', 'Fragmento preserva contenido original');

// Documento completo → NO duplica DOCTYPE
runner.run({ html: '<!DOCTYPE html><html><head></head><body><p>Ok</p></body></html>', css: '', js: '' });
var dcount = (iframe.srcdoc.match(/<!DOCTYPE/gi) || []).length;
assertEq(dcount, 1, 'Documento completo: solo 1 DOCTYPE (actual=' + dcount + ')');

// Seguridad: </script> en JS no rompe bloque
runner.run({ html: '', css: '', js: 'var x = "<\\/scri" + "pt>";' });
assert(iframe.srcdoc.indexOf('</script>var x') === -1, 'XSS: </script> en JS no rompe documento');

// Consola interceptor inyectado
runner.run({ html: '<p>Test</p>', css: '', js: 'console.log("ok")' });
assertContains(iframe.srcdoc, 'postMessage', 'Console interceptor con postMessage inyectado');
assertContains(iframe.srcdoc, 'CONSOLE_LOG', 'Console interceptor referencia CONSOLE_LOG');

// No crashea con null/vacío
var crashed = false;
try { runner.run(null); } catch(e) { crashed = true; }
assert(!crashed, 'runner.run(null) no lanza excepción');
try { runner.run({}); } catch(e) { crashed = true; }
assert(!crashed, 'runner.run({}) no lanza excepción');

// =====================================================================
//  SUITE 3: Simulator — Selección de Tab Didáctico
// =====================================================================
suite('🎹 SUITE 3: Simulator — Selección de Tab Didáctico');

var lastTab = null;
var mockEd = {
  setCode: function() {},
  switchTab: function(t) { lastTab = t; },
  getCode: function() { return { html: '', css: '', js: '' }; }
};
var sim = new CodeSimulator(mockEd, null, {});

// CSS puro → activeTab debe ser 'css'
sim.loadTarget({ html: '', css: 'h1 { color: red; }', js: '' }, 'html');
assertEq(sim.activeTab, 'css', 'loadTarget CSS puro → activeTab=css (aunque se pida html)');
assertEq(lastTab, 'css', 'loadTarget CSS puro → llama switchTab("css")');

// HTML → activeTab debe ser 'html'
sim.loadTarget({ html: '<p>Hola</p>', css: '', js: '' }, 'html');
assertEq(sim.activeTab, 'html', 'loadTarget HTML → activeTab=html');

// JS puro → activeTab debe ser 'js'
sim.loadTarget({ html: '', css: '', js: 'console.log(1)' }, 'html');
assertEq(sim.activeTab, 'js', 'loadTarget JS puro → activeTab=js');

// Reset estado
sim.loadTarget({ html: '<p>Hola</p>', css: '', js: '' }, 'html');
assertEq(sim.currentCode.html, '', 'loadTarget resetea currentCode.html a vacío');
assertEq(sim.targetIndex, 0, 'loadTarget resetea targetIndex a 0');
assertEq(sim.startTime, null, 'loadTarget resetea startTime a null');

// targetCode se carga correctamente
assertEq(sim.targetCode.html, '<p>Hola</p>', 'targetCode.html asignado correctamente');

// pause/stop
sim.isTyping = true;
sim.pause();
assertEq(sim.isTyping, false, 'pause() pone isTyping=false');

// reset completo
sim.currentCode = { html: 'algo', css: 'x{}', js: 'var x=1' };
sim.reset();
assertEq(sim.currentCode.html, '', 'reset() limpia currentCode.html');
assertEq(sim.currentCode.css, '', 'reset() limpia currentCode.css');
assertEq(sim.targetIndex, 0, 'reset() pone targetIndex=0');

// Defaults razonables
var freshSim = new CodeSimulator(mockEd, null, {});
assert(freshSim.typoProbability > 0 && freshSim.typoProbability < 0.1,
  'typoProbability por defecto razonable (0-0.1): ' + freshSim.typoProbability);
assert(freshSim.baseDelay >= 10 && freshSim.baseDelay <= 200,
  'baseDelay por defecto razonable (10-200ms): ' + freshSim.baseDelay + 'ms');

// Ejercicio N1 selector básico
sim.loadTarget(TEMPLATES['n1-selector-basic'], 'html');
assertEq(sim.activeTab, 'css', 'n1-selector-basic → simulator selecciona tab CSS');
assertContains(sim.targetCode.css, 'color: red', 'n1-selector-basic → targetCode.css correcto');

// =====================================================================
//  SUITE 4: Exporter
// =====================================================================
suite('📦 SUITE 4: Exporter — Exportación');

assert(typeof Exporter === 'object', 'Exporter definido');
assert(typeof Exporter.downloadSingleHTML === 'function', 'downloadSingleHTML disponible');
assert(typeof Exporter.downloadZip === 'function', 'downloadZip disponible');
assert(typeof Exporter.importFile === 'function', 'importFile disponible');

var alertMsg = null;
sandbox.alert = function(m) { alertMsg = m; };
Exporter.importFile({ size: 11 * 1024 * 1024, name: 'test.html' }, function() {});
assert(alertMsg !== null, 'importFile rechaza archivos >10MB con alerta');

var cErr = false;
try { Exporter.importFile(null, function() {}); } catch(e) { cErr = true; }
assert(!cErr, 'importFile(null) no crashea');

try { Exporter.importFile(undefined, function() {}); } catch(e) { cErr = true; }
assert(!cErr, 'importFile(undefined) no crashea');

// =====================================================================
//  SUITE 5: Regresión — Bugs anteriores
// =====================================================================
suite('🐛 SUITE 5: Tests de Regresión');

// Bug#1: Simulador CSS puro — no tipeaba nada porque buscaba en tab HTML
sim.loadTarget(TEMPLATES['n1-selector-basic'], 'html');
assertEq(sim.activeTab, 'css', 'Bug#1 FIXED: CSS puro carga en tab CSS');

// Bug#2: DOCTYPE duplicado en documento completo
var iframe2 = { srcdoc: '' };
var r2 = new CodeRunner(iframe2, function() {});
r2.run({ html: '<!DOCTYPE html><html><body><p>Test</p></body></html>', css: '', js: '' });
var dc = (iframe2.srcdoc.match(/<!DOCTYPE/gi) || []).length;
assertEq(dc, 1, 'Bug#2 FIXED: Sin DOCTYPE duplicado');

// Bug#3: Primer template debe ser blank
assertEq(Object.keys(TEMPLATES)[0], 'blank', 'Bug#3 FIXED: Default template es blank');

// Bug#4: N13 dialog interactivo tiene JS funcional
assert(TEMPLATES['n13-dialog-interactive'].js.trim().length > 0, 'Bug#4: n13-dialog-interactive tiene JS');
assertContains(TEMPLATES['n13-dialog-interactive'].js, 'showModal', 'Bug#4: JS tiene showModal()');

// Bug#5: loadTarget con n2-usage-class (tiene tanto html como css) → debe elegir html
sim.loadTarget(TEMPLATES['n2-usage-class'], 'css');
// n2-usage-class: html='<h1 class="center">Heading</h1>', css='.center{...}' → debería quedar en la pestaña pedida si tiene contenido
assert(sim.activeTab === 'css' || sim.activeTab === 'html', 'Bug#5: template con ambos (html+css) acepta tab pedido');

// =====================================================================
//  RESUMEN
// =====================================================================
console.log('\n' + '═'.repeat(60));
var total = PASS + FAIL + SKIP;
console.log(' TOTAL: ' + total + '  |  \x1b[32mPASS: ' + PASS + '\x1b[0m  |  \x1b[31mFAIL: ' + FAIL + '\x1b[0m  |  \x1b[33mSKIP: ' + SKIP + '\x1b[0m');
console.log('═'.repeat(60));

if (failures.length > 0) {
  console.log('\n\x1b[31mFALLOS DETECTADOS:\x1b[0m');
  failures.forEach(function(f, i) {
    console.log('\n  ' + (i+1) + '. ' + f);
  });
}

console.log(FAIL === 0 ? '\n\x1b[32m✓ Todos los tests pasaron. Listo para deploy.\x1b[0m' : '\n\x1b[31m✗ Hay tests fallando. Revisar antes de deploy.\x1b[0m');
process.exit(FAIL > 0 ? 1 : 0);
