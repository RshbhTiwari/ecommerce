import React from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi";

const Btnoutline = ({ title,color, handleClick,
    type, width }) => {

    const buttonType = type === 'submit' ? 'submit' : 'button';

    const buttonStyle = {
        color: color || '#00A762',
        cursor: 'pointer',
        width: width || 'auto',
        border: '2px solid',
    };

    return (
        <button className="flex items-center justify-center rounded-lg shadow-md font-dm px-3 py-2 capitalize" style={buttonStyle}
            type={buttonType} onClick={handleClick}
        >
            <HiOutlineShoppingBag className='text-[#00A762] mr-2 text-2xl' /> {title}
        </button>
    );
};

export default Btnoutline;