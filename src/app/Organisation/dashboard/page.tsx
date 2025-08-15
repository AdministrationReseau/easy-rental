"use client";
import React, { useEffect, useState } from 'react';
import { MyBarChart, MyBarChartDataItem } from '@/components/organisation/MyBarChart';
import { MyBarList, MyBarListDataItem } from '@/components/organisation/MyBarList';
import MyDonutChart, { DataItem } from '@/components/organisation/MyDonutChart';
import { CarProps } from '@/utils/types/CarProps';
import { DriverProps } from '@/utils/types/DriverProps';
import { LocationProps } from '@/utils/types/LocationProps';
import {
  BarChart3, Car, CircleDollarSign, Users, MapPin,
  TrendingUp, AlertCircle, Clock, Banknote, Building2, BarChart4,
  PieChart, Briefcase, Mail
} from 'lucide-react';
import Link from 'next/link';

// Types interfaces
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

interface AgencyProps {
  id: number;
  name: string;
  location: string;
  revenue: number;
  performance: number;
  employeeCount: number;
}

interface ServiceProps {
  id: number;
  name: string;
  description: string;
  price: number;
  popularity: number;
  revenue: number;
}

interface TabProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

// Components
const SectionTitle = ({icon, title, subtitle}: SectionTitleProps) => {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-primary-blue">{icon}</div>
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
      </div>
      {subtitle && <p className="text-sm text-gray-500 ml-7">{subtitle}</p>}
    </div>
  );
};

const StatCard = ({title, value, icon, trend, className}: StatCardProps) => {
  return (
    <div className={`relative overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}% depuis le mois dernier</span>
            </div>
          )}
        </div>
        <div className="text-primary-blue bg-blue-50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-blue/80 to-primary-blue/20"></div>
    </div>
  );
};

const InfoCard = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 ${className}`}>
      <h3 className="text-base font-medium text-gray-800 mb-4 pb-2 border-b">{title}</h3>
      {children}
    </div>
  );
};

