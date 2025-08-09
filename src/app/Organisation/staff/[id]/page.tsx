"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Personnel, PersonnelData } from '@/utils/types/personnel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft, Mail, Phone, MapPin,
  Briefcase, Building, UserCheck, DollarSign, Clock, Activity
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const PersonnelDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [personnel, setPersonnel] = useState<Personnel | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditCalendarOpen, setIsEditCalendarOpen] = useState(false);
  const [calendarEdits, setCalendarEdits] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/personnel.json');
        const result: PersonnelData = await response.json();
        const foundPersonnel = result.personnel.find(p => p.id === Number(id));

        if (foundPersonnel) {
          setPersonnel(foundPersonnel);
          setCalendarEdits(foundPersonnel.calendrierService);
        }

        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  const handleCalendarEdit = (date: string, value: boolean) => {
    setCalendarEdits(prev => ({
      ...prev,
      [date]: value
    }));
  };

  const saveCalendarChanges = async () => {
    if (!personnel) return;

    try {
      // Simulate API call to save changes
      const updatedPersonnel = {
        ...personnel,
        calendrierService: calendarEdits
      };
      setPersonnel(updatedPersonnel);
      setIsEditCalendarOpen(false);
      // Add toast notification here
    } catch (error) {
      console.error('Error saving calendar changes:', error);
      // Add error toast notification here
    }
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ date: dateStr, day: i });
    }

    return days;
  };

  // Calendar grid layout with responsive design
  const CalendarGrid = () => {
    const monthDays = getMonthDays();
    const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    return (
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-7 gap-1 min-w-[640px]">
          {weekdays.map(day => (
            <div key={day} className="p-2 text-center font-semibold bg-gray-50">
              {day}
            </div>
          ))}
          {monthDays.map(({ date, day }) => (
            <div
              key={date}
              className="p-2 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-medium">{day}</span>
                <Switch
                  checked={calendarEdits[date] || false}
                  onChange={(checked) => handleCalendarEdit(date, checked)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!personnel) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">Personnel non trouvé</h1>
          <p className="text-gray-600 mb-6">Le membre du personnel que vous recherchez n&apos;existe pas ou a été supprimé.</p>
          <Button onClick={handleGoBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button
          variant="outline"
          className="shrink-0"
          onClick={handleGoBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Profil de {personnel.prenom} {personnel.nom}
        </h1>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">
            Informations
          </TabsTrigger>
          <TabsTrigger value="planning">
            Planification
          </TabsTrigger>
          <TabsTrigger value="activity">
            Activité
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Info Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                      <Image
                        src={personnel.photo}
                        alt={`${personnel.prenom} ${personnel.nom}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-center">
                      {personnel.prenom} {personnel.nom}
                    </h2>
                    <p className="text-gray-600 mb-4">{personnel.poste}</p>
                    <Badge
                      className={cn(
                        'mb-6',
                        {
                          'bg-green-100 text-green-800': personnel.statut === 'Actif',
                          'bg-red-100 text-red-800': personnel.statut === 'Inactif',
                          'bg-yellow-100 text-yellow-800': personnel.statut === 'Congé',
                          'bg-blue-100 text-blue-800': personnel.statut === 'En formation'
                        }
                      )}
                    >
                      {personnel.statut}
                    </Badge>

                    <div className="w-full space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium break-all">{personnel.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <p className="font-medium">{personnel.telephone}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Adresse</p>
                          <p className="font-medium">{personnel.adresse}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Professional Info Card */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Informations professionnelles</CardTitle>
                  <CardDescription>
                    Détails sur la carrière et le poste actuel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Poste</p>
                        <p className="font-semibold text-lg">{personnel.poste}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Département</p>
                        <p className="font-semibold text-lg">{personnel.departement}</p>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <UserCheck className="h-5 w-5 text-gray-500" />
                        <Badge variant="secondary">Expérience</Badge>
                      </div>
                      <p className="text-2xl font-bold">3 ans</p>
                      <p className="text-sm text-gray-500">Dans l&apos;entreprise</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSign className="h-5 w-5 text-gray-500" />
                        <Badge variant="secondary">Projets</Badge>
                      </div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-gray-500">Complétés</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <Badge variant="secondary">Temps</Badge>
                      </div>
                      <p className="text-2xl font-bold">40h</p>
                      <p className="text-sm text-gray-500">Par semaine</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="planning">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Calendrier de service</CardTitle>
                <CardDescription>Gérer la disponibilité mensuelle</CardDescription>
              </div>
              <Button onClick={() => setIsEditCalendarOpen(true)}>
                Modifier le calendrier
              </Button>
            </CardHeader>
            <CardContent>
              <CalendarGrid />
            </CardContent>
          </Card>

          <Dialog open={isEditCalendarOpen} onOpenChange={setIsEditCalendarOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Modifier le calendrier de service</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <CalendarGrid />
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsEditCalendarOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={saveCalendarChanges}>
                  Sauvegarder
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Historique des actions et événements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personnel.activites?.map((activite, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {new Date(activite.date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn({
                            'bg-blue-100 text-blue-800': activite.type === 'Formation',
                            'bg-green-100 text-green-800': activite.type === 'Projet',
                            'bg-purple-100 text-purple-800': activite.type === 'Réunion',
                            'bg-orange-100 text-orange-800': activite.type === 'Congé'
                          })}
                        >
                          {activite.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate" title={activite.description}>
                          {activite.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={activite.statut === 'Complété' ? 'default' : 'secondary'}
                        >
                          {activite.statut}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Activity Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Formations suivies
                    </p>
                    <p className="text-2xl font-bold">
                      {personnel.statistiques?.formations || 0}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-blue-100 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{
                        width: `${(personnel.statistiques?.formations || 0) * 10}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Projets en cours
                    </p>
                    <p className="text-2xl font-bold">
                      {personnel.statistiques?.projetsEnCours || 0}
                    </p>
                  </div>
                  <Briefcase className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-green-100 rounded-full">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{
                        width: `${(personnel.statistiques?.projetsEnCours || 0) * 20}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Taux de présence
                    </p>
                    <p className="text-2xl font-bold">
                      {personnel.statistiques?.tauxPresence || 0}%
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-purple-500" />
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-purple-100 rounded-full">
                    <div
                      className="h-2 bg-purple-500 rounded-full"
                      style={{
                        width: `${personnel.statistiques?.tauxPresence || 0}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Performance
                    </p>
                    <p className="text-2xl font-bold">
                      {personnel.statistiques?.performance || 0}/5
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-orange-100 rounded-full">
                    <div
                      className="h-2 bg-orange-500 rounded-full"
                      style={{
                        width: `${((personnel.statistiques?.performance || 0) / 5) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonnelDetail;
