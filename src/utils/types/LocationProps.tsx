import { GeofenceProps } from "./GeofenceProps";

export interface LocationProps {
    id: number;
    user: {
        user_id: number,
        user_name: string;
        user_phone: string;
        user_address: string;
        user_image: string;
    }
    vehicle:{
        vehicle_id: number;
    },
    driver?: {
        driver_id: number;
    }
    pick_up_date:  Date;
    pick_up_time?: string;
    pick_up_place: string;
    drop_off_date: Date;
    drop_off_time?: string;
    drop_off_place: string;
    payment_method: string;
    promo_formula:number;
    date: string;
    price: string;
    ride: GeofenceProps;
    // status:status;
    status: "pending"|"completed"|"validated";
}
