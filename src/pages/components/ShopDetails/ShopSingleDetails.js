import React, { useEffect, useState } from 'react';
import ProductImagesPage from './ProductImagesPage';
import BreadCrum from '../basic/BreadCrum';
import { HeadingTitle } from '../basic/title';
import ProductSingleContentPage from './ProductSingleContentPage';
import CollectionsShopCard from '../shop/CollectionsShopCard';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from '../../../redux/slices/product';

const ShopSingleDetails = ({ id }) => {
    const dispatch = useDispatch();

    const [allSingleProductsData, setSingleProductsData] = useState([]);

    const { isLoading, error, oneproduct } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getOneProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (oneproduct) {
            setSingleProductsData(oneproduct);
        }
    }, [oneproduct]);



    return (
        <>
            <BreadCrum componentName="shop" link="/shop" componentSecondName="shop Details" />

            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-8 gap-0 py-10">
                    <div className='lg:col-span-5 col-span-12'>
                            <ProductImagesPage id={id} />
                    </div>

                    <div className='lg:col-span-7 col-span-12'>
                        <ProductSingleContentPage oneproduct={allSingleProductsData} />
                    </div>
                </div>

                <div className="pb-10">
                    <HeadingTitle title="related products" />
                    <div className="mt-4">
                        <CollectionsShopCard />
                    </div>
                </div>
            </div>

        </>

    );
};

export default ShopSingleDetails;
