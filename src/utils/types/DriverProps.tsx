export interface DriverProps{
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    license_number:  string;
    license_type:  string;
    address:  string;
    phone:  string;
    email:  string;
    location: string;
    vehicle_assigned: {
        id: number;
        make:  string;
        model:  string;
        year: number;
    };
    rating: number;
    insurance_provider:  string;
    insurance_policy:  string;
    profile_picture:  string;
}
