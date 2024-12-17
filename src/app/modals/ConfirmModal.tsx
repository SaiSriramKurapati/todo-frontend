'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  // Method to close the modal when clicked anywhere else
  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div className="bg-[#262626] p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex gap-4 justify-end mt-10">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 px-5 py-1.5 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-1.5 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
