import { Paragraph } from "../basic/title";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { deleteCartItem, putCartItme } from "../../../redux/slices/addToCart";
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import productcard from "../../../data/productcard";
import { Btnone } from "../basic/button";

export default function ShoppingCartTable({ shoppingcart, minicart }) {
    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState([]);
    const [itemsToUpdate, setItemsToUpdate] = useState(new Map()); // Track changes

    useEffect(() => {
        setCartItems(shoppingcart.map(item => ({
            ...item,
            totalPrice: (Number(item?.discount) || Number(item?.price) || 0) * item?.quantity
        })));
    }, [shoppingcart]);

    // Handle increment logic
    const handleIncrement = useCallback((itemId) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + 1;
                    const newTotalPrice = (Number(item?.discount) || Number(item?.price) || 0) * newQuantity;
                    const updatedItem = { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
                    setItemsToUpdate(prevMap => new Map(prevMap).set(itemId, updatedItem));
                    return updatedItem;
                }
                return item;
            });
            return updatedItems;
        });
    }, []);

    // Handle decrement logic
    const handleDecrement = useCallback((itemId) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === itemId && item.quantity > 1) {
                    const newQuantity = item.quantity - 1;
                    const newTotalPrice = (Number(item?.discount) || Number(item?.price) || 0) * newQuantity;
                    const updatedItem = { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
                    setItemsToUpdate(prevMap => new Map(prevMap).set(itemId, updatedItem));
                    return updatedItem;
                }
                return item;
            });
            return updatedItems;
        });
    }, []);

    // Handle update API call
    const handleUpdate = useCallback(async () => {
        try {
            for (let [itemId, updatedItem] of itemsToUpdate) {
                const payload = {
                    quantity: updatedItem.quantity,
                    total_prize: updatedItem.totalPrice
                };
                dispatch(putCartItme(itemId, payload, toast));
            }
            // Clear the updates after successful API call
            setItemsToUpdate(new Map());
        } catch (error) {
            console.error(error);
        }
    }, [dispatch, itemsToUpdate]);

    const handleDelete = useCallback(async (itemId) => {
        try {
            dispatch(deleteCartItem(itemId, toast));
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
            setItemsToUpdate(prevMap => {
                const updatedMap = new Map(prevMap);
                updatedMap.delete(itemId);
                return updatedMap;
            });
        } catch (error) {
            console.error(error);
        }
    }, [dispatch]);

    return (
        <>
            {minicart ? (
                <div className="mt-4 max-h-[450px] overflow-y-auto">

                    {cartItems.map((item, index) => (
                        <div
                            className={`flex shadow-md rounded-lg justify-between relative my-4  ${index % 2 === 0 ? '' : 'bg-gray-100'}`}
                            key={index}>

                            <div className="flex items-center justify-center cursor-pointer h-8 w-8 rounded-md absolute right-[10px] top-[20px] p-2 bg-[#00000054]" onClick={() => handleDelete(item?.id)}>
                                <RxCross2 className='text-2xl text-[#072320]' />
                            </div>

                            <div className="flex items-center py-4 px-4 gap-4">
                                <div className='rounded-md w-24 h-24 bg-[#00a762b0] sm:block hidden p-2'>
                                    <img
                                        src={BASE_IMAGE_URL + item?.additional_images[0]}
                                        alt='product_img'
                                        className='h-full w-full rounded-md'
                                    />
                                </div>

                                <div className="flex justify-center flex-col gap-1">
                                    <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                        {item?.name}
                                    </h2>

                                    <h2 className="text-[#072320] whitespace-nowrap  text-left font-dm text-md capitalize font-medium">
                                        Quantity : {item?.quantity}
                                    </h2>
                                    <h2 className="text-[#072320] whitespace-nowrap  text-left font-dm text-md capitalize font-medium">
                                        {item?.discount ? (
                                            <p className="text-base font-dm">
                                                     Unit Prize : ₹{item.discount}
                                            </p>
                                        ) : (
                                            <p className="text-base font-dm">
                                               Unit Prize : ₹{item.price}
                                            </p>
                                        )}
                                    </h2>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <> {cartItems.map((item, index) => (
                    <div
                        className={`flex shadow-md items-center my-3 rounded-lg justify-between ${index % 2 === 0 ? '' : 'bg-gray-100'}`}
                        key={item.id}
                    >
                        <div className="rounded-md h-[120px] w-[150px] bg-[#00a762b0] sm:block hidden p-2">
                            <img
                                src={BASE_IMAGE_URL + item?.additional_images[0]}
                                alt="product_img"
                                className="h-full w-full rounded-md"
                            />
                        </div>

                        <div className="flex flex-col  py-4 px-4 gap-1">

                            <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                {item?.name}
                            </h2>

                            <div className="flex items-center gap-1">
                                <h2 className="text-[#072320] whitespace-nowrap  text-left font-dm text-md capitalize font-medium">
                                    Prize of the Month :
                                </h2>
                                {item?.discount ? (
                                    <p className="text-base font-dm">
                                        ₹{item.discount}
                                    </p>
                                ) : (
                                    <p className="text-base font-dm">
                                        ₹{item.price}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* <div className="flex items-center py-4 px-4 gap-4">
                            <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                Discount: {item?.discount} Price: {item?.price} Quantity: {item?.quantity}
                            </h2>
                        </div> */}

                        <div className="flex items-center py-4 px-4 gap-4">
                            <div className="quantity_btn" name="quantity">
                                <button
                                    className="btn_plus hover:bg-gray-200 hover:rounded-l-lg"
                                    type="button"
                                    onClick={() => handleIncrement(item?.id)}
                                >
                                    <MdAdd className="text-[#00A762]" />
                                </button>
                                <input
                                    className="w-full focus:outline-none text-center bg-transparent"
                                    value={item?.quantity}
                                    readOnly
                                    style={{ border: '0px solid' }}
                                />
                                <button
                                    className="btn_minus hover:bg-gray-200 hover:rounded-r-lg"
                                    type="button"
                                    onClick={() => handleDecrement(item?.id)}
                                >
                                    <FiMinus style={{ color: '#00A762' }} />
                                </button>
                            </div>
                        </div>


                        <div className="flex items-center gap-1">
                            <h2 className="text-[#072320] whitespace-nowrap  text-left font-dm text-md capitalize font-medium">
                                Total Price :
                            </h2>
                            <p className="text-base font-dm">
                                ₹{item?.totalPrice}
                            </p>
                        </div>


                        <div
                            className="flex items-center py-4 px-4 gap-4 cursor-pointer"
                            onClick={() => handleDelete(item?.id)}
                        >
                            <MdDeleteForever className="text-[#072320] text-2xl" />
                        </div>

                        <div className="">
                            <Btnone title="Refresh Cart" handleClick={handleUpdate}
                                bgColor="#00A762" width="100%" />
                        </div>


                    </div>
                ))}</>
            )}
        </>
    );
}
