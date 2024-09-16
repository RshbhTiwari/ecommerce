import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../title';

const LatestPosts = ({ allblog }) => {
    const navigate = useNavigate();

    const handleDetailsRow = (id) => {
        navigate(`/blog/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <table className='w-full my-2'>
        <tbody>
            {allblog.slice(0, 3).map((row, index) => (
                <tr className='border-b cursor-pointer' key={index} onClick={() => {
                    handleDetailsRow(row.id);
                }} >

                    <td className='font-dm py-2 text-[#00A762] overflow-hidden w-1/4 rounded-lg'>
                        <img
                            src={row.image}
                            alt="image"
                            className="h-full w-full rounded-lg shadow
                                overflow-hidden hover:scale-110 transition-all duration-500"
                        />
                    </td>

                    <td className='font-dm py-2 pl-4 text-end text-[#00A762]'>
                        <h2 className="text-[#00A762]  
                        font-dm text-base capitalize font-medium">{row.title}</h2>
                        <Paragraph title={row.date} textAlign='right' />
                    </td>

                </tr>

            ))
            }

        </tbody>
    </table>
    );
};

export default LatestPosts;