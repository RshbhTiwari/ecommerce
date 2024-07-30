import { Paragraph } from "../basic/title";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Btnone } from '../basic/button';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { deleteWishlistCartItem, deletewishlistCartItem, postMoveCartItem, postMoveCartItme } from "../../../redux/slices/wishlist";
import { useCallback } from "react";

export default function WishlistTable({ wishlistitems }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

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

    const handleDelete = useCallback((itemId) => {
        dispatch(deleteWishlistCartItem(itemId, toast));
    }, [dispatch]);


    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <tbody>
                    {wishlistitems?.map((item, index) => (
                        <tr className={`flex shadow-md rounded-lg justify-between ${index % 2 === 0 ? '' : 'bg-gray-100 rounded-lg'}`}
                            key={index}>

                            <td className="flex items-center py-4 px-2 gap-4 cursor-pointer" onClick={() => handleDelete(item?.product_id)}>
                                <MdDeleteForever className="text-[#072320] text-2xl" />
                            </td>

                            <td className="flex items-center w-2/4 py-4 pr-4 gap-4">
                                <div className='rounded-md p-2 w-24 h-24 bg-[#00a762b0] sm:block hidden'>
                                    <img
                                        src={BASE_IMAGE_URL + item?.product?.additional_images[0]}
                                        alt='product_img'
                                        className='h-full w-full rounded-md'
                                    />
                                </div>

                                <div className="flex justify-center flex-col">
                                    <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
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
        </div>
    );
}
