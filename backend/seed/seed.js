import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../models/db.js';
import User from '../models/User.js';
import Ticket from '../models/Ticket.js';

dotenv.config();

// Default demo admin credentials for testing
const DEFAULT_USER = {
  name: 'System Admin',
  email: 'admin@support.com',
  password: 'Admin@123',
  role: 'admin',
};

// Initial support tickets for demo
const SAMPLE_TICKETS = [
  {
    ticketId: 'TCK-1001',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@example.com',
    subject: 'Payment gateway error on checkout',
    description: 'Customer reported getting error code 502 when trying to pay via UPI.',
    priority: 'High',
    status: 'Open',
  },
  {
    ticketId: 'TCK-1002',
    customerName: 'Priya Patel',
    customerEmail: 'priya.patel@example.com',
    subject: 'Unable to reset account password',
    description: 'The password reset email link is not being received in the customer inbox or spam.',
    priority: 'Medium',
    status: 'Open',
  },
  {
    ticketId: 'TCK-1003',
    customerName: 'Amit Kumar',
    customerEmail: 'amit.kumar@example.com',
    subject: 'Invoice mismatch for order #8842',
    description: 'Total bill charged is Rs. 1499 but the invoice generated says Rs. 1199.',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    ticketId: 'TCK-1004',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha.reddy@example.com',
    subject: 'Feature request: Export data to CSV',
    description: 'Customer is requesting an export button to download monthly reports in Excel/CSV format.',
    priority: 'Low',
    status: 'In Progress',
  },
  {
    ticketId: 'TCK-1005',
    customerName: 'Vikram Malhotra',
    customerEmail: 'vikram.m@example.com',
    subject: 'Refund processed but not credited',
    description: 'Refund was approved 5 days ago, customer has not received bank credit yet.',
    priority: 'High',
    status: 'Resolved',
  },
  {
    ticketId: 'TCK-1006',
    customerName: 'Ananya Iyer',
    customerEmail: 'ananya.iyer@example.com',
    subject: 'Account activation link expired',
    description: 'Registration was done yesterday and activation link shows expired.',
    priority: 'Low',
    status: 'Resolved',
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing users and tickets for a clean seed
    await User.deleteMany({});
    await Ticket.deleteMany({});

    // Create demo admin user
    const user = await User.create(DEFAULT_USER);
    console.log(`Created demo admin: ${user.email} / ${DEFAULT_USER.password}`);

    // Create sample tickets
    const tickets = await Ticket.insertMany(SAMPLE_TICKETS);
    console.log(`Created ${tickets.length} sample support tickets.`);

    console.log('---------------------------------------------');
    console.log('Seeding completed successfully!');
    console.log('Login credentials:');
    console.log(`Email    : ${DEFAULT_USER.email}`);
    console.log(`Password : ${DEFAULT_USER.password}`);
    console.log('---------------------------------------------');

    await disconnectDB();
  } catch (error) {
    console.error('Seeding error:', error.message);
    await disconnectDB();
    process.exit(1);
  }
};

seedData();
