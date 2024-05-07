const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const tasks = sequelize.define(
    'tasks',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      due_date: {
        type: DataTypes.DATE,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['pending', 'in_progress', 'completed'],
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

  tasks.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.tasks.belongsTo(db.projects, {
      as: 'project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.tasks.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.tasks.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tasks.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return tasks;
};
