export interface TransactionProps {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    amount: string;
    status: string;
    icon: string;
}

export interface TransactionListProps {
    transactions: TransactionProps[];
}