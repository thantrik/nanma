import React from "react";
import { SCREEN_CAPTURE_PLUGIN_NAME } from "./screen-capture.constants";

class ScreenCapturePopup extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            chrome.runtime.sendMessage(
              {
                name: SCREEN_CAPTURE_PLUGIN_NAME,
              },
              function (response) {
                console.log("Screenshot url", response);
              }
            );
          }}
        >
          SCREEN
        </button>
      </div>
    );
  }
}

export default ScreenCapturePopup;
