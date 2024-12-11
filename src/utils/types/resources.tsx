export interface Driver {
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    license_number: string;
    license_type: string;
    address: string;
    phone: string;
    email: string;
    vehicle_assigned: {
        id: number;
        make: string;
        model: string;
        year: number;
    };
    rating: number;
    insurance_provider: string;
    insurance_policy: string;
    profile_picture: string;
}

export interface Vehicle {
    id: number;
    type: string;
    brand: string;
    model: string;
    year: number;
    passenger: number;
    pricePerDay: number;
    vin: string;
    engine: {
        type: string;
        horsepower: number;
        capacity: number;
    };
    transmission: string;
    color: string;
    fuel_efficiency: {
        city: number;
        highway: number;
    };
    license_plate: string;
    registration: {
        state: string;
        expiry: string;
    };
    owner: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
    service_history: {
        date: string;
        service_type: string;
        mileage: number;
        provider: string;
    }[];
    insurance: {
        provider: string;
        policy_number: string;
        expiry: string;
    };
    images: string[];
}