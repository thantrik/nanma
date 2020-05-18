import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DiffView from "./diff";

export default withRouter(connect()(DiffView));
