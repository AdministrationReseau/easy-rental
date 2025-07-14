"use client";
import { MyBarChart, MyBarChartDataItem } from '@/components/organisation/MyBarChart';
import { MyBarList, MyBarListDataItem } from '@/components/organisation/MyBarList';
import MyDonutChart, { DataItem } from '@/components/organisation/MyDonutChart';
import { CarProps } from '@/utils/types/CarProps';
import { DriverProps } from '@/utils/types/DriverProps';
import { LocationProps } from '@/utils/types/LocationProps';
import { CarRental, Money, Person } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

interface StatCardProps {
    title: string,
    value: string,
    icon: React.ReactNode,
    className?: string
}

interface TitleProps {
    icon: React.ReactNode
    title: string
}

const Title = ({icon, title}: TitleProps) => {
    return (
        <h3 className='w-full whitespace-nowrap truncate text-ellipsis flex gap-2 border border-primary-blue/50 text-primary-blue p-2 rounded-xl justify-center mb-4'>
            {icon}
            {title}
        </h3>
    );
}

const StatCard = ({title, value, icon, className}: StatCardProps) => {
    return (
      <div className={`text-lg flex flex-col items-center bg-white rounded-lg text-primary-blue p-2 border-t-2 border-primary-blue hover:bg-primary-blue/5 ${className}`}>
        <Title icon={icon} title={title} />
        <p className='text-xl font-bold'>{value}</p>
      </div>  
    );
}

