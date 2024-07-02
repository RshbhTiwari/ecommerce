import { useNavigate } from 'react-router-dom';
import allblog from '../../../data/allblog';
import BreadCrum from '../basic/BreadCrum';
import { HeadingBanner, HeadingTitle, Paragraph } from '../basic/title';
import CollectionsShopCard from './CollectionsShopCard';
import './shop.css';
import categoriescarddata from '../../../data/categoriescarddata';
import ProductCard from '../home/ProductCard';
import { AllCategories, BestSeller } from '../basic/MultiUses';
import size from '../../../data/size';
import { Squarebtn } from '../basic/button';
import ProductTab from './tab/productTab';
import {
    fetchAllCategories, fetchOneCategory,
    startLoading,
    hasError,
} from "../../../redux/slices/category";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import comLogo from '../../../assets/home/5.jpg';

export default function ProductPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showSection, setShowSection] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allCategoriesData, setAllCategoriesData] = useState([]);
    const [tableData, setTableData] = useState([]);

    const { isLoading, error, categories, oneCategory } = useSelector(
        (state) => state.category
    );

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories?.length) {
            setAllCategoriesData(categories);
        }
    }, [categories]);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchOneCategory(selectedCategory));
            setShowSection(true);
        }
    }, [selectedCategory, dispatch]);

    const categoriDetailsRow = (id) => {
        setSelectedCategory(id);
    };

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


                <div className="grid grid-cols-12 gap-6 py-10">


                    <div className='md:col-span-4 lg:col-span-3 col-span-12'>

                        <div className='pb-10'>
                            <HeadingTitle title="Categories" textAlign='left' />

                            <table className='w-full my-2'>
                                <tbody>
                                    {allCategoriesData.map((row, index) => (
                                        <AllCategories
                                            key={index}
                                            row={row}
                                            onFilterRow={() => handleFilterRow(row.id)}
                                            onDetailsRow={() => categoriDetailsRow(row.id)}
                                        />
                                    ))
                                    }

                                </tbody>
                            </table>

                        </div>

                        <div className='pb-10'>
                            <HeadingTitle title="Best Seller" textAlign='left' />

                            <BestSeller allblog={allblog} />
                        </div>

                        <div className=''>
                            <HeadingTitle title="Size" textAlign='left' />

                            <div className='my-4 flex flex-wrap gap-2'>
                                {size.map((row, index) => (
                                    <div key={index}>
                                        <Squarebtn title={row.title} bgColor="#036642" textTransform='uppercase' />
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className='md:col-span-8 lg:col-span-9 col-span-12'>


                        {showSection && (
                            <div className='px-4 pb-4'>
                                <HeadingBanner color='#072320'
                                    title={oneCategory?.name}
                                    textAlign='left' />

                                <div>
                                    <Paragraph
                                        title={oneCategory?.short_description} textAlign='left' />
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
                        )}
                        <ProductTab />
                    </div>

                </div>


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