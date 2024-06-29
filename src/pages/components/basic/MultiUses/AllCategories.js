import React from 'react';

const AllCategories = ({ categoriescarddata }) => {
    return (
        <table className='w-full my-2'>
            <tbody>
                {categoriescarddata.slice(0, 3).map((row, index) => (
                    <tr className='border-b cursor-pointer' key={index} >
                        <td className='font-dm py-2 text-[#00A762]'>{row.title}</td>
                        <td className='font-dm py-2 text-end text-[#00A762]'>{row.item}</td>
                    </tr>
                ))
                }

            </tbody>
        </table>
    );
};

export default AllCategories;