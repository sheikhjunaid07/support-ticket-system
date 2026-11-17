import api from './axiosClient';

// Get all tickets with optional status and search filter
export const fetchTickets = (params = {}) =>
  api.get('/tickets', { params }).then((response) => response.data);

// Get summary counts (Total, Open, In Progress, Resolved)
export const fetchTicketStats = () =>
  api.get('/tickets/stats').then((response) => response.data);

// Get single ticket details
export const fetchTicketById = (id) =>
  api.get(`/tickets/${id}`).then((response) => response.data);

// Create a new support ticket
export const createTicket = (payload) =>
  api.post('/tickets', payload).then((response) => response.data);

// Update ticket status or fields
export const updateTicket = (id, payload) =>
  api.put(`/tickets/${id}`, payload).then((response) => response.data);

// Delete ticket
export const deleteTicket = (id) =>
  api.delete(`/tickets/${id}`).then((response) => response.data);
