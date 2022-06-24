import { Timeline } from "antd";
import styled from "styled-components";
export const Item = styled.div`
  margin: 0px;
  font-weight: 400;
  font-size: 15px;
  color: #2d3f93;
`;

export const HeadingItem = styled.div`
  margin: 0px;
  font-weight: 600;
  font-size: 15px;
  color: #2d3f93;
`;

export const SmallItem = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #2d3f93;
`;

export const TimelineContainer = styled(Timeline)`
  .ant-timeline-item-head-custom {
    padding: 0;
  }
  .ant-timeline-item-tail {
    border-left: 2px dashed #158a2a;
  }

  .ant-timeline-item:last-child {
    padding-bottom: 0;
  }
  .ant-timeline-item {
    &hover {
      background-color: #edf0f9;
    }
  }
  .ant-timeline-item-head {
    background-color: #158a2a;
    border: none;
  }
`;

export const Container = styled(Timeline)`
  .ant-timeline-item-tail {
    border-left: 2px solid #158a2a;
  }
  .ant-timeline-item-head-custom {
    padding: 0;
  }
`;
