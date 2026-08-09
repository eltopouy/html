/**
 * EduCode Studio - CodeMirror Editor Integration Module
 */

var CodeEditor = (function () {

  function CodeEditor(containerElement, onCodeChange) {
    this.container = containerElement;
    this.onCodeChange = onCodeChange;
    this.editor = null;
    this.docs = {
      html: null,
      css: null,
      js: null
    };
    this.modes = {
      html: 'htmlmixed',
      css: 'css',
      js: 'javascript'
    };
    this.currentTab = 'html';
    this.isReady = false;
  }

  CodeEditor.prototype.init = function (initialCode) {
    initialCode = initialCode || { html: '', css: '', js: '' };

    // Create individual CodeMirror documents for each language
    this.docs.html = CodeMirror.Doc(initialCode.html, 'htmlmixed');
    this.docs.css = CodeMirror.Doc(initialCode.css, 'css');
    this.docs.js = CodeMirror.Doc(initialCode.js, 'javascript');

    var self = this;

    // Create the CodeMirror editor instance
    this.editor = CodeMirror(this.container, {
      value: this.docs.html,
      mode: 'htmlmixed',
      theme: 'dracula',
      lineNumbers: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      tabSize: 2,
      indentWithTabs: false,
      lineWrapping: true,
      cursorHeight: 0.95,
      inputStyle: 'textarea',
      extraKeys: {
        'Ctrl-Enter': function () {
          var btnRun = document.getElementById('btn-run');
          if (btnRun) btnRun.click();
        },
        'Cmd-Enter': function () {
          var btnRun = document.getElementById('btn-run');
          if (btnRun) btnRun.click();
        }
      }
    });

    this.isReady = true;

    // Fire callback on every change
    this.editor.on('change', function () {
      if (self.onCodeChange) {
        self.onCodeChange(self.getCode());
      }
    });

    // Force refresh and focus after a brief delay
    setTimeout(function () {
      self.editor.refresh();
      self.editor.focus();
    }, 100);
  };

  CodeEditor.prototype.switchTab = function (tabName) {
    if (!this.isReady || !this.docs[tabName]) return;
    this.currentTab = tabName;
    this.editor.swapDoc(this.docs[tabName]);
    this.editor.setOption('mode', this.modes[tabName]);
    var self = this;
    setTimeout(function () {
      self.editor.refresh();
      self.editor.focus();
    }, 30);
  };

  CodeEditor.prototype.getCode = function () {
    return {
      html: this.docs.html ? this.docs.html.getValue() : '',
      css: this.docs.css ? this.docs.css.getValue() : '',
      js: this.docs.js ? this.docs.js.getValue() : ''
    };
  };

  CodeEditor.prototype.setCode = function (codeObj, moveCursorToEnd) {
    if (!this.isReady || !codeObj) return;
    if (codeObj.html !== undefined && this.docs.html) this.docs.html.setValue(codeObj.html);
    if (codeObj.css !== undefined && this.docs.css) this.docs.css.setValue(codeObj.css);
    if (codeObj.js !== undefined && this.docs.js) this.docs.js.setValue(codeObj.js);

    if (moveCursorToEnd && this.editor) {
      var currentDoc = this.editor.getDoc();
      var lastLine = currentDoc.lastLine();
      var lastCh = currentDoc.getLine(lastLine) ? currentDoc.getLine(lastLine).length : 0;
      currentDoc.setCursor({ line: lastLine, ch: lastCh });
    }

    this.editor.refresh();
  };

  CodeEditor.prototype.formatCode = function () {
    if (this.editor) {
      var totalLines = this.editor.lineCount();
      for (var i = 0; i < totalLines; i++) {
        this.editor.indentLine(i);
      }
    }
  };

  CodeEditor.prototype.resize = function () {
    if (this.editor) {
      this.editor.refresh();
    }
  };

  return CodeEditor;
})();
