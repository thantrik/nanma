import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SymbolsEditorApp from "./symbols";
import { SYMBOLS_PLUGIN_NAME } from "./symbols.constants";

const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { app: state.app, ...state[SYMBOLS_PLUGIN_NAME] };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SymbolsEditorApp)
);
