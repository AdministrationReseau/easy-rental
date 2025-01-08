// import React from "react";

// interface FeatureProps {
//   name: string;
//   checked: boolean;
// }

// const CheckboxOne: React.FC<FeatureProps> = ({ name, checked }) => (
//   <div className="flex items-center space-x-2">
//     <input type="checkbox" className="w-4 h-4" checked={checked} disabled />
//     <label className="text-sm">{name}</label>
//   </div>
// );

// const CarFeatures: React.FC<{ vehicleFeatures: Record<string, boolean> }> = ({ vehicleFeatures }) => {
//   const features = [
//     "Air Condition",
//     "Child Seat",
//     "GPS",
//     "USB Input",
//     "Bluetooth",
//     "Luggage",
//     "Seat Belt",
//     "Sleeping Bed",
//     "Water",
//     "Audio Input",
//     "Onboard Computer",
//     "Additional Covers",
//   ];

//   const isValidFeaturesObject = vehicleFeatures && typeof vehicleFeatures === 'object';

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-3 gap-4 text-gray-500">
//       {features.map((feature, index) => (
//         <CheckboxOne 
//           key={index} 
//           name={feature} 
//           checked={isValidFeaturesObject ? vehicleFeatures[feature.toLowerCase().replace(/ /g, '_')] : false} 
//         />
//       ))}
//     </div>
//   );
// };

// export default CarFeatures;
