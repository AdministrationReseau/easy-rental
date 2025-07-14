// context/BreadcrumbContext.tsx
'use client';
import React, { createContext, useContext, useState } from 'react';

type BreadcrumbItem = {
	title: string;
	link: string;
};

type BreadcrumbContextType = {
	breadcrumbItems: BreadcrumbItem[];
	setBreadcrumbItems: React.Dispatch<React.SetStateAction<BreadcrumbItem[]>>;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

	return (
		<BreadcrumbContext.Provider value={{ breadcrumbItems, setBreadcrumbItems }}>
			{children}
		</BreadcrumbContext.Provider>
	);
};

export const useBreadcrumb = () => {
	const context = useContext(BreadcrumbContext);
	if (context === undefined) {
		throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
	}
	return context;
};
