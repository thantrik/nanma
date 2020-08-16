import { AKRI_TRADE_PLUGIN_NAME } from "./akri-trade.constants";
import { AkriTradeDashboardView } from "./dashboard";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// import AkriTradeViewApp from "./akri-trade";



const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { app: state.app, ...state[AKRI_TRADE_PLUGIN_NAME] };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  dispatch,
});

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(AkriTradeViewApp)
// );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AkriTradeDashboardView)
);
