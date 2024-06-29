import React from 'react';

const statusColors = {
  pending: 'bg-yellow-200',
  processing: 'bg-blue-200',
  onHold: 'bg-gray-200',
  completed: 'bg-green-200',
  shipped: 'bg-purple-200',
  cancelled: 'bg-red-200',
  refunded: 'bg-orange-200',
  failed: 'bg-pink-200',
  backordered: 'bg-indigo-200',
  returned: 'bg-teal-200',
};

const OrderStatus = ({ status }) => {
  // Check if status is defined and not null
  const lowerCaseStatus = status && status.toLowerCase();
  const bgColor = statusColors[lowerCaseStatus] || 'bg-gray-200'; // Default to gray if status not found

  return (
    <div className={`inline-block px-2 py-1 font-dm capitalize rounded-md ${bgColor} text-gray-800`}>
      {status}
    </div>
  );
};

export default OrderStatus;
