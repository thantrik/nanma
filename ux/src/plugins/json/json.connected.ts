import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import JsonEditorApp from "./json";

const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { app: state.app, ...state.json, data: state.json.data || "{}" };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JsonEditorApp)
);
