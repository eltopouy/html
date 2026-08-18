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

  var currentFilenames = {
    html: 'index.html',
    css: 'styles.css',
    js: 'script.js'
  };

  function updateTabLabels() {
    var htmlLabel = document.getElementById('tab-label-html');
    var cssLabel = document.getElementById('tab-label-css');
    var jsLabel = document.getElementById('tab-label-js');
    if (htmlLabel) htmlLabel.textContent = currentFilenames.html;
    if (cssLabel) cssLabel.textContent = currentFilenames.css;
    if (jsLabel) jsLabel.textContent = currentFilenames.js;
  }

  // ---- Utility ----

  function showToast(message, type) {
    type = type || 'info';
    var container = document.getElementById('toast-container');
    if (!container) return;

    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<span>' + escapeHTML(message) + '</span>';

    container.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('toast-out');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 220);
    }, 2800);
  }

  function updateTabCodeDots(codeObj) {
    if (!codeObj) return;
    var dotHtml = document.getElementById('dot-html');
    var dotCss = document.getElementById('dot-css');
    var dotJs = document.getElementById('dot-js');

    if (dotHtml) dotHtml.classList.toggle('has-code', !!(codeObj.html && codeObj.html.trim().length > 0));
    if (dotCss) dotCss.classList.toggle('has-code', !!(codeObj.css && codeObj.css.trim().length > 0));
    if (dotJs) dotJs.classList.toggle('has-code', !!(codeObj.js && codeObj.js.trim().length > 0));
  }

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function findCodeLine(htmlCode, elData) {
    if (!htmlCode || !elData) return -1;
    var lines = htmlCode.split('\n');
    var tag = (elData.tagName || '').toLowerCase();
    var id = elData.id || '';
    var cls = (elData.className || '').trim().split(/\s+/)[0] || '';
    var text = (elData.textContent || '').trim();

    if (id) {
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf('id="' + id + '"') !== -1 || lines[i].indexOf("id='" + id + "'") !== -1) return i;
      }
    }
    if (cls) {
      for (var j = 0; j < lines.length; j++) {
        if (lines[j].indexOf(cls) !== -1) return j;
      }
    }
    if (tag && text) {
      var shortText = text.substring(0, 15);
      for (var k = 0; k < lines.length; k++) {
        if (lines[k].toLowerCase().indexOf('<' + tag) !== -1 && lines[k].indexOf(shortText) !== -1) return k;
      }
    }
    if (tag) {
      for (var m = 0; m < lines.length; m++) {
        if (lines[m].toLowerCase().indexOf('<' + tag) !== -1) return m;
      }
    }
    return -1;
  }

  function saveCodeToLocalStorage(code) {
    try {
      localStorage.setItem('educode_student_code', JSON.stringify(code));
    } catch (e) {
      if (e && (e.name === 'QuotaExceededError' || e.code === 22)) {
        console.warn('Almacenamiento local lleno en el navegador.');
        showToast('Almacenamiento local lleno. Exporta tu trabajo para no perder cambios.', 'warn');
      }
    }
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
    if (consoleOutputEl) consoleOutputEl.innerHTML = '';
    if (consoleBadgeEl) {
      consoleBadgeEl.textContent = '0 mensajes';
      consoleBadgeEl.classList.remove('has-error');
    }
    var consolePane = document.getElementById('console-pane') || document.querySelector('.console-pane');
    if (consolePane) {
      consolePane.classList.add('collapsed');
    }
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
      if (consoleBadgeEl) consoleBadgeEl.classList.add('has-error');
    }

    if (consoleBadgeEl) {
      consoleBadgeEl.textContent = consoleLogs.length === 1 ? '1 mensaje' : consoleLogs.length + ' mensajes';
    }

    var line = document.createElement('div');
    line.className = 'console-log-line ' + level;
    line.innerHTML =
      '<span class="timestamp">' + timestamp + '</span> ' +
      '<span class="level-badge">' + level.toUpperCase() + '</span> ' +
      '<span class="message">' + text + '</span>';

    if (consoleOutputEl) {
      // Cap DOM nodes to max 200 to prevent browser lag during heavy logging
      if (consoleOutputEl.children.length >= 200) {
        consoleOutputEl.removeChild(consoleOutputEl.firstChild);
      }
      consoleOutputEl.appendChild(line);
      consoleOutputEl.scrollTop = consoleOutputEl.scrollHeight;
    }

    // Auto-expand console view when JS messages are output
    var consolePane = document.getElementById('console-pane') || document.querySelector('.console-pane');
    if (consolePane) {
      consolePane.classList.remove('collapsed');
    }
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

  // ---- Browser Tab Title & Address Bar Updater ----

  function updateBrowserTab(htmlCode, activeTab) {
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

    // Determine current active tab and corresponding file name
    var currentTab = activeTab || (codeEditor ? codeEditor.currentTab : 'html') || 'html';
    var fileName = currentFilenames[currentTab] || (currentTab === 'css' ? 'styles.css' : (currentTab === 'js' ? 'script.js' : 'index.html'));

    // Update the simulated URL bar with the active file path
    if (urlTextEl) {
      urlTextEl.textContent = 'https://html.servicioti.com.uy/' + fileName;
    }
  }

  // ---- Code Change Handler ----

  function onCodeChange(code) {
    saveCodeToLocalStorage(code);
    updateBrowserTab(code.html, codeEditor ? codeEditor.currentTab : 'html');
    updateTabCodeDots(code);

    var statusPill = document.getElementById('preview-status-pill');
    var statusText = document.getElementById('preview-status-text');

    if (autoRun) {
      if (statusPill) statusPill.className = 'preview-status-pill updating';
      if (statusText) statusText.textContent = 'Actualizando...';

      clearTimeout(autoRunTimeout);
      autoRunTimeout = setTimeout(function () {
        // Do not wipe console output if simulator is actively running
        if (!codeSimulator || !codeSimulator.isTyping) {
          clearConsole();
        }
        codeRunner.run(code);
        if (statusPill) statusPill.className = 'preview-status-pill live';
        if (statusText) statusText.textContent = 'En vivo';
      }, 500);
    }
  }

  // ---- Template Selector ----

  function updateExplanation(templateKey) {
    var template = TEMPLATES[templateKey];
    var titleEl = document.getElementById('explanation-title');
    var bodyEl = document.getElementById('explanation-body');
    if (!titleEl || !bodyEl) return;

    if (template) {
      titleEl.textContent = 'Explicación: ' + (template.name || 'Ejemplo');
      bodyEl.textContent = template.explanation || 'Selecciona un ejemplo pedagógico para ver la explicación didáctica de la etiqueta o concepto CSS.';
    } else {
      titleEl.textContent = 'Explicación Pedagógica';
      bodyEl.textContent = 'Selecciona un ejemplo pedagógico para ver la explicación didáctica de la etiqueta o concepto CSS.';
    }
  }

  function populateTemplateSelector() {
    var selector = document.getElementById('template-select');
    if (!selector) return;
    selector.innerHTML = '';

    var groups = [
      { label: 'Plantilla Inicial', keys: ['blank'] },
      { label: '📘 1. CURSO DE HTML — Estructura, Enlaces, Listas, Tablas y Forms', keys: [
        // 1.1 Estructura y Texto
        'n6-html-structure', 'n5-html-headings', 'n5-html-paragraphs', 'n5-html-emphasis', 'n5-html-break', 'n5-html-hr',
        // 1.2 Enlaces e Imágenes
        'html-enlaces', 'n8-img-basic', 'n8-img-width', 'html-figure', 'n8-picture',
        // 1.3 Listas
        'html-listas-ul', 'html-listas-ol', 'html-listas-dl',
        // 1.4 Tablas
        'html-tabla-basica', 'html-tabla-completa',
        // 1.5 Formularios
        'n9-form-simple', 'n9-input-text', 'html-input-password', 'n9-input-number', 'n9-input-date',
        'html-input-checkbox', 'html-input-radio', 'html-select', 'html-textarea', 'n10-fieldset',
        'n9-input-submit', 'n9-input-required', 'n9-input-disabled', 'n9-input-size',
        // 1.6 Multimedia y Semántica
        'n11-video', 'html-audio', 'n11-embed-video', 'n11-embed-image',
        'html-semantica', 'html-details', 'n13-dialog-basic',
        'n7-meta-charset', 'n7-meta-description', 'n7-meta-keywords', 'n7-meta-author', 'n7-meta-viewport'
      ]},
      { label: '🎨 2. CURSO DE CSS — Selectores, Tipografía, Box Model, Flexbox y Grid', keys: [
        // 2.1 Fundamentos y Selectores
        'n1-selector-basic', 'n1-color', 'n1-background', 'n1-background-rgb', 'n1-color-hex',
        'n2-selector-element', 'n2-selector-class', 'n2-usage-class', 'n2-selector-id', 'n2-usage-id', 'n2-selectors-grouped', 'css-hover',
        // 2.2 Tipografía
        'n1-text-align', 'n1-font-size', 'n1-font-weight', 'css-font-family',
        // 2.3 Box Model
        'n1-border', 'css-border-radius', 'css-padding-margin', 'css-box-shadow', 'n1-opacity', 'n3-css-combined', 'n4-inline-paragraph', 'n4-inline-heading',
        // 2.4 Flexbox & Grid
        'css-flexbox', 'css-grid',
        // 2.5 Animaciones y Buenas Prácticas
        'css-keyframes', 'n12-css-comment', 'n12-css-error-semicolon'
      ]},
      { label: '⚡ 3. CURSO DE JAVASCRIPT — Consola, DOM, Eventos, Modales y Canvas', keys: [
        'js-console-log', 'js-dom-text', 'js-modo-oscuro', 'js-contador', 'n13-dialog-interactive', 'js-canvas-animacion'
      ]}
    ];

    var allKeys = Object.keys(TEMPLATES);
    var addedKeys = {};

    groups.forEach(function (grp) {
      var optgroup = document.createElement('optgroup');
      optgroup.label = grp.label;
      grp.keys.forEach(function (k) {
        if (TEMPLATES[k]) {
          var opt = document.createElement('option');
          opt.value = k;
          opt.textContent = TEMPLATES[k].name;
          optgroup.appendChild(opt);
          addedKeys[k] = true;
        }
      });
      if (optgroup.children.length > 0) {
        selector.appendChild(optgroup);
      }
    });

    allKeys.forEach(function (k) {
      if (!addedKeys[k] && TEMPLATES[k]) {
        var opt = document.createElement('option');
        opt.value = k;
        opt.textContent = TEMPLATES[k].name;
        selector.appendChild(opt);
      }
    });
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
        var currentCode = codeEditor ? codeEditor.getCode() : { html: '' };
        updateBrowserTab(currentCode.html, tab);
        
        var tabInfoEl = document.getElementById('editor-tab-info');
        if (tabInfoEl) tabInfoEl.textContent = tab.toUpperCase();
      });
    }

    // Run Code Button
    document.getElementById('btn-run').addEventListener('click', function () {
      clearConsole();
      codeRunner.run(codeEditor.getCode());
      showToast('Código ejecutado correctamente', 'info');
    });

    // Auto-run toggle
    var autoRunToggle = document.getElementById('autorun-toggle');
    if (autoRunToggle) {
      autoRunToggle.addEventListener('change', function () {
        autoRun = this.checked;
        showToast(autoRun ? 'Ejecución automática activada' : 'Ejecución automática pausada', 'info');
      });
    }

    // Toggle Explanation Panel
    var btnToggleExplanation = document.getElementById('btn-toggle-explanation');
    var explanationPanel = document.getElementById('explanation-panel');
    var btnCloseExplanation = document.getElementById('btn-close-explanation');

    if (btnToggleExplanation && explanationPanel) {
      btnToggleExplanation.addEventListener('click', function () {
        var isHidden = explanationPanel.classList.contains('hidden');
        if (isHidden) {
          explanationPanel.classList.remove('hidden');
          btnToggleExplanation.classList.add('active');
        } else {
          explanationPanel.classList.add('hidden');
          btnToggleExplanation.classList.remove('active');
        }
      });
    }

    if (btnCloseExplanation && explanationPanel) {
      btnCloseExplanation.addEventListener('click', function () {
        explanationPanel.classList.add('hidden');
        if (btnToggleExplanation) {
          btnToggleExplanation.classList.remove('active');
        }
      });
    }

    // Template change
    document.getElementById('template-select').addEventListener('change', function () {
      var templateKey = this.value;
      var template = TEMPLATES[templateKey];
      updateExplanation(templateKey);

      if (template) {
        currentFilenames = { html: 'index.html', css: 'styles.css', js: 'script.js' };
        updateTabLabels();

        // Determine primary didactic tab (css vs html vs js)
        var targetTab = 'html';
        if (template.css && !template.html) {
          targetTab = 'css';
        } else if (template.js && !template.html && !template.css) {
          targetTab = 'js';
        }

        // Switch editor tab visually
        var tabBtns = document.querySelectorAll('.tab-btn');
        for (var k = 0; k < tabBtns.length; k++) {
          if (tabBtns[k].dataset.tab === targetTab) {
            tabBtns[k].classList.add('active');
          } else {
            tabBtns[k].classList.remove('active');
          }
        }
        codeEditor.switchTab(targetTab);

        codeEditor.setCode(template);
        updateBrowserTab(template.html, targetTab);
        updateTabCodeDots(template);
        clearConsole();
        codeRunner.run(template);

        if (codeSimulator) {
          codeSimulator.loadTarget(template, targetTab);
        }

        showToast('Ejemplo "' + (template.name || templateKey) + '" cargado', 'info');
      }
    });

    // Format Code
    document.getElementById('btn-format').addEventListener('click', function () {
      codeEditor.formatCode();
      showToast('Código formateado correctamente', 'success');
    });

    // Copy Active Tab Code Button
    var btnCopyCode = document.getElementById('btn-copy-code');
    if (btnCopyCode) {
      btnCopyCode.addEventListener('click', function () {
        var currentTab = codeEditor.getActiveTab ? codeEditor.getActiveTab() : codeEditor.currentTab;
        var codeObj = codeEditor.getCode();
        var textToCopy = codeObj[currentTab] || '';
        navigator.clipboard.writeText(textToCopy).then(function () {
          var copyTextSpan = document.getElementById('copy-btn-text');
          if (copyTextSpan) {
            copyTextSpan.textContent = '¡Copiado!';
            setTimeout(function () {
              copyTextSpan.textContent = 'Copiar';
            }, 1800);
          }
          showToast('Código (' + currentTab.toUpperCase() + ') copiado al portapapeles', 'success');
        }).catch(function (err) {
          console.error('Error al copiar código: ', err);
        });
      });
    }

    // Export Dropdown Menu Toggle
    var btnExportDropdown = document.getElementById('btn-export-dropdown');
    var dropdownWrapper = btnExportDropdown ? btnExportDropdown.closest('.dropdown-wrapper') : null;
    if (btnExportDropdown && dropdownWrapper) {
      btnExportDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdownWrapper.classList.toggle('open');
      });
      document.addEventListener('click', function (e) {
        if (!dropdownWrapper.contains(e.target)) {
          dropdownWrapper.classList.remove('open');
        }
      });
    }

    // Reload Preview Button
    var btnReloadPreview = document.getElementById('btn-reload-preview');
    if (btnReloadPreview) {
      btnReloadPreview.addEventListener('click', function () {
        codeRunner.run(codeEditor.getCode());
        showToast('Vista previa recargada', 'info');
      });
    }

    // Export ZIP
    document.getElementById('btn-export-zip').addEventListener('click', function () {
      if (dropdownWrapper) dropdownWrapper.classList.remove('open');
      Exporter.downloadZip(codeEditor.getCode());
      showToast('Descargando proyecto .ZIP...', 'info');
    });

    // Export HTML
    document.getElementById('btn-export-html').addEventListener('click', function () {
      if (dropdownWrapper) dropdownWrapper.classList.remove('open');
      Exporter.downloadSingleHTML(codeEditor.getCode());
      showToast('Descargando archivo .HTML...', 'info');
    });

    // Share Link Export
    var btnExportShare = document.getElementById('btn-export-share');
    if (btnExportShare) {
      btnExportShare.addEventListener('click', function () {
        if (dropdownWrapper) dropdownWrapper.classList.remove('open');
        var shareUrl = ShareLink.generateShareUrl(codeEditor.getCode());
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(shareUrl).then(function () {
            showToast('Enlace de proyecto copiado al portapapeles. ¡Listo para compartir!', 'success');
          }).catch(function () {
            showToast('Enlace generado en la barra de direcciones', 'info');
          });
        } else {
          showToast('Enlace generado. Copia la dirección URL', 'info');
        }
      });
    }

    // Export Full Repository ZIP for GitHub update
    var btnExportRepo = document.getElementById('btn-export-repo');
    if (btnExportRepo) {
      btnExportRepo.addEventListener('click', function () {
        if (dropdownWrapper) dropdownWrapper.classList.remove('open');
        Exporter.downloadRepoZip();
        showToast('Descargando repositorio completo .ZIP...', 'info');
      });
    }

    // Element Inspector Mode Toggle
    var btnInspectElement = document.getElementById('btn-inspect-element');
    if (btnInspectElement) {
      btnInspectElement.addEventListener('click', function () {
        var isActive = this.classList.toggle('active');
        codeRunner.setInspectorMode(isActive);
        if (isActive) {
          showToast('🔍 Modo inspeccionar activo: Haz clic en un elemento de la vista previa', 'info');
        } else {
          showToast('Modo inspeccionar desactivado', 'info');
        }
      });
    }

    // Resources Gallery Modal
    var resourcesModal = document.getElementById('resources-modal');
    var btnResources = document.getElementById('btn-resources');
    var btnResourcesClose = document.getElementById('btn-resources-close');
    var btnResourcesCloseX = document.getElementById('btn-resources-close-x');

    if (btnResources && resourcesModal) {
      btnResources.addEventListener('click', function () {
        resourcesModal.classList.add('show');
      });
    }
    var closeResModal = function () {
      if (resourcesModal) resourcesModal.classList.remove('show');
    };
    if (btnResourcesClose) btnResourcesClose.addEventListener('click', closeResModal);
    if (btnResourcesCloseX) btnResourcesCloseX.addEventListener('click', closeResModal);
    if (resourcesModal) {
      resourcesModal.addEventListener('click', function (e) {
        if (e.target === resourcesModal) closeResModal();
      });
    }

    // Resources tab switcher
    var resTabBtns = document.querySelectorAll('.res-tab-btn');
    resTabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        resTabBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        var targetTab = this.getAttribute('data-res-tab');
        document.querySelectorAll('.res-tab-content').forEach(function (c) {
          c.style.display = 'none';
          c.classList.remove('active');
        });
        var activeContent = document.getElementById('res-tab-' + targetTab);
        if (activeContent) {
          activeContent.style.display = 'block';
          activeContent.classList.add('active');
        }
      });
    });

    // Insert resource snippet buttons
    document.querySelectorAll('.btn-insert-res').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var snippet = this.getAttribute('data-snippet');
        if (snippet && codeEditor) {
          codeEditor.switchTab('html');
          if (codeEditor.editor) {
            var doc = codeEditor.editor.getDoc ? codeEditor.editor.getDoc() : codeEditor.editor;
            var cursor = doc.getCursor ? doc.getCursor() : { line: doc.lineCount ? doc.lineCount() : 0, ch: 0 };
            doc.replaceRange('\n' + snippet + '\n', cursor);
          }
          closeResModal();
          showToast('Recurso insertado en el código HTML', 'success');
        }
      });
    });

    // Shortcuts Modal
    var shortcutsModal = document.getElementById('shortcuts-modal');
    var btnShortcutsTrigger = document.getElementById('btn-shortcuts-trigger');
    var btnShortcutsClose = document.getElementById('btn-shortcuts-close');

    if (btnShortcutsTrigger && shortcutsModal) {
      btnShortcutsTrigger.addEventListener('click', function () {
        shortcutsModal.classList.add('show');
      });
    }
    if (btnShortcutsClose && shortcutsModal) {
      btnShortcutsClose.addEventListener('click', function () {
        shortcutsModal.classList.remove('show');
      });
    }
    if (shortcutsModal) {
      shortcutsModal.addEventListener('click', function (e) {
        if (e.target === shortcutsModal) shortcutsModal.classList.remove('show');
      });
    }

    // Reset Modal
    var resetModal = document.getElementById('reset-modal');
    document.getElementById('btn-reset').addEventListener('click', function () {
      if (resetModal) resetModal.classList.add('show');
    });
    document.getElementById('btn-modal-cancel').addEventListener('click', function () {
      if (resetModal) resetModal.classList.remove('show');
    });
    if (resetModal) {
      resetModal.addEventListener('click', function (e) {
        if (e.target === resetModal) resetModal.classList.remove('show');
      });
    }
    document.getElementById('btn-modal-confirm').addEventListener('click', function () {
      if (resetModal) resetModal.classList.remove('show');
      currentFilenames = { html: 'index.html', css: 'styles.css', js: 'script.js' };
      updateTabLabels();
      var currentTemplate = document.getElementById('template-select').value;
      var template = TEMPLATES[currentTemplate] || TEMPLATES['blank'];
      codeEditor.setCode(template);
      updateBrowserTab(template.html, 'html');
      updateTabCodeDots(template);
      clearConsole();
      codeRunner.run(template);
      showToast('Código restablecido a la plantilla inicial', 'info');
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
          if (result.filename) {
            currentFilenames[result.type] = result.filename;
            updateTabLabels();
          }
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
          var currentCode = codeEditor ? codeEditor.getCode() : { html: '' };
          updateBrowserTab(currentCode.html, result.type);
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

    // Simulated Browser Nav Buttons (Reload)
    var browserReloadBtn = document.querySelector('.browser-nav-btn[title="Recargar"]');
    if (browserReloadBtn) {
      browserReloadBtn.addEventListener('click', function () {
        clearConsole();
        if (codeRunner && codeEditor) {
          codeRunner.run(codeEditor.getCode());
        }
      });
    }

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
          var template = TEMPLATES[templateKey] || TEMPLATES['n1-selector-basic'];
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
      simSettingsModal.addEventListener('click', function (e) {
        if (e.target === simSettingsModal) simSettingsModal.classList.remove('show');
      });
    }
    if (btnSimSettingsClose && simSettingsModal) {
      btnSimSettingsClose.addEventListener('click', function () {
        simSettingsModal.classList.remove('show');
      });
    }

    // Global ESC key listener to close modals
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (resetModal && resetModal.classList.contains('show')) resetModal.classList.remove('show');
        if (simSettingsModal && simSettingsModal.classList.contains('show')) simSettingsModal.classList.remove('show');
      }
    });

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

    // Element Inspected callback
    codeRunner.onElementInspected = function (data) {
      var btnInspect = document.getElementById('btn-inspect-element');
      if (btnInspect) btnInspect.classList.remove('active');

      if (!codeEditor || !data) return;
      var code = codeEditor.getCode();
      var lineNo = findCodeLine(code.html, data);
      if (lineNo !== -1) {
        codeEditor.switchTab('html');
        if (codeEditor.editor && codeEditor.editor.setCursor) {
          codeEditor.editor.setCursor({ line: lineNo, ch: 0 });
          if (codeEditor.editor.focus) codeEditor.editor.focus();
        }
        showToast('Elemento <' + (data.tagName || '').toLowerCase() + '> en línea ' + (lineNo + 1), 'success');
      } else {
        showToast('Elemento <' + (data.tagName || '').toLowerCase() + '> inspeccionado', 'info');
      }
    };

    // 3. Load saved code, shared link, or default template
    var savedCode = loadSavedCode();
    if (window.location.hash && window.location.hash.indexOf('#code=') === 0 && typeof ShareLink !== 'undefined') {
      var sharedCode = ShareLink.decode(window.location.hash);
      if (sharedCode && (sharedCode.html || sharedCode.css || sharedCode.js)) {
        savedCode = sharedCode;
        setTimeout(function () {
          showToast('Proyecto cargado desde enlace compartido', 'success');
        }, 500);
      }
    }
    if (!savedCode) savedCode = TEMPLATES['blank'];

    // 4. Init editor
    codeEditor = new CodeEditor(editorContainer, onCodeChange);
    codeEditor.init({
      html: savedCode.html,
      css: savedCode.css,
      js: savedCode.js
    });

    codeEditor.onCursorChange = function (pos) {
      var posEl = document.getElementById('editor-pos-info');
      if (posEl) posEl.textContent = 'Lín ' + pos.line + ', Col ' + pos.ch;
    };

    codeEditor.onSaveRequest = function () {
      saveCodeToLocalStorage(codeEditor.getCode());
      showToast('Proyecto guardado en el navegador', 'success');
    };

    updateTabCodeDots(savedCode);

    // 5. Init Simulator Learning Engine
    codeSimulator = new CodeSimulator(codeEditor, codeRunner, {
      onProgress: handleSimulatorProgress
    });

    var initialTarget = (savedCode && (savedCode.html || savedCode.css || savedCode.js)) ? savedCode : TEMPLATES['blank'];
    var initialTab = 'html';
    codeSimulator.loadTarget(initialTarget, initialTab);

    // 6. Force focus on index.html tab for immediate user typing
    codeEditor.switchTab('html');

    // 7. Initial run
    codeRunner.run(codeEditor.getCode());

    // 8. Update browser tab with initial title and URL
    updateBrowserTab(savedCode.html, 'html');

    // 9. Bind events
    bindEvents();

    var initialTemplateSel = document.getElementById('template-select');
    if (initialTemplateSel) {
      updateExplanation(initialTemplateSel.value || 'blank');
    }

    // 10. Render Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // 11. Focus CodeMirror editor cursor inside index.html
    setTimeout(function () {
      if (codeEditor) {
        codeEditor.switchTab('html');
        if (codeEditor.editor) {
          codeEditor.editor.focus();
          var doc = codeEditor.editor.getDoc();
          if (doc) {
            var lastLine = doc.lastLine();
            var lastCh = doc.getLine(lastLine) ? doc.getLine(lastLine).length : 0;
            doc.setCursor({ line: lastLine, ch: lastCh });
          }
        }
      }
    }, 100);
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
