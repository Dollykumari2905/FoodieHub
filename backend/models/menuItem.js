module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define('MenuItem', {
    id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
    name: { type: DataTypes.STRING, allowNull:false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10,2), allowNull:false },
    image_url: { type: DataTypes.STRING }
  }, { tableName: 'menu_items', timestamps: false });

  return MenuItem;
};
