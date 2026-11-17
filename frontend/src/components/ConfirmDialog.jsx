import Modal from './Modal';

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  loading = false,
  onCancel,
  onConfirm,
}) => (
  <Modal open={open} title={title} description={description} onClose={onCancel} size="sm">
    <div className="flex justify-end gap-3">
      <button type="button" className="btn-secondary" onClick={onCancel} disabled={loading}>
        Cancel
      </button>
      <button type="button" className="btn-danger" onClick={onConfirm} disabled={loading}>
        {loading ? 'Please wait…' : confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;
