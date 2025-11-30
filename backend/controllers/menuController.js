const db = require('../models');
const MenuItem = db.MenuItem;

exports.getMenu = async (req,res) => {
  try {
    const items = await MenuItem.findAll();
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createItem = async (req,res) => {
  try {
    const { name, description, price, image_url } = req.body;
    const item = await MenuItem.create({ name, description, price, image_url });
    res.json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteItem = async (req,res) => {
  try {
    const id = req.params.id;
    await MenuItem.destroy({ where: { id }});
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
