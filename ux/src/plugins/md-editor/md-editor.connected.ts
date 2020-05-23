import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MarkDownEditorApp from "./md-editor";

//mapDispatch;
// mapState;
// mergeProps;
const mapStateToProps = (state: any) => {
  return state["md-editor"];
};

export default withRouter(connect(mapStateToProps)(MarkDownEditorApp));
