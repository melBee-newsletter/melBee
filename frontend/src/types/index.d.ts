export {};

declare global {
  interface Window {
    tinymce: tinymce;
  }
  interface tinymce {
    activeEditor: activeEditor;
  }
}
