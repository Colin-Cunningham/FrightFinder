module.exports = function(sequelize, DataTypes) {
  var SpookySpaces = sequelize.define("Spooky_spaces", {
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    state: DataTypes.STRING,
    state_ab: DataTypes.STRING,
    cur_lat: DataTypes.DECIMAL(10,6),
    cur_long: DataTypes.DECIMAL(10,6),
    city_lat: DataTypes.DECIMAL(10,2),
    city_long: DataTypes.DECIMAL(10,1),
    rating: DataTypes.INTEGER
  },
  {
    timestamps: false,
  });
  return SpookySpaces;
};
