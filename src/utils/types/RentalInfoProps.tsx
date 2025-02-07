import { ReactNode } from "react";
import { DateValue } from "react-aria-components";

export interface rentalInfoProps {
    pickUpDate: DateValue | string | ReactNode | Date;
    pickUpTime: string;
    pickUpPlace: string;
    backOffDate: DateValue | string | ReactNode;
    backOffTime: string;
    backOffPlace: string;
    billingName: string;
    billingPhone: string;
    billingAddress: string;
    billingCity: string;
    paymentMethod: string;
    driverName: string | undefined;
    promoCode: string;
}

export interface LocationProps {
    id: string;
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
    driver: {
        driver_id: number;
    }
    pick_up_date:  Date;
    pick_up_time: string;
    pick_up_place: string;
    drop_off_date: Date;
    drop_off_time: string;
    drop_off_place: string;
    payment_method: string;
    promo_formula:number;
    date: string;
    price: string;
}