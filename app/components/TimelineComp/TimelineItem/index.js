import React from "react";
import { SmallItem, TimelineContainer } from "../style";
import { Timeline } from "antd";
import moment from "moment";
const TimellineItem = ({ show, tracking }) => {
  return (
    <>
      {show && (
        <Timeline.Item color="green">
          <SmallItem>{tracking.pickrr_status} </SmallItem>
          <SmallItem>
            {moment(tracking.status_time).format("MMMM Do YYYY")}
          </SmallItem>
          <SmallItem>{tracking.status_location}</SmallItem>
        </Timeline.Item>
      )}
    </>
  );
};

export default TimellineItem;
