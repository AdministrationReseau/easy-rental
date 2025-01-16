import React from 'react';

type ModalProps = {
  title?: string; // Titre optionnel
  children: React.ReactNode; // Contenu de la modale
  onClose: () => void; // Fonction de fermeture
};

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Boîte Modale */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
        {/* Titre (optionnel) */}
        {title && <h2 className="text-lg font-bold mb-4 text-gray-700">{title}</h2>}
        {/* Contenu */}
        <div>{children}</div>
        {/* Bouton de Fermeture */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
