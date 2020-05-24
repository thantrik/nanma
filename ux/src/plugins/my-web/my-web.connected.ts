import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MyWebEditorApp from"./my-web";

const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { app: state.app, ...state.myWeb, data: state.myWeb.data || "{}" };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyWebEditorApp)
);
