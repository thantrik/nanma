import { DataUrl, urls } from "./trade-url";

import { AKRI_TRADE_PLUGIN_NAME } from "./akri-trade.constants";
import { AkriTradeStateType } from "./akri-trade.types";
import BaseComponent from "../../components/base/component";
import JsonTableView from "./jsonTable";
import React from "react";
import { WEB_REQUEST } from "../../app/common/constants";
import { WebResponse } from "../../app/common";

interface AkriTradeViewAppState extends AkriTradeStateType {
  data: Record<string, WebResponse>;
}

class AkriTradeViewApp extends BaseComponent<
  AkriTradeViewAppState,
  AkriTradeStateType
> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...this.props,
      data: {} as Record<string, WebResponse>,
    };
  }
  componentDidMount = async () => {
    // urls.forEach(async (objUrl: DataUrl) => {
    //   const response = await getWebData(objUrl.url);
    //   this.setState({
    //     data: {
    //       ...this.state.data,
    //       [objUrl.title]: response as WebResponse,
    //     },
    //   });
    // });
    // const response = await getWebData(urls[0].url);
    // this.setState({
    //   data: {
    //     ...this.state.data,
    //     [urls[0].title]: response as WebResponse,
    //   },
    // });
    // this.setState({
    //   data: {
    //     [urls[0].title]: {
    //       json: await (await import("./mock/all-indices")).default,
    //     } as WebResponse,
    //   },
    // });
  };
  render() {
    const { data } = this.state;

    return Object.values(data).map((response: WebResponse) =>
      response.json ? (
        <JsonTableView class="green" json={response.json?.data}></JsonTableView>
      ) : (
        <pre>{response.text}</pre>
      )
    );
  }
}

export default AkriTradeViewApp;
