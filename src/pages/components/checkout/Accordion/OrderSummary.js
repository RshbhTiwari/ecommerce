import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { deleteCartItem } from "../../../../redux/slices/addToCart";
import { useCallback } from "react";

export default function OrderSummary({ cartData }) {
    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const dispatch = useDispatch();
    // Handle item deletion
    const handleDelete = useCallback((itemId) => {
        dispatch(deleteCartItem(itemId, toast));
    }, [dispatch]);


    return (
        <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
            <table className="w-full mt-6">
                <tbody>
                    {cartData?.map((item, index) => (
                        <tr className="flex shadow-md glass_effect rounded-lg my-4 bg-white justify-between" key={index}>
                            <td className="flex items-center py-4 px-4 gap-4">
                                <div className='rounded-md w-32 h-24 sm:block hidden'>
                                    <img
                                        src={BASE_IMAGE_URL + item?.additional_images[0]}
                                        alt='product_img'
                                        className='h-full w-full rounded-md'
                                    />
                                </div>
                                <div className="flex justify-center flex-col">
                                    <h2 className="text-white text-left font-dm text-lg capitalize font-medium">{item?.name}</h2>
                                    <h2 className="text-white whitespace-nowrap  text-left font-dm text-md capitalize font-medium">
                                        Quantity : {item?.quantity}
                                    </h2>
                                </div>
                            </td>
                            <td className="flex items-center py-4 px-4 gap-4">
                                <p className={`text-base font-dm text-white`}>
                                    {item?.discount ? (
                                        <p className="text-base font-dm">
                                            Unit Prize : ₹{item.discount}
                                        </p>
                                    ) : (
                                        <p className="text-base font-dm">
                                            Unit Prize : ₹{item.price}
                                        </p>
                                    )}</p>
                            </td>
                            <td className="flex items-center py-4 px-4 gap-4 cursor-pointer" onClick={() => handleDelete(item?.id)}>
                                <MdDeleteForever className="text-white text-2xl" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
