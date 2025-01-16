"use client";

import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DefaultIcon = L.icon({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

L.Marker.prototype.options.icon = DefaultIcon;

const SchoolMap: React.FC = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const mapInstance = mapRef.current;
            const zoom = 30;
            const schoolName = "Ecole Nationale Supérieure Polytechnique Yaoundé";
            const googleMapsLink = `https://www.google.com/maps/place/National+Advanced+School+of+Engineering,Yaounde/@3.8624558,11.4974156,17z/data=!3m1!4b1!4m6!3m5!1s0x108bcfa23aace247:0xe07671abb10169f9!8m2!3d3.8624558!4d11.4999959!16s%2Fg%2F1218f54p?entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoASAFQAw%3D%3D`;


            const map = L.map(mapInstance).setView([3.8626, 11.4992], zoom);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker([3.8631, 11.4991]).addTo(map).bindPopup(
                `<a href="${googleMapsLink}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">${schoolName}</a>`
            );

            // Clean up the map instance when the component unmounts
            return () => {
                map.remove();
            };
        }
    }, []);

    return (
        <div className="mx-4 mb-3">
            <div ref={mapRef} className="mx-auto w-[95%] h-[400px]" />
        </div>
    );
};

export default SchoolMap;
