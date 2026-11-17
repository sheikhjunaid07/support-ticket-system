import Ticket from '../models/Ticket.js';

// Helper to generate sequential ticket ID like TCK-1001, TCK-1002, TCK-1003...
const generateTicketId = async () => {
  // Find the ticket with the highest ticket ID
  const lastTicket = await Ticket.findOne().sort({ ticketId: -1 });

  if (!lastTicket || !lastTicket.ticketId) {
    return 'TCK-1001';
  }

  // Extract the number part from TCK-XXXX (e.g. 1006 -> 1007)
  const match = lastTicket.ticketId.match(/\d+/);
  let nextNum = match ? parseInt(match[0], 10) + 1 : 1001;

  // Make sure it doesn't collide with any existing ticket
  while (await Ticket.exists({ ticketId: `TCK-${nextNum}` })) {
    nextNum += 1;
  }

  return `TCK-${nextNum}`;
};

// Create a new support ticket
export const createTicket = async (req, res) => {
  try {
    const { customerName, customerEmail, subject, description, priority = 'Medium' } = req.body;

    // Generate sequential ticket ID (e.g. TCK-1007)
    const ticketId = await generateTicketId();

    const ticket = await Ticket.create({
      ticketId,
      customerName,
      customerEmail,
      subject,
      description,
      priority,
      status: 'Open', // default status
    });

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket,
    });
  } catch (error) {
    console.error('Create ticket error:', error);

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ticket ID already exists, please retry' });
    }

    res.status(500).json({ message: 'Server error creating ticket' });
  }
};

// Get all tickets with status filtering
export const getTickets = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    // Filter by status if provided and not "All"
    if (status && status !== 'All') {
      filter.status = status;
    }

    // Optional search by customer name, email, subject, or ticketId
    if (search && search.trim() !== '') {
      const term = search.trim();
      filter.$or = [
        { ticketId: { $regex: term, $options: 'i' } },
        { customerName: { $regex: term, $options: 'i' } },
        { customerEmail: { $regex: term, $options: 'i' } },
        { subject: { $regex: term, $options: 'i' } },
      ];
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });

    res.json({
      tickets,
      count: tickets.length,
    });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ message: 'Server error fetching tickets' });
  }
};

// Get dashboard ticket summary counts
export const getTicketStats = async (req, res) => {
  try {
    const total = await Ticket.countDocuments();
    const open = await Ticket.countDocuments({ status: 'Open' });
    const inProgress = await Ticket.countDocuments({ status: 'In Progress' });
    const resolved = await Ticket.countDocuments({ status: 'Resolved' });

    res.json({
      total,
      open,
      inProgress,
      resolved,
    });
  } catch (error) {
    console.error('Get ticket stats error:', error);
    res.status(500).json({ message: 'Server error loading ticket statistics' });
  }
};

// Get single ticket details by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({ ticket });
  } catch (error) {
    console.error('Get ticket by ID error:', error);
    res.status(500).json({ message: 'Server error fetching ticket details' });
  }
};

// Update ticket or ticket status
export const updateTicket = async (req, res) => {
  try {
    const { status, priority, subject, description, customerName, customerEmail } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update fields if provided
    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (subject) ticket.subject = subject;
    if (description) ticket.description = description;
    if (customerName) ticket.customerName = customerName;
    if (customerEmail) ticket.customerEmail = customerEmail;

    await ticket.save();

    res.json({
      message: 'Ticket updated successfully',
      ticket,
    });
  } catch (error) {
    console.error('Update ticket error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Server error updating ticket' });
  }
};

// Delete a ticket
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await Ticket.findByIdAndDelete(req.params.id);

    res.json({ message: `Ticket ${ticket.ticketId} deleted successfully` });
  } catch (error) {
    console.error('Delete ticket error:', error);
    res.status(500).json({ message: 'Server error deleting ticket' });
  }
};

export default {
  createTicket,
  getTickets,
  getTicketStats,
  getTicketById,
  updateTicket,
  deleteTicket,
};
