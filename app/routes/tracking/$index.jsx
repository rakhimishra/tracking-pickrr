import { Link, redirect, useLoaderData } from "remix";
import { getTrackingDetails } from "~/utils/server.query";
import { Title, CustomInput, CustomButton } from "~/components/UIElements";
import { MainContainer, Container } from "./style";

export const loader = async ({ request, params }) => {
  console.log(params);
  const data = await getTrackingDetails(params);

  if (!data) throw new Error("Tracking not found");

  return data;
};

function TrackingDetails() {
  const { data } = useLoaderData();

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
        </div>
      </MainContainer>
    </Container>
  );
}

export default TrackingDetails;
