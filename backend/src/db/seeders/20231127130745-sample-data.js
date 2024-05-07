const db = require('../models');
const Users = db.users;

const Clients = db.clients;

const Invoices = db.invoices;

const Projects = db.projects;

const Tasks = db.tasks;

const Organizations = db.organizations;

const ClientsData = [
  {
    name: 'Client One',

    contact_email: 'client1@example.com',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Client Two',

    contact_email: 'client2@example.com',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Client Three',

    contact_email: 'client3@example.com',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Client Four',

    contact_email: 'client4@example.com',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const InvoicesData = [
  {
    invoice_number: 'INV-1001',

    amount: 5000,

    issue_date: new Date('2023-01-15'),

    due_date: new Date('2023-02-15'),

    status: 'paid',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'INV-1002',

    amount: 12000,

    issue_date: new Date('2023-02-20'),

    due_date: new Date('2023-03-20'),

    status: 'pending',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'INV-1003',

    amount: 3000,

    issue_date: new Date('2023-03-05'),

    due_date: new Date('2023-04-05'),

    status: 'pending',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    invoice_number: 'INV-1004',

    amount: 8000,

    issue_date: new Date('2023-05-25'),

    due_date: new Date('2023-06-25'),

    status: 'paid',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ProjectsData = [
  {
    title: 'Website Redesign',

    description: 'Complete overhaul of the existing website.',

    start_date: new Date('2023-01-10'),

    end_date: new Date('2023-04-10'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'E-commerce Platform',

    description: 'Development of a new e-commerce platform.',

    start_date: new Date('2023-02-15'),

    end_date: new Date('2023-06-15'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'SEO Optimization',

    description: "SEO optimization for the client's website.",

    start_date: new Date('2023-03-01'),

    end_date: new Date('2023-04-01'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Mobile Application',

    description: 'Development of a mobile application.',

    start_date: new Date('2023-05-20'),

    end_date: new Date('2023-09-20'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TasksData = [
  {
    name: 'Design Mockups',

    description: 'Create design mockups for the homepage.',

    due_date: new Date('2023-01-20'),

    status: 'in_progress',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Product Photography',

    description: 'Complete product photography for 100 products.',

    due_date: new Date('2023-03-15'),

    status: 'in_progress',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Keyword Research',

    description: 'Perform keyword research for SEO optimization.',

    due_date: new Date('2023-03-10'),

    status: 'pending',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'App Prototype',

    description: 'Develop a prototype of the mobile application.',

    due_date: new Date('2023-06-10'),

    status: 'completed',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Murray Gell-Mann',
  },

  {
    name: 'Dmitri Mendeleev',
  },

  {
    name: 'Max Planck',
  },

  {
    name: 'Noam Chomsky',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }
}

async function associateClientWithUser_account() {
  const relatedUser_account0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Client0 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Client0?.setUser_account) {
    await Client0.setUser_account(relatedUser_account0);
  }

  const relatedUser_account1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Client1 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Client1?.setUser_account) {
    await Client1.setUser_account(relatedUser_account1);
  }

  const relatedUser_account2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Client2 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Client2?.setUser_account) {
    await Client2.setUser_account(relatedUser_account2);
  }

  const relatedUser_account3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Client3 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Client3?.setUser_account) {
    await Client3.setUser_account(relatedUser_account3);
  }
}

async function associateClientWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Client0 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Client0?.setOrganization) {
    await Client0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Client1 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Client1?.setOrganization) {
    await Client1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Client2 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Client2?.setOrganization) {
    await Client2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Client3 = await Clients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Client3?.setOrganization) {
    await Client3.setOrganization(relatedOrganization3);
  }
}

async function associateInvoiceWithClient() {
  const relatedClient0 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setClient) {
    await Invoice0.setClient(relatedClient0);
  }

  const relatedClient1 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setClient) {
    await Invoice1.setClient(relatedClient1);
  }

  const relatedClient2 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setClient) {
    await Invoice2.setClient(relatedClient2);
  }

  const relatedClient3 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setClient) {
    await Invoice3.setClient(relatedClient3);
  }
}

async function associateInvoiceWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setOrganization) {
    await Invoice0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setOrganization) {
    await Invoice1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setOrganization) {
    await Invoice2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setOrganization) {
    await Invoice3.setOrganization(relatedOrganization3);
  }
}

async function associateProjectWithClient() {
  const relatedClient0 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Project0 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Project0?.setClient) {
    await Project0.setClient(relatedClient0);
  }

  const relatedClient1 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Project1 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Project1?.setClient) {
    await Project1.setClient(relatedClient1);
  }

  const relatedClient2 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Project2 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Project2?.setClient) {
    await Project2.setClient(relatedClient2);
  }

  const relatedClient3 = await Clients.findOne({
    offset: Math.floor(Math.random() * (await Clients.count())),
  });
  const Project3 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Project3?.setClient) {
    await Project3.setClient(relatedClient3);
  }
}

async function associateProjectWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Project0 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Project0?.setOrganization) {
    await Project0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Project1 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Project1?.setOrganization) {
    await Project1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Project2 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Project2?.setOrganization) {
    await Project2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Project3 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Project3?.setOrganization) {
    await Project3.setOrganization(relatedOrganization3);
  }
}

async function associateTaskWithProject() {
  const relatedProject0 = await Projects.findOne({
    offset: Math.floor(Math.random() * (await Projects.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setProject) {
    await Task0.setProject(relatedProject0);
  }

  const relatedProject1 = await Projects.findOne({
    offset: Math.floor(Math.random() * (await Projects.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setProject) {
    await Task1.setProject(relatedProject1);
  }

  const relatedProject2 = await Projects.findOne({
    offset: Math.floor(Math.random() * (await Projects.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setProject) {
    await Task2.setProject(relatedProject2);
  }

  const relatedProject3 = await Projects.findOne({
    offset: Math.floor(Math.random() * (await Projects.count())),
  });
  const Task3 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Task3?.setProject) {
    await Task3.setProject(relatedProject3);
  }
}

async function associateTaskWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setOrganization) {
    await Task0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setOrganization) {
    await Task1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setOrganization) {
    await Task2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Task3 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Task3?.setOrganization) {
    await Task3.setOrganization(relatedOrganization3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Clients.bulkCreate(ClientsData);

    await Invoices.bulkCreate(InvoicesData);

    await Projects.bulkCreate(ProjectsData);

    await Tasks.bulkCreate(TasksData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateClientWithUser_account(),

      await associateClientWithOrganization(),

      await associateInvoiceWithClient(),

      await associateInvoiceWithOrganization(),

      await associateProjectWithClient(),

      await associateProjectWithOrganization(),

      await associateTaskWithProject(),

      await associateTaskWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clients', null, {});

    await queryInterface.bulkDelete('invoices', null, {});

    await queryInterface.bulkDelete('projects', null, {});

    await queryInterface.bulkDelete('tasks', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
