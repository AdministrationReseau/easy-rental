// components/ContentBox.tsx
import React from 'react';
import { useRouter } from 'next/router';

type ContentBoxProps = {
	children: React.ReactNode;
};

const ContentBox: React.FC<ContentBoxProps> = ({ children }) => {
	const router = useRouter();

	const goBack = () => {
		router.back(); // This will navigate back to the previous page in the history stack
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md relative">
			<div className="absolute top-4 left-4">
				<button onClick={goBack} className="text-blue-500 hover:text-blue-700">
					&larr; Go Back
				</button>
			</div>
			<div className="absolute top-4 right-4">
				<button onClick={goBack} className="text-gray-500 hover:text-gray-700">
					&times;
				</button>
			</div>
			<div className="mt-8">{children}</div>
		</div>
	);
};

export default ContentBox;
