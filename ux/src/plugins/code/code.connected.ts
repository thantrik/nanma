import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CodeEditor from "./code";

//mapDispatch;
// mapState;
// mergeProps;

// const mapDispatchToProps = (dispatch: any, ownProps: any) => ( {
//     bindActionCreators({ getData }, dispatch),
//     bindActionCreators({ setData }, dispatch)
//   });
// };

export default connect()(CodeEditor);
