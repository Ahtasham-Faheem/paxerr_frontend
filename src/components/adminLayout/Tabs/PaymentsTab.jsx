import React from 'react';

const transactions = [
  { amount: 150.75, method: 'Credit Card', date: '2025-05-01', reference: 'INV-1001' },
  { amount: 299.99, method: 'PayPal', date: '2025-04-20', reference: 'INV-1000' },
  { amount: 89.50, method: 'Credit Card', date: '2025-03-30', reference: 'INV-0999' },
  { amount: 230.00, method: 'Bank Transfer', date: '2025-03-10', reference: 'INV-0998' },
];

const PaymentsTab = () => {
  const totalSpend = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const maxSpend = Math.max(...transactions.map(tx => tx.amount));
  const lastTransaction = transactions[transactions.length - 1];

  const methodCount = transactions.reduce((acc, tx) => {
    acc[tx.method] = (acc[tx.method] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow-sm">
          <p className="text-sm">Total Spend</p>
          <p className="text-xl font-semibold text-primary">${totalSpend.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <p className="text-sm">Max Single Spend</p>
          <p className="text-xl font-semibold text-primary">${maxSpend.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <p className="text-sm">Last Transaction</p>
          <p className="text-md font-medium">{lastTransaction.date} — ${lastTransaction.amount.toFixed(2)}</p>
        </div>
      </div>

      {/* Payment Method Count */}
      <div className="p-4 border rounded shadow-sm">
        <p className="font-semibold mb-2">Payment Method Usage</p>
        <ul className="text-sm list-disc ml-5">
          {Object.entries(methodCount).map(([method, count]) => (
            <li key={method}>{method}: {count} transaction{count > 1 ? 's' : ''}</li>
          ))}
        </ul>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border text-sm">
          <thead className="">
            <tr>
              <th className="px-4 py-2 text-left border">Date</th>
              <th className="px-4 py-2 text-left border">Amount</th>
              <th className="px-4 py-2 text-left border">Method</th>
              <th className="px-4 py-2 text-left border">Reference</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="odd:even">
                <td className="px-4 py-2 border">{tx.date}</td>
                <td className="px-4 py-2 border">${tx.amount.toFixed(2)}</td>
                <td className="px-4 py-2 border">{tx.method}</td>
                <td className="px-4 py-2 border">{tx.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTab;
