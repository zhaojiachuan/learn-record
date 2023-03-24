import React, { Component } from "react";
import { Input ,Button} from "antd";
let websocket = new WebSocket("ws://172.20.10.13:8010");
export default class chatroom extends Component {
  componentDidMount() {
    console.log(123123);
    // 新建websocket连接

    // 打开websocket连接
    websocket.onopen = () => {
      console.log("服务器已连接");
      document.getElementById("submitBtn").onclick = () => {
        let txt = document.getElementById("sendMsg").value;
        let txt2=localStorage.getItem('username')
        let txt3=JSON.stringify({txt,txt2})
        if (txt) {
          websocket.send(txt3);
        }
      };
    };
    // 关闭websocket连接
    websocket.onclose = () => {
      console.log("服务器已断开");
    };

    // 接收服务器返回的数据

    websocket.onmessage = (e) => {
      console.log(e);
      let mes = JSON.parse(e.data);
      this.showMessage(mes.data, mes.type);
    };
  }

  showMessage = (str, type) => {
    let mesBody = document.getElementById("mesBody");
    let container = document.createElement("div");
    container.innerHTML = str;
    if (type === "enter") {
      container.style.color = "blue";
    } else if (type === "leave") {
      container.style.color = "red";
    }
    mesBody.appendChild(container);
  };

  render() {
    return (
      <div>
        <h2 style={{textAlign:"center"}}>在线聊天室</h2>
        <div style={{height:"85vh"}}>
          <div id="mesBody"></div>
        </div>
        <div style={{display:"flex",flexDirction:"row"}}>
          <Input id="sendMsg" type="text" />
          <Button id="submitBtn">send</Button>
        </div>
      </div>
    );
  }
}
