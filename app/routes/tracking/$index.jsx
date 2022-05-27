import { Link, redirect, useLoaderData } from "remix";
import { getTrackingDetails } from "~/utils/server.query";
// import { db } from '~/utils/db.server';
// import { getUser } from '~/utils/session.server';

export const loader = async ({ request, params }) => {
  console.log(params, "params");
  try {
    const response = await fetch(
      `https://cfapi.pickrr.com/plugins/tracking/?tracking_id=${params.index}`
    );
    const data = await response.json();

    // console.log('data ==>', data);
    // return json(await data.json());
    return data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

function TrackingDetails() {
  const data = useLoaderData();
  return (
    <Container>
      <Title>Order Tracking Details</Title>
      <MainContainer>
        <div className="input-button-container">
          <CustomInput
            placeholder="Enter Tracking ID (Comma separated if multiple)"
            style={{ marginRight: 10, width: "769px" }}
          />
          <CustomButton type="danger">Track Order</CustomButton>
          <div className="order-info-container">
            <div style={{ marginBottom: "30px" }}>
              <OrderInfocontainer />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <OrderInfocontainer />
            </div>{" "}
            <div style={{ marginBottom: "30px" }}>
              <OrderInfocontainer />
            </div>{" "}
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
