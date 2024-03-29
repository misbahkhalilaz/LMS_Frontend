import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Steps,
  Tabs,
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

const { TabPane } = Tabs;
const { Step } = Steps;

const CreateNotification = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [notificationType, setNotificationType] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [current, setCurrent] = useState(0);
  const [tabKey, setTabKey] = useState(1);

  const programList = useSelector((state) => state.adminReducer.programList);
  const tempList = useSelector((state) => state.adminReducer.batchList);
  const [batchList, setBatchList] = useState();
  const [initSubmitInfo, setInitSubmitInfo] = useState();

  useEffect(() => {
    let temp = [];
    for (const batchId in tempList)
      temp = temp.concat(tempList[batchId].Morning, tempList[batchId].Evening);
    setBatchList(temp);
  }, []);

  const initInfoSubmit = (values) => {
    console.log(values);
    setInitSubmitInfo(values);
    setCurrent(current + 1);
  };

  const createSubmit = (values) => {
    //CREATE ANNOUNCEMENT FINAL API info at initSubmitInfo,values
    //after successful call
    console.log(initSubmitInfo, values);
    setIsComplete(true);
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
          wrapperCol={{ span: 12 }}>
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <Radio.Group
              onChange={(e) => setNotificationType(e.target.value)}
              value={notificationType}
              size="small"
              buttonStyle="solid">
              <Space>
                <Radio.Button value={0}>Announcement</Radio.Button>
                <Radio.Button value={1}>Exam Schedule</Radio.Button>
                <Radio.Button value={2}>Admit Card</Radio.Button>
              </Space>
            </Radio.Group>
          </div>
          {notificationType == 0 && (
            <Tabs
              tabPosition="left"
              onChange={(key) => {
                setTabKey(key);
              }}>
              <TabPane tab="Shift" key="1">
                {tabKey == 1 && (
                  <Form.Item
                    name="shift"
                    label="Select Shift"
                    rules={[
                      {
                        required: true,
                        message: "Please select shift!",
                      },
                    ]}>
                    <Select
                      allowClear
                      options={[{ value: "Morning" }, { value: "Evening" }, { value: "Both" }]}
                      showSearch
                      filterOption={(input, option) =>
                        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }></Select>
                  </Form.Item>
                )}
              </TabPane>
              <TabPane tab="Program" key="2">
                {tabKey == 2 && (
                  <Form.Item
                    name="programId"
                    label="Select Program"
                    rules={[
                      {
                        required: true,
                        message: "Please select program!",
                      },
                    ]}>
                    <Select
                      allowClear
                      showSearch
                      options={programList}
                      filterOption={(input, option) =>
                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    />
                  </Form.Item>
                )}
              </TabPane>
              <TabPane tab="Batch" key="3">
                {tabKey == 3 && (
                  <Form.Item
                    name="batchId"
                    label="Select Batch"
                    rules={[
                      {
                        required: true,
                        message: "Please select batch!",
                      },
                    ]}>
                    <Select
                      showSearch
                      options={batchList}
                      filterOption={(input, option) =>
                        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    />
                  </Form.Item>
                )}
              </TabPane>
              <TabPane tab="Department" key="4">
                {tabKey == 4 && (
                  <Form.Item name="department" initialValue={true}>
                    <div />
                  </Form.Item>
                )}
              </TabPane>
            </Tabs>
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
                ]}>
                <Select
                  allowClear
                  options={[{ value: "Morning" }, { value: "Evening" }, { value: "Both" }]}
                  showSearch
                  filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }></Select>
              </Form.Item>
              <Form.Item
                name="program"
                label="Program"
                rules={[
                  {
                    required: true,
                    message: "Please select a program!",
                  },
                ]}>
                <Select
                  allowClear
                  mode="multiple"
                  options={programList}
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }></Select>
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
          wrapperCol={{ span: 12 }}>
          <Form.Item
            name="title"
            label="Title"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter the title!",
              },
            ]}>
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
            ]}>
            <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
          </Form.Item>
          <Form.Item name="files" valuePropName="name" label="Files">
            <Upload multiple beforeUpload={() => false}>
              <Button type="primary" icon={<UploadOutlined />}>
                upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ xs: { offset: 19 }, lg: { offset: 20 } }}>
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
      bodyStyle={{ paddingTop: 50 }}>
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
