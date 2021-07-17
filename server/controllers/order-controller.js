const Order = require('../models/order-model.js');
const HttpError = require('../models/http-error.js');

// add order items - private

const addOrderItems = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } =
      req.body;

    if (orderItems && orderItems.length === 0) {
      const error = new HttpError('No order items.', 400);
      next(error);
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json({ order: createdOrder });
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// get order by id - private

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      res.json({ order });
    } else {
      const error = new HttpError('Order not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// update order to paid - private

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json({ order: updatedOrder });
    } else {
      const error = new HttpError('Order not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// update order to delivered - private, admin

const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json({ order: updatedOrder });
    } else {
      const error = new HttpError('Order not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// get user orders - private

const getUserOrders = async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await Order.countDocuments({ user: req.user._id });
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// get all orders

const getAllOrders = async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await Order.countDocuments({});
    const orders = await Order.find({})
      .populate('user', 'id name')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getAllOrders,
};
