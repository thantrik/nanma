import React from "react";
import { Editor } from "@tinymce/tinymce-react";

class RichTextEditor extends React.Component {
  handleEditorChange = (e: Event) => {
    //@ts-ignore
    console.log("Content was updated:", e.target.getContent());
  };

  render() {
    return (
      <Editor
        initialValue="<p>Initial content</p>"
        init={{
          height: "100vh",
          width: "100vw",
          menubar: false,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default RichTextEditor;
