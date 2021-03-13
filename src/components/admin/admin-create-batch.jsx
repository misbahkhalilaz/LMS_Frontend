import { useState } from "react";
import {
  Modal,
  Steps,
  Button,
  Radio,
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
  Typography,
  Upload,
} from "antd";
import locale from "antd/lib/locale/en_GB";

const { Step } = Steps;
const { RangePicker } = DatePicker;

const CreateClass = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [current, setCurrent] = useState(0);

  const [initSubmitInfo, setInitSubmitInfo] = useState([]);

  const initInfoSubmit = (values) => {
    setInitSubmitInfo(values);

    setCurrent(current + 1);
  };

  const batchCreateSubmit = (values) => {
    //CREATE BATCH FINAL API info at initSubmitInfo,values
    console.log(initSubmitInfo, values);
    //after successful call
    setIsComplete(true);
  };

  const steps = [
    {
      title: "Create Batch",
      content: (
        <Form
          colon={false}
          requiredMark={false}
          onFinish={initInfoSubmit}
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item
            name="shift"
            label="Shift"
            rules={[
              {
                required: true,
                message: "Please select shift!",
              },
            ]}
          >
            <Radio.Group options={["Morning", "Evening"]} />
          </Form.Item>
          <Form.Item
            name="program"
            label="Program"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select program!",
              },
            ]}
          >
            <Select
              showSearch
              options={[{ value: "BSCS" }, { value: "BSSE" }, { value: "MCS" }]}
              filterOption={(input, option) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Form.Item>
          <Form.Item
            name="term"
            label="Academic Term"
            rules={[
              {
                required: true,
                message: "Please select academic term period!",
              },
            ]}
          >
            <RangePicker
              inputReadOnly={true}
              format={"DD/MM/YYYY"}
              locale={locale}
            />
          </Form.Item>
          <Form.Item
            name="batch"
            label="Batch Name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter batch name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="noSection"
            label="Number of Section"
            rules={[
              {
                required: true,
                message: "Please select shift!",
              },
            ]}
          >
            <InputNumber min={1} precision={0} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Upload student file",
      content: (
        <Form layout="inline" requiredMark={false} onFinish={batchCreateSubmit}>
          {[...Array(initSubmitInfo.noSection)].map((sect, index) => (
            <div
              key={index}
              className="mainarea-bg"
              style={{
                width: 139,
                height: 150,
                margin: 20,
                position: "relative",
                textAlign: "center",
              }}
            >
              <Typography.Title level={5}>
                Section - {String.fromCharCode(65 + index)} Student List
              </Typography.Title>
              <Form.Item
                name={`Sect ${String.fromCharCode(65 + index)}`}
                rules={[
                  {
                    required: true,
                    message: "Please upload student list!",
                  },
                ]}
                style={{ position: "absolute", bottom: 0, textAlign: "center" }}
              >
                <Upload>
                  <Button type="primary">Click to upload</Button>
                </Upload>
              </Form.Item>
            </div>
          ))}
          <Form.Item wrapperCol={{ offset: 17 }}>
            <Button type="primary" htmlType="submit">
              Create Batch
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
          <div>{steps[current].content}</div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Typography.Title className="no-select subtitle-text" level={4}>
            Batch Successfully Created
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

export default CreateClass;
