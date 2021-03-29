import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  message,
} from "antd";

import locale from "antd/lib/locale/en_GB";

import { addBatchAction } from "../../redux/actions/AdminActions";

const { Step } = Steps;
const { RangePicker } = DatePicker;

const CreateBatch = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const [programDetail] = useState([
    { label: "BSCS", value: 2 },
    { label: "BSSE", value: 3 },
    { label: "MCS", value: 4 },
  ]);
  const [batchinfo, setBatchinfo] = useState([]);
  const [current, setCurrent] = useState(0);

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const dispatch = useDispatch();

  const initInfoSubmit = (values) => {
    values["startingYr"] = values["term"][0].format("MMM-YYYY");
    values["endingYr"] = values["term"][1].format("MMM-YYYY");
    delete values["term"];

    setBatchinfo(values);
    setCurrent(current + 1);
  };

  const batchCreateSubmit = (values) => {
    const formData = new FormData();

    Object.entries(batchinfo).forEach(([key, value]) => {
      if (key != "noSection") formData.append(key, value);
    });

    try {
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value.file, value.file.name)
      );

      dispatch(addBatchAction(formData, setIsModalVisible));
    } catch {
      message.error("Please upload remaining student file(s)!", 1);
    }
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
            name="programId"
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
              options={programDetail}
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
              picker="month"
              format={"MM/YYYY"}
              locale={locale}
            />
          </Form.Item>
          <Form.Item
            name="name"
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
            <InputNumber min={1} precision={0} max={3} />
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
          {[...Array(batchinfo.noSection)].map((_, index) => (
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
                name={String.fromCharCode(65 + index)}
                valuePropName="name"
                rules={[
                  {
                    required: true,
                    message: "Please upload students list!",
                  },
                ]}
                style={{ position: "absolute", bottom: 0, textAlign: "center" }}
              >
                <Upload
                  maxCount={1}
                  accept=".xlsx, .xls"
                  beforeUpload={() => false}
                >
                  <Button type="primary">Click to upload</Button>
                </Upload>
              </Form.Item>
            </div>
          ))}
          <Form.Item wrapperCol={{ offset: 17 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
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
      afterClose={() => setDestroy(false)}
      bodyStyle={{ paddingTop: 50 }}
    >
      <Steps className="no-select" size="small" current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
    </Modal>
  );
};

export default CreateBatch;
