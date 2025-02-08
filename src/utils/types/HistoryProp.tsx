export interface TransactionProp {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    amount: string;
    status: string;
    icon: string;
}

export interface IntervalOfUse {
    startTime: string;
    endTime: string;
}

export interface PassedDriverLocation {
    id: string;
    date: string;
    time: string;
    latitude: number;
    longitude: number;
    address: string;
    vehicleId: string;
    vehicleModel: string;
    vehicleImage: string;
    intervalOfUse: IntervalOfUse;
}

export interface DriverHistory {
    driverId: number;
    driverName: string;
    driverProfilePicture: string;
    history: PassedDriverLocation[];
}
