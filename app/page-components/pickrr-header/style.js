import styled from "styled-components";
export const HeaderContainer = styled.div`
  width: 100% !important;
  margin: auto;
  padding: 25px 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  .social-icon-container {
    display: flex;
    justify-content: space-between;
    max-width:168px;
    width: 100%;
    @media screen and (max-width:768px){
        max-width:120px;
  }
  }
  @media screen and (max-width:768px){
      padding: 15px 16px;  
  }
`;
