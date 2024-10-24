import HeadingTitle from "../basic/title/HeadingTitle";
import CarouselCard from "./CarouselCard";
import CategoriesCard from "./CategoriesCard";
import Ordersection from "./Ordersection";
import ImageContent from "./ImageContent";
import OfferContent from "./OfferContent";
import HomeBanner from "./HomeBanner";
import ProductCard from "../shop/tab/ProductCard";

const HomePage = ({
    allProductsData,
    productIsLoading,
    productError,

    allCategoriesData,
    categoryIsLoading,
    categoryError,

    cartData,
    cartIsLoading,
    cartErorr,

    wishlist,
    wishlistIsLoading,
    wishlistError,
}) => {


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
                                    <CategoriesCard allCategoriesData={allCategoriesData}
                                        categoryIsLoading={categoryIsLoading}
                                        categoryError={categoryError} />
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
                                productError={productError}

                                localCartItems={cartData}
                                cartIsLoading={cartIsLoading}
                                cartErorr={cartErorr}

                                wishlist={wishlist}
                                wishlistIsLoading={wishlistIsLoading}
                                wishlistError={wishlistError}
                            />
                        </div>

                    </div>

                ) : null}

                <div className="pb-10">

                    <ImageContent />

                </div>

                <div className="pb-10" data-aos="fade-up" data-aos-delay="200">
                    <OfferContent />
                </div>
            </div>

        </>
    );
};

export default HomePage;