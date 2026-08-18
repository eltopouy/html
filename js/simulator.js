/**
 * EduCode Studio - Hyper-Realistic Typing Simulator & Learning Engine
 * Simula la escritura de código en tiempo real imitando los patrones, ráfagas,
 * pausas de duda y errores tipográficos reales de programadores (teclado QWERTY español).
 * Desarrollado por Andrés Franchi Ugartemendía para estudiantes de Liceos y UTU.
 */

var CodeSimulator = (function () {

  // Mapa de teclas físicamente adyacentes en distribución QWERTY español/Latinoamérica
  var KEYBOARD_NEIGHBORS = {
    'a': ['s', 'q', 'z', 'w'],
    'b': ['v', 'n', 'g', 'h'],
    'c': ['x', 'v', 'd', 'f'],
    'd': ['s', 'f', 'e', 'r', 'c'],
    'e': ['w', 'r', 'd', '3', '4'],
    'f': ['d', 'g', 'r', 't', 'v'],
    'g': ['f', 'h', 't', 'y', 'b'],
    'h': ['g', 'j', 'y', 'u', 'n'],
    'i': ['u', 'o', 'k', '8', '9'],
    'j': ['h', 'k', 'u', 'i', 'm'],
    'k': ['j', 'l', 'i', 'o'],
    'l': ['k', 'ñ', 'o', 'p'],
    'm': ['n', 'k', 'j', ','],
    'n': ['b', 'm', 'h', 'j'],
    'ñ': ['l', 'p', ';', '\''],
    'o': ['i', 'p', 'k', 'l', '9', '0'],
    'p': ['o', 'l', 'ñ', '0'],
    'q': ['w', 'a', '1', '2'],
    'r': ['e', 't', 'f', 'd', '4', '5'],
    's': ['a', 'd', 'w', 'e', 'z', 'x'],
    't': ['r', 'y', 'g', 'f', '5', '6'],
    'u': ['y', 'i', 'h', 'j', '7', '8'],
    'v': ['c', 'b', 'f', 'g'],
    'w': ['q', 'e', 's', 'a', '2', '3'],
    'x': ['z', 'c', 's', 'd'],
    'y': ['t', 'u', 'g', 'h', '6', '7'],
    'z': ['a', 's', 'x'],
    '<': ['>', 'z', 'a'],
    '>': ['<', '.', ','],
    ';': [':', 'l', 'ñ'],
    ':': [';', 'p', 'l'],
    '.': [',', ';', ':'],
    ',': ['.', 'm', 'n'],
    '"': ['\'', ';', ':'],
    '\'': ['"', 'ñ', 'l']
  };

  // Palabras clave que los programadores escriben en ráfaga rápida (memoria muscular)
  var BURST_WORDS = [
    'function', 'document', 'getElementById', 'addEventListener', 'console.log',
    'return', 'const', 'var', 'let', 'class', 'style', 'header', 'footer',
    'section', 'button', 'script', 'doctype', 'html', 'head', 'body', 'flex',
    'display', 'background', 'margin', 'padding', 'width', 'height', 'border'
  ];

  function CodeSimulator(editorInstance, runnerInstance, callbacks) {
    this.editor = editorInstance;
    this.runner = runnerInstance;
    this.callbacks = callbacks || {};

    this.targetCode = { html: '', css: '', js: '' };
    this.currentCode = { html: '', css: '', js: '' };
    this.activeTab = 'html';

    this.targetIndex = 0;
    this.isTyping = false;
    this.timerId = null;

    // Ajustes de Simulación
    this.baseDelay = 32;          // ms por carácter promedio
    this.typoProbability = 0.035;  // 3.5% probabilidad de error
    this.enableSound = true;
    this.enableHumanize = true;
    this.soundProfile = 'cherry';  // 'cherry' o 'brown'

    // Métricas
    this.startTime = null;
    this.charactersTyped = 0;

    // Web Audio API
    this.audioCtx = null;
  }

  // ---- Audio Synth (Teclado Mecánico) ----

  CodeSimulator.prototype._initAudio = function () {
    if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      var AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
  };

  CodeSimulator.prototype.playKeySound = function () {
    if (!this.enableSound) return;
    try {
      this._initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      var osc = this.audioCtx.createOscillator();
      var gain = this.audioCtx.createGain();

      var isBrown = this.soundProfile === 'brown';
      var baseFreq = isBrown ? 750 : 1200;
      var freq = baseFreq + Math.random() * 600;

      osc.type = isBrown ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      var volume = isBrown ? 0.04 : 0.07;
      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.03);
    } catch (e) { /* ignore audio errors */ }
  };

  // ---- Control Methods ----

  CodeSimulator.prototype.loadTarget = function (codeObj, tab) {
    this.stop();
    this.targetCode = {
      html: (codeObj && codeObj.html) || '',
      css: (codeObj && codeObj.css) || '',
      js: (codeObj && codeObj.js) || ''
    };

    tab = tab || 'html';
    if (!this.targetCode[tab] || !this.targetCode[tab].trim()) {
      if (this.targetCode.css && this.targetCode.css.trim()) {
        tab = 'css';
      } else if (this.targetCode.html && this.targetCode.html.trim()) {
        tab = 'html';
      } else if (this.targetCode.js && this.targetCode.js.trim()) {
        tab = 'js';
      }
    }
    this.activeTab = tab;

    this.currentCode = { html: '', css: '', js: '' };
    this.targetIndex = 0;
    this.startTime = null;
    this.charactersTyped = 0;

    if (this.editor && this.editor.switchTab) {
      this.editor.switchTab(this.activeTab);
    }
    this._notifyUpdate();
  };

  CodeSimulator.prototype.start = function () {
    // 1. Unlock Web Audio API context on user gesture
    this._initAudio();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try { this.audioCtx.resume(); } catch (e) {}
    }

    // 2. Ensure targetCode has non-empty target text across html, css, js
    var hasTargetText = (this.targetCode.html && this.targetCode.html.trim()) ||
                        (this.targetCode.css && this.targetCode.css.trim()) ||
                        (this.targetCode.js && this.targetCode.js.trim());

    if (!hasTargetText) {
      // Try grabbing code currently in the editor
      var editorCode = this.editor ? this.editor.getCode() : null;
      var hasEditorCode = editorCode && ((editorCode.html && editorCode.html.trim()) ||
                                          (editorCode.css && editorCode.css.trim()) ||
                                          (editorCode.js && editorCode.js.trim()));
      if (hasEditorCode) {
        this.targetCode = {
          html: editorCode.html || '',
          css: editorCode.css || '',
          js: editorCode.js || ''
        };
      } else {
        // Fallback to N1: Selector Básico (h1 { color: red; })
        var fallback = (typeof TEMPLATES !== 'undefined' && TEMPLATES['n1-selector-basic']) ? TEMPLATES['n1-selector-basic'] : { css: 'h1 {\n  color: red;\n}' };
        this.targetCode = {
          html: fallback.html || '',
          css: fallback.css || 'h1 {\n  color: red;\n}',
          js: fallback.js || ''
        };
      }
    }

    // 3. Ensure activeTab points to the non-empty code tab
    var targetText = this.targetCode[this.activeTab] || '';
    if (!targetText.trim()) {
      if (this.targetCode.css && this.targetCode.css.trim()) {
        this.activeTab = 'css';
      } else if (this.targetCode.html && this.targetCode.html.trim()) {
        this.activeTab = 'html';
      } else if (this.targetCode.js && this.targetCode.js.trim()) {
        this.activeTab = 'js';
      }
      targetText = this.targetCode[this.activeTab] || '';
    }

    if (this.editor && this.editor.switchTab) {
      this.editor.switchTab(this.activeTab);
    }

    // If starting fresh or re-starting, clear the active tab content so typing starts from blank
    if (this.targetIndex === 0 || this.targetIndex >= targetText.length) {
      this.currentCode = { html: '', css: '', js: '' };
      this.targetIndex = 0;
      this.startTime = Date.now();
      this.charactersTyped = 0;
      if (this.editor) {
        if (this.editor.setTabContent) {
          this.editor.setTabContent(this.activeTab, '', true);
        } else if (this.editor.setCode) {
          var clearObj = {};
          clearObj[this.activeTab] = '';
          this.editor.setCode(clearObj);
        }
      }
    }

    this.isTyping = true;
    if (!this.startTime) this.startTime = Date.now();
    this._step();
    this._notifyUpdate();
  };

  CodeSimulator.prototype.pause = function () {
    this.isTyping = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this._notifyUpdate();
  };

  CodeSimulator.prototype.stop = function () {
    this.pause();
  };

  CodeSimulator.prototype.reset = function () {
    this.stop();
    this.currentCode = { html: '', css: '', js: '' };
    this.targetIndex = 0;
    this.startTime = null;
    this.charactersTyped = 0;

    if (this.editor) {
      if (this.editor.setTabContent) {
        this.editor.setTabContent(this.activeTab, '', true);
      } else if (this.editor.setCode) {
        this.editor.setCode(this.currentCode);
      }
    }
    if (this.runner) {
      var activeCode = this.editor ? this.editor.getCode() : this.currentCode;
      this.runner.run(activeCode);
    }
    this._notifyUpdate();
  };

  CodeSimulator.prototype.turbo = function () {
    this.baseDelay = 8;
    if (!this.isTyping) {
      this.start();
    }
  };

  // ---- Helper: Generador Realista de Errores Tipográficos ----

  CodeSimulator.prototype._getRealisticTypoChar = function (expectedChar) {
    var lower = expectedChar.toLowerCase();
    var neighbors = KEYBOARD_NEIGHBORS[lower];

    if (neighbors && neighbors.length > 0) {
      var wrong = neighbors[Math.floor(Math.random() * neighbors.length)];
      return (expectedChar === expectedChar.toUpperCase() && expectedChar !== lower) ? wrong.toUpperCase() : wrong;
    }

    // Típico error en teclado español: presionar 'ñ' al buscar ';' o ':'
    if (expectedChar === ';' || expectedChar === ':') {
      return Math.random() < 0.5 ? 'ñ' : (expectedChar === ';' ? ':' : ';');
    }

    var fallbackChars = "abcdefghijklmnopqrstuvwxyz;";
    return fallbackChars.charAt(Math.floor(Math.random() * fallbackChars.length));
  };

  // ---- Helper: Detección de Ráfagas (Burst Words) ----

  CodeSimulator.prototype._isInBurstWord = function (targetText, index) {
    var textAhead = targetText.slice(index, index + 15).toLowerCase();
    for (var i = 0; i < BURST_WORDS.length; i++) {
      if (textAhead.indexOf(BURST_WORDS[i].toLowerCase()) === 0) {
        return true;
      }
    }
    return false;
  };

  // ---- Step Engine ----

  CodeSimulator.prototype._step = function () {
    if (!this.isTyping) return;

    var targetText = this.targetCode[this.activeTab] || '';
    if (this.targetIndex >= targetText.length) {
      this.isTyping = false;
      this._notifyUpdate();
      if (this.runner) {
        var finalCode = this.editor ? this.editor.getCode() : this.currentCode;
        this.runner.run(finalCode);
      }
      if (this.callbacks.onComplete) this.callbacks.onComplete();
      return;
    }

    var self = this;
    var expectedChar = targetText.charAt(this.targetIndex);

    // Determinar si ocurre un error realista
    var shouldTypo = Math.random() < this.typoProbability &&
                     this.targetIndex > 5 &&
                     this.targetIndex < targetText.length - 5 &&
                     expectedChar !== '\n' && expectedChar !== '\r' && expectedChar !== ' ';

    if (shouldTypo) {
      this._handleRealisticTypoSequence(expectedChar, function () {
        self._scheduleNext(expectedChar);
      });
    } else {
      this.currentCode[this.activeTab] += expectedChar;
      this.targetIndex++;
      this.charactersTyped++;

      this.playKeySound();

      if (this.editor) {
        if (this.editor.setTabContent) {
          this.editor.setTabContent(this.activeTab, this.currentCode[this.activeTab], true);
        } else if (this.editor.setCode) {
          this.editor.setCode(this.currentCode, true);
        }
      }

      // Actualizar vista previa en tiempo real durante el tipeo
      if (this.runner) {
        var liveCode = this.editor ? this.editor.getCode() : this.currentCode;
        this.runner.run(liveCode);
      }

      this._notifyUpdate();
      this._scheduleNext(expectedChar);
    }
  };

  // ---- Manejador Realista de Errores y Borrado ----

  CodeSimulator.prototype._handleRealisticTypoSequence = function (expectedChar, onDone) {
    var self = this;
    if (!this.isTyping) return;

    // 30% de probabilidad de escribir 2 a 3 letras equivocadas antes de notar el error
    var multiCharCount = Math.random() < 0.3 ? (Math.floor(Math.random() * 2) + 2) : 1;
    var wrongString = '';

    for (var k = 0; k < multiCharCount; k++) {
      var nextChar = this.targetCode[this.activeTab].charAt(this.targetIndex + k) || expectedChar;
      wrongString += this._getRealisticTypoChar(nextChar);
    }

    var charsInserted = 0;

    function typeWrongChars() {
      if (!self.isTyping) return;
      if (charsInserted < wrongString.length) {
        self.currentCode[self.activeTab] += wrongString.charAt(charsInserted);
        if (self.editor) {
          if (self.editor.setTabContent) {
            self.editor.setTabContent(self.activeTab, self.currentCode[self.activeTab], true);
          } else if (self.editor.setCode) {
            self.editor.setCode(self.currentCode, true);
          }
        }
        self.playKeySound();
        charsInserted++;
        self.timerId = setTimeout(typeWrongChars, self.baseDelay + (Math.random() * 20 - 10));
      } else {
        // Pausa de sorpresa (duda al notar el error)
        self.timerId = setTimeout(backspaceWrongChars, 180 + Math.random() * 100);
      }
    }

    function backspaceWrongChars() {
      if (!self.isTyping) return;
      if (charsInserted > 0) {
        self.currentCode[self.activeTab] = self.currentCode[self.activeTab].slice(0, -1);
        if (self.editor) {
          if (self.editor.setTabContent) {
            self.editor.setTabContent(self.activeTab, self.currentCode[self.activeTab], true);
          } else if (self.editor.setCode) {
            self.editor.setCode(self.currentCode, true);
          }
        }
        self.playKeySound();
        charsInserted--;
        self.timerId = setTimeout(backspaceWrongChars, 35 + Math.random() * 15);
      } else {
        // Breve pausa post-corrección antes de continuar
        if (self.isTyping) {
          self.timerId = setTimeout(onDone, self.baseDelay + 80);
        }
      }
    }

    typeWrongChars();
  };

  // ---- Programador Ritmo e Intentional Hesitation ----

  CodeSimulator.prototype._scheduleNext = function (lastChar) {
    var self = this;
    var targetText = this.targetCode[this.activeTab] || '';
    var isBurst = this._isInBurstWord(targetText, this.targetIndex);

    // Si está escribiendo una palabra en memoria muscular (ráfaga), acelera el tipeo
    var delay = isBurst ? (14 + Math.random() * 10) : (this.baseDelay + (Math.random() * 24 - 12));

    if (this.enableHumanize && lastChar) {
      if (lastChar === '\n') {
        // Pausa en saltos de línea (pensando la siguiente línea)
        delay += 180 + Math.random() * 140;
      } else if (lastChar === '>') {
        // Pausa al cerrar etiqueta HTML
        delay += 100 + Math.random() * 60;
      } else if (lastChar === '<') {
        // Duda leve antes de abrir etiqueta HTML
        delay += 80 + Math.random() * 50;
      } else if (lastChar === ';') {
        // Pausa al terminar una instrucción JS / regla CSS
        delay += 90 + Math.random() * 50;
      } else if (lastChar === '{' || lastChar === '}') {
        // Pausa en bloques de código
        delay += 140 + Math.random() * 80;
      } else if (lastChar === ' ') {
        delay += 15 + Math.random() * 15;
      }
    }

    this.timerId = setTimeout(function () {
      self._step();
    }, Math.max(6, Math.round(delay)));
  };

  CodeSimulator.prototype._notifyUpdate = function () {
    var targetText = this.targetCode[this.activeTab] || '';
    var progress = targetText.length > 0 ? Math.min(100, Math.round((this.targetIndex / targetText.length) * 100)) : 0;
    var wpm = 0;

    if (this.startTime && this.charactersTyped > 0) {
      var elapsedMinutes = (Date.now() - this.startTime) / 60000;
      if (elapsedMinutes > 0) {
        wpm = Math.round((this.charactersTyped / 5) / elapsedMinutes);
      }
    }

    if (this.callbacks.onProgress) {
      this.callbacks.onProgress({
        isTyping: this.isTyping,
        progress: progress,
        wpm: wpm,
        targetIndex: this.targetIndex,
        totalLength: targetText.length,
        activeTab: this.activeTab
      });
    }
  };

  return CodeSimulator;
})();
