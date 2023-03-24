import React, { useState, useEffect, useRef } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Modal,
  Table,
  message,
  Tooltip,
  Divider,
  Form,
} from "antd";
import ComeAddModal from "./ComeAddModal";
import ComeEditModal from "./ComeEditModal";
import axios from "axios";
import Chart from "./Charts";

export default function Index(props) {
  const [addRe, setAddRe] = useState(false);
  const [editRe, setEditRe] = useState(false);
  const [data, setData] = useState("");
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [updateData, setUpdateData] = useState(true);
  const [editData, setEditData] = useState("");
  const [deleteRe, setDeleteRe] = useState("");
  const [deleteModal,setDeleteModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:80/api/getRevenue").then((res) => {
      setData(res.data.data);
    });
  }, [updateData]);

  const addSubmit = () => {
    formRef.current.validateFields().then((value) => {
      axios
        .post("http://localhost:80/api/postRevenue", { ...value })
        .then((res) => {
          if (res.data.status === 0) {
            setAddRe(false);
            setUpdateData(!updateData);
            message.success(res.data.msg);
          } else {
            message.error("unknown error");
          }
        });
    });
  };

  const addCanel = () => {
    setAddRe(false);
  };

  const editCanel = () => {
    setEditRe(false);
  };

  const handleColClick = (record) => {
    console.log(record)
  }

  function deleteFunc() {
    axios
      .delete(`http://localhost:80/api/deleteRevenue/${deleteRe}`)
      .then((res) => {
        if (res.data.status === 0) {
          setUpdateData(!updateData);
          setDeleteModal(false)
          message.success(res.data.msg);
        } else {
          message.error("unknown error");
        }
      });
  }



  const columns = [
    // {
    //   title:"id",
    //   dataIndex: "id",
    // },
    {
      title: "名称",
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
    {
      title: "更多操作",
      // width: "15%",
      align: "center",
      render: (record) => (
        <div>
          <Tooltip
            title="编辑"
            onClick={() => {
              form.setFieldsValue(record);
              setEditData(record.id);
              setEditRe(true);
            }}
          >
            <EditOutlined style={{ color: "green" }} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip
            title="删除"
            onClick={() => {
               
              setDeleteRe(record.id);
              setDeleteModal(true)
            }}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Chart   updateData={updateData}/>
      <Card
        style={{ width: "96%", marginTop: "1%" , marginLeft: "2%"}}
        title="表单数据"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setAddRe(true);
              formRef.current.resetFields();
            }}
          >
            新建
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={data} 
          onRow={ record => { 
            return { onDoubleClick: () => handleColClick(record) };
        }}
        />
      </Card>
      <Modal
        title="新建"
        visible={addRe}
        okText='确定'
        cancelText='取消'
        onOk={addSubmit}
        onCancel={addCanel}
      >
        <ComeAddModal ref={formRef} />
      </Modal>
      <ComeEditModal
        form={form}
        editCanel={editCanel}
        editRe={editRe}
        id={editData}
        updateDataFun={setUpdateData}
        updateData={updateData}
      />
      <Modal
        title="删除"
        visible={deleteModal}
        okText='确定'
        cancelText='取消'
        onOk={deleteFunc}
        onCancel={()=>{
          setDeleteModal(false)
        }}
      >
       确定删除吗？
      </Modal>
    </div>
  );
}
