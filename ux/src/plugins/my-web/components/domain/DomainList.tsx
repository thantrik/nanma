import React from "react";
import { Persona, PersonaPresence, PersonaSize } from "@fluentui/react";
import { MyWebSnippetsModalMap } from "../../my-web.types";

interface DomainListProps {
  onSelect: (domain: string) => void;
  domainMap: MyWebSnippetsModalMap;
  domains: string[];
}

const DomainList = ({ onSelect, domainMap, domains }: DomainListProps) => (
  <div>
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
        <div
          style={{
            boxShadow:
              "0 1px 1.5px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24)",
            paddingTop: 3,
            paddingBottom: 3,
            marginBottom: 3,
            cursor: "pointer",
          }}
        >
          <Persona
            {...domainData}
            presence={PersonaPresence.online}
            size={PersonaSize.size24}
            hidePersonaDetails={false}
            imageShouldFadeIn={false}
            showSecondaryText={true}
            onClick={() => {
              onSelect(domain);
            }}
          ></Persona>
        </div>
      );
    })}
  </div>
);

export default DomainList;
