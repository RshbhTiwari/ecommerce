
import BreadCrum from '../basic/BreadCrum';
import { HeadingBanner, HeadingTitle, Paragraph } from '../basic/title';
import { useEffect, useState } from 'react';
import comLogo from '../../../assets/home/5.jpg';
import ProductTab from '../shop/tab/productTab';
import CollectionsShopCard from '../shop/CollectionsShopCard';

export default function DetailsCategoriesPages({categoriesData}) {
    const { name,short_description } = categoriesData;


    const [tableData, setTableData] = useState([]);
    
    const handleFilterRow = (id) => {
        console.log("id", id)
        // dispatch(deleteBanners(id, toast));
        // const filterData = tableData.filter((item) => item._id !== id);
        // setTableData(filterData);
        // navigate(`/blog/${id}`);
    };

    return (
        <>
            <BreadCrum componentName="shop" link="/shop" />

            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className='px-4 pb-4'>
                    <HeadingBanner color='#072320'
                        title={name}
                        textAlign='left' />

                    <div>
                        <Paragraph
                            title={short_description} textAlign='left' />
                    </div>

                    <div className='my-6'>
                        <HeadingTitle title="Sub Categories" textAlign='left' />
                    </div>

                    <div className='mb-6'>
                        <div className="grid grid-cols-12 gap-6">
                            <div className='md:col-span-6 lg:col-span-3 col-span-12 flex flex-col justify-center p-4 relative h-full items-center rounded-lg border-[2px] border-[#072320]'>

                                <div className='flex justify-center items-center bg-[#00A762] rounded-lg p-4'>
                                    <div className='overflow-hidden rounded-lg'>
                                        <img
                                            src={comLogo}
                                            alt="image"
                                            className="overflow-hidden rounded-lg
                                                     hover:scale-110 transition-all duration-500 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className='pt-2'>
                                    <h2 class="text-[#00A762] text-center 
                                               font-dm text-lg capitalize font-medium 
                                                ">Red Radish 1 pack</h2>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <ProductTab />


                <div className="pb-10">
                    <HeadingTitle title="most purchased products" />
                    <div className="mt-4">
                        <CollectionsShopCard />
                    </div>
                </div>

            </div>

        </>

    );
}