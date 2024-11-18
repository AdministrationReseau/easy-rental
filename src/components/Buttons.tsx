import React from 'react';
import { ProcessColor } from "@/utils/enum";
import {JakartaRegular} from "@/fonts";

interface ButtonProps {
    label: string;
    color: ProcessColor;
}

const Button: React.FC<ButtonProps> = ({ label, color }) => {
    const getColor = () => {
        switch (color) {
            case ProcessColor.PRIMARY:
                return 'bg-primary-blue';
            case ProcessColor.SECONDARY:
                return 'bg-secondary-blue';
            case ProcessColor.SUCCESS:
                return 'bg-green-500';
            case ProcessColor.DANGER:
                return 'bg-red-500';
            case ProcessColor.OUTPRIMARY:
                return 'border border-primary-blue text-primary-blue';
            default:
                return 'bg-primary-blue';
        }
    };

    return (
        <button className={`text-white font-bold w-[120px] h-[50px] py-[10px] px-[20px] rounded ${getColor()} ${JakartaRegular.className}`}>
            {label}
        </button>
    );
};

export default Button;
