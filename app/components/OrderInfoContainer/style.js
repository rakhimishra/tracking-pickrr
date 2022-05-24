import styled from "styled-components";
export const Container = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 23px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .order-placed {
    display: flex;
  }
  .icon {
    height: 29px;
    width: 29px;
  }
  .content {
    color: #38446d;
    font-weight: 600;
    .subcontent {
      font-weight: 400;
    }
  }
`;
