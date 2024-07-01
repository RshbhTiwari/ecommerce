import React from 'react';

const One = ({ title,
    handleClick,
    bgColor, type,width, textwrap }) => {

    const buttonType = type === 'submit' ? 'submit' : 'button';

    const textwrapClass = textwrap === 'nowarp' ? 'text-nowrap'  :
        'text-wrap';

    const buttonStyle = {
        backgroundColor: bgColor,
        cursor: 'pointer',
        width: width || 'auto',
    };
    return (
        <>
         <button className={`text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize ${textwrapClass}`} style={buttonStyle}
            type={buttonType}
        onClick={handleClick}
        >
            {title}
        </button>

        
        </>
       
    );
};

export default One;