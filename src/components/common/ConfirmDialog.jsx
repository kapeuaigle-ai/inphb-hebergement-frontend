import React from 'react';
import Modal from './Modal';
import { FaExclamationTriangle } from 'react-icons/fa';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, type = 'danger' }) => {
    const typeColors = {
        danger: 'bg-red-600 hover:bg-red-700',
        warning: 'bg-orange-500 hover:bg-orange-600',
        info: 'bg-blue-600 hover:bg-blue-700'
    };

    return (
        <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-gray-600 mb-8">{message}</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-preset"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-6 py-2 text-white rounded-lg transition-preset ${typeColors[type]}`}
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
