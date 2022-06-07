import styled from "styled-components";
import { Modal, Button } from "antd";
export const ModalX = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
  }
`;
export const VerifyButton = styled(Button)`
  background: #0051bf;
  border-radius: 10px;
  color: #fff;
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  height: 44px;
  margin-right: 7px;
  border: 0;
  &:hover {
    background: #fa6157;
    color: white;
  }
`;

export const ResendButton = styled(Button)`
  background: #edf0f9;
  border-radius: 10px;
  width: 100%;
  color: #303b91;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  height: 44px;
  margin-left: 7px;
  border: 0;
  &:hover {
    background: #d5e8f3;
    color: #303b91;
  }
`;
