export const CheckOrderStatus = (orderStatus) => {
  switch (orderStatus) {
    case "placed":
      return "Your Order has been placed";
    case "failed":
      return "Failed Attempt at Delivery";
    case "delivered":
      return "Your Order has been delivered";
    case "cancelled":
      return "Order Cancelled";
    case "inTransit":
      return "Order In- Transit";
    case "returned":
      return "Order Returned";
    default:
      return "Your order has been initiated";
  }
};

export const Color = (orderStatus) => {
  switch (orderStatus) {
    case "placed" || "inTransit":
      return "#38446D";
    case "failed" || "returned":
      return "#EF7E00";
    case "delivered":
      return "#3B9A00";
    case "cancelled":
      return "#FA5357";
    default:
      return "#38446D";
  }
};
