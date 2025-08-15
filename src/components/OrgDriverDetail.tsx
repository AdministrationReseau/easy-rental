import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserIcon, KeyIcon, List, Mail, MapPin, Car, Shield } from "lucide-react";
import {DriverProps} from "@/utils/types/DriverProps";
import {RatingStars} from "@/components/RatingStars";

interface DriverCardProps {
	requestedDriver: DriverProps;
}

const OrgDriverDetail: React.FC<DriverCardProps> = ({ requestedDriver }) => {
	return (
		<Card className="hover:shadow-lg transition-shadow duration-300 w-[60%] mt-4">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 justify-between">
					<div className="flex flex-row">
						<UserIcon className="h-5 w-5 text-blue-500 mr-2" />
						Driver Information
					</div>
					<RatingStars rating={requestedDriver?.rating} />
				</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="space-y-4 text-md text-gray-500">
					<InfoItem icon={<KeyIcon className="h-4 w-4 text-primary-text mr-2" />} label="License Number" value={requestedDriver.license_number} />
					<InfoItem icon={<List className="h-4 w-4 text-primary-text mr-2" />} label="License Type" value={requestedDriver.license_type} />
					<InfoItem icon={<Mail className="h-4 w-4 text-primary-text mr-2" />} label="Email" value={requestedDriver.email} />
					<InfoItem icon={<MapPin className="h-4 w-4 text-primary-text mr-2" />} label="Address" value={requestedDriver.address} />
					{requestedDriver.location && (
						<InfoItem icon={<MapPin className="h-4 w-4 text-primary-text mr-2" />} label="Location" value={requestedDriver.location} />
					)}

					{requestedDriver.vehicle_assigned && (
						<div className="pt-4">
							<p className="flex flex-row items-center">
								<Car className="h-4 w-4 text-primary-text mr-2" />
								<strong>Assigned Vehicles:</strong>
							</p>
							{requestedDriver.vehicle_assigned.length > 0 ? (
								requestedDriver.vehicle_assigned.map((vehicle, key) => (
									<p key={key} className="pl-6">
										{vehicle.brand} {vehicle.model} ({vehicle.year})
									</p>
								))
							) : (
								<p className="pl-6">Not any</p>
							)}
						</div>
					)}

					<div className="pt-4">
						<InfoItem icon={<Shield className="h-4 w-4 text-primary-text mr-2" />} label="Insurance Provider" value={requestedDriver.insurance_provider || "N/A"} />
						<InfoItem icon={<Shield className="h-4 w-4 text-primary-text mr-2" />} label="Insurance Policy Number" value={requestedDriver.insurance_policy || "N/A"} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

interface InfoItemProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
	<p className="flex flex-row items-center">
		{icon}
		<strong>{label}: </strong> {value}
	</p>
);

export default OrgDriverDetail;
