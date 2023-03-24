import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, message,Select } from "antd";
import axios from "axios";

const {Option} = Select
const { TextArea } = Input;
const EditForm = (props) => {
  const id = props.id;
  const update = props.updateData;
  const addSubmit = () => {
    props.form.validateFields().then((value) => {
      axios
        .put("http://localhost:80/api/putRevenue", { ...value, id })
        .then((res) => {
          if (res.data.status === 0) {
            message.success(res.data.msg);
            props.editCanel();
            props.updateDataFun(!update);
          } else {
            message.error("unknown error");
          }
        });
    });
  };

  return (
    <Modal
      title="编辑"
      visible={props.editRe}
      onOk={addSubmit}
      onCancel={() => props.editCanel()}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} form={props.form}>
        <Form.Item
          label="姓名"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入姓名!",
            },
          ]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="来源"
          name="source"
          rules={[
            {
              required: true,
              message: "请输入来源!",
            },
          ]}
        >
          <Input placeholder="请输入来源" />
        </Form.Item>
        <Form.Item
          label="价格"
          name="amount"
          rules={[
            {
              required: true,
              message: "请输入价格!",
            },
          ]}
        >
          <InputNumber
            placeholder="请输入价格"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="日期"
          name="date"
          rules={[
            {
              required: true,
              message: "请选择日期!",
            },
          ]}
        >
          <Select placeholder="请选择日期">
            <Option key="Mon" value="Mon">
              星期一
            </Option>
            <Option key="Tue" value="Tue">
              星期二
            </Option>
            <Option key="Wed" value="Wed">
              星期三
            </Option>
            <Option key="Thu" value="Thu">
              星期四
            </Option>
            <Option key="Fri" value="Fri">
              星期五
            </Option>
            <Option key="Sat" value="Sat">
              星期六
            </Option>
            <Option key="Sun" value="Sun">
              星期日
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="备注"
          name="remark"
        >
          <TextArea placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
