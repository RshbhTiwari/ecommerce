import React from 'react';

const Squarebtn = ({ title, textTransform,
    // onClick,
    bgColor, type, }) => {

    const buttonType = type === 'submit' ? 'submit' : 'button';

    const textClass = textTransform === 'uppercase' ? 'uppercase' : 'capitalize';

    // const handleClick = () => {
    //     if (type === 'submit') {
    //       onClick();
    //     }
    //   };

    const buttonStyle = {
        backgroundColor: bgColor,
        cursor: 'pointer',
    };

    return (

        <button className={`font-dm font-sm px-3 py-2 text-white ${textClass}`}
            style={buttonStyle}
            type={buttonType}>{title}</button>
    );
};

export default Squarebtn;