import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function Edit() {
  const editorRef = useRef(null);
  return (
    <div>
      <div
        style={{ width: "100%", height: "40px" }}
        className="toolbararea"
      ></div>
      <Editor
        style={{
          outline: "0",
          border: "none",
          outline: "0px solid transparent",
        }}
        className="editarea"
        apiKey="fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue='<div style = "font-size: 12px; font-family: verdana; color: blue;">Try Editing This!</div><img class = "hi" src = "https://i.picsum.photos/id/452/600/700.jpg?hmac=bEplEmPzbvCTY4hrbJNhH_6u2nHWx_whjNK9mxEiFGA" width = "200px" height = "300px"> <br> This too!'
        init={{
          language: "ja",
          content_style: "body {font-family: Arial;}",
          font_formats:
            "Arial=arial,helvetica,sans-serif; Century Gothic = century gothic; Courier New=courier new,courier; Garamond = garamond; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Lucida = lucida; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva",
          selector: "WWWWWWWWWWWWWWWWWWWWWWWWWW",
          convert_fonts_to_spans: true,
          fontsize_formats: "8pt,10pt,12pt,14pt,18pt,24pt,36pt",
          skin: "snow",
          icons: "thin",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          visual: false,
          toolbar_location: "top",
          inline: true,
          statusbar: false,
          height: 500,
          menubar: false,
          quickbars_selection_toolbar:
            "bold italic image| fontfamily fontsize| quicklink",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "export",
            "emoticons",
            "quickbars",
          ],
          toolbar:
            "undo redo restoredraft | " +
            "fontfamily fontsize emoticons bold italic forecolor backcolor |  image |alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | " +
            "removeformat | help",
          export_image_proxy: "proxy.php",
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = function () {
              console.log(window);
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                var id = "blobid" + new Date().getTime();
                var blobCache =
                  window.tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
        }}
      ></Editor>
    </div>
  );
}