const Dashboard = () => {
    const [drivers, setDrivers] = useState<DriverProps[]>([]);
    const [cars, setCars] = useState<CarProps[]>([]);
    const [locations, setLocations] = useState<LocationProps[]>([]);
    const [availableCarsData, setAvailableCarsData] = useState<DataItem[]>([]);
    const [availableDriversData, setAvailableDriversData] = useState<DataItem[]>([]);

    useEffect(() => {
        const nbAvailableDrivers: number = drivers.filter((driver) => driver.available).length;
        setAvailableDriversData([
            {
                name: "Availaible drivers",
                amount: nbAvailableDrivers,
            },
            {
                name: "Unavailable drivers",
                amount: drivers.length - nbAvailableDrivers,
            },
        ]);
    }, [drivers, setAvailableDriversData]);

    useEffect(() => {
        const nbAvailableCars: number = cars.filter((car) => car.available).length;
        setAvailableCarsData([
            {
                name: "Availaible cars",
                amount: nbAvailableCars
            },
            {
                name: "Unavailable cars",
                amount: cars.length - nbAvailableCars
            },
        ]);
    }, [cars, setAvailableCarsData]);
    
    
    useEffect(() => {
        fetch('/data/cars.json')
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            if (data && Array.isArray(data.vehicles)) {
                setCars(data.vehicles);
            } else {
                console.error('Unexpected data format:', data);
            }
            })
            .catch((error) => {
            console.error('Error loading vehicles:', error);
            });
    }, []);
        
    useEffect(() => {
        fetch('/data/drivers.json')
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            if (data && Array.isArray(data)) {
                setDrivers(data);
            } else {
                console.error('Unexpected data format:', data);
            }
            })
            .catch((error) => {
            console.error('Error loading drivers:', error);
            });
    }, []);

    useEffect(() => {
        fetch('/data/locations.json')
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            if (data && Array.isArray(data)) {
                setLocations(data);
            } else {
                console.error('Unexpected data format:', data);
            }
            })
            .catch((error) => {
            console.error('Error loading locations:', error);
            });
    }, []);

    const carsData: MyBarListDataItem[] = Object.values(
        locations.reduce((acc: Record<number, MyBarListDataItem>, item) => {
        const vehicleId = item.vehicle.id;
        const car: CarProps | undefined = cars.find((car: CarProps) => car.id === vehicleId);
        const carName: string = car ? ( (car.brand ?? '') + ' ' + (car.model ?? '') ) : `Car ${vehicleId}`;
        const locationPrice = isNaN(Number(item.price)) ? 0 : Number(item.price);
        if (!acc[vehicleId]) {
            acc[vehicleId] = { id: item.id, name: carName, value: 0, amount: 0, href: `/cars/${vehicleId}` };
        }
        acc[vehicleId].value += 1;
        acc[vehicleId].amount += locationPrice;
        return acc;
        }, {})
    ).sort((a, b) => b.value - a.value).slice(0, 5);

    const driversData: MyBarListDataItem[] = Object.values(
        locations.reduce((acc: Record<number, MyBarListDataItem>, item) => {
        
        if (item.driver) {
            const driverId = item.driver.id;
            const driver: DriverProps | undefined = drivers.find((driver: DriverProps) => driver.id === driverId);
            const driverName: string = driver ? (driver.first_name ?? '' + driver.last_name ?? '') : `Driver ${driverId}`;
            const locationPrice = isNaN(Number(item.price)) ? 0 : Number(item.price);
            
            if (!acc[driverId]) {
                acc[driverId] = { id: item.id, name: driverName, value: 0, amount: 0, href: `/drivers/${driverId}` };
            }
            acc[driverId].value += 1;
            acc[driverId].amount += locationPrice;
        }

        return acc;
        }, {})
    ).sort((a, b) => b.value - a.value).slice(0, 5);

    const currentMonthIndex = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        .slice(0, currentMonthIndex + 1);

    const locationsDetailsData: MyBarChartDataItem[] = months.map((month) => ({
        date: month,
        carsLocAmount: 0,
        driversLocAmount: 0,
    }))

    if (locations.length > 0) {
        locations.forEach((item) => {
            const month = item.date.split(" ")[1];
            const monthIndex = months.indexOf(month.slice(0, 3));
            
            const locAmount = isNaN(Number(item.price)) ? 0 : Number(item.price);
        
            if (monthIndex !== -1) {
                locationsDetailsData[monthIndex][item.driver ? "driversLocAmount" : "carsLocAmount"] += locAmount;
            }
        });
    }

    const [totalLocGain, setTotalLocGain] = useState<number>(0);

    useEffect(() => {
        const newTotalLocGain = locationsDetailsData.reduce((total, { carsLocAmount, driversLocAmount }) => {
            return total + carsLocAmount + driversLocAmount;
        }, 0);

        setTotalLocGain(newTotalLocGain);
    }, [locationsDetailsData]);

    return (
        <div className='h-full w-[100%] flex flex-col gap-4 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold'>Your statistics</h2>
                    <div className='text-gray-600 text-sm'>
                        Here are some data about your agency !
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex flex-col gap-8'>
                <div className='grid grid-cols-2 xl:grid-cols-3 gap-8 w-4/5 mx-auto'>
                    <StatCard title='Total Cars' value={`${cars.length}`} icon={<CarRental style={ {color: '#005FFE'} }/>} />
                    <StatCard title='Total Drivers' value={`${drivers.length}`} icon={<Person style={ {color: '#005FFE'} }/>} />
                    <StatCard title='Location Gain' value={`${totalLocGain} XAF`} icon={<Money style={ {color: '#005FFE'} }/>} className='w-4/5 mx-auto col-span-2 xl:col-span-1'/>
                </div>
                <div className='flex flex-col xl:flex-row gap-8 w-full justify-around items-center xl:items-start'>
                    <div className="w-4/5 xl:w-3/5 bg-white border-t-2 border-primary-blue py-4 px-8 rounded-lg hover:bg-primary-blue/5">
                        <Title icon={<Money style={ {color: '#005FFE'} }/>} title='Location Gain Details'/>
                        <MyBarChart data={locationsDetailsData} />
                    </div>
                    <div className="flex flex-col bg-white border-t-2 border-primary-blue p-4 px-8 rounded-lg hover:bg-primary-blue/5">
                        <Title
                            icon={<div>
                                <CarRental style={ {color: '#005FFE'} }/>
                                <Person style={ {color: '#005FFE'} }/>
                            </div>}
                            title='Cars and Drivers Details'
                        />
                        <div className='flex gap-16'>
                            <MyDonutChart title='Total Cars' data={availableCarsData} defaultValue={cars.length} />
                            <MyDonutChart title='Total Drivers' data={availableDriversData} defaultValue={drivers.length} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col xl:flex-row gap-8 w-11/12 mx-auto justify-around items-center xl:items-start'>
                    <div className="w-4/5 xl:w-3/5 bg-white border-t-2 border-primary-blue py-4 px-8 rounded-lg hover:bg-primary-blue/5">
                        <Title icon={<CarRental style={ {color: '#005FFE'} }/>} title='Cars Location Details'/>
                        <MyBarList data={carsData}/>
                    </div>
                    <div className="w-4/5 xl:w-3/5 bg-white border-t-2 border-primary-blue py-4 px-8 rounded-lg hover:bg-primary-blue/5">
                        <Title icon={<Person style={ {color: '#005FFE'} }/>} title='Drivers Location Details'/>
                        <MyBarList data={driversData}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;



// 'use client'
// import React from 'react'
// import { FiUsers, FiDollarSign, FiTruck, FiCalendar, FiTrendingUp, FiPieChart, FiUser } from 'react-icons/fi'
// // import { BarChart, DonutChart, StatCard, ActivityFeed, OrgMembers } from '@/components'

// const DashboardPage = () => {
//   // Données statistiques
//   const stats = [
//     { title: "Total Membres", value: "124", icon: <FiUsers className="text-blue-500" />, change: "+12% ce mois" },
//     { title: "Véhicules", value: "28", icon: <FiTruck className="text-green-500" />, change: "+3 nouveaux" },
//     { title: "Budget Mensuel", value: "$24,500", icon: <FiDollarSign className="text-purple-500" />, change: "+8% vs mois dernier" },
//     { title: "Événements", value: "7", icon: <FiCalendar className="text-orange-500" />, change: "2 cette semaine" }
//   ]

//   // Données graphiques
//   const financialData = [
//     { name: 'Jan', income: 4000, expenses: 2400 },
//     { name: 'Feb', income: 3000, expenses: 1398 },
//     { name: 'Mar', income: 2000, expenses: 9800 },
//     { name: 'Apr', income: 2780, expenses: 3908 },
//     { name: 'May', income: 1890, expenses: 4800 },
//     { name: 'Jun', income: 2390, expenses: 3800 }
//   ]

//   const projectDistribution = [
//     { name: 'Projet A', value: 35 },
//     { name: 'Projet B', value: 25 },
//     { name: 'Projet C', value: 20 },
//     { name: 'Projet D', value: 15 },
//     { name: 'Projet E', value: 5 }
//   ]

//   // Activités récentes
//   const recentActivities = [
//     { id: 1, user: "Jean Dupont", action: "a ajouté un nouveau véhicule", time: "10 min ago" },
//     { id: 2, user: "Marie Martin", action: "a planifié un événement", time: "25 min ago" },
//     { id: 3, user: "Paul Bernard", action: "a soumis un rapport", time: "1 heure ago" },
//     { id: 4, user: "Sophie Leroy", action: "a rejoint l'organisation", time: "2 heures ago" }
//   ]

//   // Membres clés
//   const keyMembers = [
//     { id: 1, name: "Jean Dupont", role: "Directeur", avatar: "/avatars/1.jpg", projects: 12 },
//     { id: 2, name: "Marie Martin", role: "Responsable RH", avatar: "/avatars/2.jpg", projects: 8 },
//     { id: 3, name: "Paul Bernard", role: "Chef de projet", avatar: "/avatars/3.jpg", projects: 15 },
//     { id: 4, name: "Sophie Leroy", role: "Comptable", avatar: "/avatars/4.jpg", projects: 5 }
//   ]

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">Welcome to your dashboard </h1>
//           {/* <div className="flex items-center space-x-4">
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
//               Nouveau Projet
//             </button>
//           </div> */}
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <StatCard 
//               key={index}
//               title={stat.title}
//               value={stat.value}
//               icon={stat.icon}
//               change={stat.change}
//             />
//           ))}
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Financial Overview */}
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800 flex items-center">
//                 <FiTrendingUp className="mr-2 text-blue-500" />
//                 Aperçu Financier
//               </h2>
//               <select className="text-sm border-gray-300 rounded-md">
//                 <option>2023</option>
//                 <option>2022</option>
//                 <option>2021</option>
//               </select>
//             </div>
//             <div className="h-80">
//               <BarChart data={financialData} />
//             </div>
//           </div>

