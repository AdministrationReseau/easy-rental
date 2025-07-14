import React from 'react';
import Image from "next/image";
import {Gift} from "lucide-react";

function ProfileHeader() {
	return (
		<main className="flex-grow -mb-3">

			{/* Profile Header */}
			<div className=" relative">
				{/* Background image */}
				<div className="w-full -z-2 h-16 bg-[url('/bannerSettings.svg')] bg-repeat rounded-t-lg"></div>

				<div className="flex flex-row">
					<div className="flex flex-col md:flex-row items-center p-6 rounded-lg -mt-16 md:ml-14 relative">
						{/* Profile Image */}
						<div className="relative">
							<div
								className="relative w-[100px] h-[100px] rounded-full overflow-hidden border-8 border-blue-400 shadow-lg">
								<Image
									src="/personne2.png"
									alt="Profile"
									width={150}
									height={150}
									className="w-full h-full object-cover bg-gray-100"
								/>
							</div>
							<div
								className="absolute bottom-2 right-2 bg-primary-blue w-8 h-8 z-10 rounded-full flex items-stretch justify-center">
								<button>
									<Image
										src="/CameraIcon.svg"
										alt="share button"
										height={14}
										width={14}
									/>
								</button>
							</div>
						</div>
					</div>

					<div className="md:ml-10 -mt-4">
						<div>
							{/* Name and Information */}
							<h2 className="text-lg font-semibold text-primary-text mt-4">
								Mobina Mirbagheri
							</h2>
							<div className="flex justify-left items-center text-sm text-green-600">
								<Gift className="w-4 h-4 mr-2" />
								<span>
                  Bonus Points :  50 points
                </span>
							</div>
						</div>
					</div>
				</div>
			</div>

		</main>
	);
}

export default ProfileHeader;