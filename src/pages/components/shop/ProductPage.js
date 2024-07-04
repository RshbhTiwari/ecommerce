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
    fetchAllCategories,
    startLoading,
    hasError,
} from "../../../redux/slices/category";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import comLogo from '../../../assets/home/5.jpg';

export default function ProductPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [allCategoriesData, setAllCategoriesData] = useState([]);

    const { isLoading, error, categories } = useSelector(
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
        console.log("id", id)
        navigate(`/categories/${id}`);
        //  dispatch(deleteBanners(id, toast));
        //   const filterData = allCategoriesData.filter((item) => item._id !== id);
        //  setAllCategoriesData(filterData);
    };

    return (
        <>
            <BreadCrum componentName="shop" link="/shop" />
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