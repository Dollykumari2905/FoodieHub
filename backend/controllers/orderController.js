const db = require('../models');
const Order = db.Order;
const OrderItem = db.OrderItem;
const MenuItem = db.MenuItem;

exports.placeOrder = async (req,res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; // [{menu_item_id, quantity}, ...]
    if(!items || items.length === 0) return res.status(400).json({ message: 'No items' });

    // calculate total
    let total = 0;
    const orderItemsData = [];
    for(const it of items) {
      const menu = await MenuItem.findByPk(it.menu_item_id);
      if(!menu) return res.status(400).json({ message: `Menu item ${it.menu_item_id} not found` });
      const price = parseFloat(menu.price) * parseInt(it.quantity);
      total += price;
      orderItemsData.push({ menu_item_id: it.menu_item_id, quantity: it.quantity, price: menu.price });
    }

    const order = await Order.create({ user_id: userId, total });
    for(const oi of orderItemsData) {
      await OrderItem.create({ order_id: order.id, menu_item_id: oi.menu_item_id, quantity: oi.quantity, price: oi.price });
    }

    res.json({ message: 'Order placed', orderId: order.id });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getUserOrders = async (req,res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [{ model: OrderItem, include: [ MenuItem ] }]
    });
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllOrders = async (req,res) => {
  try {
    const orders = await Order.findAll({ include: [ { model: OrderItem, include: [MenuItem] }, { model: db.User } ] });
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateOrderStatus = async (req,res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    await Order.update({ status }, { where: { id }});
    res.json({ message: 'Updated' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
