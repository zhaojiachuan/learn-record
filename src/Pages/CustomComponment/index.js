import { Card } from "antd";
import React from "react";
import ZButton from "../components/ZButton";
import ZCard from "../components/ZCard"
export default function CustomComponment() {
  return (
    <>
      <Card title="自定义按钮">
        <div style={{display:'flex', flexDirection:'row'}}>
          <ZButton  type="create">新建</ZButton>
          <ZButton   type="edit">编辑</ZButton>
          <ZButton   type="delete">删除</ZButton>
          <ZButton >自定义按钮</ZButton>
        </div>
      </Card>
      <Card title="自定义卡片" >
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
        <div >
            <ZCard title='基础卡片' >基础卡片</ZCard>
        </div>
        <div  >
            <ZCard borderRadius='30px' title='自定义卡片' borderColor='red' >自定义卡片</ZCard>
        </div>
        <div  >
            <ZCard borderRadius='50px' title='自定义卡片' borderColor='#349800' width='15vw' >自定义卡片</ZCard>
        </div>
        </div>
      </Card>

    </>
  );
}
