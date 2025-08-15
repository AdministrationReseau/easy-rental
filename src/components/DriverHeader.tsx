import Image from "next/image";
import { Shield, CalendarIcon, Mail, Phone, MapPin } from "lucide-react";
import { DriverProps} from "@/utils/types/DriverProps"; // Adjust the import path as needed

interface DriverProfileProps {
	requestedDriver: DriverProps;
	differenceEnAnnees: (date: Date) => number;
}

const DriverProfile: React.FC<DriverProfileProps> = ({ requestedDriver, differenceEnAnnees }) => {
	return (
		<div className="w-full my-4 border-b border-gray-400 justify-between flex md:flex-row flex-col px-6 items-center">
			<div className="flex flex-row md:items-center justify-between">
				<Image
					src={requestedDriver.profile_picture || "/default-driver.png"}
					width={300}
					height={300}
					alt={requestedDriver.first_name}
					className="w-[100px] h-[100px] rounded-full object-cover ring-2 ring-blue-500 ring-offset-2 mr-4 my-3"
				/>

				<div>
					<h4>
						<p className="font-medium text-[20px] md:text-[40px]">
							{requestedDriver.first_name} {requestedDriver.last_name}
						</p>
					</h4>
					<div className="flex flex-col md:flex-row items-center">q
						<InfoItem icon={<Shield className="h-4 w-4 text-primary-text" />} label="Experience" value={`${differenceEnAnnees(requestedDriver.created_at)} year(s)`} />
						<InfoItem icon={<CalendarIcon className="h-4 w-4 text-primary-text" />} label="Age" value={`${requestedDriver.age} years old`} />
						<InfoItem icon={<Mail className="h-4 w-4 text-primary-text" />} label="Email" value={requestedDriver.email} />
						<InfoItem icon={<Phone className="h-4 w-4 text-primary-text" />} label="Phone" value={requestedDriver.phone} />
						<InfoItem icon={<MapPin className="h-4 w-4 text-primary-text" />} label="Address" value={requestedDriver.address} />
					</div>
				</div>
			</div>

			<button className="border-primary-blue text-primary-blue h-[40px] rounded-lg p-2 border-2 hover:bg-primary-blue hover:text-white">
				Action
			</button>
		</div>
	);
};

interface InfoItemProps {
	icon: React.ReactNode;
	label: string;
	value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
	<div className="mr-4">
		<div className="flex flex-row">
			{icon}
			<p className="text-sm text-primary-text ml-1">{label}</p>
		</div>
		<p className="text-sm text-secondary-text">{value}</p>
	</div>
);

export default DriverProfile;
