import React, { useEffect, useState } from "react";
import moment from "moment";
import { Timeline } from "antd";
import {
  Item,
  HeadingItem,
  SmallItem,
  TimelineContainer,
  Container,
} from "./style";
const TimelineComp = ({ trackArr }) => {
  const [show, setShow] = useState(false);
  // function listenChangesinArray(arr, callback) {
  //   // Add more methods here if you want to listen to them
  //   ["pop", "push", "reverse", "shift", "unshift", "splice", "sort"].forEach(
  //     (m) => {
  //       arr[m] = function () {
  //         var res = Array.prototype[m].apply(arr, arguments); // call normal behaviour
  //         callback.apply(arr, arguments); // finally call the callback supplied
  //         return res;
  //       };
  //     }
  //   );
  // }
  // console.log(listenChangesinArray([1, 2, 3, 4, 5, 6]), "yhhyghyg");
  return (
    <div>
      <Container>
        {trackArr &&
          trackArr?.map((track, index) => {
            return (
              <Timeline.Item
                color="green"
                key={index}
                dot={
                  <img
                    src="https://d10srchmli830n.cloudfront.net/1655363508203_fe2dded7-7cca-4158-acf8-32c6121b76d3_Ellipse-349.svg"
                    height="20px"
                    width="20px"
                  />
                }
                style={{
                  cursor: track.status_array.length > 1 && "pointer",
                }}
                onClick={() => {
                  if (track.status_array.length > 1) setShow(!show);
                }}
              >
                <HeadingItem>
                  {track.status_array[0].pickrr_status}{" "}
                  <span style={{ color: "#EF7E00" }}>
                    {track.status_array.length > 1 && "(New Update)"}
                  </span>
                </HeadingItem>
                <Item>
                  {moment(track.status_array[0].status_time).format(
                    "MMMM Do YYYY"
                  )}
                </Item>
                <Item>{track.status_array[0].status_location}</Item>
                {show && track.status_array.length > 1 ? (
                  <TimelineContainer
                    style={{ marginLeft: "-26px", marginTop: 15 }}
                  >
                    {track?.status_array.map((tracking, index) => {
                      return (
                        <Timeline.Item color="green" key={index}>
                          <SmallItem>{tracking.pickrr_status} </SmallItem>
                          <SmallItem>
                            {moment(tracking.status_time).format(
                              "MMMM Do YYYY"
                            )}
                          </SmallItem>
                          <SmallItem>{tracking.status_location}</SmallItem>
                        </Timeline.Item>
                      );
                    })}
                  </TimelineContainer>
                ) : null}
              </Timeline.Item>
            );
          })}
      </Container>
    </div>
  );
};
export default TimelineComp;
