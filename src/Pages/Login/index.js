import React, { useState, useEffect } from "react";
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { Input, Button, message } from "antd";
import "./login.scss";

export default function Index(props) {
  const [needTxt, setNeedTxt] = useState("");
  const [needAge, setNeedAge] = useState("");

  const changeName = (e) => {
    const needText = e.currentTarget.value;
    setNeedTxt(needText);
  };

  const changeAge = (e) => {
    const needText = e.currentTarget.value;
    setNeedAge(needText);
  };

  const postMsg = () => {
    const n = needTxt;
    const a = needAge;
    if (n === "") {
      message.error("用户名或密码不能为空");
    } else {
      axios
        .post("http://localhost:80/api/post", { username: n, password: a })
        .then((res) => {
          if (res.data.status === 0) {
            window.localStorage.setItem("username", res.data.data.username);
            props.history.push(`/index`);
          } else {
            message.error(res.data.msg);
          }
        });
    }
  };

  const postRegister = () => {
    props.history.push(`/register`);
  };

  return (
    <div className="bodys">
      <div className="boxes">
        <div className="container1">
          <div className="header">💴</div>
          <div
            style={{
              fontSize: "42px",
              fonWeight: "20px",
              letterSpacing: "4px",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            学习记录
          </div>
          <div className="littleHeader">只记录学习问题！只是记录！</div>
          <div className="title"></div>
        </div>
        <div className="container2">
          <div className="login">欢迎登陆</div>
          {/* </> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "12%",
              marginLeft: "25%",
            }}
          >
            <div>
              账号：
              <Input
                style={{ width: "50%" }}
                onChange={(e) => changeName(e)}
                placeholder="请输入账号"
              />
            </div>
            <div style={{ marginTop: "5%" }}>
              密码：
              <Input.Password
                style={{ width: "50%" }}
                onChange={(e) => changeAge(e)}
                placeholder="请输入密码"
                // type="password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </div>
          <div
            className="buttons"
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "12%",
              marginLeft: "23%",
            }}
          >
            <div>
              <button
                className="login-btn"
                /* style={{width:'120%'}} */ onClick={postMsg}
              >
                登陆
              </button>
            </div>
            <div style={{ marginLeft: "27%", width: "20%" }}>
              <button className="login-btn" onClick={postRegister}>
                注册
              </button>
            </div>
          </div>
          <div className="title"></div>
        </div>
      </div>
    </div>
  );
}
