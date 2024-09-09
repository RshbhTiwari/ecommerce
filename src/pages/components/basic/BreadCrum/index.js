export default function BreadCrum({ componentName, link, componentSecondName }) {
    return (
        <>
            <div className="bread_crumb py-2" >
                <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <p className='text-lg sm:text-left text-center font-dm font-lg py-1 font-normal capitalize' data-aos="fade-right"
     data-aos-duration="1000">
                        <a href='/' className=''>Home</a>
                        <span className='text-[#00A762] mx-2 font-medium'>/</span>
                        <a href={link} className=''>{componentName}</a>
                        {componentSecondName ? (
                            <>
                                <span className='text-[#00A762] mx-2 font-medium'>/</span>
                                <span>{componentSecondName}</span>
                            </>
                        ) : null}
                    </p>
                </div>
            </div>
        </>
    );
}