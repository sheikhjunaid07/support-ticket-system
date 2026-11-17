import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import TicketSummaryCards from '../components/TicketSummaryCards';
import CreateTicketModal from '../components/CreateTicketModal';
import TicketDetailsModal from '../components/TicketDetailsModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { PriorityBadge, Alert, PageLoader, EmptyState } from '../components/Ui';
import {
  fetchTickets,
  fetchTicketStats,
  updateTicket,
  deleteTicket,
} from '../api/ticketApi';

const STATUS_FILTERS = ['All', 'Open', 'In Progress', 'Resolved'];

export const DashboardPage = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Feedback alerts
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailsModalTicket, setDetailsModalTicket] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // Load tickets and dashboard summary stats
  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [ticketsRes, statsRes] = await Promise.all([
        fetchTickets({
          status: selectedStatus,
          search: searchQuery,
        }),
        fetchTicketStats(),
      ]);

      setTickets(ticketsRes.tickets || []);
      setStats(statsRes);
    } catch (err) {
      console.error('Failed to load tickets:', err);
      setError(err.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, searchQuery]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Show auto-dismissing success message
  const triggerSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 4000);
  };

  // Change ticket status directly from table
  const handleInlineStatusChange = async (ticketId, newStatus) => {
    setUpdatingStatusId(ticketId);
    setError('');

    try {
      await updateTicket(ticketId, { status: newStatus });
      triggerSuccess(`Status updated to "${newStatus}"`);
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to update status');
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // Delete ticket handler
  const handleDeleteTicket = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    setError('');

    try {
      const res = await deleteTicket(deleteTarget._id);
      triggerSuccess(res.message || 'Ticket deleted successfully');
      setDeleteTarget(null);
      if (detailsModalTicket?._id === deleteTarget._id) {
        setDetailsModalTicket(null);
      }
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to delete ticket');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Ticket Management Dashboard</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Admin control panel to create, view, update status and delete customer support tickets
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="btn-primary self-start sm:self-auto py-2.5 px-4"
          >
            <span className="text-base mr-1">+</span> Create Ticket
          </button>
        </div>

        {/* Global Feedback Alerts */}
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="error">{error}</Alert>}

        {/* 1. Ticket Summary Cards */}
        <TicketSummaryCards stats={stats} />

        {/* 2. Ticket Filtering & Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
              {STATUS_FILTERS.map((status) => {
                const isActive = selectedStatus === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition ${
                      isActive
                        ? 'bg-white text-indigo-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {status}
                    {status === 'All' && ` (${stats.total})`}
                    {status === 'Open' && ` (${stats.open})`}
                    {status === 'In Progress' && ` (${stats.inProgress})`}
                    {status === 'Resolved' && ` (${stats.resolved})`}
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative sm:w-72">
              <input
                type="search"
                className="input py-1.5 text-xs"
                placeholder="Search ticket ID, customer, subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 3. Ticket List Table */}
          {loading ? (
            <PageLoader label="Loading tickets..." />
          ) : tickets.length === 0 ? (
            <EmptyState
              title={`No ${selectedStatus !== 'All' ? selectedStatus.toLowerCase() : ''} tickets found`}
              description="No support tickets match the current filter. Click Create Ticket to add one."
              action={
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(true)}
                  className="btn-primary mt-2 text-xs py-2 px-3.5"
                >
                  + Create Ticket
                </button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3">Ticket ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map((ticket) => (
                    <tr key={ticket._id} className="hover:bg-slate-50/70 transition">
                      {/* Ticket ID */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                          {ticket.ticketId}
                        </span>
                      </td>

                      {/* Customer Name & Email */}
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-slate-900">{ticket.customerName}</div>
                        <div className="text-xs text-slate-500">{ticket.customerEmail}</div>
                      </td>

                      {/* Subject */}
                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="font-medium text-slate-800 truncate" title={ticket.subject}>
                          {ticket.subject}
                        </p>
                      </td>

                      {/* Priority */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <PriorityBadge priority={ticket.priority} />
                      </td>

                      {/* Status with Quick Change Selector */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <select
                          className="text-xs font-semibold rounded-lg border border-slate-300 bg-white px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          value={ticket.status}
                          disabled={updatingStatusId === ticket._id}
                          onChange={(e) => handleInlineStatusChange(ticket._id, e.target.value)}
                          title="Click to change ticket status"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>

                      {/* Created Date */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600">
                        {formatDate(ticket.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setDetailsModalTicket(ticket)}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                            title="View full ticket details"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(ticket)}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition"
                            title="Delete ticket"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={(msg) => {
          setCreateModalOpen(false);
          triggerSuccess(msg);
          loadData();
        }}
      />

      {/* View Ticket Details Modal */}
      <TicketDetailsModal
        open={Boolean(detailsModalTicket)}
        ticket={detailsModalTicket}
        onClose={() => setDetailsModalTicket(null)}
        onStatusUpdated={(msg) => {
          setDetailsModalTicket(null);
          triggerSuccess(msg);
          loadData();
        }}
        onDeleteClicked={(t) => {
          setDetailsModalTicket(null);
          setDeleteTarget(t);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Support Ticket"
        description={
          deleteTarget
            ? `Are you sure you want to permanently delete ticket ${deleteTarget.ticketId} ("${deleteTarget.subject}")? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete Ticket"
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteTicket}
      />
    </div>
  );
};

export default DashboardPage;
