import "./custom.style.css";

import { Document } from "../../paste-bin.types";
import { DocumentAction } from "../../actions";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { wordArt } from "./format";

// import "tinymce/tinymce";
// import "tinymce/themes/silver";
// import "tinymce/icons/default";
//import "tinymce/plugins/";

interface IDocumentEditor extends Document {
  onUpdate: (content: string) => void;
  onSave: (content: string) => void;
  onAction: (action: DocumentAction) => Promise<Document>;
}

class DocumentEditor extends React.Component<IDocumentEditor, any> {
  content: string = "";
  editor = React.createRef<Editor>();
  handleEditorChange = (content: any, editor: any) => {
    this.content = content as string;
    this.props.onUpdate && this.props.onUpdate(this.content);
  };
  handleSaveDocument = () => {
    if (this.editor.current)
      this.props.onSave &&
        this.props.onSave((this.editor.current as any).currentContent);
  };
  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    const { content = "", meta: { title = "Untitled" } = {} } = this.props;
    return (
      <Editor
        ref={this.editor}
        apiKey="aemfbajq4pdf7ts4y3ncw8frkl9zvl7qxtc0pi3ypdcadiau"
        initialValue={atob(content)}
        plugins={`advlist | anchor | autolink | autosave | bbcode | 
        charmap | code | codesample | colorpicker | contextmenu | directionality | 
      emoticons | fullscreen | help | hr | image | imagetools | importcss | 
      insertdatetime | legacyoutput | link | lists | media | nonbreaking | noneditable | 
      pagebreak | paste | preview | print | quickbars | save | searchreplace | spellchecker | 
      tabfocus | table | template | textcolor | textpattern | toc | visualblocks | visualchars | wordcount`}
        toolbar={`undo redo | styleselect | fontselect | fontsizeselect | forecolor | bold italic strike | 
        alignleft aligncenter alignright alignjustify | 
        outdent indent | link image | code | print | save`}
        outputFormat="html"
        init={{
          element_format: "xhtml",
          height: "100%",
          menubar: true,
          inline: false,
          schema: "html5",
          // fullpage: "fullPage",
          // fullpage_default_doctype: "<!DOCTYPE html>",
          // fullpage_default_font_size: "10pt",
          // fullpage_default_font_family: "Fira Code",
          fullpage_default_title: title || "Untitled",
          block_formats:
            "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre",
          // fontsize_formats:
          //   "6pt 8pt 10pt 11pt 12pt 14pt 16pt 18pt 22pt 24pt 30pt 36pt 48pt",
          font_formats: `FiraCode=Fira Code;Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats`,
          contextmenu:
            "link image table forecolor imagetools paste save colorpicker bold italic strike alignleft aligncenter alignright alignjustify",
          forced_root_block: "div",
          forced_root_block_attrs: {
            style: "padding: 0px",
          },
          ...format_style,
          importcss_append: true,
          style_formats_merge: true,
          save_onsavecallback: this.handleSaveDocument,
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default DocumentEditor;

const format_style = {
  content_style:
    ".left { text-align: left; } " +
    "img.left { float: left; } " +
    "table.left { float: left; } " +
    ".right { text-align: right; } " +
    "img.right { float: right; } " +
    "table.right { float: right; } " +
    ".center { text-align: center; } " +
    "img.center { display: block; margin: 0 auto; } " +
    "table.center { display: block; margin: 0 auto; } " +
    ".full { text-align: justify; } " +
    "img.full { display: block; margin: 0 auto; } " +
    "table.full { display: block; margin: 0 auto; } " +
    ".bold { font-weight: bold; } " +
    ".italic { font-style: italic; } " +
    ".underline { text-decoration: underline; } " +
    ".example1 {} " +
    ".tablerow1 { background-color: #D3D3D3; }" +
    `.word-art-flame { ${wordArt.Flame} }` +
    `.word-art-rainbow { ${wordArt.Rainbow} }` +
    `.word-art-shadow { ${wordArt.Shadow} }` +
    `.word-art-outline { ${wordArt.Outline} }` +
    `.word-art-shadow-layer { ${wordArt.ShadowLayer} }`,

  formats: {
    customformat: {
      inline: "span",
      styles: { color: "#00ff00" },
      attributes: { title: "My custom format" },
      classes: "example1",
    },
    wordArtFlame: {
      inline: "div",
      attributes: { title: "Flame" },
      classes: "word-art-flame",
    },
    wordArtRainbow: {
      inline: "div",
      attributes: { title: "Rainbow" },
      classes: "word-art-rainbow",
    },
    wordArtShadow: {
      inline: "div",
      attributes: { title: "Shadow" },
      classes: "word-art-shadow",
    },
    wordArtOutline: {
      inline: "div",
      attributes: { title: "Outline" },
      classes: "word-art-outline",
    },
    wordArtShadowLayer: {
      inline: "div",
      attributes: { title: "Layer" },
      classes: "word-art-shadow-layer",
    },
  },
  style_formats: [
    { title: "Custom format", format: "customformat" },
    {
      title: "Badge",
      inline: "span",
      styles: {
        display: "inline-block",
        border: "1px solid #2276d2",
        "border-radius": "3px",
        padding: "1px 3px",
        margin: "0 2px",
        color: "#2276d2",
      },
    },
    { title: "Word Art" },
    { title: "Rainbow", format: "wordArtRainbow" },
    { title: "Shadow", format: "wordArtShadow" },
    { title: "Outline", format: "wordArtOutline" },
    { title: "Layer", format: "wordArtShadowLayer" },
    { title: "Flame", format: "wordArtFlame" },

    // { title: "Table row 1", selector: "tr", classes: "tablerow1" },
    // { title: "Image formats" },
    // {
    //   title: "Image Left",
    //   selector: "img",
    //   styles: { float: "left", margin: "0 10px 0 10px" },
    // },
    // {
    //   title: "Image Right",
    //   selector: "img",
    //   styles: { float: "right", margin: "0 0 10px 10px" },
    // },
  ],
};
