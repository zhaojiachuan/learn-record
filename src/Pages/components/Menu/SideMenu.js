import React, { useEffect, useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
} from "@ant-design/icons";

import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  Modal,
  Anchor,
  message,
} from "antd";
import "../index.scss";
import { withRouter } from "react-router-dom";
import SingleMessage from "./SingleMessage";
import {  useSelector } from "react-redux";
import axios from "axios";

const { Sider } = Layout;

const SideMenu = (props) => {
  const [collapsed, setcollapsed] = useState(false);
  const [username, setusername] = useState("");
  const [logoutModal, setlogoutModal] = useState(false);
  const [avatarModal, setavatarModal] = useState(false);
  const [loading, setloading] = useState(false);

  let userInfoList = useSelector((state) => {
    return state.newUserList;
  });

  console.log(userInfoList);
  useEffect(() => {
    const name = window.localStorage.getItem("username");
    setusername(name);
  }, []);

  const logout = () => {
    setlogoutModal(true);
  };

  const changeAvatar = () => {
    setavatarModal(true);
  };

  const renderMenu = () => {
    const menu = (
      <Menu
        items={[
          {
            key: "1",
            label: <div onClick={logout}>退出登录</div>,
          },
          {
            key: "2",
            label: <div onClick={changeAvatar}>用户信息</div>,
          },
          {
            key: "3",
            label: (
              <a href="/#/chatroom" target="_blank">
                聊天室
              </a>
            ),
          },
        ]}
      />
    );
    return menu;
  };

  const okFun = () => {
    props.history.push(`/login`);
  };

  const cancel = () => {
    setlogoutModal(false);
  };

  const okAvatarModal = () => {
    let list;
    console.log(userInfoList);
    if (!userInfoList.id) {
      message.error("编辑数据后保存才可以提交哦");
    } else {
      axios
        .put("http://localhost:80/api/putUserInfo", { ...userInfoList })
        .then((res) => {
          if (res.data.status === 0) {
            message.success(res.data.msg);
            setavatarModal(false);
            props.history.push("/login");
          } else {
            message.error("unknown error");
          }
        });
    }
  };

  const cancelAvatarModal = () => {
    setavatarModal(false);
  };

  const changeRoute = (e) => {
    const path = e.key;
    if (path === "1") {
      props.history.push(`index`);
    }
    if (path === "2") {
      props.history.push(`createForm`);
    }
    if (path === "3") {
      props.history.push(`reduxSearch`);
    }
    if (path === "4") {
      props.history.push(`dashboard`);
    }
    if (path === "5") {
      props.history.push(`checkbox`);
    }
    if (path === "6") {
      props.history.push(`editTable`);
    }
    if (path === "7") {
      props.history.push(`customComponment`);
    }
    if (path === "8") {
      props.history.push(`flowChart`);
    }
    if (path === "9") {
        props.history.push({
          pathname: '/demo',
          search: `?ids=${123}&id=${456}`
      });
    }
  };

  return (
    <Anchor style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="bar">
          <div style={{ paddingBottom: "8%", paddingLeft: "24%" }}>
            学习记录🍧
          </div>
        </div>
        <div
          style={{
            paddingTop: "10%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "10%",
          }}
        >
          <Avatar size={100} src="https://joeschmoe.io/api/v1/random" />

          <div style={{ paddingTop: "10%" }}>{`欢迎, ${username}`}</div>
          <Dropdown overlay={renderMenu()} style={{ paddingTop: "3%" }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {username}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Menu
          theme="light"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          onClick={(e) => {
            changeRoute(e);
          }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "主页",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "表单操作",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "基于redux的搜索",
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: "看板",
            },
            {
              key: "5",
              icon: <UploadOutlined />,
              label: "多选框级联",
            },
            {
              key: "6",
              icon: <UploadOutlined />,
              label: "可编辑表格",
            },
            {
              key: "7",
              icon: <UploadOutlined />,
              label: "自定义组件",
            },
            {
              key: "8",
              icon: <UploadOutlined />,
              label: "基于canvas的流程图",
            },
                        {
              key: "9",
              icon: <UploadOutlined />,
              label: "工具样例",
            },
          ]}
        />
      </Sider>
      <Modal visible={logoutModal} onOk={okFun} onCancel={cancel} okText="确定"
        cancelText='取消'>
        确定退出登录吗？
      </Modal>
      <Modal
        visible={avatarModal}
        width={1000}
        okText="编辑"
        cancelText='取消'
        onOk={okAvatarModal}
        onCancel={cancelAvatarModal}
      >
        <SingleMessage username={username} />
      </Modal>
    </Anchor>
  );
};
export default withRouter(SideMenu);
