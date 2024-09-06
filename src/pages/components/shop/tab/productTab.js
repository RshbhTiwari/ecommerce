import { useEffect, useState } from 'react';
import { FaListUl } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import PaginationshopCard from './PaginationshopCard';
import PaginationshoplistCard from './PaginationshoplistCard';

const ProductTab = ({ allproducts, productIsLoading, productError }) => {
    const [activeTab, setActiveTab] = useState('tab_a');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            {allproducts?.length ? (
                <div className="flex space-x-2">
                    <div
                        className={`px-3 py-2 bg-[#00A762] justify-center cursor-pointer items-center text-white rounded-md flex  ${activeTab === 'tab_a' ? 'bg-teal-950' : ''
                            }`}
                        onClick={() => handleTabClick('tab_a')}
                    >
                        <CgMenuGridR className='text-2xl' />
                    </div>

                    <div
                        className={`px-3 py-2 bg-[#00A762] justify-center cursor-pointer items-center text-white rounded-md flex  ${activeTab === 'tab_b' ? 'bg-teal-950' : ''
                            }`}
                        onClick={() => handleTabClick('tab_b')}
                    ><FaListUl className='text-xl' />

                    </div>
                </div>
            ) : null}

            <div className="mt-4 h-full"  >
                {activeTab === 'tab_a' && (
                    <div data-aos="fade-up" data-aos-delay="100">
                    <PaginationshopCard products={allproducts} productIsLoading={productIsLoading}
                        productError={productError} /></div>
                )}
                {activeTab === 'tab_b' && (
                    <div data-aos="fade-up" data-aos-delay="100">
                    <PaginationshoplistCard products={allproducts} productIsLoading={productIsLoading}
                        productError={productError} /></div>
                )}
            </div>
        </>

    );
};

export default ProductTab;