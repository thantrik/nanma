import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ColorView from "./color";

const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { app: state.app, code: state.code, data: window.___DATA || "{}" };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ColorView)
);
