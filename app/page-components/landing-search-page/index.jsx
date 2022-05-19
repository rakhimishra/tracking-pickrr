import PickrrHeader from "../pickrr-header";
import { Footer, MainContainer, LandingSearchPageContainer } from "./style";
function LandingSearchPage() {
  return (
    <LandingSearchPageContainer>
      <PickrrHeader />
      <MainContainer>
        <div className="title">Welcome to Pickrr Tracking !</div>
        <div className="subtitle"> Track Your Order</div>
        <div className="support-text">
          You can find tracking ID in the email and SMS alerts you received from
          us upon order confirmation.
        </div>
      </MainContainer>
      <Footer src="https://d10srchmli830n.cloudfront.net/1652867194453_e3b1cfc2-46b6-4959-b1e5-c2d02f51c30a_Group-27611.svg" />
    </LandingSearchPageContainer>
  );
}

export default LandingSearchPage;
