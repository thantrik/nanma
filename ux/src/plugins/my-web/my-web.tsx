import React from "react";
import MyWebSnippetInputForm from "./components/form/form";
import {
  MyWebSnippetsModal as modal,
  MyWebSnippetsModal,
} from "./components/form/modal";
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from "office-ui-fabric-react/lib/Persona";
import { Stack, Grid, GridCell } from "@fluentui/react";

class MyWebSnippetsApp extends React.Component<
  any,
  {
    all: MyWebSnippetsModal[];
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
    const getDomain = (data: any): string => {
      let domain = data.toString();
      if (domain.indexOf("//") > -1) {
        domain = domain.substring(domain.indexOf("//") + 2);
      }
      if (domain.indexOf("/") > -1) {
        domain = domain.substring(0, domain.indexOf("/"));
      }
      return domain;
    };
    //const domains = all.map((doc: modal) => getDomain(doc.test));
    const domainMap: Record<string, MyWebSnippetsModal> = all.reduce(
      (
        mapData: Record<string, MyWebSnippetsModal>,
        doc: MyWebSnippetsModal
      ): Record<string, MyWebSnippetsModal> => {
        const domain = getDomain(doc.test);
        let data: MyWebSnippetsModal = mapData[domain];

        mapData[domain] = {
          ...data,
          css: [...(data?.css || []), ...doc.css],
          script: [...(data?.script || []), ...doc.script],
        };
        return mapData;
      },
      {}
    );
    const domainColumn = (
      <Stack tokens={{ childrenGap: 3 }}>
        {Object.keys(domainMap).map((domain) => {
          const data = domainMap[domain];
          const domainData = {
            imageUrl: `https://${domain}/favicon.ico`,
            imageInitials: domain.substring(0, 2).toUpperCase(),
            text: domain,
            secondaryText: `css: ${data.css.length} rules, js: ${data.script.length}`,
          };
          return (
            <div>
              <Persona
                {...domainData}
                presence={PersonaPresence.online}
                size={PersonaSize.size32}
                hidePersonaDetails={false}
                imageShouldFadeIn={false}
                showSecondaryText={true}
              ></Persona>
            </div>
          );
        })}
      </Stack>
    );
    const detailsPanel = <div></div>;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%" }}>{domainColumn}</div>
        <div style={{ width: "45%" }}>{detailsPanel}</div>
        <div style={{ width: "35%" }}>
          <MyWebSnippetInputForm
            onSubmit={this.AddNewDomainScript}
            readOnly={this.state.form.preview}
            {...this.state.form.data}
          ></MyWebSnippetInputForm>
        </div>
      </div>
    );
  }
}

export default MyWebSnippetsApp;
