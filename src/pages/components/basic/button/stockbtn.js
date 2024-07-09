import React from 'react';

const StockBtn = ({ title }) => {
    const bgColor = title === 'In Stock' ? 'bg-[#00a7629e]' : 'bg-[#ef444487]';
    return (
        <div className={`font-dm font-medium text-base uppercase text-center rounded-lg py-1 ${bgColor}`}>{title}</div>
    );
};

export default StockBtn;