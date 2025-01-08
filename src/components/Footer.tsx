import React from "react";
import { JakartaRegular, JakartaBold, JakartaSemiBold } from "@/fonts";

const Footer = () => {
	return (
		<footer className={`${JakartaRegular.className} h-[120px] bg-white py-10 px-4 border-t border-gray-200`}>
			<div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center">
				
				{/* Left Section */}
				<div className="mb-8 lg:mb-0">
					<h2 className={`text-3xl text-blue-600 ${JakartaBold.className}`}>Easy Rent</h2>
					<p className="text-gray-500 mt-2">
						Our vision is to provide convenience and help increase your sales
						business.
					</p>
				</div>
				
				{/* Center Section */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
					{/* About */}
					<div>
						<h3 className={`text-xl text-gray-800 mb-4 ${JakartaSemiBold.className}`}>About</h3>
						<ul className="space-y-2 text-gray-500">
							<li>
								<a href="#" className="hover:text-gray-800">
									How it works
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-800">
									Featured
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-800">
									Partnership
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-800">
									Business Relation
								</a>
							</li>
						</ul>
					</div>
					
					{/* Community */}
					<div>
						<h3 className={`text-xl text-gray-800 mb-4 ${JakartaSemiBold.className}`}>Community</h3>
						<ul className="space-y-2 text-gray-500">
							<li>
								<a href="#" className="hover:text-gray-800">
									Events
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-800">
									Blog
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-800">
									Podcast
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-800">
									Invite a friend
								</a>
							</li>
						</ul>
					</div>
					
					{/* Socials */}
					<div>
						<h3 className={`text-xl text-gray-800 mb-4 ${JakartaSemiBold.className}`}>Socials</h3>
						<ul className="space-y-2 text-gray-500">
							<li>
								<a href="#" className="hover:text-gray-800">
									Discord
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-800">
									Instagram
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-800">
									Twitter
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-800">
									Facebook
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
			{/* Bottom Section */}
			{/*<div className="container mx-auto flex flex-col lg:flex-row justify-between items-center mt-8 border-t border-gray-200 pt-6">*/}
			{/*	<p className="text-sm text-gray-500">*/}
			{/*		©2022 Easy Rent. All rights reserved*/}
			{/*	</p>*/}
			{/*	<div className="flex space-x-4 mt-4 lg:mt-0">*/}
			{/*		<a href="#" className="text-gray-500 hover:text-gray-800">*/}
			{/*			Privacy & Policy*/}
			{/*		</a>*/}
			{/*		<a href="#" className="text-gray-500 hover:text-gray-800">*/}
			{/*			Terms & Condition*/}
			{/*		</a>*/}
			{/*	</div>*/}
			{/*</div>*/}
		</footer>
	);
};

export default Footer;
