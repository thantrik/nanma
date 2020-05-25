import React from "react";
import MyWebSnippetInputForm from "./components/form/form";
import { MyWebSnippetsModal as modal } from "./components/form/modal";

class MyWebSnippetsApp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      all: [],
      form: {
        preview: false,
        data: {},
      },
    };
  }
  getAll = async () =>
    this.setState(
      {
        all: await modal.getAll(),
      },
      () => {
        console.log(this.state);
      }
    );
  componentDidMount = async () => {
    await this.getAll();
  };
  AddNewDomainScript = async (data: any) => {
    await new modal(data).save();
    await this.getAll();
  };
  render() {
    const { all = [] } = this.state;
    return (
      <div>
        {all.map((doc: modal) => (
          <>
            <div>{doc.id}</div>
            <div>{doc.test}</div>
            <div>{doc.script}</div>
            <div>{doc.css}</div>
          </>
        ))}
        <MyWebSnippetInputForm
          onSubmit={this.AddNewDomainScript}
          readOnly={this.state.form.preview}
          {...this.state.form.data}
        ></MyWebSnippetInputForm>
      </div>
    );
  }
}

export default MyWebSnippetsApp;
