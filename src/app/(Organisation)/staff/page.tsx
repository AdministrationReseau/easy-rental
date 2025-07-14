"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Personnel, PersonnelData } from '@/utils/types/personnel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, UserPlus, Edit, Trash2, Filter, BarChart2 } from 'lucide-react';

const PersonnelAdmin: React.FC = () => {
    const router = useRouter();
    const [data, setData] = useState<PersonnelData | null>(null);
    const [loading, setLoading] = useState(true);
    const [filteredPersonnel, setFilteredPersonnel] = useState<Personnel[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartement, setSelectedDepartement] = useState<string>('all');
    const [selectedPoste, setSelectedPoste] = useState<string>('all');
    const [selectedStatut, setSelectedStatut] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentPersonnel, setCurrentPersonnel] = useState<Personnel | null>(null);

    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/personnel.json');
                const result: PersonnelData = await response.json();
                setData(result);
                setFilteredPersonnel(result.personnel);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            let filtered = data.personnel;

            // Filtre par recherche (nom, prénom, email)
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(
                    p =>
                        p.nom.toLowerCase().includes(term) ||
                        p.prenom.toLowerCase().includes(term) ||
                        p.email.toLowerCase().includes(term)
                );
            }

            // Filtre par département
            if (selectedDepartement !== "all") {
                filtered = filtered.filter(p => p.departement === selectedDepartement);
            }

            // Filtre par poste
            if (selectedPoste !== "all") {
                filtered = filtered.filter(p => p.poste === selectedPoste);
            }

            // Filtre par statut
            if (selectedStatut !== "all") {
                filtered = filtered.filter(p => p.statut === selectedStatut);
            }

            setFilteredPersonnel(filtered);
            setCurrentPage(1);
        }
    }, [data, searchTerm, selectedDepartement, selectedPoste, selectedStatut]);

    // Pagination
    const totalPages = Math.ceil(filteredPersonnel.length / itemsPerPage);
    const paginatedPersonnel = filteredPersonnel.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleEditClick = (personnel: Personnel) => {
        setCurrentPersonnel(personnel);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (personnel: Personnel) => {
        setCurrentPersonnel(personnel);
        setIsDeleteModalOpen(true);
    };

    const handleAddPersonnel = () => {
        // Logique pour ajouter un personnel
        setIsAddModalOpen(false);
    };

    const handleEditPersonnel = () => {
        // Logique pour modifier un personnel
        setIsEditModalOpen(false);
    };

    const handleDeletePersonnel = () => {
        // Logique pour supprimer un personnel
        setIsDeleteModalOpen(false);
    };

    const handleViewDetails = (id: number) => {
        router.push(`/staff/${id}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="text-3xl font-bold mb-8">Gestion du Personnel</h1>

            <Tabs defaultValue="generale" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="generale">
                        Vue Générale
                    </TabsTrigger>
                    <TabsTrigger value="statistiques">
                        Statistiques
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="generale" className="space-y-6">
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <CardTitle>Liste du Personnel</CardTitle>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative w-full sm:w-64">
                                        <Search className="absolute left-2 top-3.5 h-4 w-4 text-gray-500" />
                                        <Input
                                            placeholder="     Rechercher..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full sm:w-auto">
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                Ajouter
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle>Ajouter un membre du personnel</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                                {/* Formulaire d'ajout */}
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label htmlFor="nom">Nom</Label>
                                                        <Input id="nom" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="prenom">Prénom</Label>
                                                        <Input id="prenom" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input id="email" type="email" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="telephone">Téléphone</Label>
                                                        <Input id="telephone" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="adresse">Adresse</Label>
                                                        <Input id="adresse" />
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label htmlFor="poste">Poste</Label>
                                                        <Select>
                                                            <SelectTrigger id="poste">
                                                                <SelectValue placeholder="Sélectionner un poste" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {data?.postes.map((poste) => (
                                                                    <SelectItem key={poste} value={poste}>
                                                                        {poste}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="departement">Département</Label>
                                                        <Select>
                                                            <SelectTrigger id="departement">
                                                                <SelectValue placeholder="Sélectionner un département" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {data?.departements.map((dept) => (
                                                                    <SelectItem key={dept} value={dept}>
                                                                        {dept}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="dateEmbauche">Date de mise en service</Label>
                                                        <Input id="dateEmbauche" type="date" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="salaire">Salaire</Label>
                                                        <Input id="salaire" type="number" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="statut">Statut</Label>
                                                        <Select>
                                                            <SelectTrigger id="statut">
                                                                <SelectValue placeholder="Sélectionner un statut" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {data?.statuts.map((statut) => (
                                                                    <SelectItem key={statut} value={statut}>
                                                                        {statut}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2 mt-4">
                                                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                                    Annuler
                                                </Button>
                                                <Button onClick={handleAddPersonnel}>Enregistrer</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <CardDescription className="mt-2">
                                Gérez les informations des employés, consultez leurs profils et suivez leurs activités.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 flex flex-wrap gap-3">
                                <div className="flex items-center">
                                    <Filter className="h-4 w-4 mr-1" />
                                    <span className="mr-2 text-sm">Filtres:</span>
                                </div>
                                <Select value={selectedDepartement} onValueChange={setSelectedDepartement}>
                                    <SelectTrigger className="h-8 w-40">
                                        <SelectValue placeholder="Département" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">départements</SelectItem>
                                        {data?.departements.map((dept) => (
                                            <SelectItem key={dept} value={dept}>
                                                {dept}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedPoste} onValueChange={setSelectedPoste}>
                                    <SelectTrigger className="h-8 w-40">
                                        <SelectValue placeholder="Poste" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">postes</SelectItem>
                                        {data?.postes.map((poste) => (
                                            <SelectItem key={poste} value={poste}>
                                                {poste}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedStatut} onValueChange={setSelectedStatut}>
                                    <SelectTrigger className="h-8 w-32">
                                        <SelectValue placeholder="Statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">status</SelectItem>
                                        {data?.statuts.map((statut) => (
                                            <SelectItem key={statut} value={statut}>
                                                {statut}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12"></TableHead>
                                            <TableHead>Nom</TableHead>
                                            <TableHead className="hidden md:table-cell">Poste</TableHead>
                                            <TableHead className="hidden lg:table-cell">Département</TableHead>
                                            <TableHead className="hidden lg:table-cell">Email</TableHead>
                                            <TableHead className="hidden md:table-cell">Statut</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedPersonnel.map((personnel) => (
                                            <TableRow key={personnel.id}>
                                                <TableCell>
                                                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                                        <Image
                                                            src="/personne.png"
                                                            alt={`${personnel.prenom} ${personnel.nom}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {personnel.prenom} {personnel.nom}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{personnel.poste}</TableCell>
                                                <TableCell className="hidden lg:table-cell">{personnel.departement}</TableCell>
                                                <TableCell className="hidden lg:table-cell">{personnel.email}</TableCell>
                                                <TableCell className="hidden md:table-cell">
                          <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  personnel.statut === 'Actif'
                                      ? 'bg-green-100 text-green-800'
                                      : personnel.statut === 'Inactif'
                                          ? 'bg-red-100 text-red-800'
                                          : personnel.statut === 'Congé'
                                              ? 'bg-yellow-100 text-yellow-800'
                                              : 'bg-blue-100 text-blue-800'
                              }`}
                          >
                            {personnel.statut}
                          </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => handleViewDetails(personnel.id)}
                                                            title="Voir détails"
                                                        >
                                                            <Search className="h-4 w-4" />
                                                        </Button>
                                                        <Dialog open={isEditModalOpen && currentPersonnel?.id === personnel.id} onOpenChange={(open) => {
                                                            if (!open) setCurrentPersonnel(null);
                                                            setIsEditModalOpen(open);
                                                        }}>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    onClick={() => handleEditClick(personnel)}
                                                                    title="Modifier"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-2xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>Modifier un membre du personnel</DialogTitle>
                                                                </DialogHeader>
                                                                {currentPersonnel && (
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                                                        <div className="space-y-4">
                                                                            <div>
                                                                                <Label htmlFor="edit-nom">Nom</Label>
                                                                                <Input id="edit-nom" defaultValue={currentPersonnel.nom} />
                                                                            </div>
                                                                            <div>
                                                                                <Label htmlFor="edit-prenom">Prénom</Label>
                                                                                <Input id="edit-prenom" defaultValue={currentPersonnel.prenom} />
                                                                            </div>
                                                                            <div>
                                                                                <Label htmlFor="edit-email">Email</Label>
                                                                                <Input id="edit-email" type="email" defaultValue={currentPersonnel.email} />
                                                                            </div>
                                                                            <div>
                                                                                <Label htmlFor="edit-telephone">Téléphone</Label>
                                                                                <Input id="edit-telephone" defaultValue={currentPersonnel.telephone} />
                                                                            </div>
                                                                            <div>
                                                                                <Label htmlFor="edit-adresse">Adresse</Label>
                                                                                <Input id="edit-adresse" defaultValue={currentPersonnel.adresse} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="space-y-4">
                                                                            <div>
                                                                                <Label htmlFor="edit-poste">Poste</Label>
                                                                                <Select defaultValue={currentPersonnel.poste}>
                                                                                    <SelectTrigger id="edit-poste">
                                                                                        <SelectValue />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        {data?.postes.map((poste) => (
                                                                                            <SelectItem key={poste} value={poste}>
                                                                                                {poste}
                                                                                            </SelectItem>
                                                                                        ))}
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </div>
                                                                            <div>
                                                                                <Label htmlFor="edit-departement">Département</Label>
                                                                                <Select defaultValue={currentPersonnel.departement}>
                                                                                    <SelectTrigger id="edit-departement">
                                                                                        <SelectValue />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        {data?.departements.map((dept) => (
                                                                                            <SelectItem key={dept} value={dept}>
                                                                                                {dept}
                                                                                            </SelectItem>
                                                                                        ))}
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </div>
                                                                            <div>
                                                                                <Label htmlFor="edit-dateEmbauche">Date de mise en service</Label>
                                                                                <Input id="edit-dateEmbauche" type="date" defaultValue={currentPersonnel.dateEmbauche} />
                                                                            </div>
                                                                            <div>
                                                                                <Label htmlFor="edit-salaire">Salaire</Label>
                                                                                <Input id="edit-salaire" type="number" defaultValue={currentPersonnel.salaire.toString()} />
                                                                            </div>
                                                                            <div>
                                                                                <Label htmlFor="edit-statut">Statut</Label>
                                                                                <Select defaultValue={currentPersonnel.statut}>
                                                                                    <SelectTrigger id="edit-statut">
                                                                                        <SelectValue />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        {data?.statuts.map((statut) => (
                                                                                            <SelectItem key={statut} value={statut}>
                                                                                                {statut}
                                                                                            </SelectItem>
                                                                                        ))}
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className="flex justify-end gap-2 mt-4">
                                                                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                                                        Annuler
                                                                    </Button>
                                                                    <Button onClick={handleEditPersonnel}>Enregistrer</Button>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Dialog open={isDeleteModalOpen && currentPersonnel?.id === personnel.id} onOpenChange={(open) => {
                                                            if (!open) setCurrentPersonnel(null);
                                                            setIsDeleteModalOpen(open);
                                                        }}>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    onClick={() => handleDeleteClick(personnel)}
                                                                    title="Supprimer"
                                                                >
                                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Confirmer la suppression</DialogTitle>
                                                                </DialogHeader>
                                                                <div className="py-4">
                                                                    <p>
                                                                        Êtes-vous sûr de vouloir supprimer {currentPersonnel?.prenom} {currentPersonnel?.nom} ?
                                                                        Cette action est irréversible.
                                                                    </p>
                                                                </div>
                                                                <div className="flex justify-end gap-2">
                                                                    <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                                                        Annuler
                                                                    </Button>
                                                                    <Button className="" onClick={handleDeletePersonnel}>
                                                                        Supprimer
                                                                    </Button>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {totalPages > 1 && (
                                <Pagination className="mt-4">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                            />
                                        </PaginationItem>
                                        {[...Array(totalPages)].map((_, index) => {
                                            const page = index + 1;
                                            // Afficher uniquement les premières, dernières et pages actuelles/adjacentes
                                            if (
                                                page === 1 ||
                                                page === totalPages ||
                                                Math.abs(page - currentPage) <= 1
                                            ) {
                                                return (
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            isActive={page === currentPage}
                                                            onClick={() => handlePageChange(page)}
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                );
                                            } else if (
                                                (page === 2 && currentPage > 3) ||
                                                (page === totalPages - 1 && currentPage < totalPages - 2)
                                            ) {
                                                return (
                                                    <PaginationItem key={page}>
                                                        <PaginationEllipsis />
                                                    </PaginationItem>
                                                );
                                            }
                                            return null;
                                        })}
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="statistiques" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart2 className="h-5 w-5" />
                                Statistiques du Personnel
                            </CardTitle>
                            <CardDescription>
                                Analyse détaillée des données relatives au personnel.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white shadow rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-500">Effectif total</h3>
                                    <p className="mt-1 text-3xl font-semibold text-gray-900">{data?.personnel.length}</p>
                                    <div className="mt-2 text-xs text-green-600">
                                        +2.5% depuis le mois dernier
                                    </div>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-500">Salaire moyen</h3>
                                    <p className="mt-1 text-3xl font-semibold text-gray-900">
                                        {data && (data.personnel.reduce((acc, p) => acc + p.salaire, 0) / data.personnel.length).toLocaleString()} XAF
                                    </p>
                                    <div className="mt-2 text-xs text-green-600">
                                        +1.8% depuis le dernier trimestre
                                    </div>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-500">Ancienneté moyenne</h3>
                                    <p className="mt-1 text-3xl font-semibold text-gray-900">2.7 ans</p>
                                    <div className="mt-2 text-xs text-gray-500">
                                        Stable depuis 6 mois
                                    </div>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-500">Taux de rétention</h3>
                                    <p className="mt-1 text-3xl font-semibold text-gray-900">92%</p>
                                    <div className="mt-2 text-xs text-green-600">
                                        +4% par rapport à l&#39;année dernière
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Répartition par département</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80 flex flex-col justify-between">
                                            {/* Graphique à barres simulé */}
                                            <div className="space-y-2">
                                                {data?.departements.map((dept) => {
                                                    const count = data.personnel.filter(p => p.departement === dept).length;
                                                    const percentage = (count / data.personnel.length) * 100;
                                                    return (
                                                        <div key={dept} className="flex flex-col">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-sm font-medium">{dept}</span>
                                                                <span className="text-sm text-gray-500">{count} ({percentage.toFixed(1)}%)</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                <div
                                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                                    style={{ width: `${percentage}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Évolution des effectifs</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80 flex items-center justify-center">
                                            {/* Graphique linéaire simulé */}
                                            <div className="w-full h-60 relative">
                                                <div className="absolute inset-0 flex items-end">
                                                    {[...Array(12)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                height: `${Math.floor(50 + Math.random() * 30)}%`,
                                                                width: '7%',
                                                                marginRight: '1%'
                                                            }}
                                                            className="bg-blue-500 opacity-80 rounded-t-sm"
                                                        ></div>
                                                    ))}
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 flex justify-between mt-2 text-xs text-gray-500">
                                                    {['Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc', 'Jan'].map((month) => (
                                                        <span key={month}>{month}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Card className="lg:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Distribution des salaires</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80 flex items-center justify-center">
                                            {/* Histogramme simulé */}
                                            <div className="w-full h-64 relative">
                                                <div className="absolute inset-0 flex items-end">
                                                    {[...Array(8)].map((_, i) => {
                                                        const height = 20 + Math.random() * 70;
                                                        return (
                                                            <div
                                                                key={i}
                                                                style={{
                                                                    height: `${height}%`,
                                                                    width: '11%',
                                                                    marginRight: '1.5%'
                                                                }}
                                                                className={`${
                                                                    i < 4 ? 'bg-blue-400' : 'bg-blue-600'
                                                                } opacity-80 rounded-t-sm`}
                                                            ></div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                                                    {['30-35k', '35-40k', '40-45k', '45-50k', '50-55k', '55-60k', '60-65k', '65k+'].map((range) => (
                                                        <span key={range}>{range}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Ratio hommes/femmes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-72 flex flex-col justify-center items-center">
                                            {/* Graphique en cercle simulé */}
                                            <div className="relative w-40 h-40 mb-4">
                                                <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
                                                <div
                                                    className="absolute inset-0 rounded-full border-8 border-pink-500"
                                                    style={{
                                                        clipPath: 'polygon(0 0, 60% 0, 60% 100%, 0 100%)'
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8 text-center">
                                                <div>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                        <span className="font-medium">Hommes</span>
                                                    </div>
                                                    <p className="text-2xl font-bold mt-1">40%</p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                                                        <span className="font-medium">Femmes</span>
                                                    </div>
                                                    <p className="text-2xl font-bold mt-1">60%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PersonnelAdmin;
