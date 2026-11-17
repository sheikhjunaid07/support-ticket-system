import express from 'express';
import {
  createTicket,
  getTickets,
  getTicketStats,
  getTicketById,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all ticket routes with auth middleware
router.use(protect);

// Ticket summary stats for dashboard
router.get('/stats', getTicketStats);

// List tickets (supports ?status=) & Create new ticket
router.get('/', getTickets);
router.post('/', createTicket);

// Single ticket operations
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

export default router;
