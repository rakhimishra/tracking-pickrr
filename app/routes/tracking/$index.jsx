import { Link, redirect, useLoaderData } from "remix";
import { getTrackingDetails } from "~/utils/server.query";
import { Title, CustomInput, CustomButton } from "~/components/UIElements";
import { MainContainer, Container } from "./style";
import OrderInfocontainer from "~/components/OrderInfoContainer";

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
  console.log(data);
  return (
    <Container>
      <Title>Order Tracking Details</Title>
      <MainContainer>
        <div className="input-button-container">
          <CustomInput
            placeholder="Enter Tracking ID (Comma separated if multiple)"
            style={{ marginRight: 10, maxWidth: "769px" }}
          />
          <CustomButton type="danger">Track Order</CustomButton>
          <div className="order-info-container">
            <div style={{ marginBottom: "30px" }}>
              <OrderInfocontainer />
            </div>
          </div>
          <div className="order-info-container">
            <div style={{ marginBottom: "30px" }}>
              <OrderInfocontainer />
            </div>
          </div>
          <div className="order-info-container">
            <div style={{ marginBottom: "30px" }}>
              <OrderInfocontainer />
            </div>
          </div>
          <div className="order-info-container">
            <div style={{ marginBottom: "30px" }}>
              <OrderInfocontainer />
            </div>
          </div>
        </div>
      </MainContainer>
    </Container>
  );
}

export default TrackingDetails;
