import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Card } from "antd";
import "./message.scss";

export default function MessageChart(props) {


  useEffect(() => {
    const text = document.querySelector(".text");
    text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");
    const letters = document.querySelectorAll("span");
    for (let i = 0; i < letters.length; i++) {
      letters[i].addEventListener("mouseover", function () {
        letters[i].classList.add("active");
      });
    }

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById("main"), null, {
      width: 600,
      height: 350,
    });
    const myDash = echarts.init(document.getElementById("dash"), null, {
      width: 600,
      height: 350,
    });

    window.onresize = function () {
      myChart.resize();
    };

    // 指定图表的配置项和数据
    const option = {
      color: ["#e2c12a"],

      title: {
        text: "柱状图样例",
      },
      tooltip: {},
      legend: {
        data: ["sales volume"],
      },
      xAxis: {
        data: ["Mon", "Tus", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {},
      series: [
        {
          name: "Revenue",
          type: "bar",
          data: [50, 70, 86, 100, 70, 80, 60],
        },
      ],
    };

    const dashOption = {
      title: {
        text: "折线图样例",
      },

      xAxis: {
        data: ["Mon", "Tus", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {},
      series: [
        {
          data: [50, 70, 86, 100, 70, 80, 60],
          type: "line",
          stack: "x",
        },
        {
          data: [30, 10, 96, 10, 110, 10, 50],
          type: "line",
          stack: "x",
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myDash.setOption(dashOption);
  }, [])

  return (
    <div
      style={{
        padding: "0",
        margin: "0",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Card
        style={{
          width: "40vw",
          height: "47vh",
          borderRadius: "15px",
          margin: "3%",
        }}
      >
        <div id="main"></div>
      </Card>
      <Card
        style={{
          width: "40vw",
          height: "47vh",
          borderRadius: "15px",
          marginTop: "3%",
        }}
      >
        <div id="dash"></div>
      </Card>
      <Card
        title={<div style={{ fontSize: "18px", fontWeight: "bold", color: "#4a4a4a" }}>公告</div>}
        style={{
          width: "82vw",
          height: "20vh",
          borderRadius: "15px",
          marginLeft: "3%"
          // marginTop: "3%",
        }}
      >
        <section className="smoke">
          <p className="text">
            In the beginning, God created heaven and earth. The earth was an
            empty and chaotic abyss. The spirit of God was running on the
            water. God said that there would be light, and then there would be
            light. When God saw that it was good, he separated the light from
            the dark.
          </p>
        </section>
      </Card>
    </div>
  );

}
