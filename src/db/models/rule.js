'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE",
    });
    
  };
  return Rule;
};