import { useState } from 'react';
import Modal from './Modal';
import { PriorityBadge, StatusBadge, Spinner, Alert } from './Ui';
import { updateTicket } from '../api/ticketApi';

export const TicketDetailsModal = ({ open, ticket, onClose, onStatusUpdated, onDeleteClicked }) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  if (!ticket) return null;

  const handleStatusChange = async (newStatus) => {
    if (newStatus === ticket.status) return;
    setUpdating(true);
    setError('');

    try {
      await updateTicket(ticket._id, { status: newStatus });
      onStatusUpdated(`Ticket ${ticket.ticketId} status changed to ${newStatus}`);
    } catch (err) {
      setError(err.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const formattedDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Ticket Details — ${ticket.ticketId}`}
      description="View full information and update ticket status"
      size="md"
    >
      <div className="space-y-4">
        {error && <Alert variant="error">{error}</Alert>}

        {/* Top Badges & Subject */}
        <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              {ticket.ticketId}
            </span>
            <div className="flex items-center gap-2">
              <PriorityBadge priority={ticket.priority} />
              <StatusBadge status={ticket.status} />
            </div>
          </div>
          <h3 className="text-base font-bold text-slate-800">{ticket.subject}</h3>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm bg-white rounded-lg border border-slate-200 p-4">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Customer Name</p>
            <p className="font-medium text-slate-800 mt-0.5">{ticket.customerName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Customer Email</p>
            <p className="font-medium text-slate-800 mt-0.5">{ticket.customerEmail}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Created At</p>
            <p className="text-slate-600 mt-0.5">{formattedDate(ticket.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Last Updated</p>
            <p className="text-slate-600 mt-0.5">{formattedDate(ticket.updatedAt)}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500 mb-1.5">Description</p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
            {ticket.description}
          </div>
        </div>

        {/* Change Status Buttons */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-semibold uppercase text-slate-500 mb-2">Change Ticket Status:</p>
          <div className="flex flex-wrap items-center gap-2">
            {['Open', 'In Progress', 'Resolved'].map((st) => (
              <button
                key={st}
                type="button"
                disabled={updating || ticket.status === st}
                onClick={() => handleStatusChange(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                  ticket.status === st
                    ? 'bg-slate-800 text-white border-slate-800 cursor-default'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {ticket.status === st ? `✓ ${st}` : `Mark as ${st}`}
              </button>
            ))}
            {updating && <Spinner className="h-4 w-4 text-indigo-600 ml-2" />}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onDeleteClicked(ticket)}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline"
          >
            Delete this ticket
          </button>
          <button type="button" onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TicketDetailsModal;
