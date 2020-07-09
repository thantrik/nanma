import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IDocument } from "../../paste-bin.types";

import "./custom.style.css";

// import "tinymce/tinymce";
// import "tinymce/themes/silver";
// import "tinymce/icons/default";
//import "tinymce/plugins/";

interface DocumentEditor extends IDocument {
  onUpdate: (content: string) => void;
}

class DocumentEditor extends React.Component<DocumentEditor, any> {
  content: string = "";
  handleEditorChange = (content: any, editor: any) => {
    this.content = content as string;
    this.props.onUpdate && this.props.onUpdate(this.content);
  };

  render() {
    return (
      <Editor
        apiKey="aemfbajq4pdf7ts4y3ncw8frkl9zvl7qxtc0pi3ypdcadiau"
        init={{
          height: "100%",
          menubar: true,
          inline: false,
          fullpage: "fullPage",
          plugins: `advlist | anchor | autolink | autosave | bbcode | 
          charmap | code | codesample | colorpicker | contextmenu | directionality | 
        emoticons | fullpage | fullscreen | help | hr | image | imagetools | importcss | 
        insertdatetime | legacyoutput | link | lists | media | nonbreaking | noneditable | 
        pagebreak | paste | preview | print | quickbars | save | searchreplace | spellchecker | 
        tabfocus | table | template | textcolor | textpattern | toc | visualblocks | visualchars | wordcount`,
          toolbar: `undo redo | fontselect | fontsizeselect | forecolor | bold italic strike | 
        alignleft aligncenter alignright alignjustify | 
        outdent indent | link image | code | print | save`,
          fullpage_default_doctype: "<!DOCTYPE html>",
          fullpage_default_font_size: "10pt",
          fullpage_default_font_family: "Fira Code",
          fullpage_default_title: this.props?.meta?.title || "Untitled",
          block_formats:
            "Paragraph=span; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre",
          //   fontsize_formats:
          //     "6pt 8pt 10pt 11pt 12pt 14pt 16pt 18pt 22pt 24pt 30pt 36pt 48pt",
          font_formats: `FiraCode=Fira Code;Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats`,
          contextmenu:
            "link image table forecolor imagetools paste save colorpicker bold italic strike alignleft aligncenter alignright alignjustify",
          forced_root_block: "div",
          forced_root_block_attrs: {
            style: "padding: 0px",
          },
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default DocumentEditor;

// initialValue="<p>This is the initial content of the editor</p>"
// apiKey="aemfbajq4pdf7ts4y3ncw8frkl9zvl7qxtc0pi3ypdcadiau"
// init={{
//   height: "100%",
//   fullpage: "fullPage",
//   plugins: `advlist | anchor | autolink | autoresize | autosave | bbcode | charmap | code | codesample | colorpicker | contextmenu | directionality | emoticons | fullpage | fullscreen | help | hr | image | imagetools | importcss | insertdatetime | legacyoutput | link | lists | media | nonbreaking | noneditable | pagebreak | paste | preview | print | quickbars | save | searchreplace | spellchecker | tabfocus | table | template | textcolor | textpattern | toc | visualblocks | visualchars | wordcount`,
//   toolbar:

// Custom format

// content_style:
//             ".left { text-align: left; } " +
//             "img.left { float: left; } " +
//             "table.left { float: left; } " +
//             ".right { text-align: right; } " +
//             "img.right { float: right; } " +
//             "table.right { float: right; } " +
//             ".center { text-align: center; } " +
//             "img.center { display: block; margin: 0 auto; } " +
//             "table.center { display: block; margin: 0 auto; } " +
//             ".full { text-align: justify; } " +
//             "img.full { display: block; margin: 0 auto; } " +
//             "table.full { display: block; margin: 0 auto; } " +
//             ".bold { font-weight: bold; } " +
//             ".italic { font-style: italic; } " +
//             ".underline { text-decoration: underline; } " +
//             ".example1 {} " +
//             ".tablerow1 { background-color: #D3D3D3; }",
//           formats: {
//             alignleft: {
//               selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
//               classes: "left",
//             },
//             aligncenter: {
//               selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
//               classes: "center",
//             },
//             alignright: {
//               selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
//               classes: "right",
//             },
//             alignfull: {
//               selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
//               classes: "full",
//             },
//             bold: { inline: "span", classes: "bold" },
//             italic: { inline: "span", classes: "italic" },
//             underline: { inline: "span", classes: "underline", exact: true },
//             strikethrough: { inline: "del" },
//             customformat: {
//               inline: "span",
//               styles: { color: "#00ff00", fontSize: "20px" },
//               attributes: { title: "My custom format" },
//               classes: "example1",
//             },
//           },
//           style_formats: [
//             { title: "Custom format1", format: "customformat" },
//             { title: "Align left", format: "alignleft" },
//             { title: "Align center", format: "aligncenter" },
//             { title: "Align right", format: "alignright" },
//             { title: "Align full", format: "alignfull" },
//             { title: "Bold text", inline: "strong" },
//             {
//               title: "Red text",
//               inline: "span",
//               styles: { color: "#ff0000" },
//             },
//             {
//               title: "Red header",
//               block: "h1",
//               styles: { color: "#ff0000" },
//             },
//             {
//               title: "Badge",
//               inline: "span",
//               styles: {
//                 display: "inline-block",
//                 border: "1px solid #2276d2",
//                 "border-radius": "5px",
//                 padding: "2px 5px",
//                 margin: "0 2px",
//                 color: "#2276d2",
//               },
//             },
//             { title: "Table row 1", selector: "tr", classes: "tablerow1" },
//             { title: "Image formats" },
//             {
//               title: "Image Left",
//               selector: "img",
//               styles: { float: "left", margin: "0 10px 0 10px" },
//             },
//             {
//               title: "Image Right",
//               selector: "img",
//               styles: { float: "right", margin: "0 0 10px 10px" },
//             },
//           ],
