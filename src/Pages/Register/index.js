import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.min.css";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button, message } from "antd";
import "./index.scss";

export default function Index(props) {

  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [bsPassword,setBsPassword] = useState('');

  const changeName = (e) => {
    const needText = e.currentTarget.value;
    setUserName(needText)
  };

  const changePassword = (e) => {
    const needText = e.currentTarget.value;
    setPassWord(needText)
  };

  const backToLogin = (e) => {
    props.history.push(`/login`);
  }

  const beSurePassword = (e) => {
    const needText = e.currentTarget.value;
    setBsPassword(needText)
  }

  const uptoRegister = () => {
    const n = username;
    const a = password;
    if(username === '' || password === '' || bsPassword === ''){
      message.error('基本信息不能为空');
    }else if(password !== bsPassword){
      message.error('两次密码输入不相同');
    }else {
      axios
      .post("http://localhost:80/api/register", { username:n, password:a })
      .then((res) => {
        if (res.data.status === 0) {
          window.localStorage.setItem("username", res.data.data.username);
          props.history.push(`/index`);
          message.success('注册成功，已为您自动登录');
        } else {
          message.error(res.data.msg);
        }
      });
    }
    }
  



  return (
    <div className="bodys">
      <div className="boxes">
        <div className="container1">
          <div className="header">💴</div>
          <div className="header">这是注册页面</div>
          <div className="littleHeader">速速注册！</div>
          <div className="title"></div>
        </div>
        <div className="container2">
          <div className="login">欢迎注册</div>
          {/* </> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "12%",
              marginLeft: "20%",
            }}
          >
            <div>
              账号：
              <Input
                style={{ width: "60%" }}
                onChange={(e) => changeName(e)}
                placeholder='请输入账号'
              />
            </div>
            <div style={{ marginTop: "5%" }}>
              密码：
              <Input.Password
                style={{ width: "60%" }}
                onChange={(e) => changePassword(e)}
                placeholder='请输入密码'
              />
            </div>
            <div style={{ marginTop: "5%"}}>
              确认密码：
              <Input.Password
                style={{ width: "50%", marginLeft: "3%" }}
                onChange={(e) => beSurePassword(e)}
                placeholder='再次输入密码'
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
              <button className="login-btn"onClick={backToLogin}>
                返回
              </button>
            </div>
            <div style={{ marginLeft: "27%" }}>
              <button className="login-btn"  onClick={uptoRegister}  >提交</button>
            </div>
          </div>
          <div className="title"></div>
        </div>
      </div>
    </div>
  );

}