//           {/* Project Distribution */}
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//               <FiPieChart className="mr-2 text-purple-500" />
//               Répartition des Projets
//             </h2>
//             <div className="h-80">
//               <DonutChart data={projectDistribution} />
//             </div>
//           </div>
//         </div>

//         {/* Bottom Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Recent Activity */}
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité Récente</h2>
//             <ActivityFeed activities={recentActivities} />
//           </div>

//           {/* Key Members */}
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Membres Clés</h2>
//             <OrgMembers members={keyMembers} />
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default DashboardPage;

// // Dans un fichier types.ts ou en haut de votre composant
// export interface StatCardProps {
//   title: string;
//   value: string | number;
//   icon: React.ReactNode;
//   change?: string;
// }

// export interface BarChartDataItem {
//   name: string;
//   [key: string]: number | string;
// }

// export interface BarChartProps {
//   data: BarChartDataItem[];
//   width?: number;
//   height?: number;
//   colors?: string[];
// }

// export interface DonutChartDataItem {
//   name: string;
//   value: number;
//   color?: string;
// }

// export interface DonutChartProps {
//   data: DonutChartDataItem[];
//   width?: number;
//   height?: number;
//   innerRadius?: number;
//   outerRadius?: number;
// }

// export interface Activity {
//   id: string | number;
//   user: string;
//   action: string;
//   time: string;
//   icon?: React.ReactNode;
// }

