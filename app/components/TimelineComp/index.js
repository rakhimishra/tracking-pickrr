import React, { useEffect, useState } from "react";
import moment from "moment";
import { Divider, Steps } from "antd";
import { Timeline } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { Item, HeadingItem, TimelineContainer, Container } from "./style";
import { Color } from "../OrderInfoContainer/utils";
import TimelineItem from "./TimelineItem";
const TimelineComp = ({ trackArr }) => {
  const { Step } = Steps;

  const [show, setShow] = useState(false);
  const [currIndex, setCurrIndex] = useState(null);

  const validStatuses = [
    "OP",
    "PP",
    "SHP",
    "OT",
    "OO",
    "DL",
    "OC",
    "NDR",
    "RTO",
  ];

  const arr = [
    {
      status_name: "OP",
      status_array: [
        {
          courier_status_code: "",
          pickrr_status: "Order Placed",
          pickrr_sub_status_code: "",
          status_body: "Order Placed",
          status_location: null,
          status_time: "2022-06-20T07:25:19.000Z",
        },
      ],
    },
    {
      status_name: "PP",
      status_array: [
        {
          courier_status_code: "015-S",
          pickrr_status: "Order Picked Up",
          pickrr_sub_status_code: "",
          status_body: "PICK UP SCAN ON FIELD",
          status_location: "COD PROCESSING CENTRE I",
          status_time: "2022-06-20T07:50:00.000Z",
        },
      ],
    },
    {
      status_name: "SHP",
      status_array: [
        {
          courier_status_code: "015-S",
          pickrr_status: "SHIPMENT INSCAN",
          pickrr_sub_status_code: "",
          status_body: "PICK UP SCAN ON FIELD",
          status_location: "COD PROCESSING CENTRE I",
          status_time: "2022-06-20T07:50:00.000Z",
        },
      ],
    },
    {
      status_name: "OT",
      status_array: [
        {
          courier_status_code: "001-S",
          pickrr_status: "Order in Transit",
          pickrr_sub_status_code: "",
          status_body: "SHIPMENT INSCAN",
          status_location: "COD PROCESSING CENTRE I",
          status_time: "2022-06-20T12:21:00.000Z",
        },
      ],
    },
    {
      status_name: "OO",
      status_array: [
        {
          courier_status_code: "001-S",
          pickrr_status: "Shipment out for delivery",
          pickrr_sub_status_code: "",
          status_body: "SHIPMENT INSCAN",
          status_location: "COD PROCESSING CENTRE I",
          status_time: "2022-06-20T12:21:00.000Z",
        },
      ],
    },
    {
      status_name: "DL",
      status_array: [
        {
          courier_status_code: "001-S",
          pickrr_status: "Delivered",
          pickrr_sub_status_code: "",
          status_body: "SHIPMENT INSCAN",
          status_location: "COD PROCESSING CENTRE I",
          status_time: "2022-06-20T12:21:00.000Z",
        },
      ],
    },
  ];

  let statusTobeShown = trackArr.filter((o1) =>
    validStatuses.some((o2) => o1.status_name === o2)
  );

  function getDifference(array1, array2) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.status_name === object2.status_name;
      });
    });
  }

  const difference = [
    ...getDifference(arr, statusTobeShown),
    // ...getDifference(statusTobeShown, arr),
  ];

  let parentArray = [...statusTobeShown, ...difference];

  const userExists = () => {
    return parentArray.some(function (el) {
      return el.status_name === "OC";
    });
  };
  const actualArray = userExists() ? trackArr : parentArray;
  return (
    <div>
      <Container>
        {actualArray?.map((track, index) => {
          return (
            <Timeline.Item
              color={
                index > parentArray.length - difference.length - 1
                  ? "#EDF0F9"
                  : track.status_name == "OC" || track.status_name == "NDR"
                  ? Color(track.status_name)
                  : "green"
              }
              key={index}
              dot={<CheckCircleFilled />}
              style={{
                cursor: track.status_array.length > 1 && "pointer",
              }}
              onClick={(e) => {
                if (track.status_array.length > 1) {
                  setCurrIndex(index);
                  setShow(!show);
                }
              }}
            >
              <HeadingItem
                style={{
                  color:
                    index > parentArray.length - difference.length - 1
                      ? "#EDF0F9"
                      : "#2D3F93",
                }}
              >
                {track.status_array[0].pickrr_status}{" "}
                <span style={{ color: "#EF7E00" }}>
                  {track.status_array.length > 1 && "(New Update)"}
                </span>
              </HeadingItem>
              <Item
                style={{
                  color:
                    index > parentArray.length - difference.length - 1
                      ? "#EDF0F9"
                      : "#2D3F93",
                }}
              >
                {moment(track.status_array[0].status_time).format(
                  "MMMM Do YYYY"
                )}
              </Item>
              <Item
                style={{
                  color:
                    index > parentArray.length - difference.length - 1
                      ? "#EDF0F9"
                      : "#2D3F93",
                }}
              >
                {track.status_array[0].status_location}
              </Item>
              {index === currIndex && show && track.status_array.length > 1 ? (
                <TimelineContainer
                  style={{ marginLeft: "-26px", marginTop: 15 }}
                >
                  {track?.status_array.map((tracking, ind) => {
                    return <TimelineItem show tracking={tracking} />;
                  })}
                </TimelineContainer>
              ) : null}
            </Timeline.Item>
          );
        })}

        {/* <>
          <Steps
            progressDot
            current={statusTobeShown?.length - 1}
            direction="vertical"
          >
            {parentArray?.map((track, index) => {
              return (
                <>
                  <Step
                    key={index}
                    onClick={() => {
                      if (track.status_array.length > 1) {
                        setShow(!show);
                      }
                    }}
                    style={{
                      cursor: track.status_array.length > 1 && "pointer",
                    }}
                    description={
                      show && track?.status_array.length > 1 ? (
                        <>
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

                          <NestedStepper
                            progressDot
                            current={track?.status_array?.length}
                            direction="vertical"
                          >
                            {track?.status_array.map((tracking, index) => {
                              return (
                                <Step
                                  key={index}
                                  title={tracking.pickrr_status}
                                  description={
                                    <>
                                      <SmallItem>
                                        {moment(tracking.status_time).format(
                                          "MMMM Do YYYY"
                                        )}
                                      </SmallItem>
                                      <SmallItem>
                                        {tracking.status_location}
                                      </SmallItem>
                                    </>
                                  }
                                />
                              );
                            })}
                          </NestedStepper>
                        </>
                      ) : (
                        <Step
                          description={
                            <>
                              <HeadingItem>
                                {track.status_array[0].pickrr_status}{" "}
                                <span style={{ color: "#EF7E00" }}>
                                  {track.status_array.length > 1 &&
                                    "(New Update)"}
                                </span>
                              </HeadingItem>
                              <Item>
                                {moment(
                                  track.status_array[0].status_time
                                ).format("MMMM Do YYYY")}
                              </Item>
                              <Item>
                                {track.status_array[0].status_location}
                              </Item>
                            </>
                          }
                        ></Step>
                      )
                    }
                  />
                </>
              );
            })}
          </Steps>
        </> */}
      </Container>
    </div>
  );
};
export default TimelineComp;
