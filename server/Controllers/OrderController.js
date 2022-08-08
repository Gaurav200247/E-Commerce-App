const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../Errors/custom-error");
const Order = require("../Models/Order");
const Product = require("../Models/Product");

// create new Order
const newOrder = async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // console.log(req.user._id);

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(StatusCodes.CREATED).json({ success: true, order });
};

// Get Single Order
const getSingleOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // gives emai and name of user using order.user in which it comtains userid.

  if (!order) {
    throw new CustomAPIError("Order not Found !!", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({ success: true, order });
};

// Get Logged in User Orders
const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(StatusCodes.OK).json({ success: true, orders });
};

// Get All Orders -- ADMIN
const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount = totalAmount + order.totalPrice;
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, nbHits: orders.length, totalAmount, orders });
};

// Update Order Status -- ADMIN
const updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new CustomAPIError("Order not Found !!", StatusCodes.NOT_FOUND);
  }

  if (order.OrderStatus === "Delivered") {
    throw new CustomAPIError(
      "You Have Delivered this Product.",
      StatusCodes.BAD_REQUEST
    );
  }

  order.orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.product, orderItem.quantity);
  });

  order.OrderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(StatusCodes.OK).json({ success: true, order });
};

// Delete Order -- ADMIN
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new CustomAPIError("Order not Found !!", StatusCodes.NOT_FOUND);
  }

  await order.remove();

  res.status(StatusCodes.OK).json({ success: true });
};

const updateStock = async (productID, quantity) => {
  const product = await Product.findById(productID);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
};

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
