import React, { useState } from "react";
import {
  FeedbackContainer,
  Container,
  SubmitButton,
  IconContainer,
  RateContainer,
} from "./style";
import { Rate, Form, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FlexContainer } from "../UIElements";
import VerifyOTPModal from "../VerifyOTPModal";
import {
  FaRegSmile,
  FaRegGrinAlt,
  FaRegFrown,
  FaSmile,
  FaFrown,
  FaGrinAlt,
} from "react-icons/fa";

const Feedback = ({ data }) => {
  const { courier_parent_name } = data;
  const [customerFeedback, setCustomerFeedback] = useState(null);
  const [deliveryRating, setDeliveryRating] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [companySubmitLoading, setCompanySubmitLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [rating, setRating] = useState(null);
  const [type, setType] = useState(null);
  const [form] = Form.useForm();

  const handleCompanySubmit = async () => {
    if (!rating && !deliveryRating && !customerFeedback) {
      return message.warning("Please fill any of the fields");
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
        customerFeedback: customerFeedback,
        deliveryRating: deliveryRating,
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
    // setIsModalVisible(true);
    if (!json.err) {
      message.success("OTP sent successfully!");
      setPhoneNumber(json.last_digits_number);
      setType(type);
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
              console.log(value);
              setRating(value);
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

            <RateContainer>
              <div className="heading">Rate your Delivery Experience </div>
              <FlexContainer>
                <IconContainer>
                  {deliveryRating == "good" ? (
                    <FaGrinAlt className="icon" />
                  ) : (
                    <FaRegGrinAlt
                      className="icon"
                      values={deliveryRating}
                      onClick={() => {
                        setDeliveryRating("good");
                      }}
                    />
                  )}
                  Good
                </IconContainer>

                <IconContainer>
                  {deliveryRating == "okay" ? (
                    <FaSmile className="icon" />
                  ) : (
                    <FaRegSmile
                      className="icon"
                      onClick={() => setDeliveryRating("okay")}
                    />
                  )}
                  Okay
                </IconContainer>

                <IconContainer>
                  {deliveryRating === "bad" ? (
                    <FaFrown className="icon" />
                  ) : (
                    <FaRegFrown
                      className="icon"
                      onClick={() => setDeliveryRating("bad")}
                    />
                  )}
                  Bad
                </IconContainer>
              </FlexContainer>
            </RateContainer>
          </Form>
        </FeedbackContainer>
        <div style={{ textAlign: "center", padding: "28px 0px" }}>
          <SubmitButton
            className="button"
            onClick={handleCompanySubmit}
            type={"primary"}
            loading={companySubmitLoading}
          >
            Submit Feedback
          </SubmitButton>
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
