/**
 * EduCode Studio - Learning Engine & Typing Simulator Module
 * Simula la escritura de código en tiempo real con audio sintético de teclado mecánico,
 * pausas humanas inteligentes, detección de errores (typos) y métricas de aprendizaje.
 * Desarrollado por Andrés Franchi Ugartemendía para estudiantes de Liceos y UTU.
 */

var CodeSimulator = (function () {

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

    // Configuration Settings
    this.baseDelay = 35;          // ms por carácter
    this.typoProbability = 0.03;   // 3% probabilidad de error
    this.enableSound = true;
    this.enableHumanize = true;
    this.soundProfile = 'cherry';  // 'cherry' o 'brown'

    // Metrics
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
    tab = tab || 'html';
    this.activeTab = tab;
    this.targetCode = {
      html: (codeObj && codeObj.html) || '',
      css: (codeObj && codeObj.css) || '',
      js: (codeObj && codeObj.js) || ''
    };
    this.currentCode = { html: '', css: '', js: '' };
    this.targetIndex = 0;
    this.startTime = null;
    this.charactersTyped = 0;

    if (this.editor) {
      this.editor.setCode(this.currentCode);
      this.editor.switchTab(this.activeTab);
    }
    this._notifyUpdate();
  };

  CodeSimulator.prototype.start = function () {
    var targetText = this.targetCode[this.activeTab] || '';
    if (this.targetIndex >= targetText.length) {
      this.reset();
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
    this.currentCode[this.activeTab] = '';
    this.targetIndex = 0;
    this.startTime = null;
    this.charactersTyped = 0;

    if (this.editor) {
      this.editor.setCode(this.currentCode);
    }
    this._notifyUpdate();
  };

  CodeSimulator.prototype.turbo = function () {
    this.baseDelay = 8;
    if (!this.isTyping) {
      this.start();
    }
  };

  // ---- Step Engine ----

  CodeSimulator.prototype._step = function () {
    if (!this.isTyping) return;

    var targetText = this.targetCode[this.activeTab] || '';
    if (this.targetIndex >= targetText.length) {
      this.isTyping = false;
      this._notifyUpdate();
      if (this.callbacks.onComplete) this.callbacks.onComplete();
      return;
    }

    var self = this;

    // Check for simulated typo
    var shouldTypo = Math.random() < this.typoProbability &&
                     this.targetIndex > 5 &&
                     this.targetIndex < targetText.length - 5;

    if (shouldTypo) {
      this._handleTypo(function () {
        self._scheduleNext();
      });
    } else {
      var char = targetText.charAt(this.targetIndex);
      this.currentCode[this.activeTab] += char;
      this.targetIndex++;
      this.charactersTyped++;

      this.playKeySound();

      if (this.editor) {
        this.editor.setCode(this.currentCode);
      }

      this._notifyUpdate();
      this._scheduleNext(char);
    }
  };

  CodeSimulator.prototype._handleTypo = function (onDone) {
    var self = this;
    var wrongChars = "abcdefghijklmnopqrstuvwxyz;:/><=";
    var randomWrong = wrongChars.charAt(Math.floor(Math.random() * wrongChars.length));

    // Type wrong character
    this.currentCode[this.activeTab] += randomWrong;
    if (this.editor) this.editor.setCode(this.currentCode);
    this.playKeySound();

    // Pause, then Backspace
    this.timerId = setTimeout(function () {
      self.currentCode[self.activeTab] = self.currentCode[self.activeTab].slice(0, -1);
      if (self.editor) self.editor.setCode(self.currentCode);
      self.playKeySound();

      self.timerId = setTimeout(onDone, self.baseDelay + 120);
    }, 160);
  };

  CodeSimulator.prototype._scheduleNext = function (lastChar) {
    var self = this;
    var delay = this.baseDelay + (Math.random() * 20 - 10);

    if (this.enableHumanize && lastChar) {
      if (lastChar === '\n') delay += 160;
      else if (lastChar === '>') delay += 90;
      else if (lastChar === ';') delay += 80;
      else if (lastChar === '{' || lastChar === '}') delay += 110;
      else if (lastChar === ' ') delay += 15;
    }

    this.timerId = setTimeout(function () {
      self._step();
    }, Math.max(8, delay));
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
