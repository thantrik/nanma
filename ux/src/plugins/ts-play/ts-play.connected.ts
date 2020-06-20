import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TSPlayGround from "./ts-play";

const mapStateToProps = (state: any) => {
  return state;
};

export default withRouter(connect(mapStateToProps)(TSPlayGround));
