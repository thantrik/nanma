import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PasteBinEditorApp from"./paste-bin";
import { PASTE_BIN_PLUGIN_NAME } from"./paste-bin.constants";

const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { app: state.app, ...state[PASTE_BIN_PLUGIN_NAME] };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PasteBinEditorApp)
);
