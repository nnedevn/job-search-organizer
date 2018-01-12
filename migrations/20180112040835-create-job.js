'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      sponsored: {
        type: Sequelize.STRING
      },
      postedDate: {
        type: Sequelize.STRING
      },
      originSite: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      saved: {
        type: Sequelize.STRING
      },
      appliedFor: {
        type: Sequelize.STRING
      },
      screenshotLink: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      companyLocation: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('jobs');
  }
};