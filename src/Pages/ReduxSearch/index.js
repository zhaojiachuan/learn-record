import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tooltip, Card, Input, Button, Col, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import LifeSearch from './tableSearch'

export default function Index(props) {
  useEffect(() => {
    axios.get("http://localhost:80/api/getRevenue").then((res) => {
      const data = res.data.data;
      const action = {
        type: "getItem",
        value: data,
      };
      dispatch(action);
    });
  }, []);
  const dispatch = useDispatch();
  const storeData1 = useSelector((state) => {
    return state.list;
  });
  console.log(storeData1);

  const columns = [
    // {
    //   title: "key",
    //   dataIndex: "Id",
    // },
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "来源",
      dataIndex: "source",
    },
    {
      title: "价格",
      dataIndex: "amount",
      render: (record) => {
        return <div>{record}￥</div>;
      },
    },
    {
      title: "日期",
      dataIndex: "date",
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
  ];

  return (
    <div>
     <LifeSearch/>
      <Card
       title='表格数据'
       style={{ width: "96%", margin: "2%" }}
      >
        <Table columns={columns} dataSource={storeData1} />
      </Card>
    </div>
  );
}
