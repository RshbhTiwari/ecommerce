import React from 'react';

const HeadingTitle = ({ title, textAlign, color, border }) => {

    const alignmentClass = textAlign === 'left' ? 'md:text-left text-center' :
        textAlign === 'right' ? 'text-right' :
            'text-center';

    const textColor = color === 'white' ? 'text-white' :
        color === 'rgb(ffff)' ? 'text-rgb(ffff)' : color === '#00A762' ? 'text-[#00A762]' :
            'text-[#072320]';

    const borderColor = border === 'white' ? 'border-white' : border === '#00A762' ? 'border-[#00A762]' :
        'border-[#072320]';

    const titleStyle = {};

    return (
        <h2
            className={`
                    font-dm text-2xl capitalize border-b-2 font-medium pb-2 ${alignmentClass} ${textColor} ${borderColor}`}


            style={titleStyle}>{title}</h2>
    );
};

export default HeadingTitle;