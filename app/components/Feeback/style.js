import { Button } from "antd";
import styled from "styled-components";
import { FlexColContainer } from "../UIElements";

export const FeedbackContainer = styled.div`
  padding: 20px 34px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
  .heading {
    font-weight: 700;
    font-size: 20px;
    color: #38446d;
  }
`;

export const Container = styled.div`
  background: #0051bf;
  border-radius: 10px;
  margin: auto 0;
  .button {
    border: none;
    width: 221px;
    height: 40px;
    color: #38446d;
    background: #ffffff;
    border-radius: 10px;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: #ffffff;
`;

export const IconContainer = styled(FlexColContainer)`
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  .icon {
    font-size: 34px;
    color: #002659;
  }
`;
