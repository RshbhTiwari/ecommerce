import { useNavigate } from 'react-router-dom';
import allblog from '../../../data/allblog';
import BreadCrum from '../basic/BreadCrum';
import { HeadingBanner, HeadingTitle, Paragraph } from '../basic/title';

import categoriescarddata from '../../../data/categoriescarddata';
import ProductCard from '../home/ProductCard';
import { AllCategories, BestSeller } from '../basic/MultiUses';
import size from '../../../data/size';
import { Squarebtn } from '../basic/button';
import {
    fetchAllCategories, fetchOneCategory,
    startLoading,
    hasError,
} from "../../../redux/slices/category";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductTab from '../shop/tab/productTab';
import CollectionsShopCard from '../shop/CollectionsShopCard';
import { ErrorPages } from '../basic/ErrorPages';
const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';


export default function DetailsCategoriesPages({ id }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [allCategoriesData, setAllCategoriesData] = useState([]);

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

    const categoriDetailsRow = (id) => {
        navigate(`/categories/${id}`);
    };

    const handleFilterRow = (id) => {
        console.log("id", id)
        // dispatch(deleteBanners(id, toast));
        // const filterData = allCategoriesData.filter((item) => item._id !== id);
        // setAllCategoriesData(filterData);
        // navigate(`/blog/${id}`);
    };

    useEffect(() => {
        dispatch(fetchOneCategory(id)); // Dispatch action to fetch category based on id
    }, [dispatch, id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div className='my-10'>
            <ErrorPages
                title="Oops! Page Not Found"
                massage="It seems like you've taken a wrong turn. Don't worry, you can head back to our homepage to continue your shopping journey."
                height="350px"
                handleClick={() => { navigate('/') }}
            /></div>;
    }

    console.log("oneCategory", oneCategory)
    
    return (
        <>
            <BreadCrum componentName="categories" link="/shop" />
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">


                <div className="grid grid-cols-12 gap-6 py-10">


                    <div className='md:col-span-4 lg:col-span-3 col-span-12'>
                        {allCategoriesData.length > 0 ? (
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
                        ) : null}
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



                        <div className='px-4 pb-4'>
                            <HeadingBanner color='#072320'
                                title={oneCategory?.name}
                                textAlign='left' />

                            <div>
                                <Paragraph
                                    title={oneCategory?.description} textAlign='left' />
                            </div>

                            {oneCategory?.subcategories && oneCategory?.subcategories?.length > 0 ? (
                                <>
                                    <div className='my-6'>
                                        <HeadingTitle title="Sub Categories" textAlign='left' />
                                    </div>


                                    <div className='mb-6'>
                                        <div className="grid grid-cols-12 gap-6">
                                            {oneCategory?.subcategories?.map((row, index) => (
                                                <div key={index}
                                                    className='md:col-span-6 lg:col-span-3 col-span-12 flex flex-col justify-center p-3 relative h-full items-center rounded-lg border-[2px] border-[#072320]'>

                                                    <div className='flex justify-center items-center bg-[#00A762] rounded-lg p-3'>
                                                        <div className='overflow-hidden rounded-lg'>
                                                            <img
                                                                src={BASE_IMAGE_URL + row?.image}
                                                                alt="image"
                                                                className="overflow-hidden rounded-lg
                                                     hover:scale-110 transition-all duration-500 cursor-pointer"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='pt-2'>
                                                        <h2 class="text-[#00A762] text-center 
                                               font-dm text-lg capitalize font-medium 
                                                ">{row?.name}</h2>
                                                    </div>

                                                    <h1 className='font-dm text-center'>{row?.products_count} Products</h1>

                                                </div>
                                            ))
                                            }
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>

                        <div className="max-w-screen-lg mx-auto p-4">
                            <ProductTab />
                        </div>
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