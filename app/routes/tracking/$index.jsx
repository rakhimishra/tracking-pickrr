import { Link, redirect, useLoaderData } from "remix";
import { getTrackingDetails } from "~/utils/server.query";
import { Title, CustomInput, CustomButton } from "~/components/UIElements";
import { MainContainer, Container } from "./style";
import OrderInfocontainer from "~/components/OrderInfoContainer";
import { useState } from "react";

export const loader = async ({ request, params }) => {
  try {
    const response = await fetch(
      `https://cfapi.pickrr.com/plugins/tracking/?tracking_id=${params.index}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

function TrackingDetails() {
  const data = useLoaderData();
  const [isMultiOrder, setisMultiOrder] = useState(
    data?.response_list ? true : false
  );
  console.log(data);
  return (
    <Container>
      <Title>Order Tracking Details</Title>
      <MainContainer>
        <div>
          <div className="search-container">
            <CustomInput
              placeholder="Enter Tracking ID (Comma separated if multiple)"
              style={{ marginRight: 10, display: "block" }}
            />
            <CustomButton type="danger">Track Order</CustomButton>
          </div>

          <div className="order-info-container">
            {isMultiOrder ? (
              data?.response_list?.map((trackingData, index) => {
                const {
                  courier_used,
                  status,
                  order_created_at,
                  client_order_id,
                  edd_stamp,
                  last_update_from_order_ms,
                  item_list,
                  track_arr,
                } = trackingData;
                return (
                  <div style={{ marginBottom: "30px" }} key={index}>
                    <OrderInfocontainer
                      courier={courier_used}
                      status={status.current_status_body}
                      orderDate={order_created_at}
                      orderId={client_order_id}
                      expectedDelivery={edd_stamp}
                      lastUpdate={last_update_from_order_ms}
                      isMultiOrder={isMultiOrder}
                      itemList={item_list}
                      trackArr={track_arr}
                    />
                  </div>
                );
              })
            ) : (
              <div style={{ marginBottom: "30px" }}>
                <OrderInfocontainer
                  courier={data.courier_used}
                  status={data.status.current_status_body}
                  orderDate={data.order_created_at}
                  orderId={data.client_order_id}
                  expectedDelivery={data.edd_stamp}
                  lastUpdate={data.last_update_from_order_ms}
                  isMultiOrder={isMultiOrder}
                  itemList={data.item_list}
                  trackArr={data.track_arr}
                />
              </div>
            )}
          </div>
        </div>
      </MainContainer>
    </Container>
  );
}

export default TrackingDetails;
