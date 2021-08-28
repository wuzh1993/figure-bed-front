import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../server/api";
import md5 from "md5";
export default class Login extends Component {
  state = {
    loading: false,
    loginTxt: "登录",
  };
  onFinish = (values) => {
    this.setState({ loading: true, loginTxt: "登录中..." });
    const params = {
      username: values.username,
      password: md5(values.password),
    };
    login(params).then((res) => {
      console.log(res)
      this.setState({ loading: false, loginTxt: "登录" });
      if (res) {
        const { token } = res;
        window.localStorage.setItem("token", token);
        this.props.history.replace("/");
      }
    });
  };

  render() {
    const { loading, loginTxt } = this.state;
    return (
      <div className="login">
        <div className="login-container">
          <div className="login-logo"></div>
          <div className="login-title">图床应用</div>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
            initialValues={{ remember: true }}
            size="large"
            validateTrigger="onBlur"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "账号不能为空!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入账号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "密码不能为空!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            {/* <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: '10px' }}>
              <Checkbox>记住密码</Checkbox>
            </Form.Item> */}
            <Form.Item style={{ marginBottom: "10px" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                {loginTxt}
              </Button>
            </Form.Item>
            <div className="login-bottom-txt">登录即自动注册</div>
          </Form>
        </div>
      </div>
    );
  }
}
