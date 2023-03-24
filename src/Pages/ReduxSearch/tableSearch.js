import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Select, Card, Input, Button, Col, Row } from "antd";



export default function Index() {
  const dispatch = useDispatch();
  const [name, searchName] = useState("");
  const handleName = (e) => {
    searchName(e.target.value);
  };

  const handleSearch = (e) => {
    e && e.preventDefault && e.preventDefault();
    // this.doPageSearch();
    const action = {
      type: "searchName",
      value: name,
    };
    dispatch(action);
  };

  const handleReset = () => {
    axios.get("http://localhost:80/api/getRevenue").then((res) => {
      const data = res.data.data;
      const action = {
        type: "getItem",
        value: data,
      };
      dispatch(action);
      searchName('');
    });
  };

  return (
    <div>
      <Card title="查询条件" style={{ width: "96%", margin: "2%" }}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} style={{ lineHeight: "0px" }}>
            <Input onChange={(e) => handleName(e)} addonBefore="姓名"  placeholder="请输入姓名" value={name}/>
          </Col>
          <Col md={8} style={{ lineHeight: "0px" }}/>
    

          <Col md={8} style={{ paddingLeft: "20%"}}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleSearch()}
            >
              查询
            </Button>
            <Button onClick={() => handleReset()} style={{marginLeft: "3%"}}>重置</Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
