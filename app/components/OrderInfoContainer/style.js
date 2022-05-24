import styled, { css } from "styled-components";
import { CheckCircleFilled } from "@ant-design/icons";
export const Container = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 23px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-style: normal;
  color: #38446d;
  .order-placed {
    display: flex;
  }
  .content {
    margin-left: 13px;
    font-size: 18px;
    .subcontent {
      font-weight: 400;
      font-size: 14px;
    }
  }
  .expected {
    font-size: 16px;
  }
  .delivery-info {
    color: #158a2a;
    font-weight: 700;
    font-size: 14px;
  }
  .support {
    font-size: 14px;
    color: #1c439f;
    font-weight: 400;
  }
`;

export const OrderStatus = styled.div``;

export const Icon = styled(CheckCircleFilled)`
  font-size: 29px;
`;
