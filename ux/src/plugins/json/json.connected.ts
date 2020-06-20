import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import JsonEditorApp from "./json";
import { JSON_PLUGIN_NAME } from "./json.constants";

const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { app: state.app, ...state[JSON_PLUGIN_NAME] };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JsonEditorApp)
);
