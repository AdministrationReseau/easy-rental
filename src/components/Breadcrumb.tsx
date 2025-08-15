// components/Breadcrumb.tsx
import React from 'react';

type BreadcrumbItem = {
	title: string;
	link: string;
};

type BreadcrumbProps = {
	items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
	return (
		<nav className="bg-blue-500 text-white p-4">
			<ol className="list-reset flex">
				{items.map((item, index) => (
					<li key={index} className="flex items-center">
						{index > 0 && <span className="mx-2">/</span>}
						<a href={item.link} className="hover:underline">
							{item.title}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
