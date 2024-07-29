import { useNavigate } from 'react-router-dom';
import allblog from '../../../data/allblog';
import BreadCrum from '../basic/BreadCrum';
import { HeadingBanner, HeadingTitle, Paragraph } from '../basic/title';
import { AllCategories, BestSeller } from '../basic/MultiUses';
import size from '../../../data/size';
import { Squarebtn } from '../basic/button';
import {
    fetchAllCategories, fetchOneCategory,
    startLoading,
    hasError,
    fetchOneSubCategory,
} from "../../../redux/slices/category";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductTab from '../shop/tab/productTab';
import CollectionsShopCard from '../shop/CollectionsShopCard';
import { getproduct } from '../../../redux/slices/product';

export default function DetailsCategoriesPages({ id }) {
    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [reloadPage, setReloadPage] = useState(false);
    const [allCategoriesData, setAllCategoriesData] = useState([]);
    const [allSubProductsData, setAllSubProductsData] = useState([]);

    const [loading, setLoading] = useState(true);

    const { isLoading: categoryIsLoading, error: categoryError, categories, oneCategory, oneSubCategory } = useSelector(
        (state) => state.category
    );
    const { isLoading: productIsLoading, error: productError, products } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchOneCategory(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (categories?.length) {
            setAllCategoriesData(categories);
        }
    }, [categories]);

    useEffect(() => {
        if (reloadPage) {
            window.location.reload();
            setReloadPage(false);
        }
    }, [reloadPage]);

    useEffect(() => {
        if (oneCategory && oneCategory?.all_products) {
            setAllSubProductsData(oneCategory?.all_products);
        }
    }, [oneCategory, id]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);



    const categoriDetailsRow = (id) => {
        navigate(`/categories/${id}`);
        setReloadPage(true);
    };

    const handleSubProductsRow = (id) => {
        dispatch(fetchOneSubCategory(id));
    };

    useEffect(() => {
        if (oneSubCategory && oneSubCategory.products) {
            setAllSubProductsData(oneSubCategory?.products);
        }
    }, [oneSubCategory]);


    return (
        <>
            <BreadCrum componentName="categories" link="/shop" />
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">


                <div className="grid grid-cols-12 gap-6 py-10">


                    <div className='md:col-span-4 lg:col-span-3 col-span-12'>

                        <div className='pb-10'>
                            <HeadingTitle title="Categories" textAlign='left' />

                            {categoryIsLoading || loading ? (
                                <>
                                    {allCategoriesData.map((_, index) => (
                                        <div key={index} className='animate-pulse flex justify-between pt-4' >
                                            <div className='w-[150px]  py-2 bg-gray-300  rounded'></div>
                                            <div className='w-10 bg-gray-300 rounded'></div>
                                        </div>
                                    ))}
                                </>
                            ) : categoryError ? (
                                <p className="font-dm ">Error loading categories</p>
                            ) : allCategoriesData.length > 0 ? (
                                <table className='w-full my-2'>
                                    <tbody>
                                        {allCategoriesData.map((row, index) => (
                                            <AllCategories
                                                key={index}
                                                row={row}
                                                onDetailsRow={() => categoriDetailsRow(row.id)}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            ) : null}
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

                        <div className='px-4 pb-4'>
                            {categoryIsLoading || loading ? (
                                <>
                                    <div className='animate-pulse' >
                                        <div className='w-[200px] h-6  py-2 bg-gray-300  rounded'></div>
                                        <div className='mt-2'>
                                            <div className='w-full h-4 bg-gray-300 rounded '></div>
                                            <div className='w-full h-4 bg-gray-300 rounded my-2'></div>
                                            {/* <div className='w-full h-4 bg-gray-300 rounded my-2'></div> */}
                                            <div className='w-2/4 h-4 bg-gray-300 rounded'></div>
                                        </div>

                                    </div>
                                </>
                            ) : categoryError ? (
                                <p className="font-dm ">Error loading categories</p>
                            ) : (
                                <>
                                    <HeadingBanner color='#072320'
                                        title={oneCategory?.name}
                                        textAlign='left' />
                                    <div>
                                        <Paragraph
                                            title={oneCategory?.description} textAlign='left' />
                                    </div>
                                </>
                            )}

                            <div className='my-6'>
                                <HeadingTitle title="Sub Categories" textAlign='left' />
                            </div>
                            {categoryIsLoading || loading ? (
                                <>
                                    <div className='mb-6'>
                                        <div className="grid grid-cols-12 gap-6">
                                            {oneCategory?.children?.map((_, index) => (
                                                <div key={index} className='md:col-span-6 lg:col-span-3 col-span-12 
                                                cursor-pointer flex flex-col justify-center p-3 relative h-full
                                                 items-center rounded-lg border-2'>
                                                    <div className='flex justify-center items-center rounded-lg p-3'>
                                                        {/* <Skeleton height={100} width={100} /> */}
                                                    </div>
                                                    <div className='pt-2'>
                                                        {/* <Skeleton height={20} width={100} /> */}
                                                    </div>
                                                    {/* <Skeleton height={20} width={150} /> */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : categoryError ? (
                                <p className="font-dm ">Error loading categories</p>
                            ) : (
                                <>
                                    {oneCategory?.children && oneCategory?.children?.length > 0 ? (
                                        <>
                                            <div className='mb-6'>
                                                <div className="grid grid-cols-12 gap-6">
                                                    {oneCategory?.children?.map((row, index) => (
                                                        <div key={index}
                                                            onClick={() => handleSubProductsRow(row?.id)}
                                                            className='md:col-span-6 lg:col-span-3 col-span-12 cursor-pointer 
                                                    flex flex-col justify-center p-3 relative h-full items-center rounded-lg
                                                     border-[2px] border-[#072320]'>

                                                            <div className='flex justify-center items-center bg-[#00A762] rounded-lg p-3'>
                                                                <div className='overflow-hidden rounded-lg'>
                                                                    <img
                                                                        src={BASE_IMAGE_URL + row?.thumbnail_image}
                                                                        alt="image"
                                                                        className="overflow-hidden rounded-lg
                                                     hover:scale-110 transition-all duration-500 cursor-pointer"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className='pt-2'>
                                                                <h2 className="text-[#00A762] text-center 
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
                                </>
                            )}
                        </div>

                        <div className="max-w-screen-lg mx-auto p-4">
                            <ProductTab
                                allproducts={allSubProductsData} productIsLoading={productIsLoading} productError={productError}
                            />
                        </div>
                    </div>

                </div>


                <div className="pb-10">
                    <HeadingTitle title="most purchased products" />
                    <div className="mt-4">
                        <CollectionsShopCard allproducts={products} />
                    </div>
                </div>

            </div>

        </>

    );
}


{/* <div className='my-10'>
    <ErrorPages
        title="Oops! Page Not Found"
        massage="It seems like you've taken a wrong turn. Don't worry, you can head back to our homepage to continue your shopping journey."
        height="350px"
        handleClick={() => { navigate('/') }}
    /></div>; */}