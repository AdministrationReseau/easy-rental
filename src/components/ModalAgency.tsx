import React, { ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

const ModalAgency: React.FC<ModalProps> = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalAgency;
