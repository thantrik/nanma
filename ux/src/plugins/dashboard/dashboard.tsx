import React from "react";
import { Link } from "react-router-dom";
import { getPlugins } from "../../app";

import "./dashboard.style.css";

const plugins = getPlugins();
class DashBoard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <div
        ref={(ele) => {
          window.document.body.style.backgroundColor = "#004367";
        }}
        className="dashboard"
      >
        {plugins
          .filter((plugin) => plugin.name !== "dashboard")
          .map((plugin) => (
            <Link to={plugin.route.path}>{plugin.name}</Link>
          ))}
      </div>
    );
  }
}

export default DashBoard;
