"use client"
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Transaction} from "@/utils/types/payment";

interface TransactionTableProps {
    transactions: Transaction[];
    onViewDetails: (transaction: Transaction) => void;
}

const TransactionTable = ({ transactions, onViewDetails }: TransactionTableProps) => {
    return (
        <div className="w-full overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Méthode</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell>{transaction.amount} XAF</TableCell>
                            <TableCell>{transaction.paymentMethod}</TableCell>
                            <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
                            </TableCell>
                            <TableCell>{transaction.customer.name}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onViewDetails(transaction)}
                                >
                                    Détails
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export { TransactionTable };
