// import React from 'react';

// const One = ({ title,
//     handleClick,
//     bgColor, type, width, textwrap }) => {

//     const buttonType = type === 'submit' ? 'submit' : 'button';

//     const textwrapClass = textwrap === 'nowarp' ? 'text-nowrap' :
//         'text-wrap';

//     const buttonStyle = {
//         backgroundColor: bgColor,
//         cursor: 'pointer',
//         width: width || 'auto',
//     };
//     return (
//         <>
//             <button className={`text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize ${textwrapClass}`} style={buttonStyle}
//                 type={buttonType}
//                 onClick={handleClick}
//             >
//                 {title}
//             </button>
//         </>

//     );
// };

// export default One;
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const One = ({ title, handleClick, bgColor, type, width, textwrap, loading }) => {
    const buttonType = type === 'submit' ? 'submit' : 'button';
    const textwrapClass = textwrap === 'nowarp' ? 'text-nowrap' : 'text-wrap';

    const buttonStyle = {
        backgroundColor: bgColor,
        cursor: loading ? 'not-allowed' : 'pointer',
        width: width || 'auto',
    };

    return (
        <button
            className={`text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize ${textwrapClass} flex items-center justify-center`}
            style={buttonStyle}
            type={buttonType}
            onClick={handleClick}
            disabled={loading}
        >
            {loading ? (
                <FaSpinner className="animate-spin text-xl" />
            ) : (
                title
            )}
        </button>
    );
};

export default One;


