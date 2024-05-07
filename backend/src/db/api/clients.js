const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ClientsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const clients = await db.clients.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        contact_email: data.contact_email || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await clients.setUser_account(data.user_account || null, {
      transaction,
    });

    await clients.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return clients;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const clientsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      contact_email: item.contact_email || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const clients = await db.clients.bulkCreate(clientsData, { transaction });

    // For each item created, replace relation files

    return clients;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const clients = await db.clients.findByPk(id, {}, { transaction });

    await clients.update(
      {
        name: data.name || null,
        contact_email: data.contact_email || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await clients.setUser_account(data.user_account || null, {
      transaction,
    });

    await clients.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return clients;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const clients = await db.clients.findByPk(id, options);

    await clients.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await clients.destroy({
      transaction,
    });

    return clients;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const clients = await db.clients.findOne({ where }, { transaction });

    if (!clients) {
      return clients;
    }

    const output = clients.get({ plain: true });

    output.invoices_client = await clients.getInvoices_client({
      transaction,
    });

    output.projects_client = await clients.getProjects_client({
      transaction,
    });

    output.user_account = await clients.getUser_account({
      transaction,
    });

    output.organization = await clients.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user_account',
      },

      {
        model: db.organizations,
        as: 'organization',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('clients', 'name', filter.name),
        };
      }

      if (filter.contact_email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'clients',
            'contact_email',
            filter.contact_email,
          ),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.user_account) {
        var listItems = filter.user_account.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          user_accountId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.clients.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.clients.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('clients', 'name', query),
        ],
      };
    }

    const records = await db.clients.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
