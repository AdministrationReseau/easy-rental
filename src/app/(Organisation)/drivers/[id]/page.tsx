'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DriverDetail from '@/components/organisation/DriverDetail';
import { DriverProps } from '@/utils/types/DriverProps';

export default function ResourceProfilPage() {
    const [drivers, setDrivers] = useState<DriverProps[]>([]);

    useEffect(() => {
        const fetchDrivers = async () => {
        try {
            const response = await fetch("/data/drivers.json");
            if (!response.ok) {
            throw new Error("Failed to fetch drivers");
            }
            const data: DriverProps[] = await response.json();
            setDrivers(data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
        };

        fetchDrivers();
    }, []);

    const { id } = useParams<{ id: string}>();
    const driverId = Number(id);

    if (isNaN(driverId)) {
        return <div>Invalid vehicle ID</div>
    }

    const requestedDriver = drivers.find(driver => driver.id === driverId);

    if (!requestedDriver) {
        return <div>Invalid driver ID</div>
    }

    return <DriverDetail driver={requestedDriver} />
}