import { Paragraph } from "../basic/title";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { deleteCartItem, putCartItme } from "../../../redux/slices/addToCart";
import { toast } from 'react-toastify';


export default function ShoppingCartTable({ shoppingcart }) {
    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(shoppingcart.map(item => ({
            ...item,
            totalPrice: (Number(item?.discount) || Number(item?.price) || 0) * item?.quantity
        })));
    }, [shoppingcart]);

    // Handle increment logic
    const handleIncrement = async (itemId) => {
        setCartItems(cartItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + 1;
                const newTotalPrice = (Number(item?.discount) || Number(item?.price) || 0) * newQuantity;
                const updatedItem = { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
                // Update the cart on the server
                handleUpdate(item.id, updatedItem);
                return updatedItem;
            }
            return item;
        }));
    };

    // Handle decrement logic
    const handleDecrement = async (itemId) => {
        setCartItems(cartItems.map(item => {
            if (item.id === itemId && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                const newTotalPrice = (Number(item?.discount) || Number(item?.price) || 0) * newQuantity;
                const updatedItem = { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
                // Update the cart on the server
                handleUpdate(item.id, updatedItem);
                return updatedItem;
            }
            return item;
        }));
    };

    // Handle update API call
    const handleUpdate = async (itemId, updatedItem) => {
        const payload = {
            quantity: updatedItem.quantity,
            total_prize: updatedItem.totalPrice
        };
        console.log("payload", payload)

        try {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Mocking API call
            dispatch(putCartItme(itemId, payload, toast));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (itemId) => {
        dispatch(deleteCartItem(itemId, toast));
    };

    return (
        <>
            {cartItems.map((item, index) => (
                <div
                    className={`flex shadow-md items-center rounded-lg justify-between ${index % 2 === 0 ? '' : 'bg-gray-100 rounded-lg'
                        }`}
                    key={item.id}
                >

                    <div className="rounded-md h-[120px] w-[150px] bg-[#00a762b0] sm:block hidden p-2">
                        <img
                            src={BASE_IMAGE_URL + item?.additional_images[0]}
                            alt="product_img"
                            className="h-full w-full rounded-md"
                        />
                    </div>


                    <div className="flex items-center w-2/4 py-4 px-4 gap-4">
                        <div className="flex justify-center flex-col">
                            <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                {item?.item_title}
                            </h2>
                            <Paragraph title={item?.short_description} shortDescription='true' lineclamp='3' textAlign='onyleft' />
                        </div>
                    </div>

                    {/* <td className="flex items-center py-4 px-4 gap-4">
                            <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                Discount: {item?.discount} Price: {item?.price} Quantity: {item?.quantity}
                            </h2>
                        </td> */}

                    <div className="flex items-center py-4 px-4 gap-4">
                        <div className="quantity_btn" name="quantity">
                            <button
                                className="btn_plus hover:bg-gray-200 hover:rounded-l-lg"
                                type="button"
                                onClick={() => handleIncrement(item.id)}
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
                                onClick={() => handleDecrement(item.id)}
                            >
                                <FiMinus style={{ color: '#00A762' }} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center py-4 px-4 gap-4">
                        <p className="text-base font-dm">
                            ₹{item.totalPrice.toFixed(2)}
                        </p>
                    </div>

                    <div
                        className="flex items-center py-4 px-4 gap-4 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                    >
                        <MdDeleteForever className="text-[#072320] text-2xl" />
                    </div>
                </div>
            ))}
        </>
    );
}
