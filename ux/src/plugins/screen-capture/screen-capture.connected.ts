import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ScreenCaptureApp from "./screen-capture";

const mapStateToProps = (state: any) => {
  console.log(state);
  //@ts-ignore
  return {
    app: state.app,
    ...state.screenCapture,
    data: state.screenCapture.data || "{}",
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ScreenCaptureApp)
);
