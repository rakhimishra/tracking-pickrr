import { Button, Steps, Row, Col } from "antd";
import React, { useState } from "react";
import {
  Container,
  // Icon,
  // OrderInfoContainer,
  OrderItem,
  MainContainer,
  ViewButton,
  StatusContainer,
  Heading,
  Stepper,
} from "./style";
import { CheckOrderStatus, Color } from "./utils";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import moment from "moment";
import Feedback from "../Feeback";

const OrderItems = ({ title, content, css }) => {
  return (
    <OrderItem style={css}>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </OrderItem>
  );
};

const icons = {
  NDR: "https://d10srchmli830n.cloudfront.net/1653565865471_254a535d-5d10-491b-8e14-4c764f67c868_Group-27878.svg",
  DL: "https://d10srchmli830n.cloudfront.net/1653565931591_dea56aa1-7282-4cce-b881-01a0b11163a6_Vector-(2).svg",
  RTO: "https://d10srchmli830n.cloudfront.net/1653565990655_f82a51ec-34ae-429c-8c5e-962691834a2d_Group-27880.svg",
  RTD: "https://d10srchmli830n.cloudfront.net/1653565990655_f82a51ec-34ae-429c-8c5e-962691834a2d_Group-27880.svg",
  OC: "https://d10srchmli830n.cloudfront.net/1653566478662_7159942a-b837-4bbf-a7f2-32f0b54e1e00_States---Popups-icons.svg",
  OT: "https://d10srchmli830n.cloudfront.net/1653566838817_22ede491-b980-4146-a07c-5220683f59dd_Vector-(3).svg",
  OP: "https://d10srchmli830n.cloudfront.net/1653566838817_22ede491-b980-4146-a07c-5220683f59dd_Vector-(3).svg",
};

const OrderInfocontainer = ({
  status,
  expectedDelivery,
  isMultiOrder,
  courier,
  orderDate,
  orderId,
  lastUpdate,
  itemList,
  trackArr,
  data,
}) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [showNestedStepper, setShowNestedStepper] = useState(false);
  const totalInvoice = itemList
    .map((item) => item.price)
    .reduce((a, b) => a + b);
  const { Step } = Steps;

  return (
    <div>
      <MainContainer>
        <Container>
          <div className="order-placed">
            <img src={icons[status]} className="icon" />
            <div className="content">
              <div style={{ color: Color(status) }}>
                {CheckOrderStatus(status)}
              </div>

              <div className="subcontent">
                Last updated on{" "}
                {moment(lastUpdate).format("MMMM Do YYYY, h:mm a")}
              </div>
            </div>
          </div>
          <div className="supportContainer">
            {status !== "delivered" && (
              <div className="expectedContainer">
                <div className="expected">Expected Delivery </div>
                <div className="delivery-info">
                  {status === "NDR" || status === "OC"
                    ? "-"
                    : `Arriving on ${moment(expectedDelivery).format(
                        "MMMM Do YYYY"
                      )}`}
                </div>
              </div>
            )}
            <a href="mailto:support@pickrr.com?">
              <div className="support" mail>
                support@pickrr.com
              </div>
            </a>
          </div>
        </Container>
        <Row style={{ marginTop: "12px" }} gutter="16px" justify="end">
          <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <OrderItems
              title="Order Date"
              content={moment(orderDate).format("MMMM Do YYYY")}
              css={{ float: "center" }}
            />
          </Col>
          <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <OrderItems
              title="Order ID "
              content={orderId}
              css={{ borderRight: 0, float: "center" }}
            />
          </Col>
          <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <OrderItems
              title="Courier"
              content={courier}
              css={{ float: "center" }}
            />
          </Col>
          <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <OrderItems
              title="Payment Mode"
              content="Prepaid"
              css={{ borderRight: 0, float: "center" }}
            />
          </Col>
        </Row>
      </MainContainer>
      {isMultiOrder && (
        <div
          style={{ textAlign: "center", marginTop: "-15px" }}
          onClick={() => setIsViewMore(!isViewMore)}
        >
          <ViewButton type="primary" size="large">
            {isViewMore ? "Hide" : "View"} Details{" "}
            {isViewMore ? <UpOutlined /> : <DownOutlined />}
          </ViewButton>
        </div>
      )}
      <div>{status == "DL" && <Feedback data={data} />}</div>
      {(isViewMore || (!isMultiOrder && !isViewMore)) && (
        <StatusContainer>
          <div className="stepper-container">
            <Stepper
              progressDot
              current={trackArr?.length}
              direction="vertical"
              status="error"
            >
              {trackArr.map((track, index) => {
                return (
                  <Step
                    key={index}
                    onClick={() => setShowNestedStepper(!showNestedStepper)}
                    title={track.status_array[0].pickrr_status}
                    className="steps"
                    description={
                      showNestedStepper && track.status_array.length > 1 ? (
                        <Steps
                          progressDot
                          current={track.status_array.length}
                          direction="vertical"
                        >
                          {track.status_array.map((tracking, index) => {
                            return (
                              <Step
                                key={index}
                                title={tracking.pickrr_status}
                                description={tracking.status_time}
                              />
                            );
                          })}
                        </Steps>
                      ) : (
                        <>
                          <div>
                            Last updated on
                            {moment(track.status_array[0].status_time).format(
                              "MMMM Do YYYY"
                            )}
                          </div>
                          {track.status_array[0].status_location && (
                            <div>{track.status_array[0].status_location}</div>
                          )}
                        </>
                      )
                    }
                  />
                );
              })}
            </Stepper>
          </div>
          <div className="brand-details-container">
            <div className="brand-name">Brand Name</div>
            <div className="mode-of-payment">
              <div>Mode of payment :</div>
              <div className="prepaid">{data?.is_cod ? "COD" : "Prepaid"}</div>
            </div>
            <div>
              <Heading>Product Details :</Heading>
              <div className="product-name">
                {itemList.map((item, index) => {
                  return (
                    <div className="product-item">
                      <div style={{ marginRight: 10 }}>1</div>
                      <div>
                        <div>{item.item_name}</div>
                        <div>Qty : {item.quantity}</div>
                      </div>
                      <div className="prepaid">₹{item.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mode-of-payment">
              <div>Total</div>
              <div className="prepaid">₹{totalInvoice}</div>
            </div>
          </div>
        </StatusContainer>
      )}
    </div>
  );
};

export default OrderInfocontainer;
