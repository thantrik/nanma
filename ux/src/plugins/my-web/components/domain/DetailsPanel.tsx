import React from "react";
import { Accordion, AccordionItem } from "../../../../components/Accordion";
import { MyWebSnippetsModalMap } from "../../my-web.types";

interface DomainDetailsPanelProps {
  allSnippets: MyWebSnippetsModalMap;
  domain: string;
}

const DomainDetailsPanel = ({
  allSnippets,
  domain,
}: DomainDetailsPanelProps) => {
  const snippets = allSnippets[domain];
  console.log(domain, snippets, allSnippets);
  return (
    <Accordion>
      {snippets.map((data, i: number) => {
        console.log("DATA", data);
        return (
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
              <div>{data.css.join(";")}</div>
              <h4>SCRIPT</h4>
              <div>{data.script.join(";")}</div>
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default DomainDetailsPanel;
