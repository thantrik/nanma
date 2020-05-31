import React from "react";
import ReactDOM from "react-dom";

import ScreenCapturePopup from "../../plugins/screen-capture/screen-capture.popup";

const Popup = (props: React.Props<{}>) => <div>{props.children}</div>;

ReactDOM.render(
  <Popup>
    <ScreenCapturePopup></ScreenCapturePopup>
  </Popup>,
  document.body
);
