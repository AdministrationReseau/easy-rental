import React from "react";
import Image from "next/image"

interface Option {
    name: string;
    icon: string;
}

interface ComboBoxProps {
    options: Option[]; // Liste des options
    onChange: (value: string) => void; // Callback à appeler lors du changement de sélection
    width?: string; // Largeur personnalisée
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, onChange, width = "100%" }) => {
    const [selectedValue, setSelectedValue] = React.useState<string>("");

    const handleChange = (value: string) => {
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <div
            className={`space-y-4 w-full`}
            style={{
                maxWidth: width,
                margin: "0 auto",
            }}
        >
            {options.map((option) => (
                <div
                    key={option.name}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                        selectedValue === option.name
                            ? "bg-primary-blue text-white border-primary-blue"
                            : "bg-whitish-background text-primary-text border-gray-200"
                    } cursor-pointer transition-all`}
                    onClick={() => handleChange(option.name)}
                >
                    {/* Radio Button */}
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="payment-option"
                            value={option.name}
                            checked={selectedValue === option.name}
                            onChange={() => handleChange(option.name)}
                            className="w-5 h-5 text-primary-blue focus:ring-primary-blue focus:ring-2"
                        />
                        <span className="ml-3 font-medium">{option.name}</span>
                    </label>

                    {/* Icon */}
                    <Image
                        src={option.icon}
                        alt={option.name}
                        width={100}
                        height={100}
                        className="w-auto h-10 max-w-15"
                    />
                </div>
            ))}
        </div>
    );
};

export default ComboBox;
