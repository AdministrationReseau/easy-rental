// components/Layout.tsx
'use client';
import React from 'react';
import {FiSkipBack} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const goBack = () => {
		router.back(); // This will navigate back to the previous page in the history stack
	};

	return (
		<>
			<div className="mx-6 mb-7 p-6 rounded-lg shadow-md relative w-6/8">
				<div className="absolute m-3 top-0 left-0">
					<button onClick={goBack} className="p-3 rounded-[100%] bg-white text-blue-500 hover:text-blue-700">
						<FiSkipBack className="text-[15px] font-bold"/>
					</button>
				</div>
				<div className="absolute m-3 top-0 right-0">
					<Link href="/profile" className="h-[15px] w-[15px] font-bold px-3 py-1 rounded-[100%] bg-white hover:bg-red-200 text-[20px] text-gray-500 hover:text-gray-700">
						&times;
					</Link>
				</div>

				{children}
			</div>
		</>
	);
}
