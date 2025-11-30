module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique:true },
    password: { type: DataTypes.STRING },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue:false }
  }, { tableName: 'users', timestamps: false });

  return User;
};
