import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getproduct } from "../../../../redux/slices/product";
import { useEffect, useState } from "react";
import { NoProducts } from "../ErrorPages";
import { addCartItems } from "../../../../redux/slices/addToCart";
import { toast } from 'react-toastify';
import { Paragraph } from "../title";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Btnone } from "../button";

function SearchAllproduct() {
    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allProductsData, setAllProductsData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');  // State for search query
    const [filteredProducts, setFilteredProducts] = useState([]);  // State for filtered products
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);

    useEffect(() => {
        if (products?.length) {
            setAllProductsData(products);
        }
    }, [products]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        const query = searchQuery.toLowerCase();
        const filtered = allProductsData.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    const handleDetailsRow = (id) => {
        navigate(`/shop/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // This adds a smooth scroll effect
        });
    };

    const handleAddToCart = (product_id) => {
        const cart_id = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
        const cartItem = {
            item_id: product_id,
            ...(cart_id && { cart_id }),
            ...(customer_id && { customer_id })
        };
        console.log("cartItem", cartItem)
        dispatch(addCartItems(cartItem, toast, navigate));
    };

    return (
        <>
            <div className="text-center flex justify-center items-center my-10 gap-4">
                <input
                    className='input_box w-full'
                    type="text"
                    id="search"
                    placeholder='Start typing...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Btnone title="Search" handleClick={handleSearchClick}
                    bgColor="#00A762" />

            </div>

            {/* Display filtered products in a grid */}
            <div className="grid grid-cols-12 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <div
                            className={`md:col-span-6 lg:col-span-3  col-span-12 flex flex-col justify-between relative h-full items-center rounded-lg 
                      border-2 border-[#072320]`}
                            key={index}
                        >

                            <div className='flex justify-center items-center bg-[#00A762] cursor-pointer p-4 rounded-lg mt-3 mb-2 mx-6 relative'
                                onClick={() => {
                                    handleDetailsRow(item?.id);
                                }}
                            >
                                <div className='overflow-hidden rounded-lg h-[200px] relative'>
                                    <img
                                        src={BASE_IMAGE_URL + item?.additional_images[0]}
                                        alt="image"
                                        className="  w-full h-full object-cover rounded-lg 
                                             hover:scale-110 transition-all duration-500 cursor-pointer"
                                    />
                                </div>
                                {item?.offer ? (
                                    <div className='text-white font-dm flex justify-center items-center uppercase w-14 absolute
                             h-14 border-2 border-[#072320] rounded-full top-4 right-4'>
                                        {item?.offer}
                                    </div>) : null}

                            </div>


                            <div className='flex flex-col justify-center items-center px-4 '>


                                <h2 className="text-[#00A762] text-center cursor-pointer
                                      font-dm text-lg capitalize font-medium 
                                      "  onClick={() => {
                                        handleDetailsRow(item?.id);
                                    }}>{item?.name}</h2>

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
                                <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer'>
                                    <FaRegHeart className='text-white text-[22px]' />
                                </div>

                                <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer' onClick={() => {
                                    handleAddToCart(item?.id);
                                }} >
                                    <HiOutlineShoppingBag className='text-white text-[22px]' />
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className='col-span-12 relative my-10'>
                        <div className="flex justify-center items-center w-full">
                            <NoProducts massage="Sorry, no products found!" height='200px' />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchAllproduct;