import { useState } from "react";
import {
  Modal,
  Steps,
  Button,
  Radio,
  Space,
  Form,
  Select,
  Input,
  Upload,
  Typography,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
const { Step } = Steps;

const CreateNotification = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [notificationType, setNotificationType] = useState();
  const [isComplete, setIsComplete] = useState(false);
  const [current, setCurrent] = useState(0);

  const [initSubmitInfo, setInitSubmitInfo] = useState();

  const initInfoSubmit = (values) => {
    setInitSubmitInfo(values);
    setCurrent(current + 1);
  };

  const createSubmit = (values) => {
    //CREATE ANNOUNCEMENT FINAL API info at initSubmitInfo,values
    //after successful call
    console.log(initSubmitInfo, values);
    setIsComplete(true);
  };

  const radioStyle = {
    display: "block",
    height: "50px",
    lineHeight: "30px",
  };

  const steps = [
    {
      title: "Initial Info",
      content: (
        <Form
          colon={false}
          requiredMark={false}
          preserve={false}
          onFinish={initInfoSubmit}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
        >
          <div className="center" style={{ marginBottom: 20 }}>
            <Radio.Group
              onChange={(e) => setNotificationType(e.target.value)}
              value={notificationType}
              buttonStyle="solid"
            >
              <Space>
                <Radio.Button value={0}>Announcement</Radio.Button>
                <Radio.Button value={1}>Exam Schedule</Radio.Button>
                <Radio.Button value={2}>Admit Card</Radio.Button>
              </Space>
            </Radio.Group>
          </div>
          {notificationType == 0 && (
            <>
              <Form.Item
                name="Shift"
                label="Shift"
                rules={[
                  {
                    required: true,
                    message: "Please select shift!",
                  },
                ]}
              >
                <Select
                  allowClear
                  options={[
                    { value: "Morning" },
                    { value: "Evening" },
                    { value: "Both" },
                  ]}
                  showSearch
                  filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
              </Form.Item>
              <Form.Item
                name="program"
                label="Program"
                rules={[
                  {
                    required: true,
                    message: "Please select program!",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  options={[
                    { value: "BSCS" },
                    { value: "BSSE" },
                    { value: "MCS" },
                  ]}
                  filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </Form.Item>
              <Form.Item
                name="batch"
                label="Batch"
                rules={[
                  {
                    required: true,
                    message: "Please select batch!",
                  },
                ]}
              >
                <Select
                  showSearch
                  options={[
                    { value: "B17" },
                    { value: "MSC17" },
                    { value: "BSSE17" },
                  ]}
                  filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </Form.Item>
              <Form.Item name="depart" label="Universal">
                <Radio style={radioStyle}></Radio>
              </Form.Item>
            </>
          )}
          {(notificationType == 1 || notificationType == 2) && (
            <>
              <Form.Item
                name="Shift"
                label="Shift"
                rules={[
                  {
                    required: true,
                    message: "Please select shift!",
                  },
                ]}
              >
                <Select
                  allowClear
                  options={[
                    { value: "Morning" },
                    { value: "Evening" },
                    { value: "Both" },
                  ]}
                  showSearch
                  filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
              </Form.Item>
              <Form.Item
                name="program"
                label="Program"
                rules={[
                  {
                    required: true,
                    message: "Please select program!",
                  },
                ]}
              >
                <Select
                  allowClear
                  mode="multiple"
                  options={[
                    { value: "BSCS" },
                    { value: "BSSE" },
                    { value: "MCS" },
                  ]}
                  showSearch
                  filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
              </Form.Item>
            </>
          )}
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Create Notification",
      content: (
        <Form
          colon={false}
          requiredMark={false}
          onFinish={createSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item
            name="title"
            label="Title"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter the title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Announcement"
            rules={[
              {
                required: true,
                message: "Please enter the Announcement!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="files" label="Files">
            <Upload>
              <Button type="primary" icon={<UploadOutlined />}>
                upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit">
              Publish
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      centered
      footer={null}
      width={600}
      destroyOnClose
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      afterClose={() => setDestroy()}
      bodyStyle={{ paddingTop: 50 }}
    >
      {!isComplete ? (
        <>
          <Steps className="no-select" size="small" current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div style={{ marginTop: 20 }}>{steps[current].content}</div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Typography.Title className="no-select subtitle-text" level={4}>
            Notification Successfully Published
          </Typography.Title>
          <br />
          <Button type="primary" onClick={() => setIsModalVisible(false)}>
            OK
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default CreateNotification;
