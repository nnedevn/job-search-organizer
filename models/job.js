'use strict';
module.exports = (sequelize, DataTypes) => {
  var job = sequelize.define('job', {
    title: DataTypes.STRING,
    summary: DataTypes.TEXT,
    url: DataTypes.TEXT,
    sponsored: DataTypes.STRING,
    postedDate: DataTypes.STRING,
    originSite: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    saved: DataTypes.STRING,
    appliedFor: DataTypes.STRING,
    screenshotLink: DataTypes.STRING,
    companyName: DataTypes.STRING,
    companyLocation: DataTypes.STRING
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       models.job.belongsTo(models.user);;
  //     }
  //   }
  });

  job.associate = function(models){
    models.job.belongsTo(models.user);
  }
  

  return job;
};