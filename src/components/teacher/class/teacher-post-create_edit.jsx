import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Modal, Radio, Form, Input, Upload, InputNumber, DatePicker, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import locale from "antd/lib/locale/en_GB";

import { addPost } from "../../../redux/actions/TeacherActions";

const { TextArea } = Input;

const CreateEditPost = ({ setDestroy, action, type = true, prevValues }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isAssignment, setIsAssignment] = useState();
  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const classId = useSelector((state) => state.teacherReducer.selectedClassId);
  const dispatch = useDispatch();

  useEffect(() => setIsAssignment(type), []);

  const postSubmit = (values) => {
    const formData = new FormData();
    formData.append("classId", classId);
    formData.append("isAssignment", isAssignment);

    Object.entries(values).forEach(([key, value]) => {
      if (key != "files" && key != "deadline") formData.append(key, value);
      if (key === "deadline") formData.append(key, value.toISOString());
    });

    if (values.files)
      values.files.fileList.map((file) => formData.append("files", file.originFileObj, file.name));

    if (action === "Create") dispatch(addPost(formData, setIsModalVisible));
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
      bodyStyle={{ padding: 40 }}>
      {action == "Create" && (
        <div className="center" style={{ marginBottom: 20 }}>
          <Radio.Group
            onChange={() => setIsAssignment((prev) => !prev)}
            value={isAssignment}
            defaultValue={isAssignment}
            buttonStyle="solid">
            <Radio.Button value={true}>Assignment</Radio.Button>
            <Radio.Button value={false}>Material</Radio.Button>
          </Radio.Group>
        </div>
      )}
      <Form
        initialValues={prevValues}
        colon={false}
        preserve={false}
        requiredMark={false}
        onFinish={postSubmit}
        labelCol={{ span: 4 }}>
        <Form.Item
          name="title"
          label="Title"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter the title for post!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              max: 500,
              whitespace: true,
              message: "Max text length exceeded.",
            },
          ]}>
          <TextArea allowClear autoSize={{ minRows: 4, maxRows: 4 }} showCount maxLength={500} />
        </Form.Item>
        <Form.Item name="files" label="Files" valuePropName="name">
          <Upload
            multiple
            maxCount={5}
            accept="image/*, .doc, .docx, .ppt, .pptx, .txt, .pdf"
            beforeUpload={() => false}>
            <Button type="primary" icon={<UploadOutlined />}>
              Click to upload (Max: 5)
            </Button>
          </Upload>
        </Form.Item>
        {isAssignment && (
          <Form.Item
            name="totalMarks"
            label="Grade Points"
            rules={[
              {
                required: true,
                message: "Please enter grade points!",
              },
            ]}>
            <InputNumber type="number" min={0} />
          </Form.Item>
        )}
        {isAssignment && (
          <Form.Item
            name="deadline"
            label="Due Date"
            rules={[
              {
                required: true,
                message: "Please enter assignment due date!",
              },
            ]}>
            <DatePicker placeholder="" inputReadOnly={true} format={"DD/MM/YYYY"} locale={locale} />
          </Form.Item>
        )}
        <Form.Item name="allowComments" label="Comments" valuePropName="checked">
          <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {action}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEditPost;
