import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DashBoard from "./dashboard";

//mapDispatch;
// mapState;
// mergeProps;

// const mapDispatchToProps = (dispatch: any, ownProps: any) => ( {
//     bindActionCreators({ getData }, dispatch),
//     bindActionCreators({ setData }, dispatch)
//   });
// };

export default withRouter(connect()(DashBoard));
