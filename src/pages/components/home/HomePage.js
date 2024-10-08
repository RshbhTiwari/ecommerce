import HeadingTitle from "../basic/title/HeadingTitle";
import CarouselCard from "./CarouselCard";
import CategoriesCard from "./CategoriesCard";
import Ordersection from "./Ordersection";
import ImageContent from "./ImageContent";
import OfferContent from "./OfferContent";
import HomeBanner from "./HomeBanner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../../../redux/slices/category";
import { getproduct, getProducts } from "../../../redux/slices/product";
import ProductCard from "../shop/tab/ProductCard";

const HomePage = () => {

    const dispatch = useDispatch();

    const [allCategoriesData, setAllCategoriesData] = useState([]);
    const [allProductsData, setAllProductsData] = useState([]);
    const { isLoading, error, categories } = useSelector(
        (state) => state.category
    );
    const { isLoading: productIsLoading, error: productError, products } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (categories?.length) {
            setAllCategoriesData(categories);
        }
    }, [categories]);

    useEffect(() => {
        if (products?.length) {
            setAllProductsData(products);
        }
    }, [products]);

    const productsToDisplay = allProductsData.slice(0, 4);

    return (
        <>

            <HomeBanner />

            <div className="container mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8">
                {allCategoriesData.length > 0 ? (
                    <>
                        <div data-aos="fade-up" data-aos-delay="200"><CarouselCard /></div>
                        <div className="pb-10">

                            <div className="" data-aos="zoom-in" data-aos-delay="200">
                                <HeadingTitle title="Shop By Categories" />
                            </div>

                            <div data-aos="fade-up" data-aos-delay="200">
                                <div className="mt-4">
                                    <CategoriesCard />
                                </div>
                            </div>

                        </div>
                    </>
                ) : null}
            </div>

            <div className="bg-[#072320] mb-10 py-4">
                <Ordersection />
            </div>

            <div className="container mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8">

                {allProductsData?.length > 0 ? (
                    <div className="pb-10">
                                   <div className="" data-aos="zoom-in" data-aos-delay="200">
                            <HeadingTitle title="Bestsellers in September" />
                        </div>
                        <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
                            <ProductCard skeletonCount={4}
                                allProducts={productsToDisplay}
                                productIsLoading={productIsLoading}
                                productError={productError} />
                        </div>
                    </div>
                ) : null}

                <div className="pb-10">
                    <ImageContent />
                </div>

                <div className="pb-10"  data-aos="fade-up" data-aos-delay="200">
                    <OfferContent />
                </div>
            </div>

        </>
    );
};

export default HomePage;