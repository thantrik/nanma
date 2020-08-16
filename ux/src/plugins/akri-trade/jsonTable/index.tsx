import React from "react";

class JsonTableView extends React.Component<
  { json: any[]; class?: string },
  any
> {
  componentDidMount = async () => {
    import("./table.styles.css");
  };
  render() {
    const json = this.props.json || [];
    const className = `default ${this.props.class || ""}`;
    if (!json.length) return null;

    const createTable = (thead: JSX.Element, tbody: JSX.Element[]) => (
      <table className={className}>
        <thead>{thead}</thead>
        <tbody>{tbody}</tbody>
      </table>
    );
    const createHeader = (json: any[]) => (
      <tr>
        {Object.keys(json[0]).map((key: string) => (
          <th>{key}</th>
        ))}
      </tr>
    );

    const createBody = (json: any[]) =>
      json.map((val: Record<string, string>) => (
        <tr>
          {Object.values(val).map((key: string) => (
            <td>{key}</td>
          ))}
        </tr>
      ));

    return createTable(createHeader(json), createBody(json));
  }
}

export default JsonTableView;
