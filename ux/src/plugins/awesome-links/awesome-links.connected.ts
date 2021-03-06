import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import { bindActionCreators } from "redux";
import ConnectedAwesomeLinksViewer from "./awesome-links";

const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { app: state.app, code: state.code, data: window.___DATA || "{}" };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConnectedAwesomeLinksViewer)
);
