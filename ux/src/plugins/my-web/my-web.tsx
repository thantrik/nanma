import React, { useState, Children } from "react";
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
import { Stack } from "@fluentui/react";

interface AccordionPanel {
  title: string;
}

interface AccordionProps {
  defaultActiveIndex: number;
  panels: AccordionPanel[];
}
interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}
const Accordion = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const AccordionItem = ({
  active = false,
  title,
  children,
}: AccordionItemProps) => {
  const [state, setState] = useState(active);
  const toggle = () => {
    setState(!state);
  };
  return (
    <div
      style={{
        boxShadow:
          "0 1px 1.5px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24)",
        borderRadius: 2,
        paddingLeft: 6,
        paddingRight: 6,
        margin: 3,
      }}
    >
      <div
        onClick={toggle}
        style={{
          cursor: "pointer",
          paddingTop: 2,
          fontWeight: "bold",
          ...(state && { paddingBottom: 2 }),
        }}
      >
        {title}
      </div>
      {state && <div>{children}</div>}
    </div>
  );
};

const renderDetailsPanel = (
  allSnippets: Record<string, MyWebSnippetsModal[]>,
  domain: string
) => {
  const snippets = allSnippets[domain];
  console.log(domain, snippets, allSnippets);
  return (
    <Accordion>
      {snippets.map((data, i: number) => (
        <AccordionItem
          active={i === 0}
          title={<div>{data.test.toString()}</div>}
        >
          <div>
            <div>
              Rules: JS {data.script.length}, CSS {data.css.length}
            </div>
            <br />
            <h4>CSS</h4>
            <textarea>{data.css.join(";")}</textarea>
            <h4>SCRIPT</h4>
            <textarea>{data.script.join(";")}</textarea>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
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
  selectDomain = (domain: string) => () => {
    this.setState(
      {
        selected: {
          domain,
        },
      },
      () => console.log(this.state.selected.domain)
    );
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
    const domainMap: Record<string, MyWebSnippetsModal[]> = all.reduce(
      (
        mapData: Record<string, MyWebSnippetsModal[]>,
        doc: MyWebSnippetsModal
      ): Record<string, MyWebSnippetsModal[]> => {
        const domain = getDomain(doc.test);

        const data: MyWebSnippetsModal[] = mapData[domain] || [];
        data.push(doc);
        mapData[domain] = data;
        return mapData;
      },
      {}
    );
    const domains = Object.keys(domainMap);
    const domainColumn = (
      <Stack tokens={{ childrenGap: 3 }}>
        {domains.map((domain) => {
          const datas = domainMap[domain] || [];
          const domainData = {
            imageUrl: `https://${domain}/favicon.ico`,
            imageInitials: domain.substring(0, 2).toUpperCase(),
            text: domain,
            secondaryText: `css: ${
              datas.filter((datas) => !!datas.css).length
            } rules, js: ${datas.filter((datas) => !!datas.script).length}}`,
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
                onClick={this.selectDomain(domain)}
              ></Persona>
            </div>
          );
        })}
      </Stack>
    );
    const detailsPanel =
      !!domains.length &&
      renderDetailsPanel(domainMap, this.state.selected.domain || domains?.[0]);
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
          {domainColumn}
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
