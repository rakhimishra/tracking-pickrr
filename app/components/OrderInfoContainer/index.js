import { Button, Steps } from "antd";
import React, { useState } from "react";
import {
  Container,
  Icon,
  OrderInfoContainer,
  OrderItem,
  MainContainer,
  ViewButton,
  StatusContainer,
  Heading,
  Stepper,
} from "./style";
import { CheckOrderStatus, Color } from "./utils";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const OrderItems = ({ title, content }) => {
  return (
    <OrderItem>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </OrderItem>
  );
};

const icons = {
  failed:
    "https://d10srchmli830n.cloudfront.net/1653565865471_254a535d-5d10-491b-8e14-4c764f67c868_Group-27878.svg",
  delivered:
    "https://d10srchmli830n.cloudfront.net/1653565931591_dea56aa1-7282-4cce-b881-01a0b11163a6_Vector-(2).svg",
  returned:
    "https://d10srchmli830n.cloudfront.net/1653565990655_f82a51ec-34ae-429c-8c5e-962691834a2d_Group-27880.svg",
  cancelled:
    "https://d10srchmli830n.cloudfront.net/1653566478662_7159942a-b837-4bbf-a7f2-32f0b54e1e00_States---Popups-icons.svg",
  intransit:
    "https://d10srchmli830n.cloudfront.net/1653566838817_22ede491-b980-4146-a07c-5220683f59dd_Vector-(3).svg",
  placed:
    "https://d10srchmli830n.cloudfront.net/1653566838817_22ede491-b980-4146-a07c-5220683f59dd_Vector-(3).svg",
};

const OrderInfocontainer = ({ status = "placed", expectedDelivery }) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [showNestedStepper, setShowNestedStepper] = useState(false);

  const { Step } = Steps;
  return (
    <div>
      <MainContainer>
        <Container>
          <div className="order-placed">
            <img src={icons[status]} height={29} width={29} />
            <div className="content">
              <div style={{ color: Color(status) }}>
                {CheckOrderStatus(status)}
              </div>

              <div className="subcontent">
                Last updated on April 2nd 2022, 9:10 pm
              </div>
            </div>
          </div>
          {status !== "delivered" && (
            <div>
              <div className="expected">Expected Delivery </div>
              <div className="delivery-info">
                {status !== "failed" || status !== "cancelled"
                  ? "-"
                  : `Arriving on ${expectedDelivery}`}
              </div>
            </div>
          )}
          <div className="support">support@pickrr.com</div>
        </Container>
        <OrderInfoContainer>
          <div className="content">
            <OrderItems title="Order Date" content="4 April 2022" />
            <OrderItems title="Order ID " content="534524TRRDD" />
          </div>
          <div className="content">
            <OrderItems title="Courier" content="Ekart" />
            <OrderItems title="Payment Mode" content="Prepaid" />
          </div>
          <Button
            type="ghost"
            style={{ borderRadius: "10px", color: "#1C439F" }}
          >
            Request for Reattempt
          </Button>
        </OrderInfoContainer>
      </MainContainer>{" "}
      <div
        style={{ textAlign: "center", marginTop: "-15px" }}
        onClick={() => setIsViewMore(!isViewMore)}
      >
        <ViewButton type="primary" size="large">
          {isViewMore ? "Hide" : "View"} Details{" "}
          {isViewMore ? <UpOutlined /> : <DownOutlined />}
        </ViewButton>
      </div>
      {isViewMore && (
        <StatusContainer>
          <div className="stepper-container">
            <Stepper progressDot current={3} direction="vertical">
              <Step
                title="Finished"
                description="This is a description. This is a description."
              />
              <Step
                title="Finished"
                description="This is a description. This is a description."
              />
              <Step
                title="Finished"
                description="This is a description. This is a description."
              />
              <Step
                title="Finished"
                onClick={() => setShowNestedStepper(!showNestedStepper)}
                className="steps"
                description={
                  showNestedStepper && (
                    <Steps progressDot current={1} direction="vertical">
                      <Step
                        title="Finished"
                        description="This is a description. This is a description."
                      />
                      <Step
                        title="Finished"
                        description="This is a description. This is a description."
                      />
                      <Step
                        title="Finished"
                        description="This is a description. This is a description."
                      />
                      <Step
                        title="Waiting"
                        description="This is a description."
                      />
                    </Steps>
                  )
                }
              ></Step>
            </Stepper>
          </div>
          <div className="brand-details-container">
            <div className="brand-name">Brand Name</div>
            <div className="mode-of-payment">
              <div>Mode of payment :</div>
              <div className="prepaid">Prepaid</div>
            </div>
            <div>
              <Heading>Product Details :</Heading>
              <div className="product-name">
                <div className="product-item">
                  <div>1</div>
                  <div>
                    <div>Men’s summer t- shirt</div>
                    <div>Qty : 01</div>
                  </div>
                  <div className="prepaid">₹243.00</div>
                </div>
                <div className="product-item">
                  <div>1</div>
                  <div>
                    <div>Men’s summer t- shirt</div>
                    <div>Qty : 01</div>
                  </div>
                  <div className="prepaid">₹243.00</div>
                </div>{" "}
                <div className="product-item">
                  <div>1</div>
                  <div>
                    <div>Men’s summer t- shirt</div>
                    <div>Qty : 01</div>
                  </div>
                  <div className="prepaid">₹243.00</div>
                </div>
                <div className="product-item">
                  <div>1</div>
                  <div>
                    <div>Men’s summer t- shirt</div>
                    <div>Qty : 01</div>
                  </div>
                  <div className="prepaid">₹243.00</div>
                </div>
              </div>
            </div>
            <div className="mode-of-payment">
              <div>Total</div>
              <div className="prepaid">₹243.00</div>
            </div>
          </div>
        </StatusContainer>
      )}
    </div>
  );
};

export default OrderInfocontainer;
