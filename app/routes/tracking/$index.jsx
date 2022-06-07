import { Link, redirect, useLoaderData } from "remix";
import { Title, CustomInput, CustomButton } from "~/components/UIElements";
import { MainContainer, Container } from "./style";
import OrderInfocontainer from "~/components/OrderInfoContainer";
import { useState, useEffect } from "react";
import Feedback from "~/components/Feeback";
import { getTrackingDetails } from "~/utils/server.query";
import { Col, notification, Row } from "antd";

export const loader = async ({ params }) => {
  const trackingId = params.index;
  try {
    const data = await getTrackingDetails(trackingId);
    return data;
  } catch (error) {
    return error;
  }
};

function TrackingDetails() {
  const loaderData = useLoaderData();
  const [data, setData] = useState({
    ...loaderData,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [isError, setIsError] = useState({
    errorStatus: false,
    message: "",
  });
  const isMultiOrder = data?.response_list ? true : false;

  const handleClick = async () => {
    if (!trackingId) {
      notification.error({ message: "Please enter Tracking ID" });
      return;
    } else {
      setIsLoading(true);
      const data = await getTrackingDetails(trackingId);
      setData({ ...data });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (data?.err) {
      setIsError({ errorStatus: true, message: data.err });
    } else {
      setIsError({ errorStatus: false, message: "" });
    }
  }, [data]);

  console.log(data);

  return (
    <div>
      <Container>
        <Title>Order Tracking Details</Title>
        <div className="search-container">
          <CustomInput
            placeholder="Enter Tracking ID (Comma separated if multiple)"
            style={{ marginRight: 10 }}
            onChange={(e) => {
              setTrackingId(e.target.value);
            }}
            value={trackingId}
            allowClear
          />
          <CustomButton type="danger" onClick={handleClick}>
            Track Order
          </CustomButton>
        </div>

        {isError.errorStatus && (
          <div style={{ color: "#FF0006", marginTop: "8px" }}>
            {isError.message}
          </div>
        )}
        {isLoading ? (
          <div>Loading</div>
        ) : (
          !data?.err && (
            <MainContainer>
              <div>
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
                            status={status?.current_status_type}
                            orderDate={order_created_at}
                            orderId={client_order_id}
                            expectedDelivery={edd_stamp}
                            lastUpdate={last_update_from_order_ms}
                            isMultiOrder={isMultiOrder}
                            itemList={item_list}
                            trackArr={track_arr}
                            data={data}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ marginBottom: "30px" }}>
                      <OrderInfocontainer
                        courier={data.courier_used}
                        status={data?.status?.current_status_type}
                        orderDate={data.order_created_at}
                        orderId={data.client_order_id}
                        expectedDelivery={data.edd_stamp}
                        lastUpdate={data.last_update_from_order_ms}
                        isMultiOrder={isMultiOrder}
                        itemList={data.item_list}
                        trackArr={data.track_arr}
                        data={data}
                      />
                    </div>
                  )}
                </div>
              </div>
            </MainContainer>
          )
        )}
      </Container>
    </div>
  );
}

export default TrackingDetails;
