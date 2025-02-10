"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const trajetData = {
  "geofence_id": "hospital_route",
  "points": [
    { "latitude": 4.051056, "longitude": 9.767868 },
    { "latitude": 4.052300, "longitude": 9.770000 },
    { "latitude": 4.053500, "longitude": 9.775000 },
    { "latitude": 4.055000, "longitude": 9.780000 }
  ]
};

export default function Map() {
  const [mounted, setMounted] = useState(false);
  const [mapKey, setMapKey] = useState(0); // Clé unique pour éviter le problème

  useEffect(() => {
    setMounted(true);
    setMapKey((prev) => prev + 1); // Force le rechargement propre de la carte
  }, []);

  if (!mounted) return null; // Empêche le rendu initial côté serveur

  const path: LatLngTuple[] = trajetData.points.map(
    (point) => [point.latitude, point.longitude] as LatLngTuple
  );

  return (
    <MapContainer key={mapKey} center={path[0]} zoom={15} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
}
