import { useNavigate } from 'react-router-dom';
import allblog from '../../../data/allblog';
import BreadCrum from '../basic/BreadCrum';
import { HeadingTitle } from '../basic/title';
import CollectionsShopCard from './CollectionsShopCard';
import './shop.css';
import { AllCategories, BestSeller } from '../basic/MultiUses';
import size from '../../../data/size';
import { Squarebtn } from '../basic/button';
import ProductTab from './tab/productTab';
import { useEffect, useState } from 'react';

export default function ProductPage({
    localCartItems,
    wishlist,

    allProductsData,
    productIsLoading,
    productError,

    allCategoriesData,
    categoryIsLoading,
    categoryError,
}) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const categoriDetailsRow = (id) => {
        navigate(`/categories/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <BreadCrum componentName="shop" link="/shop" />

            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-6 py-10">
                    <div className='md:col-span-4 lg:col-span-3 col-span-12'>
                        <div className='pb-10'>
                            <HeadingTitle title="Categories" textAlign='left' />
                            {categoryIsLoading || loading ? (
                                <> {allCategoriesData.map((_, index) => (
                                    <div key={index} className='animate-pulse flex justify-between py-2' >
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
                        <div className="max-w-screen-lg mx-auto p-4"  >
                            <ProductTab
                                localCartItems={localCartItems}
                                wishlist={wishlist}

                                allproducts={allProductsData}
                                productIsLoading={productIsLoading}
                                productError={productError} />
                        </div>
                    </div>

                </div>


                <div className="pb-10">
                    <div className="" data-aos="zoom-in" data-aos-delay="100">
                        <HeadingTitle title="most purchased products" />
                    </div>
                    <div className="mt-4" data-aos="fade-up" data-aos-delay="100">
                        <CollectionsShopCard allproducts={allProductsData}  localCartItems={localCartItems}
                                wishlist={wishlist} />
                    </div>
                </div>

            </div>

        </>

    );
}