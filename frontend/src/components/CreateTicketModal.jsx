import { useState } from 'react';
import Modal from './Modal';
import { Alert, Spinner } from './Ui';
import { createTicket } from '../api/ticketApi';

const INITIAL_FORM = {
  customerName: '',
  customerEmail: '',
  subject: '',
  description: '',
  priority: 'Medium',
};

export const CreateTicketModal = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.customerName.trim()) {
      return 'Customer name is required';
    }
    if (!form.customerEmail.trim()) {
      return 'Customer email is required';
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.customerEmail.trim())) {
      return 'Please enter a valid email address';
    }
    if (!form.subject.trim()) {
      return 'Subject is required';
    }
    if (!form.description.trim()) {
      return 'Description is required';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const response = await createTicket({
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim().toLowerCase(),
        subject: form.subject.trim(),
        description: form.description.trim(),
        priority: form.priority,
      });

      setForm(INITIAL_FORM);
      onSuccess(response.message || 'Ticket created successfully!');
    } catch (err) {
      setError(err.message || 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setError('');
    setForm(INITIAL_FORM);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create New Support Ticket"
      description="Fill in the customer details and issue description. Status will default to Open."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert variant="error">{error}</Alert>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="customerName">
              Customer Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="customerName"
              name="customerName"
              className="input"
              placeholder="e.g. Rahul Sharma"
              value={form.customerName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="customerEmail">
              Customer Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="customerEmail"
              name="customerEmail"
              type="email"
              className="input"
              placeholder="customer@example.com"
              value={form.customerEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="subject">
              Subject <span className="text-rose-500">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              className="input"
              placeholder="Brief summary of the issue"
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="input"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="description">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="input resize-none"
            placeholder="Detailed description of the customer issue..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClose}
            className="btn-secondary"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Spinner className="h-4 w-4" /> Creating...
              </span>
            ) : (
              'Submit Ticket'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTicketModal;
