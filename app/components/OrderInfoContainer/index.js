import React from "react";
import { Container } from "./style";
import { CheckCircleOutlined } from "@ant-design/icons";
const OrderInfocontainer = () => {
  return (
    <Container>
      <div className="order-placed">
        <CheckCircleOutlined className="icon" height="29px" width="29px" />
        <div className="content">
          <div>Your Order has been placed</div>
          <div>Last updated on April 2nd 2022, 9:10 pm</div>
        </div>
      </div>
      <div className="delivery-info">
        <div>Expected Delivery </div>
        <div>Arriving on Apr 06</div>
      </div>
      <div className="support">support@pickrr.com</div>
    </Container>
  );
};

export default OrderInfocontainer;
