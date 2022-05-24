import React from "react";
import { Container, OrderStatus, Icon } from "./style";
import { CheckOrderStatus, Color, ExpectedDelivery } from "./utils";
const OrderInfocontainer = ({ status = "failed" }) => {
  return (
    <Container>
      <div className="order-placed">
        {status == "failed" || status == "cancelled" ? (
          <img src="https://d10srchmli830n.cloudfront.net/1653390909529_b6f7eb2a-0924-4d3b-961c-0e93a3e4ef33_Group-27444.svg" />
        ) : (
          <Icon
            className="icon"
            status={status}
            style={{ color: Color(status) }}
          />
        )}

        <div className="content">
          <OrderStatus style={{ color: Color(status) }}>
            {CheckOrderStatus(status)}
          </OrderStatus>

          <div className="subcontent">
            Last updated on April 2nd 2022, 9:10 pm
          </div>
        </div>
      </div>
      {status !== "delivered" && (
        <div>
          <div className="expected">Expected Delivery </div>
          <div className="delivery-info">{ExpectedDelivery(status)}</div>
        </div>
      )}
      <div className="support">support@pickrr.com</div>
    </Container>
  );
};

export default OrderInfocontainer;
