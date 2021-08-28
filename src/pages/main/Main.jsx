import React, { Component } from "react";
import { Upload, Button, message, Space, Avatar, Dropdown, Menu } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { uploadImg, getImgList } from "../../server/api";
import TableList from "./components/TableList";

export default class Main extends Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 10,
    },
    dataList: [],
    totalCount: 0,
    tableLoading: false,
    uploadLoading: false,
  };
  doImgUpload = ({ file }) => {
    const { type } = file;
    const limitArr = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (limitArr.indexOf(type) === -1) {
      message.error("请检查上传图片的格式");
      return;
    }
    const formdata = new FormData();
    formdata.append("file", file);
    this.setState({ uploadLoading: true });
    uploadImg(formdata).then((res) => {
      this.setState({ uploadLoading: false });
      if (res) {
        message.success(res.message);
        this.getImgList();
      }
    });
  };
  getImgList = (pagination) => {
    let params = {};
    if (pagination) {
      params = pagination;
      this.setState({ pagination, tableLoading: true });
    } else {
      params = this.state.pagination;
    }
    getImgList(params).then((res) => {
      this.setState({ tableLoading: false });
      if (res) {
        this.setState({
          dataList: res.list || [],
          totalCount: res.totalCount,
        });
      }
    });
  };
  outLogin = () => {
    localStorage.clear();
    this.props.history.replace("/login");
  };
  componentDidMount() {
    this.getImgList();
  }
  render() {
    const { dataList, totalCount, pagination, tableLoading, uploadLoading } =
      this.state;
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.outLogin}>登出</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="main">
        <div className="main-top">
          <div className="main-top-left">
            <img src="" alt="" className="main-top-logo" />
            <span>图床应用</span>
          </div>
          <div className="main-top-right" style={{ cursor: "pointer" }}>
            <Dropdown overlay={menu} placement="bottomCenter" trigger="click">
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </div>
        <div className="main-container">
          <div className="main-title"></div>
          <div className="main-wrap">
            <div className="main-wrap-top">
              <Space>
                <Upload customRequest={this.doImgUpload} showUploadList={false}>
                  <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    size="large"
                    loading={uploadLoading}
                  >
                    上传
                  </Button>
                </Upload>
              </Space>
            </div>
            <TableList
              dataList={dataList}
              totalCount={totalCount}
              pagination={pagination}
              loading={tableLoading}
              getImgList={this.getImgList}
            />
          </div>
        </div>
      </div>
    );
  }
}
