import styled from "styled-components";
export const Footer = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const MainContainer = styled.div`
  max-width: 960px;
  width: 100%;
  padding: 70px;
  margin: 0 auto;
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 43px;
    letter-spacing: 0.01em;
    color: #38446d;
  }
  .subtitle {
    margin-top: 39px;
    font-style: normal;
    font-size: 30px;
    line-height: 37px;
    color: #38446d;
  }
  .support-text {
    font-weight: 400;
    font-size: 14px;
    color: #38446d;
  }
`;

export const LandingSearchPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;
