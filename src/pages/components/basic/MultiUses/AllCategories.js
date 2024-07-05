import React from 'react';

const AllCategories = ({ row ,onDetailsRow}) => {
    const { name ,total_product_count} = row;
    return (
        <tr className='border-b cursor-pointer' onClick={() => {
            // onFilterRow();
            onDetailsRow();
          }} >
            <td className='font-dm py-2 text-[#00A762]'>{name}</td>
            <td className='font-dm py-2 text-end text-[#00A762] text-nowrap'>{total_product_count} Products</td>
        </tr>

    );
};

export default AllCategories;