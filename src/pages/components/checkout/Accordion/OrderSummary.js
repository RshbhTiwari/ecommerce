import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { deleteCartItem, PostAddSalectItems } from "../../../../redux/slices/addToCart";
import { useCallback, useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";


export default function OrderSummary({ cartData }) {
    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const dispatch = useDispatch();
    const [selectedItems, setSelectedItems] = useState({});

    const handleDelete = useCallback((itemId) => {
        dispatch(deleteCartItem(itemId, toast));
    }, [dispatch]);



    useEffect(() => {
        const initialSelectedState = cartData.reduce((acc, item) => {
            acc[item.id] = item.selected; // Use item.selected for initial state
            return acc;
        }, {});
        setSelectedItems(initialSelectedState);
    }, [cartData]);

    const handleCheckboxChange = async (e, itemId) => {
        try {
            const isChecked = e.target.checked;
            const payload = {
                selected: isChecked,
            };
            console.log("payload", payload);
            dispatch(PostAddSalectItems(payload, itemId, toast));
            setSelectedItems((prev) => ({ ...prev, [itemId]: isChecked }));
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    return (
        <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
            <table className="w-full mt-6">
                <tbody>
                    {cartData?.map((item, index) => (
                        <tr className="flex shadow-md glass_effect rounded-lg my-4 bg-white justify-between" key={index}>
                            <td className="flex items-center py-4 px-4 gap-4">
                                <div className='rounded-md w-32 h-24 sm:block hidden'>
                                    <div className="relative h-full w-full">
                                        <img
                                            src={BASE_IMAGE_URL + item?.additional_images[0]}
                                            alt='product_img'
                                            className='h-full w-full rounded-md'
                                        />
                                        <div className="absolute left-1 top-1">
                                            <FormProvider>
                                                <FormContent
                                                    isChecked={selectedItems[item.id]}
                                                    onCheckboxChange={(e) => handleCheckboxChange(e, item.id)}
                                                />
                                            </FormProvider>
                                        </div>
                                    </div>
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

function FormContent({ isChecked, onCheckboxChange }) {
    return (
        <form className="w-fit">
            <label className="custom-checkbox">
                <input
                    type="checkbox"
                    checked={isChecked || false}
                    onChange={onCheckboxChange}
                />
                <span className="checkmark"></span>
            </label>
        </form>
    );
}