const Tab = ({ title, icon, isActive, onClick }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 gap-2 text-sm font-medium rounded-lg transition-colors
        ${isActive
          ? 'bg-primary-blue text-white'
          : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

const PerformanceIndicator = ({ value, label }: { value: number, label: string }) => {
  const getColorClass = (val: number) => {
    if (val >= 80) return "text-green-600";
    if (val >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-2xl font-bold ${getColorClass(value)}`}>
        {value}%
      </div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
};

const AgencyCard = ({ agency }: { agency: AgencyProps }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium">{agency.name}</h3>
        <div className="flex items-center text-gray-500 text-xs mt-1">
          <MapPin size={12} className="mr-1"/>
          <span>{agency.location}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <PerformanceIndicator value={agency.performance} label="Performance" />
          <div className="text-center">
            <div className="text-lg font-bold text-primary-blue">
              {agency.revenue.toLocaleString()} XAF
            </div>
            <div className="text-xs text-gray-500 mt-1">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700">
              {agency.employeeCount}
            </div>
            <div className="text-xs text-gray-500 mt-1">Employés</div>
          </div>
        </div>
        <Link href={`/agencies/${agency.id}`}>
          <button className="w-full py-2 text-sm bg-gray-50 text-primary-blue hover:bg-gray-100 rounded-md transition-colors">
            Voir les détails
          </button>
        </Link>
      </div>
    </div>
  );
};

const ServiceCard = ({ service }: { service: ServiceProps }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium">{service.name}</h3>
        <div className="text-gray-500 text-xs mt-1 line-clamp-2">
          {service.description}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary-blue">
              {service.price.toLocaleString()} XAF
            </div>
            <div className="text-xs text-gray-500 mt-1">Prix</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700">
              {service.popularity}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Popularité</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {service.revenue.toLocaleString()} XAF
            </div>
            <div className="text-xs text-gray-500 mt-1">Revenu</div>
          </div>
        </div>
        <Link href={`/services/${service.id}`}>
          <button className="w-full py-2 text-sm bg-gray-50 text-primary-blue hover:bg-gray-100 rounded-md transition-colors">
            Gérer
          </button>
        </Link>
      </div>
    </div>
  );
};

const StatusIndicator = ({ status }: { status: 'good' | 'warning' | 'critical' }) => {
  const colors = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500'
  };

  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[status]} mr-2`}></span>
  );
};

const AlertItem = ({
  icon,
  title,
  description,
  status
}: {
  icon: React.ReactNode,
  title: string,
  description: string,
  status: 'good' | 'warning' | 'critical'
}) => {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
      <div className="bg-blue-50 p-2 rounded text-primary-blue">
        {icon}
      </div>
      <div>
        <div className="flex items-center">
          <StatusIndicator status={status} />
          <h4 className="font-medium text-sm">{title}</h4>
        </div>
        <p className="text-gray-500 text-xs mt-1 ml-4">{description}</p>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  // States
  const [activeTab, setActiveTab] = useState<'general' | 'statistics'>('general');
  const [drivers, setDrivers] = useState<DriverProps[]>([]);
  const [cars, setCars] = useState<CarProps[]>([]);
  const [locations, setLocations] = useState<LocationProps[]>([]);
  const [availableCarsData, setAvailableCarsData] = useState<DataItem[]>([]);
  const [availableDriversData, setAvailableDriversData] = useState<DataItem[]>([]);
  const [agencies, setAgencies] = useState<AgencyProps[]>([]);
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('month');

  

  useEffect(() => {
    // Mock data for agencies
  const mockAgencies: AgencyProps[] = [
    { id: 1, name: "Agence Centrale", location: "Douala", revenue: 3458000, performance: 87, employeeCount: 12 },
    { id: 2, name: "Agence Nord", location: "Yaoundé", revenue: 2156000, performance: 76, employeeCount: 8 },
    { id: 3, name: "Agence Ouest", location: "Bafoussam", revenue: 1854000, performance: 82, employeeCount: 7 },
    { id: 4, name: "Agence Sud", location: "Kribi", revenue: 954000, performance: 65, employeeCount: 5 },
  ];

  // Mock data for services
  const mockServices: ServiceProps[] = [
    { id: 1, name: "Location de voiture", description: "Location de véhicules de tourisme pour courtes durées", price: 35000, popularity: 92, revenue: 1452000 },
    { id: 2, name: "Location avec chauffeur", description: "Service de chauffeur privé pour déplacements professionnels ou personnels", price: 55000, popularity: 78, revenue: 985000 },
    { id: 3, name: "Transport aéroport", description: "Service de navette entre l'aéroport et la destination du client", price: 25000, popularity: 85, revenue: 758000 },
    { id: 4, name: "Services événementiels", description: "Location de flotte pour événements corporatifs ou mariages", price: 120000, popularity: 62, revenue: 540000 },
  ];
    setAgencies(mockAgencies);
    setServices(mockServices);
  },[]);

  useEffect(() => {
    const nbAvailableDrivers: number = drivers.filter((driver) => driver.available).length;
    setAvailableDriversData([
      {
        name: "Chauffeurs disponibles",
        amount: nbAvailableDrivers,
      },
      {
        name: "Chauffeurs non disponibles",
        amount: drivers.length - nbAvailableDrivers,
      },
    ]);
  }, [drivers]);

  useEffect(() => {
    const nbAvailableCars: number = cars.filter((car) => car.available).length;
    setAvailableCarsData([
      {
        name: "Véhicules disponibles",
        amount: nbAvailableCars
      },
      {
        name: "Véhicules non disponibles",
        amount: cars.length - nbAvailableCars
      },
    ]);
  }, [cars]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [carsResponse, driversResponse, locationsResponse] = await Promise.all([
          fetch('/data/cars.json'),
          fetch('/data/drivers.json'),
          fetch('/data/locations.json')
        ]);

        const carsData = await carsResponse.json();
        const driversData = await driversResponse.json();
        const locationsData = await locationsResponse.json();

        if (carsData && Array.isArray(carsData.vehicles)) {
          setCars(carsData.vehicles);
        }

        if (driversData && Array.isArray(driversData)) {
          setDrivers(driversData);
        }

        if (locationsData && Array.isArray(locationsData)) {
          setLocations(locationsData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const carsData: MyBarListDataItem[] = Object.values(
    locations.reduce((acc: Record<number, MyBarListDataItem>, item) => {
      const vehicleId = item.vehicle.id;
      const car: CarProps | undefined = cars.find((car: CarProps) => car.id === vehicleId);
      const carName: string = car ? ( (car.brand ?? '') + ' ' + (car.model ?? '') ) : `Véhicule ${vehicleId}`;
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
        const driverName: string = driver ? (`${driver.first_name || ''} ${driver.last_name || ''}`) : `Chauffeur ${driverId}`;
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
  }));

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
  const [previousMonthComparison, setPreviousMonthComparison] = useState<number>(0);

  useEffect(() => {
    const newTotalLocGain = locationsDetailsData.reduce((total, { carsLocAmount, driversLocAmount }) => {
      return total + carsLocAmount + driversLocAmount;
    }, 0);

    setTotalLocGain(newTotalLocGain);

    // Calculate month-over-month comparison if we have at least 2 months of data
    if (locationsDetailsData.length >= 2) {
      const currentMonth = locationsDetailsData[locationsDetailsData.length - 1];
      const previousMonth = locationsDetailsData[locationsDetailsData.length - 2];

      const currentTotal = currentMonth.carsLocAmount + currentMonth.driversLocAmount;
      const previousTotal = previousMonth.carsLocAmount + previousMonth.driversLocAmount;

      if (previousTotal > 0) {
        const percentChange = ((currentTotal - previousTotal) / previousTotal) * 100;
        setPreviousMonthComparison(Math.round(percentChange));
      }
    }
  }, [locationsDetailsData]);

  // Advanced statistics calculations
  const getTotalRevenueByCategory = () => {
    const carRental = locations
      .filter(loc => !loc.driver)
      .reduce((sum, loc) => sum + (isNaN(Number(loc.price)) ? 0 : Number(loc.price)), 0);

    const driverService = locations
      .filter(loc => loc.driver)
      .reduce((sum, loc) => sum + (isNaN(Number(loc.price)) ? 0 : Number(loc.price)), 0);

    return [
      { name: "Location de véhicules", amount: carRental },
      { name: "Services avec chauffeur", amount: driverService }
    ];
  };

  const getVehicleUtilizationRate = () => {
    const utilizationByVehicle = cars.map(car => {
      const rentals = locations.filter(loc => loc.vehicle.id === car.id).length;
      const totalDays = months.length * 30; // Approximation
      const utilizationRate = (rentals / totalDays) * 100;
      return {
        id: car.id,
        name: `${car.brand} ${car.model}`,
        value: Math.min(100, Math.round(utilizationRate * 10) / 10),
        amount: rentals
      };
    }).sort((a, b) => b.value - a.value);

    return utilizationByVehicle.slice(0, 10);
  };

  const getAverageRentalDuration = () => {
    // Mock data as this would require date difference calculations
    return [
      { date: 'Jan', avgDuration: 2.5 },
      { date: 'Feb', avgDuration: 2.7 },
      { date: 'Mar', avgDuration: 3.1 },
      { date: 'Apr', avgDuration: 2.9 },
      { date: 'May', avgDuration: 3.4 },
      { date: 'Jun', avgDuration: 3.6 },
    ];
  };

  const getMaintenanceCosts = () => {
    // Mock data for maintenance costs
    return [
      { date: 'Jan', plannedCost: 120000, unplannedCost: 45000 },
      { date: 'Feb', plannedCost: 105000, unplannedCost: 65000 },
      { date: 'Mar', plannedCost: 148000, unplannedCost: 32000 },
      { date: 'Apr', plannedCost: 112000, unplannedCost: 58000 },
      { date: 'May', plannedCost: 135000, unplannedCost: 42000 },
      { date: 'Jun', plannedCost: 126000, unplannedCost: 29000 },
    ];
  };

  const revenueByCategory = getTotalRevenueByCategory();
  const vehicleUtilization = getVehicleUtilizationRate();
  const rentalDuration = getAverageRentalDuration();
  const maintenanceCosts = getMaintenanceCosts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue mb-2"></div>
          <p className="text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  // Render General tab content
  const renderGeneralTab = () => {
    return (
      <>
        {/* Top Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
          <StatCard
            title='Véhicules'
            value={`${cars.length}`}
            icon={<Car size={24} />}
            trend={{
              value: 5.2,
              isPositive: true
            }}
          />
          <StatCard
            title='Chauffeurs'
            value={`${drivers.length}`}
            icon={<Users size={24} />}
            trend={{
              value: 2.1,
              isPositive: true
            }}
          />
          <StatCard
            title='Revenus Totaux'
            value={`${totalLocGain.toLocaleString()} XAF`}
            icon={<CircleDollarSign size={24} />}
            trend={{
              value: previousMonthComparison,
              isPositive: previousMonthComparison >= 0
            }}
          />
          <StatCard
            title='Taux de occupation'
            value={`${Math.round((cars.filter(c => !c.available).length / cars.length) * 100)}%`}
            icon={<BarChart3 size={24} />}
            trend={{
              value: 1.8,
              isPositive: true
            }}
          />
        </div>

        {/* Charts and Agency Status */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          <div className='lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
            <SectionTitle
              icon={<BarChart3 size={20} />}
              title='Évolution des revenus'
              subtitle='Répartition mensuelle des revenus par type de service'
            />
            <div className="h-80">
              <MyBarChart data={locationsDetailsData} />
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
            <SectionTitle
              icon={<AlertCircle size={20} />}
              title='Alertes système'
              subtitle='Situations requérant votre attention'
            />
            <div className="space-y-2">
              <AlertItem
                icon={<Car size={16} />}
                title="Maintenance véhicule requise"
                description="3 véhicules nécessitent un entretien dans les 7 prochains jours"
                status="warning"
              />
              <AlertItem
                icon={<Clock size={16} />}
                title="Locations prochaines"
                description="8 réservations à confirmer pour demain"
                status="good"
              />
              <AlertItem
                icon={<Banknote size={16} />}
                title="Paiements en attente"
                description="4 paiements clients en retard de plus de 15 jours"
                status="critical"
              />
              <AlertItem
                icon={<Users size={16} />}
                title="Chauffeurs disponibles limités"
                description="Seulement 4 chauffeurs disponibles ce weekend"
                status="warning"
              />
              <AlertItem
                icon={<Mail size={16} />}
                title="Demandes clients"
                description="12 nouvelles demandes de devis à traiter"
                status="good"
              />
            </div>
          </div>
        </div>

        {/* Agencies Section */}
        <div className="mb-8">
          <SectionTitle
            icon={<Building2 size={20} />}
            title="Performance des agences"
            subtitle="Vue d'ensemble de toutes vos agences"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agencies.map(agency => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <SectionTitle
            icon={<Briefcase size={20} />}
            title="Services proposés"
            subtitle="Performances et statistiques de vos services"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Fleet Overview */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          <div className='lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
            <SectionTitle
              icon={<Car size={20} />}
              title='Performance des véhicules'
              subtitle='Classement des véhicules les plus rentables'
            />
            <div className="h-80 overflow-y-auto pr-2">
              <MyBarList data={carsData} />
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
            <SectionTitle
              icon={<PieChart size={20} />}
              title='Répartition de la flotte'
              subtitle='État actuel des ressources'
            />
            <div className='space-y-6'>
              <div className='mb-6'>
                <h4 className='text-sm font-medium text-gray-600 mb-3'>État des véhicules</h4>
                <MyDonutChart title='' data={availableCarsData} defaultValue={cars.length} />
              </div>
              <div>
                <h4 className='text-sm font-medium text-gray-600 mb-3'>État des chauffeurs</h4>
                <MyDonutChart title='' data={availableDriversData} defaultValue={drivers.length} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Render Statistics tab content
  const renderStatisticsTab = () => {
    return (
      <>
        {/* Date range selector */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Statistiques détaillées</h2>
          <div className="bg-white border border-gray-200 rounded-lg flex">
            {(['day', 'week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 text-sm transition-colors ${
                  dateRange === range
                    ? 'bg-primary-blue text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range === 'day' ? 'Jour' : range === 'week' ? 'Semaine' : range === 'month' ? 'Mois' : 'Année'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard title="Revenus par catégorie" className="col-span-1">
            <div className="h-64">
              <MyDonutChart
                defaultValue={totalLocGain}
                title="Répartition des revenus"
                data={revenueByCategory.map(item => ({
                  name: item.name,amount: item.amount
                }))}
              />
            </div>
          </InfoCard>

          <InfoCard title="Taux d'utilisation des véhicules" className="col-span-2">
            <div className="h-64">
            <MyBarList data={vehicleUtilization.map(item => ({
                id: item.id,
                name: item.name,
                value: item.value,
                amount: item.amount,
                href: '/cars'
                }))}
            />
            </div>
          </InfoCard>
        </div>

        {/* Rental Duration and Maintenance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard title="Durée moyenne de location">
            <div className="h-64">
            <MyBarChart
                data={rentalDuration.map(item => ({
                    date: item.date,
                    avgDuration: item.avgDuration,
                    carsLocAmount: 0,
                    driversLocAmount: 0,
                }))}
            />
            </div>
          </InfoCard>

          <InfoCard title="Coûts de maintenance">
            <div className="h-64">
              <MyBarChart
                data={maintenanceCosts.map(item => ({
                  date: item.date,
                  plannedCost: item.plannedCost,
                  unplannedCost: item.unplannedCost,
                  carsLocAmount: 0,
                  driversLocAmount: 0,
                }))}
              />
            </div>
          </InfoCard>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard title="Performances des chauffeurs">
            <div className="h-80 overflow-y-auto pr-2">
              <MyBarList data={driversData} />
            </div>
          </InfoCard>

          <InfoCard title="Réservations anticipées" className="col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm text-gray-600 mb-2">Cette semaine</h4>
                <p className="text-2xl font-bold text-primary-blue">24</p>
                <p className="text-xs text-gray-500 mt-1">réservations</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm text-gray-600 mb-2">Semaine prochaine</h4>
                <p className="text-2xl font-bold text-primary-blue">18</p>
                <p className="text-xs text-gray-500 mt-1">réservations</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm text-gray-600 mb-2">Dans 2 semaines</h4>
                <p className="text-2xl font-bold text-primary-blue">12</p>
                <p className="text-xs text-gray-500 mt-1">réservations</p>
              </div>
            </div>
          </InfoCard>
        </div>
      </>
    );
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Aperçu de la performance et des statistiques de votre entreprise</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-4">
        <Tab
          title="Vue générale"
          icon={<BarChart4 size={18} />}
          isActive={activeTab === 'general'}
          onClick={() => setActiveTab('general')}
        />
        <Tab
          title="Statistiques"
          icon={<TrendingUp size={18} />}
          isActive={activeTab === 'statistics'}
          onClick={() => setActiveTab('statistics')}
        />
      </div>

      {/* Tab Content */}
      {activeTab === 'general' ? renderGeneralTab() : renderStatisticsTab()}
    </div>
  );
};

export default Dashboard;
