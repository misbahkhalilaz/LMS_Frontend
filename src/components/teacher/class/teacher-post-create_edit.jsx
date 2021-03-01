import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Radio,
  Form,
  Input,
  Upload,
  InputNumber,
  DatePicker,
  Switch,
  message,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

import locale from "antd/lib/locale/en_GB";

const { TextArea } = Input;

const CreateEditPost = ({ setDestroy, action, type = true, prevValues }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [postType, setPostType] = useState();

  useEffect(() => setPostType(type), []);

  const postSubmit = (values) => {
    message.success(`Post ${action}d!`, [1.8], () => {
      console.log(values);
      message.destroy();
      setIsModalVisible(false);
    });
  };

  const handleDestroy = () => {
    setDestroy();
  };

  return (
    <Modal
      centered
      footer={null}
      width={800}
      destroyOnClose
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      afterClose={handleDestroy}
      bodyStyle={{ padding: 40 }}
    >
      {action == "Create" && (
        <div className="center" style={{ marginBottom: 20 }}>
          <Radio.Group
            onChange={() => setPostType(!postType)}
            value={postType}
            defaultValue={postType}
            buttonStyle="solid"
          >
            <Radio.Button value={true}>Assignment</Radio.Button>
            <Radio.Button value={false}>Material</Radio.Button>
          </Radio.Group>
        </div>
      )}
      <Form
        initialValues={prevValues}
        colon={false}
        preserve={false}
        scrollToFirstError={true}
        onFinish={postSubmit}
        labelCol={{ span: 4 }}
      >
        <Form.Item
          name="title"
          label="Title"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter the title for post!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea
            allowClear
            autoSize={{ minRows: 4, maxRows: 4 }}
            showCount
            maxLength={300}
          />
        </Form.Item>
        <Form.Item
          name="files"
          label="Files"
          valuePropName="fileList"
          // getValueFromEvent={normFile}
        >
          <Upload listType="text">
            <Button type="primary" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </Form.Item>
        {postType && (
          <Form.Item
            name="gradePoints"
            label="Grade Points"
            rules={[
              {
                required: true,
                message: "Please enter grade points!",
              },
            ]}
          >
            <InputNumber type="number" min={0} />
          </Form.Item>
        )}
        {postType && (
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[
              {
                required: true,
                message: "Please enter assignment due date!",
              },
            ]}
          >
            <DatePicker
              placeholder=""
              inputReadOnly={true}
              format={"DD/MM/YYYY"}
              locale={locale}
            />
          </Form.Item>
        )}
        <Form.Item name="comments" label="Comments" valuePropName="checked">
          <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
          <Button type="primary" htmlType="submit">
            {action}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEditPost;