// export interface ActivityFeedProps {
//   activities: Activity[];
//   maxItems?: number;
// }

// export interface Member {
//   id: string | number;
//   name: string;
//   role: string;
//   avatar: string;
//   projects: number;
//   status?: 'active' | 'inactive' | 'on-leave';
// }

// export interface OrgMembersProps {
//   members: Member[];
//   showStatus?: boolean;
//   maxDisplay?: number;
// }

// // Implémentation des composants avec les types
// const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => (
//   <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
//     <div className="flex items-center justify-between">
//       <div className="text-gray-500 text-sm font-medium">{title}</div>
//       <div className="text-2xl">{icon}</div>
//     </div>
//     <div className="mt-2">
//       <div className="text-3xl font-bold text-gray-900">{value}</div>
//       <div className="text-sm text-gray-500 mt-1">{change}</div>
//     </div>
//   </div>
// );

// const BarChart: React.FC<BarChartProps> = ({ data }) => {
//   return <div>Graphique en barres implémenté ici</div>
// };

// const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
//   // Implémentation du graphique en donut
//   return <div>Graphique en donut implémenté ici
//         <div className='flex gap-16'>
//             <MyDonutChart title='Total Cars' data={availableCarsData} defaultValue={cars.length} />
//             <MyDonutChart title='Total Drivers' data={availableDriversData} defaultValue={drivers.length} />
//         </div>

//   </div>
// }


// const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => (

//   <div className="space-y-4">
//     {activities.map(activity => (
//       <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
//         <div className="bg-blue-100 p-2 rounded-full mr-3">
//           <FiUser className="text-blue-600" />
//         </div>
//         <div>
//           <p className="font-medium text-gray-800">
//             <span className="font-semibold">{activity.user}</span> {activity.action}
//           </p>
//           <p className="text-sm text-gray-500">{activity.time}</p>
//         </div>
//       </div>
//     ))}
//   </div>
// )

// const OrgMembers: React.FC<OrgMembersProps> = ({ members }) => (

//   <div className="space-y-4">
//     {members.map(member => (
//       <div key={member.id} className="flex items-center">
//         <img 
//           src={member.avatar} 
//           alt={member.name}
//           className="w-10 h-10 rounded-full mr-3 object-cover"
//         />
//         <div className="flex-1">
//           <h4 className="font-medium text-gray-900">{member.name}</h4>
//           <p className="text-sm text-gray-500">{member.role}</p>
//         </div>
//         <div className="text-sm bg-gray-100 px-2 py-1 rounded-md">
//           {member.projects} projets
//         </div>
//       </div>
//     ))}
//   </div>
// )

