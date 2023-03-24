import React, { useState, useEffect, useRef } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  List, Card, message, Button
} from "antd";
import axios from "axios";
import * as echarts from "echarts";
import "./dashboard.scss";
import NumberMarker from "react-bmap/lib/overlay/NumberMarker";


let needList = []
let provinceList = []
let chartList = []

export default function Demo(props) {
  const dataRef = useRef()
  const [renderData, setRenderData] = useState([])
  const [prov, setProv] = useState('')
  const [city, setCity] = useState('')
  const [needData, setNeedData] = useState([])

  useEffect(() => {
    dataRef.current = renderData
  }, [renderData])

  const initChart = () => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: chartList ? chartList : []
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }



  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    initChart()
  })


  useEffect(() => {
    // React脚手架中全局变量都要用window去访问
    //const BMap = window.BMap 这样写也可以
    if(window.BMap){
      const { BMap } = window
      // 初始化地图实例
      const map = new BMap.Map("container")
      // 设置中心点
      const point = new BMap.Point(105.35, 35.3);
      // 地图初始化，同时设置地图展示级别
      map.centerAndZoom(point, 5);
      map.enableScrollWheelZoom();
      let geocoder = new BMap.Geocoder();
  
      // 获取当前的位置
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          const pointBak = new BMap.Point(lng, lat);
          const convertor = new BMap.Convertor();
          convertor.translate([pointBak], 1, 5, function (resPoint) {
            if (resPoint && resPoint.points && resPoint.points.length > 0) {
              lng = resPoint.points[0].lng;
              lat = resPoint.points[0].lat;
            }
            const point = new BMap.Point(lng, lat);
            const geo = new BMap.Geocoder();
            geo.getLocation(point, (res) => {
              console.log(res);
            });
          });
        }, (err) => {
          console.log(err, '无法获取当前位置111');
        });
      } else (
        console.log('无法获取当前位置')
      )
  
      map.addEventListener("click", function (e) { //给地图添加点击事件
        geocoder.getLocation(e.point, function (rs) {
          setProv(rs.addressComponents.province)
          setCity(rs.addressComponents.city)
          const list = needData.map(item => item.city)
          if (needData.length > 13) {
            message.error("路径超过最大限度");
          } else {
            if (list.indexOf(rs.addressComponents.city) === -1) {
              axios
                .post("http://localhost:80/api/postLocation", { province: rs.addressComponents.province, city: rs.addressComponents.city })
                .then((res) => {
                  if (res.data.status === 0) {
                    getData()
                  } else {
                    message.error("unknown error");
                  }
                });
            } else {
              message.warn('当前城市已存在，请勿重复选择！')
              return;
            }
          }
  
        });
      });
    }else{
      message.error('请连接网络')
    }

    const back = document.getElementById("back")
    back.addEventListener("click", () => {
      props.history.push('/index')
    })
  }, [needData])

  const getData = () => {
    axios.get("http://localhost:80/api/getLocation").then((res) => {
      setNeedData(res.data.data);
      needList = res.data.data;
    });
  }

  const matchLocation = () => {
    needList.forEach((item) => {
      provinceList.push(item.province)
    })
    findMost(provinceList)
  }

  const findMost = (arr) => {
    Array.prototype.indexOf = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    };
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    let numbers = {}
    let maxNumbers = []
    let maxNum = 0
    for (let i = 0, len = arr.length; i < len; i++) {
      if (!numbers[arr[i]]) {
        numbers[arr[i]] = 1
      } else {
        numbers[arr[i]]++
      }
      if (numbers[arr[i]] > maxNum) {
        maxNum = numbers[arr[i]]
      }
    }
    for (let item in numbers) {
      if (numbers[item] === maxNum) {
        maxNumbers.push(item)
      }
    }
    chartList.push({ value: maxNum, name: maxNumbers[0] })
    for (let i = 0; i < maxNum; i++) {
      arr.remove(maxNumbers[0])
    }
    if (chartList.length < 6) {
      findMost(arr)
    } else {
      return
    }
    setRenderData(chartList)
  }


  const renderList = (data) => {
    return (
      data.map((item) => {
        return (
          <div className="culture">
            <div style={{ fontWeight: "bolder", color: "#817fbd", fontSize: "20px" }}>
              {item.value}次
            </div>
            <div>
              {item.name}
            </div>
          </div>
        )
      })
    )
  }

  const renderNeedList = (data) => {
    return (
      <div
      // className="culture2"
      >
        <List
          size="small"
          bordered
          dataSource={data}
          locale='暂无数据'
          renderItem={item =>
            <List.Item >
              <div style={{ fontWeight: "bolder", color: "#817fbd", fontSize: "16px" }}>
                {item.province}
              </div>
              <div style={{ fontWeight: "bolder", fontSize: "16px", marginLeft: "1%" }}>
                {item.city}
              </div>
            </List.Item>}
        />
      </div>
    )
  }

  const deleteLocation = (e) => {
    chartList = []
    axios
      .delete(`http://localhost:80/api/deleteLocation`)
      .then((res) => {
        if (res.data.status === 0) {
          message.success('清除成功');
          getData()
        } else {
          message.error("unknown error");
        }
      });
  }

  return (
    <div className="body">
      <div className="head">
        <div className="head1">
          <span id='back'> 返回主页</span>
        </div>
        <div className="head1">
          当前位置：{prov === '' ? `尚未选择` : `${prov} / ${city}`} 
        </div>
        <div className="head2">
          路径监察看板
        </div>
        <div className="head3">
          2022-11-17
          星期四
        </div>
      </div>
      <div className="contain">
        <div className="contain1">
          <div className="child1">
            <div className="childTitle1">
              路径数据统计
            </div>
            <div className="childbody1">
              <div className="childcontain1">
                市场概况
              </div>
              <div className="childcontain2">
                {renderList(chartList)}
              </div>
            </div>
            <div className="childbody2">
              <div className="childcontain3">
                场所类型
              </div>

              <div id="main" className="pie">
              </div>

            </div>
          </div>

        </div>
        <div className="contain2">
          <div style={{ textAlign: "center", height: "5vh", fontSize: '1rem', lineHeight: '5vh', fontWeight: 'bolder', backgroundColor: '#a5a2a2', borderLeft: '1px solid #a5a2a2', borderRight: '1px solid #a5a2a2' }}>
            当前位置地图
          </div>
          <div id='container' style={{ width: '54vw', height: '82vh', paddingLeft: "20%" }}>
          </div>
        </div>
        <div className="contain3">
          <div className="child3">
            <div className="childTitle1">
              路径监察数据
            </div>
            <div className="childcontainer3">
              {renderNeedList(needData)}
            </div>
            <Button type="" style={{ width: '10vw' }} onClick={deleteLocation}>清除路径</Button>
            <Button type="primary" style={{ width: '10vw', marginLeft: "1vw" }} onClick={matchLocation}>路径统计</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
