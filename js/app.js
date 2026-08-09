/**
 * EduCode Studio - Main Application Orchestrator
 */

(function () {

  var editorContainer = document.getElementById('monaco-editor-element');
  var previewIframe = document.getElementById('preview-iframe');
  var consoleOutputEl = document.getElementById('console-output');
  var consoleBadgeEl = document.getElementById('console-badge');

  var autoRun = true;
  var autoRunTimeout = null;
  var consoleLogs = [];
  var errorCount = 0;

  var codeEditor = null;
  var codeRunner = null;
  var codeSimulator = null;

  // ---- Utility ----

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function saveCodeToLocalStorage(code) {
    try {
      localStorage.setItem('educode_student_code', JSON.stringify(code));
    } catch (e) { /* ignore */ }
  }

  function loadSavedCode() {
    try {
      var data = localStorage.getItem('educode_student_code');
      if (!data) return null;
      var parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object') {
        return {
          html: typeof parsed.html === 'string' ? parsed.html : '',
          css: typeof parsed.css === 'string' ? parsed.css : '',
          js: typeof parsed.js === 'string' ? parsed.js : ''
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // ---- Console ----

  function clearConsole() {
    consoleLogs = [];
    errorCount = 0;
    consoleOutputEl.innerHTML = '';
    consoleBadgeEl.textContent = '0 mensajes';
    consoleBadgeEl.classList.remove('has-error');
  }

  function handleConsoleLog(logData) {
    if (!logData || typeof logData !== 'object') return;

    var allowedLevels = ['log', 'info', 'warn', 'error'];
    var level = (typeof logData.level === 'string' && allowedLevels.indexOf(logData.level) !== -1) ? logData.level : 'log';
    var timestamp = typeof logData.timestamp === 'string' ? escapeHTML(logData.timestamp) : escapeHTML(new Date().toLocaleTimeString());
    var rawText = typeof logData.text === 'string' ? logData.text : String(logData.text || '');
    var text = escapeHTML(rawText);

    consoleLogs.push({ level: level, timestamp: timestamp, text: text });
    if (level === 'error') {
      errorCount++;
      consoleBadgeEl.classList.add('has-error');
    }

    consoleBadgeEl.textContent = consoleLogs.length + ' mensajes';

    var line = document.createElement('div');
    line.className = 'console-log-line ' + level;
    line.innerHTML =
      '<span class="timestamp">' + timestamp + '</span> ' +
      '<span class="level-badge">' + level.toUpperCase() + '</span> ' +
      '<span class="message">' + text + '</span>';

    // Cap DOM nodes to max 200 to prevent browser lag during heavy logging
    if (consoleOutputEl.children.length >= 200) {
      consoleOutputEl.removeChild(consoleOutputEl.firstChild);
    }

    consoleOutputEl.appendChild(line);
    consoleOutputEl.scrollTop = consoleOutputEl.scrollHeight;
  }

  // ---- Lucide Icon Element Helper ----

  function updateButtonIcon(buttonEl, iconName, styleColor) {
    if (!buttonEl) return;
    var existingIcon = buttonEl.querySelector('svg, i');
    if (existingIcon) {
      var newI = document.createElement('i');
      newI.setAttribute('data-lucide', iconName);
      if (styleColor) newI.style.color = styleColor;
      existingIcon.parentNode.replaceChild(newI, existingIcon);
      if (window.lucide) window.lucide.createIcons();
    }
  }

  // ---- Simulator Progress Handler ----

  function handleSimulatorProgress(data) {
    var btnPlay = document.getElementById('btn-sim-play');
    var wpmEl = document.getElementById('sim-stat-wpm');
    var progressEl = document.getElementById('sim-stat-progress');
    var progressBar = document.getElementById('sim-progress-bar');

    if (wpmEl) wpmEl.textContent = data.wpm + ' WPM';
    if (progressEl) progressEl.textContent = data.progress + '%';
    if (progressBar) progressBar.style.width = data.progress + '%';

    if (btnPlay) {
      var label = btnPlay.querySelector('span');
      if (data.isTyping) {
        updateButtonIcon(btnPlay, 'pause');
        if (label) label.textContent = 'Pausar';
        btnPlay.classList.add('btn-amber');
        btnPlay.classList.remove('btn-emerald');
      } else {
        updateButtonIcon(btnPlay, 'play');
        if (label) label.textContent = (data.progress > 0 && data.progress < 100) ? 'Continuar' : 'Iniciar Tipeo';
        btnPlay.classList.add('btn-emerald');
        btnPlay.classList.remove('btn-amber');
      }
    }
  }

  // ---- Browser Tab Title Updater ----

  function updateBrowserTab(htmlCode) {
    var tabTitleEl = document.getElementById('browser-tab-title');
    var urlTextEl = document.getElementById('browser-url-text');
    if (!tabTitleEl) return;

    if (typeof htmlCode !== 'string') htmlCode = '';

    // Extract <title>...</title> content from the student's HTML without ReDoS risk
    var titleMatch = htmlCode.match(/<title[^>]*>([^<]*)<\/title>/i);
    var pageTitle = titleMatch ? titleMatch[1].trim() : 'Sin título';

    // If empty title tag
    if (pageTitle === '') pageTitle = 'Sin título';

    tabTitleEl.textContent = pageTitle;

    // Update the simulated URL bar
    if (urlTextEl) {
      urlTextEl.textContent = 'https://html.servicioti.com.uy';
    }
  }

  // ---- Code Change Handler ----

  function onCodeChange(code) {
    saveCodeToLocalStorage(code);
    updateBrowserTab(code.html);

    if (autoRun) {
      clearTimeout(autoRunTimeout);
      autoRunTimeout = setTimeout(function () {
        // Do not wipe console output if simulator is actively running
        if (!codeSimulator || !codeSimulator.isTyping) {
          clearConsole();
        }
        codeRunner.run(code);
      }, 500);
    }
  }

  // ---- Template Selector ----

  function populateTemplateSelector() {
    var selector = document.getElementById('template-select');
    if (!selector) return;
    selector.innerHTML = '';
    var keys = Object.keys(TEMPLATES);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var option = document.createElement('option');
      option.value = key;
      option.textContent = TEMPLATES[key].name;
      selector.appendChild(option);
    }
  }

  // ---- Layout ----

  function setLayout(layout) {
    var workspace = document.getElementById('workspace-body');
    var editorPane = document.querySelector('.pane-editor');
    var previewPane = document.querySelector('.pane-preview-console');

    workspace.classList.remove('layout-vertical', 'layout-full-preview');
    editorPane.style.display = 'flex';
    previewPane.style.display = 'flex';
    editorPane.style.flex = '1';
    previewPane.style.flex = '1';

    if (layout === 'vertical') {
      workspace.classList.add('layout-vertical');
    } else if (layout === 'preview') {
      editorPane.style.display = 'none';
    }

    codeEditor.resize();
  }

  // ---- Resizer ----

  function initResizer() {
    var resizer = document.getElementById('pane-resizer');
    var workspace = document.getElementById('workspace-body');
    var editorPane = document.querySelector('.pane-editor');
    var previewPane = document.querySelector('.pane-preview-console');
    var isDragging = false;

    function startDrag(e) {
      isDragging = true;
      resizer.classList.add('dragging');
      previewIframe.style.pointerEvents = 'none';
      document.body.style.cursor = workspace.classList.contains('layout-vertical') ? 'row-resize' : 'col-resize';
      e.preventDefault();
    }

    function doDrag(clientX, clientY) {
      if (!isDragging) return;
      var rect = workspace.getBoundingClientRect();
      var isVertical = workspace.classList.contains('layout-vertical') || window.innerWidth <= 900;
      if (isVertical) {
        var topHeight = clientY - rect.top;
        var percentage = Math.max(15, Math.min(85, (topHeight / rect.height) * 100));
        editorPane.style.flex = '' + percentage;
        previewPane.style.flex = '' + (100 - percentage);
      } else {
        var leftWidth = clientX - rect.left;
        var percentage2 = Math.max(15, Math.min(85, (leftWidth / rect.width) * 100));
        editorPane.style.flex = '' + percentage2;
        previewPane.style.flex = '' + (100 - percentage2);
      }
      codeEditor.resize();
    }

    function endDrag() {
      if (isDragging) {
        isDragging = false;
        resizer.classList.remove('dragging');
        previewIframe.style.pointerEvents = 'auto';
        document.body.style.cursor = 'default';
        codeEditor.resize();
      }
    }

    // Mouse events
    resizer.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', function (e) { doDrag(e.clientX, e.clientY); });
    document.addEventListener('mouseup', endDrag);

    // Touch events (mobile)
    resizer.addEventListener('touchstart', function (e) { startDrag(e); }, { passive: false });
    document.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      var touch = e.touches[0];
      doDrag(touch.clientX, touch.clientY);
      e.preventDefault();
    }, { passive: false });
    document.addEventListener('touchend', endDrag);
  }

  // ---- Bind All Events ----

  function bindEvents() {
    // Tab switching
    var tabBtns = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < tabBtns.length; i++) {
      tabBtns[i].addEventListener('click', function (e) {
        var tab = this.dataset.tab;
        for (var j = 0; j < tabBtns.length; j++) tabBtns[j].classList.remove('active');
        this.classList.add('active');
        codeEditor.switchTab(tab);
      });
    }

    // Run Code Button
    document.getElementById('btn-run').addEventListener('click', function () {
      clearConsole();
      codeRunner.run(codeEditor.getCode());
    });

    // Auto-run toggle
    var autoRunToggle = document.getElementById('autorun-toggle');
    if (autoRunToggle) {
      autoRunToggle.addEventListener('change', function () {
        autoRun = this.checked;
      });
    }

    // Template change
    document.getElementById('template-select').addEventListener('change', function () {
      var templateKey = this.value;
      if (TEMPLATES[templateKey]) {
        codeEditor.setCode(TEMPLATES[templateKey]);
        updateBrowserTab(TEMPLATES[templateKey].html);
        clearConsole();
        codeRunner.run(TEMPLATES[templateKey]);
      }
    });

    // Format Code
    document.getElementById('btn-format').addEventListener('click', function () {
      codeEditor.formatCode();
    });

    // Export ZIP
    document.getElementById('btn-export-zip').addEventListener('click', function () {
      Exporter.downloadZip(codeEditor.getCode());
    });

    // Export HTML
    document.getElementById('btn-export-html').addEventListener('click', function () {
      Exporter.downloadSingleHTML(codeEditor.getCode());
    });

    // Reset
    document.getElementById('btn-reset').addEventListener('click', function () {
      document.getElementById('reset-modal').classList.add('show');
    });
    document.getElementById('btn-modal-cancel').addEventListener('click', function () {
      document.getElementById('reset-modal').classList.remove('show');
    });
    document.getElementById('btn-modal-confirm').addEventListener('click', function () {
      document.getElementById('reset-modal').classList.remove('show');
      var currentTemplate = document.getElementById('template-select').value;
      var template = TEMPLATES[currentTemplate] || TEMPLATES['blank'];
      codeEditor.setCode(template);
      updateBrowserTab(template.html);
      clearConsole();
      codeRunner.run(template);
    });

    // Console clear & toggle
    document.getElementById('btn-clear-console').addEventListener('click', function (e) {
      e.stopPropagation();
      clearConsole();
    });
    var consoleHeader = document.querySelector('.console-header');
    if (consoleHeader) {
      consoleHeader.addEventListener('click', function () {
        document.querySelector('.console-pane').classList.toggle('collapsed');
      });
    }

    // Layout switchers
    var layoutBtns = document.querySelectorAll('[data-layout]');
    for (var k = 0; k < layoutBtns.length; k++) {
      layoutBtns[k].addEventListener('click', function () {
        var layout = this.dataset.layout;
        setLayout(layout);
        for (var m = 0; m < layoutBtns.length; m++) layoutBtns[m].classList.remove('active');
        this.classList.add('active');
      });
    }

    // Resizer
    initResizer();

    // Import file
    var fileInput = document.getElementById('import-file-input');
    document.getElementById('btn-import').addEventListener('click', function () {
      fileInput.value = '';
      fileInput.click();
    });
    fileInput.addEventListener('change', function () {
      var file = this.files[0];
      if (file) {
        Exporter.importFile(file, function (result) {
          var obj = {};
          obj[result.type] = result.content;
          codeEditor.setCode(obj);
          codeEditor.switchTab(result.type);
          var allTabs = document.querySelectorAll('.tab-btn');
          for (var t = 0; t < allTabs.length; t++) {
            if (allTabs[t].dataset.tab === result.type) {
              allTabs[t].classList.add('active');
            } else {
              allTabs[t].classList.remove('active');
            }
          }
        });
      }
    });

    // Fullscreen Preview (Cross-browser vendor support)
    document.getElementById('btn-fullscreen').addEventListener('click', function () {
      var requestFS = previewIframe.requestFullscreen ||
                      previewIframe.webkitRequestFullscreen ||
                      previewIframe.mozRequestFullScreen ||
                      previewIframe.msRequestFullscreen;
      if (requestFS) {
        requestFS.call(previewIframe);
      }
    });

    // Window Resize / Orientation Change Handler
    var resizeDebounce = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(function () {
        if (codeEditor) codeEditor.resize();
      }, 150);
    });

    // Global Keyboard Shortcuts (Ctrl+Enter / Cmd+Enter)
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('btn-run').click();
      }
    });

    // ---- Simulator Controls & Bindings ----

    var btnSimMode = document.getElementById('btn-sim-mode');
    var simToolbar = document.getElementById('simulator-toolbar');

    if (btnSimMode && simToolbar) {
      btnSimMode.addEventListener('click', function () {
        simToolbar.classList.toggle('hidden');
        var isVisible = !simToolbar.classList.contains('hidden');
        if (isVisible && codeSimulator) {
          var templateKey = document.getElementById('template-select').value;
          var template = (TEMPLATES[templateKey] && TEMPLATES[templateKey].html) ? TEMPLATES[templateKey] : TEMPLATES['html-basic'];
          codeSimulator.loadTarget(template, codeEditor.currentTab || 'html');
        } else if (!isVisible && codeSimulator) {
          codeSimulator.pause();
        }
      });
    }

    var btnSimPlay = document.getElementById('btn-sim-play');
    if (btnSimPlay) {
      btnSimPlay.addEventListener('click', function () {
        if (!codeSimulator) return;
        if (codeSimulator.isTyping) {
          codeSimulator.pause();
        } else {
          codeSimulator.start();
        }
      });
    }

    var btnSimReset = document.getElementById('btn-sim-reset');
    if (btnSimReset) {
      btnSimReset.addEventListener('click', function () {
        if (codeSimulator) codeSimulator.reset();
      });
    }

    var btnSimTurbo = document.getElementById('btn-sim-turbo');
    if (btnSimTurbo) {
      btnSimTurbo.addEventListener('click', function () {
        if (codeSimulator) codeSimulator.turbo();
      });
    }

    var btnSimSound = document.getElementById('btn-sim-sound');
    if (btnSimSound) {
      btnSimSound.addEventListener('click', function () {
        if (!codeSimulator) return;
        codeSimulator.enableSound = !codeSimulator.enableSound;
        var label = this.querySelector('span');
        if (label) label.textContent = codeSimulator.enableSound ? 'Sonido ON' : 'Sonido OFF';
        updateButtonIcon(this, codeSimulator.enableSound ? 'volume-2' : 'volume-x', codeSimulator.enableSound ? 'var(--accent-primary)' : 'var(--text-muted)');
      });
    }

    var btnSimSettings = document.getElementById('btn-sim-settings');
    var simSettingsModal = document.getElementById('sim-settings-modal');
    var btnSimSettingsClose = document.getElementById('btn-sim-settings-close');

    if (btnSimSettings && simSettingsModal) {
      btnSimSettings.addEventListener('click', function () {
        simSettingsModal.classList.add('show');
      });
    }
    if (btnSimSettingsClose && simSettingsModal) {
      btnSimSettingsClose.addEventListener('click', function () {
        simSettingsModal.classList.remove('show');
      });
    }

    var simSpeedSlider = document.getElementById('sim-speed-slider');
    var simSpeedVal = document.getElementById('sim-speed-val');
    if (simSpeedSlider) {
      simSpeedSlider.addEventListener('input', function () {
        var val = parseInt(this.value);
        if (codeSimulator) codeSimulator.baseDelay = val;
        if (simSpeedVal) simSpeedVal.textContent = val + ' ms/char';
      });
    }

    var simTypoSlider = document.getElementById('sim-typo-slider');
    var simTypoVal = document.getElementById('sim-typo-val');
    if (simTypoSlider) {
      simTypoSlider.addEventListener('input', function () {
        var val = parseInt(this.value);
        if (codeSimulator) codeSimulator.typoProbability = val / 100;
        if (simTypoVal) simTypoVal.textContent = val + '%';
      });
    }

    var simSoundProfile = document.getElementById('sim-sound-profile');
    if (simSoundProfile) {
      simSoundProfile.addEventListener('change', function () {
        if (codeSimulator) codeSimulator.soundProfile = this.value;
      });
    }
  }

  // ---- Init Application ----

  function initApp() {
    // 1. Populate templates
    populateTemplateSelector();

    // 2. Init runner
    codeRunner = new CodeRunner(previewIframe, handleConsoleLog);
    codeRunner.onConsoleClear = clearConsole;

    // 3. Load saved code or default template
    var savedCode = loadSavedCode() || TEMPLATES['blank'];

    // 4. Init editor
    codeEditor = new CodeEditor(editorContainer, onCodeChange);
    codeEditor.init({
      html: savedCode.html,
      css: savedCode.css,
      js: savedCode.js
    });

    // 5. Init Simulator Learning Engine
    codeSimulator = new CodeSimulator(codeEditor, codeRunner, {
      onProgress: handleSimulatorProgress
    });

    // 6. Initial run
    codeRunner.run(codeEditor.getCode());

    // 7. Update browser tab with initial title
    updateBrowserTab(savedCode.html);

    // 8. Bind events
    bindEvents();

    // 9. Render Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
