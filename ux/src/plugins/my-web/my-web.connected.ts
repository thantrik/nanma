import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MyWebEditorApp from "./my-web";
import { MYWEB_PLUGIN_NAME } from "./my-web.constants";

const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { app: state.app, ...state[MYWEB_PLUGIN_NAME] };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

const ConnectedMyWebViewer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyWebEditorApp)
);

export default ConnectedMyWebViewer;
