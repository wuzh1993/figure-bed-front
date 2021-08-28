import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./index.css";
import routerConfig from "./config/routerConfig";
import RouterGuard from "./RouterGuard";
import zhCN from "antd/lib/locale/zh_CN";
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router basename="/drawbed">
      <Switch>
        <RouterGuard routerConfig={routerConfig} />
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById("root")
);
