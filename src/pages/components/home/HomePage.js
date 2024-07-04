import HeadingTitle from "../basic/title/HeadingTitle";
import CarouselCard from "./CarouselCard";
import CategoriesCard from "./CategoriesCard";
import Ordersection from "./Ordersection";
import ProductCard from "./ProductCard";
import ImageContent from "./ImageContent";
import OfferContent from "./OfferContent";
import HomeBanner from "./HomeBanner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../../../redux/slices/category";

const HomePage = () => {

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

    return (
        <>

            <HomeBanner />

            <div className="container mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8">
                <CarouselCard />

                {categories.length > 0 ? (
                    <div className="pb-10">
                        <HeadingTitle title="Shop By Categories" />
                        <div className="mt-4">
                            <CategoriesCard />
                        </div>
                    </div>
                ) : null}


            </div>

            <div className="bg-[#072320] mb-10 py-4">
                <Ordersection />
            </div>

            <div className="container mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8">

                <div className="pb-10">
                    <HeadingTitle title="Bestsellers in September" />
                    <div className="mt-4">
                        <ProductCard />
                    </div>
                </div>

                <div className="pb-10">
                    <ImageContent />
                </div>


                <div className="pb-10">
                    <OfferContent />
                </div>

            </div>

        </>
    );
};

export default HomePage;