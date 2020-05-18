import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TSPlayGround from "./ts-play";

const mapStateToProps = (state: any) => {
  //@ts-ignore
  return { data: window.___DATA || "{}" };
};

export default withRouter(connect(mapStateToProps)(TSPlayGround));
