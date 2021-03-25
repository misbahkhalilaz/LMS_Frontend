import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Input, Typography, message } from "antd";

import { addTeacherAction } from "../../redux/actions/AdminActions";

const CreateTeacherProfile = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const isLoading = useSelector((state) => state.generalReducer.isLoading);
  const dispatch = useDispatch();

  const postSubmit = (values) =>
    dispatch(addTeacherAction(values, message, setIsModalVisible));

  return (
    <Modal
      title={
        <Typography.Title className="center no-select subtitle-text" level={4}>
          Create Teacher Profile
        </Typography.Title>
      }
      centered
      width={600}
      destroyOnClose
      footer={null}
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      afterClose={() => setDestroy()}
    >
      <Form
        colon={false}
        requiredMark={false}
        onFinish={postSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          name="userId"
          label="Login ID"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter login id!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Teacher Name"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter teacher name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_no"
          label="Phone Number"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter phone number!",
            },
            {
              pattern: new RegExp(
                "^(\\+92)-{0,1}\\d{3}-{0,1}\\d{7}$|^\\d{11}$|^\\d{4}-\\d{7}$"
              ),
              message: "Please enter phone number in valid format!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email Address"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter email!",
            },
            {
              message: "Please enter email in valid format!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTeacherProfile;
