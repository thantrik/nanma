import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ImageEditorEditorApp from "./image-editor";

const mapStateToProps = (state: any) => {
  console.log(state);
  //@ts-ignore
  return {
    app: state.app,
    ...state.imageEditor,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ImageEditorEditorApp)
);
