const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const clients = sequelize.define(
    'clients',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      contact_email: {
        type: DataTypes.TEXT,
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

  clients.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.clients.hasMany(db.invoices, {
      as: 'invoices_client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    db.clients.hasMany(db.projects, {
      as: 'projects_client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    //end loop

    db.clients.belongsTo(db.users, {
      as: 'user_account',
      foreignKey: {
        name: 'user_accountId',
      },
      constraints: false,
    });

    db.clients.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.clients.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.clients.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return clients;
};
