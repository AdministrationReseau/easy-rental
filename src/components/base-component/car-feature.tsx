import React from "react";
import CheckboxOne from "./CheckboxOne";

const CarFeatures = () => {
  return (
  
      <div>
       
    
            <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-3 gap-4 text-gray-500">
                <CheckboxOne name="Air Condition"/>
                <CheckboxOne name="Child Seat"/>
                <CheckboxOne name="GPS"/>
                <CheckboxOne name="USB Input"/>
                <CheckboxOne name="Bluetooth"/>
                <CheckboxOne name="Luggage"/>
                <CheckboxOne name="Seat Belt"/>
                <CheckboxOne name="Sleeping Bed"/>
                <CheckboxOne name="Water"/>
                <CheckboxOne name="Audio Input"/>
                <CheckboxOne name="Onboard Computer"/>
                <CheckboxOne name="Additional Covers"/>   
            </div>

       
        
    </div>
  );
};

export default CarFeatures;

