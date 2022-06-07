import React, { useState } from "react";
import { FeedbackContainer, Container } from "./style";
import { Rate, Form, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { FlexBox, FlexContainer } from "../UIElements";
import VerifyOTPModal from "../VerifyOTPModal";
import {
  FaRegSmile,
  FaRegSmileBeam,
  FaRegGrinAlt,
  FaRegFrown,
} from "react-icons/fa";
const customIcons = {
  1: <FaRegGrinAlt />,
  2: <FaRegSmile />,
  3: <FaRegFrown />,
};

const Feedback = ({ data }) => {
  const { courier_parent_name } = data;
  const [customerFeedback, setCustomerFeedback] = useState(null);
  const [deliveryRating, setDeliveryRating] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [companySubmitLoading, setCompanySubmitLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [form] = Form.useForm();
  const handleCompanySubmit = async () => {
    if (!rating || !companyFeedback) {
      return message.warning("Please fill both the fields");
    }
    setCompanySubmitLoading(true);
    await sendOTP("company");
    setCompanySubmitLoading(false);
  };
  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    if (errorFields.length) {
      message.error("Only 150 characters are allowed");
    }
  };

  const finalCompanySubmit = async (otp) => {
    const postData = {
      tracking_id: data.tracking_id,
      req_type: "verify_otp_post_data",
      otp,
      feedback_dict: {
        customer_rating: rating,
        feedback: customerFeedback,
        courier_feedback: deliveryRating,
      },
    };
    setModalLoading(true);
    const response = await fetch(
      "https://pickrr.com/api/pickrr-tracking-feedback-sms-push-verify-api/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    const json = await response.json();
    if (!json.err) {
      message.success("Feedback submitted successfully!");
      setIsModalVisible(false);
      setRating(null);
      setCustomerFeedback(null);
    } else {
      message.error(json.err);
    }
    setModalLoading(false);
  };

  const sendOTP = async (type) => {
    const postData = {
      tracking_id: data.tracking_id,
      req_type: "push_otp",
    };
    const response = await fetch(
      "https://pickrr.com/api/pickrr-tracking-feedback-sms-push-verify-api/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    const json = await response.json();
    if (!json.err) {
      message.success("OTP sent successfully!");
      setPhoneNumber(json.last_digits_number);
      setIsModalVisible(true);
    } else {
      message.error(json.err);
    }
  };
  return (
    <>
      <Container>
        <FeedbackContainer>
          <div className="heading">
            How was the experience with {courier_parent_name}
          </div>
          <Rate
            allowClear={false}
            value={rating}
            // defaultValue={rating}
            style={{ color: "#717BAD", fontSize: "32px" }}
            onChange={(value) => {
              setRating(value);
              console.log(value);
            }}
          />
          <Form
            layout="vertical"
            //   onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ marginTop: "24px" }}
            form={form}
          >
            <Form.Item
              rules={[
                {
                  max: 150,
                  message: "Max 150 characters allowed.",
                },
              ]}
              name="feedback"
            >
              <TextArea
                rows={4}
                placeholder="Please submit your feedback (150 characters, max)"
                onChange={(e) => setCustomerFeedback(e.target.value)}
                value={setCustomerFeedback}
              />
            </Form.Item>

            <FlexContainer style={{ justifyContent: "flex-start" }}>
              <div className="heading">Rate your Delivery Experience :</div>
              <Rate
                // defaultValue={3}
                defaultValue={deliveryRating}
                character={({ index }) => customIcons[index + 1]}
                onChange={(value) => {
                  console.log(value);
                  setDeliveryRating(value);
                }}
                style={{
                  fontSize: "34px",
                  marginLeft: "20px",
                  color: "#002659",
                }}
              />
            </FlexContainer>
          </Form>
        </FeedbackContainer>
        <div style={{ textAlign: "center", padding: "28px 0px" }}>
          {" "}
          <Button
            className="button"
            onClick={handleCompanySubmit}
            type={"primary"}
            loading={companySubmitLoading}
          >
            Submit Feedback
          </Button>
        </div>
      </Container>
      <VerifyOTPModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        finalCompanySubmit={finalCompanySubmit}
        sendOTP={sendOTP}
        phoneNumber={phoneNumber}
        modalLoading={modalLoading}
      />
    </>
  );
};

export default Feedback;
