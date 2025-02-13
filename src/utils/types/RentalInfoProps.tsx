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