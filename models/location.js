module.exports = function(sequelize, DataTypes) {
  var SpookySpaces = sequelize.define("Spooky_spaces", {
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    state: DataTypes.STRING,
    state_ab: DataTypes.STRING,
    cur_lat: DataTypes.DECIMAL,
    cur_long: DataTypes.DECIMAL,
    city_lat: DataTypes.DECIMAL,
    city_long: DataTypes.DECIMAL,
    rating: DataTypes.INTEGER
  });
  return SpookySpaces;
};
