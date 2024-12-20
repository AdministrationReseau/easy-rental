
export interface CarProps {
    id: number;
    type: string;
    brand: string;
    model: string;
    year: Date;
    rating: number;
    passenger: number;
    description:string[];
    pricePerDay: number;
    vin: string;
    fonctionnalities:{
        air_condition:boolean;
        usb_input: boolean;
        seat_belt: boolean;
        audio_input: boolean;
        child_seat: boolean;
        bluetooth: boolean;
        sleeping_bed: boolean;
        onboard_computter: boolean;
        gps: boolean;
        luggage: boolean;
        water: boolean;
        additionnal_covers:boolean;
    }
    engine: {
        type: string;
        horsepower: number;
        capacity: number;
    };
    transmission: string;
    color: string;
    fuel_efficiency:{
        city: string;
        highway: string;
    };
    license_plate: string;
    registration: {
        state: string;
        expiry: Date;
      };
    owner: {
        name: string;
        address: string;
        phone: string;
        email: string;
      },
    service_history: 
        {
          date: Date;
          service_type: string;
          mileage: number;
          provider: string;
        }[]
      ;
    insurance: {
        provider: string;
        policy_number: string;
        expiry: Date;
      },
    images: string[];
    reviews: 
        {
          reviewer: string;
          comment: string;
          rating: number;
        }[];
    onLike: (id: number) => void;
    onDislike: (id: number) => void;


}


export interface FilterVehicleProps {
  type: string[];
  capacity: number | null;
  priceRange: [number, number];
}

export interface VehicleListProps {
  vehicles: CarProps[];
  filters: FilterVehicleProps
}