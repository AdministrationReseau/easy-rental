"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SchoolMap: React.FC = () => {
    const schoolName = "Ecole Nationale Supérieure Polytechnique Yaoundé";
    const googleMapsLink = `https://www.google.com/maps/place/National+Advanced+School+of+Engineering,Yaounde/@3.8624558,11.4974156,17z/data=!3m1!4b1!4m6!3m5!1s0x108bcfa23aace247:0xe07671abb10169f9!8m2!3d3.8624558!4d11.4999959!16s%2Fg%2F1218f54p?entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoASAFQAw%3D%3D`;

    return (
        <div className="mx-4 mb-3">
            <MapContainer
                center={[3.8626, 11.4992]}
                zoom={30}
                className="mx-auto w-[95%] h-[400px]"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[3.8626, 11.4992]}>
                    <Popup>
                        <a
                            href={googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            {schoolName}
                        </a>
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    );
};

export default SchoolMap;
