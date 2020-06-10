import React, { useState } from "react";

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

export { Accordion, AccordionItem };
