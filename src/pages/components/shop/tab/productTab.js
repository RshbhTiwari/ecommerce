import { useEffect, useState } from 'react';
import { FaListUl } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import PaginationshopCard from './PaginationshopCard';
import PaginationshoplistCard from './PaginationshoplistCard';

const ProductTab = ({ allproducts }) => {
    const [activeTab, setActiveTab] = useState('tab_a');
    const [allProductsData, setAllProductsData] = useState([]);

    useEffect(() => {
        if (allproducts?.length) {
            setAllProductsData(allproducts);
        }
    }, [allproducts]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            {allProductsData?.length ? (
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

            <div className="mt-4 h-full" >
                {activeTab === 'tab_a' && (
                    <PaginationshopCard products={allproducts} />
                )}
                {activeTab === 'tab_b' && (
                    <PaginationshoplistCard products={allproducts} />
                )}
            </div>
        </>

    );
};

export default ProductTab;