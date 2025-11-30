module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
    order_id: { type: DataTypes.INTEGER, allowNull:false },
    menu_item_id: { type: DataTypes.INTEGER, allowNull:false },
    quantity: { type: DataTypes.INTEGER, allowNull:false },
    price: { type: DataTypes.DECIMAL(10,2), allowNull:false }
  }, { tableName: 'order_items', timestamps: false });

  return OrderItem;
};
