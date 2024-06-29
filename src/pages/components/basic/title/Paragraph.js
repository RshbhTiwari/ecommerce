import React from 'react';

const Paragraph = ({ title, textAlign, color ,width}) => {

    const alignmentClass = textAlign === 'left' ? 'md:text-left text-center' : textAlign === 'onyleft' ? 'text-left' :
        textAlign === 'right' ? 'text-right' :
            'text-center';

    const textColor = color === 'white' ? 'text-white' :
        color === '#00A762' ? 'text-[#00A762] hover:text-[#000000] ' :
            'text-[#000000]';

    const titleStyle = {
        width:width,
    };

    return (
        <p
            className={`text-base font-dm  ${alignmentClass} ${textColor}`}
            style={titleStyle}>{title}</p>
    );
};

export default Paragraph;