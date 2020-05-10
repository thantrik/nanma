import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import JSONEditor from"./md-editor";

//mapDispatch;
// mapState;
// mergeProps;

// const mapDispatchToProps = (dispatch: any, ownProps: any) => ( {
//     bindActionCreators({ getData }, dispatch),
//     bindActionCreators({ setData }, dispatch)
//   });
// };

export default withRouter(connect()(JSONEditor));
