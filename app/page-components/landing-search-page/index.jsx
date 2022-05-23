import React, { useState } from "react";
import {
  Footer,
  MainContainer,
  LandingSearchPageContainer,
  CustomButton,
} from "./style";

import { CustomInput, Title } from "~/components/UIElements";
function LandingSearchPage() {
  const [input, setInput] = useState("");

  const handleClick = () => {
    console.log("button clicked");
    history.push(`/tracking/${input}`);
  };
  return (
    <LandingSearchPageContainer>
      <MainContainer>
        <div className="title">Welcome to Pickrr Tracking !</div>
        <Title className="subtitle"> Track Your Order</Title>
        <div className="support-text">
          You can find tracking ID in the email and SMS alerts you received from
          us upon order confirmation.
        </div>
        <div className="input-button-container">
          <CustomInput
            style={{ marginRight: 10 }}
            placeholder="Enter Tracking ID (Comma separated if multiple)"
            onChange={(e) => setInput(e.target.value)}
          />
          <CustomButton type="primary" onClick={handleClick}>
            Track Order
          </CustomButton>
        </div>
        <div className="powered">Powered by Pickrr </div>
      </MainContainer>
      <Footer src="https://d10srchmli830n.cloudfront.net/1652867194453_e3b1cfc2-46b6-4959-b1e5-c2d02f51c30a_Group-27611.svg" />
    </LandingSearchPageContainer>
  );
}

export default LandingSearchPage;
