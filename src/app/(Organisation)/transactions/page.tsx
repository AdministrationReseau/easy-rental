"use client";
import { useState, useEffect } from 'react';
import { Transaction } from '@/utils/types/payment';
import { TransactionTable } from '@/components/TransactionTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        status: '',
        paymentMethod: ''
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/data/transaction.json');
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des transactions');
                }
                const data = await response.json();
                setTransactions(data.transactions);
                setFilteredTransactions(data.transactions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    useEffect(() => {
        let filtered = [...transactions];

        if (filters.startDate) {
            filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate));
        }
        if (filters.endDate) {
            filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate));
        }
        if (filters.status) {
            filtered = filtered.filter(t => t.status === filters.status);
        }
        if (filters.paymentMethod) {
            filtered = filtered.filter(t => t.paymentMethod === filters.paymentMethod);
        }

        setFilteredTransactions(filtered);
    }, [filters, transactions]);

    const statusOptions = [
        { label: 'Tous les statuts', value: '' },
        { label: 'Complété', value: 'completed' },
        { label: 'En attente', value: 'pending' },
        { label: 'Échoué', value: 'failed' }
    ];

    const paymentMethodOptions = [
        { label: 'Toutes les méthodes', value: '' },
        { label: 'MTN Money', value: 'mtn' },
        { label: 'Orange Money', value: 'orange' },
        { label: 'Carte Bancaire', value: 'card' }
    ];

    const handleStatusChange = (value: string) => {
        setFilters(prev => ({ ...prev, status: value }));
    };

    const handlePaymentMethodChange = (value: string) => {
        setFilters(prev => ({ ...prev, paymentMethod: value }));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Chargement...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Transactions</h1>
                <p className="text-gray-500">
                    {filteredTransactions.length} transaction(s) trouvée(s)
                </p>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Filtres</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        <div>
                            <label className="text-sm font-medium">Date début</label>
                            <Input
                                type="date"
                                value={filters.startDate}
                                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Date fin</label>
                            <Input
                                type="date"
                                value={filters.endDate}
                                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Statut</label>
                            <Select
                                value={filters.status}
                                onValueChange={handleStatusChange}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue>
                                        {statusOptions.find(option => option.value === filters.status)?.label}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Méthode de paiement</label>
                            <Select
                                value={filters.paymentMethod}
                                onValueChange={handlePaymentMethodChange}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue>
                                        {paymentMethodOptions.find(option => option.value === filters.paymentMethod)?.label}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {paymentMethodOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <TransactionTable
                transactions={filteredTransactions}
                onViewDetails={setSelectedTransaction}
            />

            <Dialog
                open={!!selectedTransaction}
                onOpenChange={() => setSelectedTransaction(null)}
            >
                {selectedTransaction && (
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader className="flex flex-row items-center justify-between pr-8">
                            <DialogTitle>Détails de la Transaction</DialogTitle>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 absolute right-4 top-4"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">ID Transaction</label>
                                    <p className="text-sm font-medium">{selectedTransaction.id}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Montant</label>
                                    <p className="text-sm font-medium">{selectedTransaction.amount.toLocaleString()} XAF</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <p className="text-sm font-medium capitalize">{selectedTransaction.status}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Méthode</label>
                                    <p className="text-sm font-medium capitalize">{selectedTransaction.paymentMethod}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Client</label>
                                    <p className="text-sm font-medium">{selectedTransaction.customer.name}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Email</label>
                                    <p className="text-sm font-medium">{selectedTransaction.customer.email}</p>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="font-medium mb-4">Détails de la Location</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">Véhicule</label>
                                        <p className="text-sm font-medium">{selectedTransaction.vehicleRental.vehicleName}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">Avec Chauffeur</label>
                                        <p className="text-sm font-medium">{selectedTransaction.vehicleRental.withDriver ? 'Oui' : 'Non'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">Date début</label>
                                        <p className="text-sm font-medium">{new Date(selectedTransaction.vehicleRental.startDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">Date fin</label>
                                        <p className="text-sm font-medium">{new Date(selectedTransaction.vehicleRental.endDate).toLocaleDateString()}</p>
                                    </div>
                                    {selectedTransaction.vehicleRental.withDriver && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500">Chauffeur</label>
                                            <p className="text-sm font-medium">{selectedTransaction.vehicleRental.driverName}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}
