import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { Card } from "antd";
import axios from "axios";
import "./index.scss";

export default function Chart(props) {
  const [X, setX] = useState([]);
  const [Y, setY] = useState([]);
  const update = props.updateData;
  useEffect(() => {
    axios.get("http://localhost:80/api/getRevenue").then((res) => {
      const needParams = res.data.data;
      let needList = [];
      let monNums = 0;
      let tueNum = 0;
      let wedNums = 0;
      let thuNums = 0;
      let friNums = 0;
      let satNums = 0;
      let sunNums = 0
      needParams.forEach((item) => {
        if (item.date === 'Mon') {
          monNums += item.amount
        }
        if (item.date === 'Tue') {
          tueNum += item.amount
        }
        if (item.date === 'Wed') {
          wedNums += item.amount
        }
        if (item.date === 'Thu') {
          thuNums += item.amount
        }
        if (item.date === 'Fri') {
          friNums += item.amount
        }
        if (item.date === 'Sat') {
          satNums += item.amount
        }
        if (item.date === 'Sun') {
          sunNums += item.amount
        }
      })

      needList.push({ date: 'Mon', amount: monNums },
        { date: 'Tue', amount: tueNum },
        { date: 'Wed', amount: wedNums },
        { date: 'Thu', amount: thuNums },
        { date: 'Fri', amount: friNums },
        { date: 'Sat', amount: satNums },
        { date: 'Sun', amount: sunNums }
      )
       
      const x = [];
      const y = [];
      needList.map((item) => {
        x.push(item.date);
        y.push(item.amount);
        setX(x);
        setY(y)
      });
    });
  }, [update]);

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById("main"), null, {
      width: 550,
      height: 300,
    });
    const myDash = echarts.init(document.getElementById("dash"), null, {
      width: 550,
      height: 300,
    });

    window.onresize = function () {
      myChart.resize();
    };

    // 指定图表的配置项和数据
    const option = {
      color: ["#e2c12a"],

      title: {
        text: "柱状图",
      },
      tooltip: {},
      legend: {
        data: ["sales volume"],
      },
      xAxis: {
        data: [...X],
      },
      yAxis: {},
      series: [
        {
          name: "Revenue",
          type: "bar",
          data: [...Y],
        },
      ],
    };

    const dashOption = {
      title: {
        text: "折线图",
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
  }, [X]);

  return (
    <div
      style={{
        // paddingLeft:"1%",
        // padding: "0",
        // margin: "0",
        marginTop: "1%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: 'center'

      }}
    >
      <Card
        style={{
          width: "45%",
          height: "45vh",
          borderRadius: "15px",
          marginRight: "1%"
          //   marginTop: "3%",
          //   marginLeft: "2vw",
          //   marginRight: "5%",
        }}
      >
        <div id="main"></div>
      </Card>
      <Card
        style={{
          width: "45%",
          height: "45vh",
          borderRadius: "15px",
          //   marginTop: "3%",
        }}
      >
        <div id="dash"></div>
      </Card>
    </div>
  );
}
