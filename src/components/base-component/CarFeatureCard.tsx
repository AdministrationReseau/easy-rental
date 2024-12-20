// import { CarProps } from "@/utils/types/CarProps";
// import React, { useState } from "react";

// const CarFeatureCard: React.FC<{vehicle : CarProps}> = ({ vehicle }) => {
//   if (!vehicle) {
//     return <p>Loading...</p>;
//   }

//   const [currentImage, setCurrentImage] = useState(vehicle.images[0]);

//   return (
//     <div className="px-2 w-full">
//       {/* Main Image Section */}
//       <div
//         className="relative bg-cover bg-center min-h-[300px] min-w-[500px] rounded-lg shadow-lg w-full"
//         style={{ backgroundImage: `url(${currentImage})` }}
//       ></div>

//       {/* Thumbnail Images Section */}
//       <div className="flex justify-around mt-6 w-full  gap-6">
//         {vehicle.images.slice(0, 3).map((image, index) => (
//           <div
//             key={index}
//             className="relative bg-cover bg-center w-36 h-40 rounded-lg cursor-pointer"
//             style={{ backgroundImage: `url(${image})` }}
//             onClick={() => setCurrentImage(image)}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CarFeatureCard;
