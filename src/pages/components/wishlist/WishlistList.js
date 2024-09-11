import BreadCrum from "../basic/BreadCrum";
import { HeadingTitle } from "../basic/title";
import { AccountSideNav } from "../myaccount/sidenav";

import { Paragraph } from "../basic/title";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Btnone } from '../basic/button';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { deleteWishlistCartItem, getWishlist, postMoveCartItem } from "../../../redux/slices/wishlist";
import { useCallback, useEffect, useState } from "react";
import { Modeldelete } from "../basic/model";

function WishlistList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wishitemId, setWishItemId] = useState(null);

    const { wishlist, isLoading, error } = useSelector(
        (state) => state.wishlist
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('en-US', options);
    };

    const handlemovetocart = (itemId) => {
        const payload = {
            product_id: itemId,
        };
        dispatch(postMoveCartItem(payload, toast, navigate));
    };

    const handleDetailsRow = (id) => {
        navigate(`/shop/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const openModal = (id) => {
        setWishItemId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setWishItemId(null);
    };

    const handleDelete = useCallback(async () => {
        try {
            dispatch(deleteWishlistCartItem(wishitemId, toast));
        } finally {
            closeModal();
        }
    }, [dispatch, wishitemId, closeModal]);

    return (
        <>
            <BreadCrum componentName="my account" link="/my-account" componentSecondName="wishlist" />

            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>
                        <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full md:gap-4 gap-0'>
                        <div className="border-[2px]  w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto" data-aos="fade-up"
                            data-aos-duration="1000">
                            <HeadingTitle title="My wishlist" textAlign='left' />

                            <div className="">
                                <div className="overflow-x-auto">
                                    {loading || isLoading ? (
                                        <div className="animate-pulse">
                                            <div className="flex flex-col space-y-4">
                                                {wishlist.map((_, index) => (
                                                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg">
                                                        <div className="w-24 h-24 bg-gray-300 rounded-md"></div>
                                                        <div className="flex-1 space-y-4">
                                                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <table className="w-full">
                                            <tbody>
                                                {wishlist?.map((item, index) => (
                                                    <tr className={`flex shadow-md rounded-lg justify-between ${index % 2 === 0 ? '' : 'bg-gray-100 rounded-lg'}`}
                                                        key={index}>

                                                        <td className="flex items-center py-4 px-2 gap-4 cursor-pointer"
                                                            onClick={() => openModal(item?.product_id)}>
                                                            <MdDeleteForever className="text-[#072320] text-2xl" />
                                                        </td>

                                                        <td className="flex items-center w-2/4 py-4 pr-4 gap-4">
                                                            <div className='rounded-md p-2 w-24 h-24 bg-[#00a762b0] sm:block hidden cursor-pointer' onClick={() => handleDetailsRow(item?.product_id)}>
                                                                <img
                                                                    src={BASE_IMAGE_URL + item?.product?.additional_images[0]}
                                                                    alt='product_img'
                                                                    className='h-full w-full rounded-md'
                                                                />
                                                            </div>

                                                            <div className="flex justify-center flex-col">
                                                                <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium cursor-pointer" onClick={() => handleDetailsRow(item?.product_id)}>
                                                                    {item?.product?.name}
                                                                </h2>
                                                                <Paragraph title={`Added on: ${formatDate(item?.created_at)}`} textAlign='left' />
                                                            </div>
                                                        </td>

                                                        <td className="flex items-center py-4 px-4 gap-4">
                                                            {item?.product?.discount_price ? (
                                                                <>
                                                                    <p className="text-base font-dm">₹{item?.product?.discount_price}</p>
                                                                </>
                                                            ) : (
                                                                <p className="text-base font-dm">₹{item?.product?.price}</p>
                                                            )}
                                                        </td>

                                                        <td className="flex items-center py-4 px-4 gap-4">
                                                            <Btnone textwrap='nowarp' title="move to cart" bgColor="#00A762"
                                                                handleClick={() => handlemovetocart(item?.product_id)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modeldelete
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            />
        </>

    );
}

export default WishlistList;