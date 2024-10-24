import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getproduct, getProducts } from "../../../../redux/slices/product";
import { useEffect, useState } from "react";
import { NoProducts } from "../ErrorPages";
import { addCartItems, getAllCartItems } from "../../../../redux/slices/addToCart";
import { toast } from 'react-toastify';
import { Paragraph } from "../title";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { getWishlist, postWishlistUser } from "../../../../redux/slices/wishlist";

function SearchAllproduct({
    products,
    productIsLoading,
    productError,

    localCartItems,
    cartIsLoading,
    cartErorr,

    wishlist,
    wishlistIsLoading,
    wishlistError,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const initialFilterName = queryParams.get('filter') || '';

  
    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';


    const [filterName, setFilterName] = useState(initialFilterName);  // State for search input
    const [filteredProducts, setFilteredProducts] = useState([]);  // State for filtered products

    useEffect(() => {
        if (products) {
            const filtered = products.filter(product =>
                product?.name.toLowerCase().includes(filterName.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [products, filterName]);

    const handleSearchChange = (e) => {
        const newFilterName = e.target.value;
        setFilterName(newFilterName);

        // Update the URL query parameter
        navigate(`?filter=${newFilterName}`, { replace: true });
    };

    const handleAddToCart = (product_id) => {
        const cartDataid = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

        const cart_id = cartDataid !== null ? Number(cartDataid) : null;
        const cartItem = {
            item_id: product_id,
            ...(cart_id && { cart_id }),
            ...(customer_id && { customer_id })
        };
        dispatch(addCartItems(cartItem, toast, navigate));
    };

    const handleAddWishlist = (product_id) => {
        const accessToken = localStorage.getItem('accessToken') || null;
        if (accessToken) {
            const user_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
            const payload = {
                product_id: product_id,
                ...(user_id && { user_id })
            };
            dispatch(postWishlistUser(payload, toast));
        } else {
            navigate('/login')
            toast.error("You need to log in to add to wishlist");
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const handleDetailsRow = (id) => {
        navigate(`/shop/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // This adds a smooth scroll effect
        });
    };

    const isItemInCart = (itemId) => {
        return localCartItems.some((cartItem) => cartItem.item_id === itemId);
    };

    const isItemInwishlist = (itemId) => {
        return wishlist?.some((wishlistItem) => wishlistItem.product_id === itemId);
    };

    return (
        <>
            <div className="text-center flex w-full justify-center items-center my-10 gap-4">
                <input
                    className='input_box w-2/4'
                    type="text"
                    id="search"
                    placeholder='Start typing...'
                    value={filterName}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Display filtered products in a grid */}
            <div className="grid grid-cols-12 gap-4" data-aos="fade-up" data-aos-delay="300">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <div
                            className={`md:col-span-6 lg:col-span-3 col-span-12 flex flex-col justify-between relative h-full items-center rounded-lg border-2 border-[#072320]`}
                            key={index}
                        >
                            <div className='flex justify-center items-center bg-[#00A762] cursor-pointer p-4 rounded-lg mt-3 mb-2 mx-6 relative'>
                                <div className='overflow-hidden rounded-lg h-[200px] relative' onClick={() => {
                                    handleDetailsRow(item?.id);
                                }}>
                                    <img
                                        src={BASE_IMAGE_URL + item?.additional_images[0]}
                                        alt="image"
                                        className="w-full h-full object-cover rounded-lg hover:scale-110 transition-all duration-500 cursor-pointer"
                                    />
                                </div>
                                {item?.offer ? (
                                    <div className='text-white font-dm flex justify-center items-center uppercase w-14 absolute h-14 border-2 border-[#072320] rounded-full top-4 right-4'>
                                        {item?.offer}
                                    </div>
                                ) : null}
                            </div>

                            <div className='flex flex-col justify-center items-center px-4'>
                                <h2 className="text-[#00A762] text-center cursor-pointer font-dm text-lg capitalize font-medium" onClick={() => {
                                    handleDetailsRow(item?.id);
                                }}>
                                    {item?.name}
                                </h2>
                                <div className='pb-2'>
                                    <Paragraph title={item?.short_description} shortDescription='true' />
                                </div>
                                {item?.discount_price ? (
                                    <>
                                        <div className="flex items-center gap-2 text-[#00A762] text-center font-dm text-lg capitalize font-medium pb-2">
                                            <span className="block text-xs line-through">₹{item?.price}</span>
                                            <span className="block">₹{item?.discount_price}</span>
                                        </div>
                                    </>
                                ) : (
                                    <h2 className="text-[#00A762] font-dm text-lg capitalize font-medium pb-2">
                                        ₹{item?.price}
                                    </h2>
                                )}
                            </div>

                            <div className='flex justify-center items-center px-2 py-2 gap-2'>


                                <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320]'>
                                    <button
                                        onClick={() => handleAddWishlist(item?.id)}
                                        disabled={isItemInwishlist(item?.id)}
                                        className={`flex items-center justify-center w-full h-full rounded-lg ${isItemInwishlist(item?.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#072320] cursor-pointer'}`}
                                    >
                                        <FaRegHeart className='text-white text-[22px]' />
                                    </button>
                                </div>
                                
                                <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320]'>
                                    <button
                                        onClick={() => handleAddToCart(item?.id)}
                                        disabled={isItemInCart(item?.id)}
                                        className={`flex items-center justify-center w-full h-full rounded-lg ${isItemInCart(item?.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#072320] cursor-pointer'}`}
                                    >
                                        <HiOutlineShoppingBag className='text-white text-[22px]' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-12 relative my-10'>
                        <div className="flex justify-center items-center w-full">
                            <NoProducts height='200px' />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchAllproduct;

