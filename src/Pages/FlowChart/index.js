import React from "react";
import { useEffect } from "react";
import { Card } from "antd";

export default function FlowChart() {
  useEffect(() => {
    getLine1();
    getStart();
    getflow1();
    getText1();
    getText2();
    getLine2();
    getFlow2();
    getText3();
    getLine3();
    getFlow3();
    getText4();
    getLine4();
    getFlow4();
    getText5();
    getLine5();
    getFlow5();
    getText6()
  }, []);

  const getLine1 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.moveTo(75, 80);  
    ctx.lineTo(75, 200);  
    ctx.stroke(); 
  };

  const getStart = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.fillStyle = "#efefef";
    ctx.strokeStyle = "#1e1e1e";
    ctx.lineWidth = "2";
    ctx.strokeRect(0, 0, 150, 80);
  };

  const getflow1 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.fillStyle = "#efefef";
    ctx.strokeStyle = "#1e1e1e";
    ctx.lineWidth = "2";
    ctx.strokeRect(0, 200, 150, 80);
  };

  const getText1 = () => {
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    ctx.font = "25px Arial";
    ctx.strokeText("Start", 45, 50);
  };

  const getText2 = () => {
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    ctx.font = "25px Arial";
    ctx.strokeText("process1", 32, 250);
  };

  const getLine2 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.moveTo(150, 240);  
    ctx.lineTo(270, 240);  
    ctx.stroke(); 
  };

  const getFlow2 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.fillStyle = "#efefef";
    ctx.strokeStyle = "#1e1e1e";
    ctx.lineWidth = "2";
    ctx.strokeRect(270, 200, 150, 80);
  };

  const getFlow3 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.fillStyle = "#efefef";
    ctx.strokeStyle = "#1e1e1e";
    ctx.lineWidth = "2";
    ctx.strokeRect(540, 200, 150, 80);
  };

  const getFlow4 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.fillStyle = "#efefef";
    ctx.strokeStyle = "#1e1e1e";
    ctx.lineWidth = "2";
    ctx.strokeRect(810, 200, 150, 80);
  };

  const getFlow5 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.fillStyle = "#efefef";
    ctx.strokeStyle = "#1e1e1e";
    ctx.lineWidth = "2";
    ctx.strokeRect(810, 400, 150, 80);
  };


  const getText3 = () => {
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    ctx.font = "25px Arial";
    ctx.strokeText("process2", 290, 250);
  };

  const getText4 = () => {
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    ctx.font = "25px Arial";
    ctx.strokeText("process3", 560, 250);
  };

  const getText5 = () => {
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    ctx.font = "25px Arial";
    ctx.strokeText("process4", 830, 250);
  };

  const getText6 = () => {
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    ctx.font = "25px Arial";
    ctx.strokeText("End", 860, 450);
  };



  const getLine3 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.moveTo(420, 240);  
    ctx.lineTo(540, 240);  
    ctx.stroke();   
  };

  const getLine4 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.moveTo(690 , 240);  
    ctx.lineTo(810, 240);  
    ctx.stroke();   
  };

  const getLine5 = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");  
    ctx.moveTo(880 , 280);  
    ctx.lineTo(880, 400);  
    ctx.stroke();   
  };

  return (
    <Card style={{ height: "100vh" }}>
      <div >
        <canvas
        style={{ marginLeft:'2vw' }}
          id="canvas"
          height="600"
          width="1200"
        ></canvas>
      </div>
    </Card>
  );
}
