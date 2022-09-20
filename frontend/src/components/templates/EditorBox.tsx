import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

//use the onInput on the div where the EditorBox is located to get the content data
//     <div
//       onInput={(e) => {
//         console.log("HTML IS", e.currentTarget.innerHTML);
//       }}
//     >
//       <Edit />
//     </div>

type Event = {
  target: {
    value: string;
  };
};

type clickEvent = {
  preventDefault: Function;
};

const EditorBox: React.FC = () => {
  const editorRef = useRef<tinyMCEEditor | null>(null);

  return (
    <div className="h-full">
      <Editor
        apiKey="fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={
          localStorage.melBeeTempStoragedraft
            ? localStorage.melBeeTempStoragedraft
            : "default page! <img src = 'https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/0d286852-c67d-4694-9d4d-815aceb001d1'>"
        }
        init={{
          fixed_toolbar_container: "toolbararea",
          tinydrive_token_provider: "http://localhost:8000/jwt",
          tinydrive_skin: "oxide",
          tinydrive_upload_path: "/uploads",
          tinydrive_max_image_dimension: 1024,
          toolbar_mode: "sliding",
          language: "ja",
          content_style: "body {font-family: Arial;}",
          autosave_interval: "1s",
          autosave_prefix: "melBeeTempStorage",
          autosave_retention: "10m",
          font_family_family_formats:
            "Arial=arial,helvetica,sans-serif; Century Gothic = century gothic; Courier New=courier new,courier; Garamond = garamond; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Lucida = lucida; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva",
          convert_fonts_to_spans: true,
          fontsize_formats: "8pt,10pt,12pt,14pt,18pt,24pt,36pt",
          skin: "snow",
          icons: "thin",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          visual: false,
          toolbar_location: "auto",
          inline: false,
          statusbar: false,
          width: "1024",
          height: "600",
          menubar: false,
          quickbars_insert_toolbar: "table | image",
          quickbars_selection_toolbar:
            "bold italic image| fontfamily fontsize| quicklink",
          plugins: [
            "tinydrive",
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
            "autosave",
          ],
          toolbar:
            "undo redo image | fontfamily fontsize  emoticons bold italic forecolor backcolor link |alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | insertfile | " +
            "removeformat | help",
          export_image_proxy: "proxy.php",
          file_picker_callback: function (cb: Function) {
            let input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = function () {
              let file: any;

              if (input.files !== null) {
                file = input.files[0];
              }

              let reader = new FileReader();
              reader.onload = function () {
                let id = "blobid" + new Date().getTime();
                let blobCache =
                  window.tinymce.activeEditor.editorUpload.blobCache;
                let base64;
                if (typeof reader.result === "string") {
                  base64 = reader.result.split(",")[1];
                }
                let blobInfo = blobCache.create(id, file, base64);
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
};

export default EditorBox;
