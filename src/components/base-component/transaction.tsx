// Dashboard/transactions.tsx
import React, { useState } from 'react';

interface TransactionItemProps {
  type: string;
  location: string;
  date: string;
  time: string;
  amount: string;
  status: 'complete' | 'pending' | 'rejected';
}

const TransactionFilterTabs: React.FC<{ selectedStatus: string; onSelectStatus: (status: string) => void }> = ({ selectedStatus, onSelectStatus }) => {
  const statuses = ['All', 'Complete', 'Pending', 'Rejected'];

  return (
    <div className="flex space-x-4 mb-4">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onSelectStatus(status.toLowerCase())}
          className={`px-4 py-2 rounded-full ${
            selectedStatus === status.toLowerCase() ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

const TransactionItem: React.FC<TransactionItemProps> = ({ type, location, date, time, amount, status }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-200">
    <div className="flex items-center space-x-4">
      {/* Icon */}
      <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
        <span className="material-icons text-blue-600">icons</span>
      </div>
      {/* Transaction Details */}
      <div>
        <p className="text-sm font-semibold">{type}</p>
        <p className="text-xs text-gray-500">{location}</p>
        <p className="text-xs text-gray-400">{date} - {time}</p>
      </div>
    </div>
    {/* Amount and Status */}
    <div className="flex items-center space-x-2">
      <p className="text-sm font-semibold">${amount}</p>
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-lg ${
          status === 'complete' ? 'bg-green-100 text-green-500' :
          status === 'pending' ? 'bg-yellow-100 text-yellow-500' :
          'bg-red-100 text-red-500'
        }`}
      >
        {status}
      </span>
    </div>
  </div>
);

const TransactionList: React.FC<{ transactions: TransactionItemProps[] }> = ({ transactions }) => {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <h4 className="text-sm font-semibold text-gray-600 mb-4">Transactions History</h4>
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} {...transaction} />
        ))}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-600 mb-4">Recent transactions</h4>
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} {...transaction} />
        ))}
      </div>
    </div>
  );
};

const TransactionsPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const transactions: TransactionItemProps[] = [
    { type: 'Currency exchange', location: 'From ABC Bank ATM', date: '17 Sep 2023', time: '11:21 AM', amount: '350.00', status: 'pending' },
    { type: 'Cash-in', location: 'From ABC Bank ATM', date: '17 Sep 2023', time: '10:34 AM', amount: '100.00', status: 'complete' },
    { type: 'Cashback from purchase', location: 'From ABC Bank ATM', date: '16 Sep 2023', time: '16:08 PM', amount: '1.75', status: 'rejected' },
    { type: 'Transfer to card', location: 'From ABC Bank ATM', date: '16 Sep 2023', time: '11:21 AM', amount: '9000.00', status: 'complete' },
    { type: 'Transfer to card', location: 'From ABC Bank ATM', date: '18 Sep 2023', time: '11:21 AM', amount: '9267.00', status: 'complete' },
  ];

  // Filtrage des transactions selon le statut sélectionné
  const filteredTransactions = selectedStatus === 'all'
    ? transactions
    : transactions.filter((transaction) => transaction.status === selectedStatus);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      <h2 className="text-xl font-semibold text-gray-700">Payment History</h2>
      {/* Filter Tabs */}
      <TransactionFilterTabs selectedStatus={selectedStatus} onSelectStatus={setSelectedStatus} />
      {/* Transactions List */}
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default TransactionsPage;
