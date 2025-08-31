import React from 'react';
import type { ColumnOption, ColumnConfig } from '../../types/types';
import './ColumnModal.css';

interface ColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableColumns: ColumnOption[];
  selectedColumns: ColumnConfig;
  onColumnsChange: (newConfig: ColumnConfig) => void;
}

export const ColumnModal: React.FC<ColumnModalProps> = ({
  isOpen,
  onClose,
  availableColumns,
  selectedColumns,
  onColumnsChange,
}) => {
  if (!isOpen) return null;

  const handleColumnToggle = (columnId: string) => {
    const newConfig = {
      ...selectedColumns,
      [columnId]: !selectedColumns[columnId],
    };
    onColumnsChange(newConfig);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="column-modal-overlay" onClick={handleOverlayClick}>
      <div className="column-modal">
        <div className="column-modal-header">
          <h3>Select Columns to Display</h3>
          <button
            className="column-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="column-modal-body">
          <div className="column-options">
            {availableColumns.map((column) => (
              <label key={column.id} className="column-option">
                <input
                  type="checkbox"
                  checked={selectedColumns[column.id]}
                  onChange={() => handleColumnToggle(column.id)}
                  className="column-checkbox"
                />
                <div className="column-info">
                  <span className="column-label">{column.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="column-modal-footer">
          <button className="column-modal-button secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="column-modal-button primary" onClick={onClose}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnModal;
