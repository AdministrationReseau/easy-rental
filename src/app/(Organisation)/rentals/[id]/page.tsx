"use client";
import React, { useState } from 'react';
import {
    KeyIcon
} from 'lucide-react';

interface DocumentProps {
    registration_certificate?: string;
    technical_inspection?: string;
    insurance?: string;
    tax_sticker?: string[];
}

interface DocumentListProps {
    documents?: DocumentProps;
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
    // Initialize state outside of any conditional logic
    const [modalOpen, setModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string>("");

    if (!documents) return null; // Handle the undefined case

    // Function to open the modal with the PDF
    const openPdfModal = (pdfUrl: string) => {
        setPdfUrl(pdfUrl);  // Set the PDF URL in the state
        setModalOpen(true);  // Open the modal
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
        setPdfUrl("");  // Reset the PDF URL
    };

    const documentLabels: { [key: string]: string } = {
        registration_certificate: "Registration Certificate",
        technical_inspection: "Technical Inspection",
        insurance: "Insurance",
        tax_sticker: "Tax Sticker"
    };

    return (
        <>
            {/* Modal to display the PDF */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <button onClick={closeModal} className="text-red-500">Close</button>
                        <iframe
                            src={pdfUrl}
                            width="600"
                            height="400"
                            title="PDF Viewer"
                            frameBorder="0">
                        </iframe>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {Object.entries(documents).map(([key, value], index) => (
                    <div key={index}
                         className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                            <KeyIcon className="h-5 w-5 text-gray-500"/>
                            <span>{documentLabels[key] || key}</span>
                        </div>
                        <div className="text-right">
                            {Array.isArray(value) ? (
                                value.map((v, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span>{v}</span>
                                        <button
                                            onClick={() => openPdfModal(v)} // Pass the PDF link to the function
                                            className="text-blue-500 hover:text-blue-600 ml-4">
                                            View
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <button
                                    onClick={() => openPdfModal(value)}  // Open the modal with the PDF URL
                                    className="text-blue-500 hover:text-blue-600">
                                    View
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
