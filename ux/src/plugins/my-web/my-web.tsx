import React from "react";
import MyWebSnippetInputForm from "./components/form/form";
import {
  MyWebSnippetsModal as modal,
  MyWebSnippetsModal,
} from "./components/form/modal";
import DomainList from "./components/domain/DomainList";
import DomainDetailsPanel from "./components/domain/DetailsPanel";
import { createDomainSnippetsMap } from "./utils/domainSnippetMap";

class MyWebSnippetsApp extends React.Component<
  any,
  {
    all: MyWebSnippetsModal[];
    selected: {
      domain: string;
    };
    form: {
      preview: boolean;
      data: any;
    };
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      all: [],
      selected: {
        domain: "",
      },
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
  selectDomain = (domain: string) => {
    console.log("Selected", domain);
    this.setState(
      {
        selected: {
          domain,
        },
      },
      () => {}
    );
  };
  render() {
    const { all = [] } = this.state;
    const domainMap = createDomainSnippetsMap(all);
    const domains = Object.keys(domainMap);

    const detailsPanel = !!domains.length && (
      <DomainDetailsPanel
        allSnippets={domainMap}
        domain={this.state.selected.domain || domains?.[0]}
      ></DomainDetailsPanel>
    );
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div
          style={{
            width: "160px",
            boxShadow:
              "0 1px 1.5px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24)",
            marginRight: 4,
          }}
        >
          {
            <DomainList
              onSelect={this.selectDomain}
              domains={domains}
              domainMap={domainMap}
            ></DomainList>
          }
        </div>
        <div style={{ display: "flex", width: "calc(100vw - 164px)" }}>
          <div
            style={{
              width: "65%",
              boxShadow:
                "0 1px 1.5px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24)",
              marginRight: 4,
            }}
          >
            {detailsPanel}
          </div>
          <div
            style={{
              width: "calc(35% - 4px)",
            }}
          >
            <MyWebSnippetInputForm
              onSubmit={this.AddNewDomainScript}
              readOnly={this.state.form.preview}
              {...this.state.form.data}
            ></MyWebSnippetInputForm>
          </div>
        </div>
      </div>
    );
  }
}

export default MyWebSnippetsApp;
