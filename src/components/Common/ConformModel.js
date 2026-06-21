import React from 'react';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1" style={{ backdropFilter: 'blur(2px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-dark">{title}</h5>
          </div>
          <div className="modal-body">
            <p className="text-secondary small">{message}</p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button type="button" className="btn btn-sm btn-light" onClick={onCancel}>Cancel</button>
            <button type="button" className="btn btn-sm btn-danger" onClick={onConfirm}>Confirm Actions</button>
          </div>
        </div>
      </div>
    </div>
  );
}