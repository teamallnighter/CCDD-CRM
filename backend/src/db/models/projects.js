const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const projects = sequelize.define(
    'projects',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  projects.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.projects.hasMany(db.tasks, {
      as: 'tasks_project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    //end loop

    db.projects.belongsTo(db.clients, {
      as: 'client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    db.projects.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.projects.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.projects.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return projects;
};
