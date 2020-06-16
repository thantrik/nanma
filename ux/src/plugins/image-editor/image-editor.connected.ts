import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ImageEditorEditorApp from "./image-editor";
import { IMAGE_EDITOR_PLUGIN_NAME } from "./image-editor.constants";

const mapStateToProps = (state: any) => {
  console.log(state);
  //@ts-ignore
  return {
    app: state.app,
    ...state[IMAGE_EDITOR_PLUGIN_NAME],
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ImageEditorEditorApp)
);
