import React, { Component } from "react";
import { Table, message, Space, Popconfirm, Modal, Input } from "antd";
import { deleteImg, renameImg } from "../../../server/api";
import { CopyToClipboard } from "react-copy-to-clipboard";
var dayjs = require("dayjs");
export default class Tablist extends Component {
  state = {
    isModalVisible: false,
    imgDefaultName: "",
    imgName: "",
    isPreview: false,
    imgPreviewVisible: false,
    columns: [
      {
        title: "缩略图",
        dataIndex: "path",
        key: "path",
        render: (url) => (
          <img
            src={url}
            className="img-table-smallImg"
            alt={url}
            onClick={() => this.imgPreview(url)}
          />
        ),
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "尺寸（k）",
        dataIndex: "size",
        key: "size",
        render: (size) => (size / 1024).toFixed(2),
      },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "上传时间",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (time) => dayjs(time).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        title: "路径",
        dataIndex: "path",
        key: "path",
      },
      {
        title: "操作",
        key: "action",
        render: (record) => (
          <Space size="middle">
            <Popconfirm
              title="确定删除该图片？"
              onConfirm={() => this.deleteImg(record)}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>
            <a onClick={() => this.renameImg(record)}>重命名</a>
            <CopyToClipboard
              text={record.path}
              onCopy={() => message.success("已复制到剪切板")}
            >
              <a>复制链接</a>
            </CopyToClipboard>
          </Space>
        ),
      },
    ],
  };

  imgPreview = (url) => {
    this.setState({
      imgPreviewVisible: true,
      imgURI: url,
    });
  };

  imgCancle = () => {
    this.setState({ imgPreviewVisible: false, imgURI: "" });
  };

  deleteImg = ({ name }) => {
    const params = { name };
    deleteImg(params).then((res) => {
      if (res) {
        message.success(res.message);
        this.props.getImgList();
      }
    });
  };

  renameImg = ({ name }) => {
    this.setState({
      isModalVisible: true,
      imgName: name,
      imgDefaultName: name,
    });
  };

  renameConfirm = () => {
    const { imgDefaultName, imgName } = this.state;
    const params = { oldName: imgDefaultName, newName: imgName };
    renameImg(params).then((res) => {
      if (res) {
        this.setState({
          isModalVisible: false,
          imgName: "",
          imgDefaultName: "",
        });
        message.success(res.message);
        this.props.getImgList();
      }
    });
  };

  renameCancel = () => {
    this.setState({ isModalVisible: false, imgName: "", imgDefaultName: "" });
  };

  renameInputChange = (e) => {
    this.setState({ imgName: e.target.value });
  };

  handleTableChange = (e) => {
    const { current, pageSize } = e;
    const pagination = {
      current,
      pageSize,
    };
    this.props.getImgList(pagination);
  };

  componentDidMount() {}

  render() {
    const { columns, isModalVisible, imgName, imgURI, imgPreviewVisible } =
      this.state;
    const { dataList, totalCount, pagination, loading } = this.props;
    return (
      <div>
        <Table
          columns={columns}
          pagination={{
            position: "bottomRight",
            total: totalCount,
            showSizeChanger: true,
            ...pagination,
          }}
          dataSource={dataList}
          rowKey={(record) => record.name}
          locale={{ emptyText: "暂无数据" }}
          loading={loading}
          onChange={this.handleTableChange}
        />
        <Modal
          title="修改图片名称"
          visible={isModalVisible}
          onOk={this.renameConfirm}
          onCancel={this.renameCancel}
        >
          <Input
            placeholder="请输入名称"
            value={imgName}
            onChange={this.renameInputChange}
          />
        </Modal>

        <Modal
          title="图片预览"
          visible={imgPreviewVisible}
          onCancel={this.imgCancle}
          footer={[]}
        >
          <img src={imgURI} alt="" style={{ width: "100%" }} />
        </Modal>
      </div>
    );
  }
}
