import React from 'react';

const HeadingBanner = ({ title, textAlign, color }) => {

    const alignmentClass = textAlign === 'left' ? 'md:text-left text-center' :
        textAlign === 'right' ? 'text-right' : textAlign === 'center' ? 'text-center' :
            'md:text-left text-center';

    const textColor = color === '#072320' ? 'text-[#072320]' : 'text-white';

    const titleStyle = {};

    return (
        <h1 className={`font-dm text-4xl mb-2 capitalize p-0 font-medium ${alignmentClass} ${textColor}`} style={titleStyle}>
            {title}
        </h1>
    );
};

export default HeadingBanner;