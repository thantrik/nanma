import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CodeEditor from "./code";

//mapDispatch;
// mapState;
// mergeProps;

const mapStateToProps = (state: any) => {
  const { code } = state;
  return code;
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CodeEditor)
);
