import axios from "axios";
// import ReactDOM from "react-dom";
// import { Spin } from 'antd';
import { message } from "antd";
console.log(process.env.NODE_ENV);
const flag = process.env.NODE_ENV === "development";
const instance = axios.create({
  baseURL: flag ? "http://localhost:3001" : "",
  timeout: 10 * 1000,
});

instance.interceptors.request.use(
  function (config) {
    // let dom = document.createElement('div')
    // dom.setAttribute('id', 'loading')
    // document.body.appendChild(dom)
    // ReactDOM.render(<Spin tip="加载中..." size="large" />, dom)
    if (config.url.indexOf("doLogin") === -1) {
      config.headers.token = localStorage.getItem("token");
    }
    return config;
  },
  function (error) {
    message.error(error.message);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // document.body.removeChild(document.getElementById('loading'))
    console.log(response);
    const { data } = response;
    console.log(data);
    if (data.code !== 0) {
      message.error(data.msg);
      if (data.code === 1001) {
        window.localStorage.clear();
        window.location.hash = "/login";
      }
      return false;
    }
    return data.data;
  },
  function (error) {
    message.error(error.message);
    return Promise.reject(error);
  }
);

export default instance;
