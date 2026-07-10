import React from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Card,
  Space,
  Typography,
  Button,
  Tag,
  Avatar,
  TimePicker,
} from "antd";
import {
  ArrowLeftOutlined,
  SaveOutlined,
  CalendarOutlined,
  FieldNumberOutlined,
  ClockCircleOutlined,
  ToolOutlined,
  UserOutlined,
  FileTextOutlined,
  CheckOutlined,
  ColumnHeightOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./PileDataEntryForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";


const { Title, Text } = Typography;

/**
 * PileDataEntryForm
 * Mobile-first (390px) construction pile data entry screen, built with Ant Design v5.
 */
const PileDataEntryForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { state } = useLocation();
  console.log("state", state);
  const handleFinish = (values) => {
    // eslint-disable-next-line no-console
    console.log("Form values:", values);
  };

  return (
    <div className="pile-form-page">
      {/* ===== Sticky Header ===== */}
      <header className="pile-form-header">
        <button
          type="button"
          className="pile-form-header__back"
          aria-label="Quay lại"
          onClick={() =>  navigate("/")}
        >
          <ArrowLeftOutlined />
        </button>

        <div className="pile-form-header__titles">
          <Title level={5} className="pile-form-header__title">
            Nhập liệu thi công cọc
          </Title>
          <Text type="secondary" className="pile-form-header__subtitle">
            Quản lý dữ liệu thi công cọc
          </Text>
        </div>

        <button
          type="button"
          className="pile-form-header__save"
          aria-label="Lưu"
        >
          <SaveOutlined />
        </button>
      </header>

      {/* ===== Scrollable content ===== */}
      <main className="pile-form-content">
        {/* Info Card */}
        <Card className="pile-form-card pile-info-card" bordered={false}>
          <div className="pile-info-card__row">
            <div className="pile-info-card__left">
              <Avatar
                size={56}
                icon={<ToolOutlined />}
                className="pile-info-card__avatar"
              />
              <div className="pile-info-card__main">
                <Text className="pile-info-card__label">Mã tim cọc</Text>
                <Space size={8} align="center" className="pile-info-card__code-row">
                  <Text className="pile-info-card__code">{state?.row?.[3]}</Text>
                  <Tag color="success" className="pile-info-card__badge">
                    Mới
                  </Tag>
                </Space>
                <Text type="secondary" className="pile-info-card__project">
                  Dự án: Dự án A
                </Text>
              </div>
            </div>

            <div className="pile-info-card__right">
              <div className="pile-info-card__meta-item">
                <CalendarOutlined className="pile-info-card__meta-icon" />
                <div>
                  <Text type="secondary" className="pile-info-card__meta-label">
                    Ngày tạo
                  </Text>
                  <div className="pile-info-card__meta-value">
                    {state?.row?.[5] ? dayjs(state?.row[5]).format("DD/MM/YYYY") : "Chưa có"}
                  </div>
                </div>
              </div>

              <div className="pile-info-card__meta-item">
                <UserOutlined className="pile-info-card__meta-icon" />
                <div>
                  <Text type="secondary" className="pile-info-card__meta-label">
                    Người tạo
                  </Text>
                  <div className="pile-info-card__meta-value">
                    -------
                  </div>
                </div>
              </div>

              <div className="pile-info-card__meta-item">
                <FileTextOutlined className="pile-info-card__meta-icon" />
                <div>
                  <Text type="secondary" className="pile-info-card__meta-label">
                    Ghi chú
                  </Text>
                  <div className="pile-info-card__meta-value">
                    Chưa có ghi chú
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Form
          form={form}
          layout="vertical"
          className="pile-form"
          onFinish={handleFinish}
        >
          {/* Section 1: Thông tin chung */}
          <Card className="pile-form-card" bordered={false}>
            <div className="pile-section-title">
              <span className="pile-section-title__bar" />
              <Title level={5} className="pile-section-title__text">
                1. Thông tin chung
              </Title>
            </div>

            <Form.Item
              label="Pile No."
              name="pileNo"
              initialValue={state?.row[3]}
              required
              rules={[{ required: true, message: "Vui lòng nhập mã tim cọc" }]}
            >
              <Input
                size="large"
                prefix={<FieldNumberOutlined className="pile-input-icon" />}
                placeholder="Nhập mã tim cọc"
              />
            </Form.Item>

            <Form.Item
              label="Ngày ép cọc (Driving date)"
              initialValue={state?.row[5] ? dayjs(state?.row[5]) : null}
              name="drivingDate"
              required
              rules={[{ required: true, message: "Vui lòng chọn ngày ép cọc" }]}
            >
              <DatePicker
                size="large"
                className="pile-full-width"
                format="DD/MM/YYYY"
                placeholder="Chọn ngày"
                suffixIcon={<CalendarOutlined />}
                onChange={(date) => {console.log("Selected date:", date);}}
              />
            </Form.Item>

            <Form.Item
              label="Cao độ mặt đất tự nhiên (m)"
              initialValue={state?.row[23]}
              name="naturalGroundLevel"
              required
              rules={[{ required: true, message: "Vui lòng nhập cao độ" }]}
            >
              <InputNumber
                size="large"
                className="pile-full-width"
                controls={false}
                prefix={<ColumnHeightOutlined className="pile-input-icon" />}
                addonAfter="m"
                placeholder="Nhập cao độ (m)"
              />
            </Form.Item>
          </Card>

          {/* Section 2: Chiều dài các đoạn cọc */}
          <Card className="pile-form-card" bordered={false}>
            <div className="pile-section-title">
              <span className="pile-section-title__bar" />
              <Title level={5} className="pile-section-title__text">
                2. Chiều dài các đoạn cọc
              </Title>
            </div>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Đoạn cọc 1 (Length of pile segment)"
                  name="segment1"
                  initialValue={state?.row[6]}
                >
                  <InputNumber
                    size="large"
                    className="pile-full-width"
                    controls={false}
                    addonAfter="m"
                    placeholder="Nhập chiều dài"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Đoạn cọc 2 (Length of pile segment)"
                  name="segment2"
                  initialValue={state?.row[9]}
                >
                  <InputNumber
                    size="large"
                    className="pile-full-width"
                    controls={false}
                    addonAfter="m"
                    placeholder="Nhập chiều dài"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Đoạn cọc 3 (Length of pile segment)"
                  name="segment3"
                  initialValue={state?.row[12]}
                >
                  <InputNumber
                    size="large"
                    className="pile-full-width"
                    controls={false}
                    addonAfter="m"
                    placeholder="Nhập chiều dài"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Đoạn cọc 4 (Length of pile segment)"
                  name="segment4"
                  initialValue={state?.row[15]}
                >
                  <InputNumber
                    size="large"
                    className="pile-full-width"
                    controls={false}
                    addonAfter="m"
                    placeholder="Nhập chiều dài"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Section 3: Thời gian khoan */}
          <Card className="pile-form-card" bordered={false}>
            <div className="pile-section-title">
              <span className="pile-section-title__bar" />
              <Title level={5} className="pile-section-title__text">
                3. Thời gian khoan
              </Title>
            </div>

            <Form.Item
              label="Thời gian Bắt đầu khoan"
              name="drillStart"
              required
              rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
              initialValue={
                state?.row[18]
                  ? dayjs(state?.row[18], "HH:mm")
                  : null
              }
            >
              <TimePicker
                size="large"
                className="pile-full-width"
                showTime
                format="HH:mm"
                placeholder="Chọn ngày giờ"
                suffixIcon={<ClockCircleOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Thời gian Kết thúc khoan"
              name="drillEnd"
              required
              rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
              initialValue={
                state?.row[18]
                  ? dayjs(state?.row[18], "HH:mm")
                  : null
              }
            >
              <TimePicker
                size="large"
                className="pile-full-width"
                showTime
                format="HH:mm"
                placeholder="Chọn ngày giờ"
                suffixIcon={<ClockCircleOutlined />}
              />
            </Form.Item>
          </Card>

          {/* Section 4: Thời gian bơm vữa */}
          <Card className="pile-form-card" bordered={false}>
            <div className="pile-section-title">
              <span className="pile-section-title__bar" />
              <Title level={5} className="pile-section-title__text">
                4. Thời gian bơm vữa
              </Title>
            </div>

            <Row gutter={12}>
              <Col span={24}>
                <Form.Item
                  label="Thời gian Bắt đầu bơm vữa"
                  name="groutStart"
                  required
                  rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
                >
                  <DatePicker
                    size="large"
                    className="pile-full-width"
                    showTime
                    format="DD/MM/YYYY HH:mm"
                    placeholder="Chọn ngày giờ"
                    suffixIcon={<ClockCircleOutlined />}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Vữa thân 1 (m³)"
                  name="groutBody1"
                  required
                  rules={[{ required: true, message: "Vui lòng nhập thể tích" }]}
                  initialValue={state?.row[37]}
                >
                  <InputNumber
                    size="large"
                    className="pile-full-width"
                    controls={false}
                    addonAfter="m³"
                    placeholder="Nhập thể tích"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Vữa mũi (m³)"
                  name="groutTip"
                  required
                  rules={[{ required: true, message: "Vui lòng nhập thể tích" }]}
                  initialValue={state?.row[38]}
                >
                  <InputNumber
                    size="large"
                    className="pile-full-width"
                    controls={false}
                    addonAfter="m³"
                    placeholder="Nhập thể tích"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Vữa thân 2 (m³)" name="groutBody2" initialValue={state?.row[39]}>
                  <InputNumber
                    size="large"
                    className="pile-full-width"
                    controls={false}
                    addonAfter="m³"
                    placeholder="Nhập thể tích"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Thời gian Kết thúc bơm vữa"
                  name="groutEnd"
                  required
                  rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
                >
                  <DatePicker
                    size="large"
                    className="pile-full-width"
                    showTime
                    format="DD/MM/YYYY HH:mm"
                    placeholder="Chọn ngày giờ"
                    suffixIcon={<ClockCircleOutlined />}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Section 5: Thông tin hoàn thành */}
          <Card className="pile-form-card" bordered={false}>
            <div className="pile-section-title">
              <span className="pile-section-title__bar" />
              <Title level={5} className="pile-section-title__text">
                5. Thông tin hoàn thành
              </Title>
            </div>

            <Form.Item
              label="Cao độ đầu cọc thực tế (Top level - Actually) (m)"
              name="actualTopLevel"
              required
              rules={[{ required: true, message: "Vui lòng nhập cao độ" }]}
              initialValue={state?.row[20]}
            >
              <InputNumber
                size="large"
                className="pile-full-width"
                controls={false}
                prefix={<ColumnHeightOutlined className="pile-input-icon" />}
                addonAfter="m"
                placeholder="Nhập cao độ (m)"
              />
            </Form.Item>

            <Form.Item
              label="Thời gian kết thúc hạ cọc"
              name="pileEndTime"
              required
              rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
            >
              <DatePicker
                size="large"
                className="pile-full-width"
                showTime
                format="DD/MM/YYYY HH:mm"
                placeholder="Chọn ngày giờ"
                suffixIcon={<ClockCircleOutlined />}
              />
            </Form.Item>
          </Card>

          {/* Footer note */}
          <div className="pile-footer-note">
            <InfoCircleOutlined className="pile-footer-note__icon" />
            <Text className="pile-footer-note__text">
              Lưu ý: Các trường có dấu (*) là bắt buộc phải nhập
            </Text>
          </div>

          {/* Sticky bottom action */}
          <div className="pile-bottom-action">
            <Button
              type="primary"
              htmlType="submit"
              block
              className="pile-submit-btn"
              icon={<CheckOutlined />}
            >
              Lưu &amp; Hoàn tất
            </Button>
          </div>
        </Form>
      </main>
    </div>
  );
};

export default PileDataEntryForm;
