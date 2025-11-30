module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
    user_id: { type: DataTypes.INTEGER, allowNull:false },
    total: { type: DataTypes.DECIMAL(10,2), allowNull:false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }
  }, { tableName: 'orders', timestamps: false });

  return Order;
};
