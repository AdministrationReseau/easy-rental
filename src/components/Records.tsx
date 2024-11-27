"use client";
import React from 'react';

const Records: React.FC = () => {
    const stats = [
        { value: '73M+', label: 'Developers' },
        { value: '100M+', label: 'Public repositories' },
        { value: '1000s', label: 'Open source projects' },
        { value: '1B+', label: 'Contributors' },
        { value: '90+', label: 'Top Forbes companies' },
        { value: '4M+', label: 'Organizations' },
    ];

    return (
        <div className="records-component bg-blue-100 p-16">
            <div className="grid max-w-screen-xl grid-cols-2 gap-8 mx-auto sm:grid-cols-3 xl:grid-cols-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center"
                    >
                        <dt className="mb-2 text-3xl font-extrabold">{item.value}</dt>
                        <dd className="text-gray-500 dark:text-gray-400">{item.label}</dd>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Records;
