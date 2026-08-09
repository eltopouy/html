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

  // ---- Utility ----

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function saveCodeToLocalStorage(code) {
    try {
      localStorage.setItem('educode_student_code', JSON.stringify(code));
    } catch (e) { /* ignore */ }
  }

  function loadSavedCode() {
    try {
      var data = localStorage.getItem('educode_student_code');
      return data ? JSON.parse(data) : null;
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
    consoleLogs.push(logData);
    if (logData.level === 'error') {
      errorCount++;
      consoleBadgeEl.classList.add('has-error');
    }

    consoleBadgeEl.textContent = consoleLogs.length + ' mensajes';

    var line = document.createElement('div');
    line.className = 'console-log-line ' + logData.level;
    line.innerHTML =
      '<span class="timestamp">' + logData.timestamp + '</span> ' +
      '<span class="level-badge">' + logData.level.toUpperCase() + '</span> ' +
      '<span class="message">' + escapeHTML(logData.text) + '</span>';

    consoleOutputEl.appendChild(line);
    consoleOutputEl.scrollTop = consoleOutputEl.scrollHeight;
  }

  // ---- Browser Tab Title Updater ----

  function updateBrowserTab(htmlCode) {
    var tabTitleEl = document.getElementById('browser-tab-title');
    var urlTextEl = document.getElementById('browser-url-text');
    if (!tabTitleEl) return;

    // Extract <title>...</title> content from the student's HTML
    var titleMatch = htmlCode.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
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
        clearConsole();
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

    resizer.addEventListener('mousedown', function (e) {
      isDragging = true;
      resizer.classList.add('dragging');
      previewIframe.style.pointerEvents = 'none';
      document.body.style.cursor = workspace.classList.contains('layout-vertical') ? 'row-resize' : 'col-resize';
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var rect = workspace.getBoundingClientRect();
      if (workspace.classList.contains('layout-vertical')) {
        var topHeight = e.clientY - rect.top;
        var percentage = Math.max(15, Math.min(85, (topHeight / rect.height) * 100));
        editorPane.style.flex = '' + percentage;
        previewPane.style.flex = '' + (100 - percentage);
      } else {
        var leftWidth = e.clientX - rect.left;
        var percentage2 = Math.max(15, Math.min(85, (leftWidth / rect.width) * 100));
        editorPane.style.flex = '' + percentage2;
        previewPane.style.flex = '' + (100 - percentage2);
      }
      codeEditor.resize();
    });

    document.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        resizer.classList.remove('dragging');
        previewIframe.style.pointerEvents = 'auto';
        document.body.style.cursor = 'default';
        codeEditor.resize();
      }
    });
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

    // Fullscreen Preview
    document.getElementById('btn-fullscreen').addEventListener('click', function () {
      if (previewIframe.requestFullscreen) {
        previewIframe.requestFullscreen();
      }
    });
  }

  // ---- Init Application ----

  function initApp() {
    // 1. Populate templates
    populateTemplateSelector();

    // 2. Init runner
    codeRunner = new CodeRunner(previewIframe, handleConsoleLog);

    // 3. Load saved code or default template
    var savedCode = loadSavedCode() || TEMPLATES['blank'];

    // 4. Init editor
    codeEditor = new CodeEditor(editorContainer, onCodeChange);
    codeEditor.init({
      html: savedCode.html,
      css: savedCode.css,
      js: savedCode.js
    });

    // 5. Initial run
    codeRunner.run(codeEditor.getCode());

    // 6. Update browser tab with initial title
    updateBrowserTab(savedCode.html);

    // 6. Bind events
    bindEvents();

    // 7. Render Lucide Icons
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
