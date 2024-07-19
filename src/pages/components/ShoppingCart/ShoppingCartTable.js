// import { MdAdd, MdDeleteForever } from "react-icons/md";
// import { FiMinus } from "react-icons/fi";
// import { useState, useEffect, useCallback } from "react";
// import { useDispatch } from 'react-redux';
// import { deleteCartItem, putCartItme } from "../../../redux/slices/addToCart";
// import { toast } from 'react-toastify';
// import { RxCross2 } from "react-icons/rx";
// import { Btnone } from "../basic/button";

// export default function ShoppingCartTable({ shoppingcart, minicart }) {
//     const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

//     const dispatch = useDispatch();
//     const [cartItems, setCartItems] = useState([]);
//     const [itemsToUpdate, setItemsToUpdate] = useState(new Map()); // Track changes

//     useEffect(() => {
//         setCartItems(shoppingcart.map(item => ({
//             ...item,
//             totalPrice: (Number(item?.discount) || Number(item?.price) || 0) * item?.quantity
//         })));
//     }, [shoppingcart]);

//     // Handle increment logic
//     const handleIncrement = useCallback((itemId) => {
//         setCartItems(prevItems => {
//             const updatedItems = prevItems.map(item => {
//                 if (item.id === itemId) {
//                     const newQuantity = item.quantity + 1;
//                     const newTotalPrice = (Number(item?.discount) || Number(item?.price) || 0) * newQuantity;
//                     const updatedItem = { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
//                     setItemsToUpdate(prevMap => new Map(prevMap).set(itemId, updatedItem));
//                     return updatedItem;
//                 }
//                 return item;
//             });
//             return updatedItems;
//         });
//     }, []);

//     // Handle decrement logic
//     const handleDecrement = useCallback((itemId) => {
//         setCartItems(prevItems => {
//             const updatedItems = prevItems.map(item => {
//                 if (item.id === itemId && item.quantity > 1) {
//                     const newQuantity = item.quantity - 1;
//                     const newTotalPrice = (Number(item?.discount) || Number(item?.price) || 0) * newQuantity;
//                     const updatedItem = { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
//                     setItemsToUpdate(prevMap => new Map(prevMap).set(itemId, updatedItem));
//                     return updatedItem;
//                 }
//                 return item;
//             });
//             return updatedItems;
//         });
//     }, []);

//     // Handle update API call
//     const handleUpdate = useCallback(async () => {
//         try {
//             for (let [itemId, updatedItem] of itemsToUpdate) {
//                 const payload = {
//                     quantity: updatedItem.quantity,
//                     total_prize: updatedItem.totalPrice
//                 };
//                 dispatch(putCartItme(itemId, payload, toast));
//             }
//             // Clear the updates after successful API call
//             setItemsToUpdate(new Map());
//         } catch (error) {
//             console.error(error);
//         }
//     }, [dispatch, itemsToUpdate]);

//     const handleDelete = useCallback(async (itemId) => {
//         try {
//             dispatch(deleteCartItem(itemId, toast));
//             setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
//             setItemsToUpdate(prevMap => {
//                 const updatedMap = new Map(prevMap);
//                 updatedMap.delete(itemId);
//                 return updatedMap;
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     }, [dispatch]);

//     return (
//         <>
//             {minicart ? (
//                 <div className="mt-4 max-h-[450px] overflow-y-auto">

//                     {cartItems.map((item, index) => (
//                         <div
//                             className={`flex shadow-md rounded-lg justify-between relative my-4  ${index % 2 === 0 ? '' : 'bg-gray-100'}`}
//                             key={index}>

//                             <div className="flex items-center justify-center cursor-pointer h-8 w-8 rounded-md absolute right-[10px] top-[20px] p-2 bg-[#00000054]" onClick={() => handleDelete(item?.id)}>
//                                 <RxCross2 className='text-2xl text-[#072320]' />
//                             </div>

//                             <div className="flex items-center py-4 px-4 gap-4">
//                                 <div className='rounded-md w-24 h-24 bg-[#00a762b0] sm:block hidden p-2'>
//                                     <img
//                                         src={BASE_IMAGE_URL + item?.additional_images[0]}
//                                         alt='product_img'
//                                         className='h-full w-full rounded-md'
//                                     />
//                                 </div>

//                                 <div className="flex justify-center flex-col gap-1">
//                                     <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
//                                         {item?.name}
//                                     </h2>

//                                     <h2 className="text-[#072320] whitespace-nowrap  text-left font-dm text-md capitalize font-medium">
//                                         Quantity : {item?.quantity}
//                                     </h2>
//                                     <h2 className="text-[#072320] whitespace-nowrap  text-left font-dm text-md capitalize font-medium">
//                                         {item?.discount ? (
//                                             <p className="text-base font-dm">
//                                                 Unit Prize : ₹{item.discount}
//                                             </p>
//                                         ) : (
//                                             <p className="text-base font-dm">
//                                                 Unit Prize : ₹{item.price}
//                                             </p>
//                                         )}
//                                     </h2>
//                                 </div>


//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (

//                 <>
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full bg-white border border-gray-200  shadow-md rounded-lg">
//                             <thead className="bg-gray-100 ">
//                                 <tr className="">
//                                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize h-full md:block hidden">Image</th>
//                                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Name</th>
//                                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Prize of the Month</th>
//                                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Quantity</th>
//                                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Total Price</th>
//                                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {cartItems.map((item, index) => (
//                                     <tr key={item.id} className={index % 2 === 0 ? '' : 'bg-gray-100'}>
//                                         <td className="py-2 px-4  md:block hidden">
//                                             <img
//                                                 src={BASE_IMAGE_URL + item?.additional_images[0]}
//                                                 alt="product_img"
//                                                 className="h-24 w-32 object-cover rounded-md"
//                                             />
//                                         </td>
//                                         <td className="py-2 px-4  text-[#00A762] text-left font-dm text-lg capitalize font-medium">
//                                             {item?.name}
//                                         </td>
//                                         <td className="py-2 px-4  text-[#072320] text-left font-dm text-md capitalize font-medium">
//                                             {item?.discount ? `₹${item.discount}` : `₹${item.price}`}
//                                         </td>
//                                         <td className="py-2 px-4 ">
//                                             <div className="flex items-center justify-center gap-1">
//                                                 <button
//                                                     className="btn_plus hover:bg-gray-200 hover:rounded-l-lg"
//                                                     type="button"
//                                                     onClick={() => handleIncrement(item?.id)}
//                                                 >
//                                                     <MdAdd className="text-[#00A762]" />
//                                                 </button>
//                                                 <input
//                                                     className="w-12 text-center bg-transparent border border-gray-300 rounded"
//                                                     value={item?.quantity}
//                                                     readOnly
//                                                 />
//                                                 <button
//                                                     className="btn_minus hover:bg-gray-200 hover:rounded-r-lg"
//                                                     type="button"
//                                                     onClick={() => handleDecrement(item?.id)}
//                                                 >
//                                                     <FiMinus style={{ color: '#00A762' }} />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                         <td className="py-2 px-4  text-base font-dm">
//                                             ₹{item?.totalPrice}
//                                         </td>

//                                         <td className="py-2 px-4 " onClick={() => handleDelete(item?.id)}>
//                                             <div>   <MdDeleteForever className="text-[#072320] text-2xl" /></div>

//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     <div className="mt-4">
//                         <Btnone
//                             title="Update All Items"
//                             handleClick={handleUpdate}
//                             bgColor="#00A762"
//                             width="100%"
//                         />
//                     </div>
//                 </>

//             )}
//         </>
//     );
// }

import { MdAdd, MdDeleteForever } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { deleteCartItem, putCartItme } from "../../../redux/slices/addToCart";
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";

export default function ShoppingCartTable({ shoppingcart, minicart }) {
    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(shoppingcart);
    }, [shoppingcart]);

    // Handle increment logic
    const handleIncrement = useCallback((itemId) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map(item => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + 1;
                    const newTotalPrice = item.discount
                        ? item.discount * newQuantity
                        : item.price * newQuantity;

                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: newTotalPrice
                    };
                }
                return item;
            });



            return updatedItems;
        });
    }, []);

    // Handle decrement logic
    const handleDecrement = useCallback((itemId) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map(item => {
                if (item.id === itemId && item.quantity > 1) {
                    const newQuantity = item.quantity - 1;
                    const newTotalPrice = item.discount
                        ? item.discount * newQuantity
                        : item.price * newQuantity;

                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: newTotalPrice
                    };
                }
                return item;
            });


            return updatedItems;
        });
    }, []);

    // Update the cart item
    const handleUpdate = (itemId, quantity, totalPrice) => {
        const payload = {
            item_id : itemId,
            quantity,
            total_prize: totalPrice
        };
        dispatch(putCartItme(itemId, payload, toast));
    };

    // Handle item deletion
    const handleDelete = useCallback((itemId) => {
        dispatch(deleteCartItem(itemId, toast));
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
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize h-full md:block hidden">Image</th>
                                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Name</th>
                                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Prize of the Month</th>
                                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Quantity</th>
                                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Total Price</th>
                                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Update</th>
                                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={item.id} className={index % 2 === 0 ? '' : 'bg-gray-100'}>
                                        <td className="py-2 px-4 md:block hidden">
                                            <img
                                                src={BASE_IMAGE_URL + item?.additional_images[0]}
                                                alt="product_img"
                                                className="h-24 w-32 object-cover rounded-md"
                                            />
                                        </td>
                                        <td className="py-2 px-4 text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                            {item?.name}
                                        </td>
                                        <td className="py-2 px-4 text-[#072320] text-left font-dm text-md capitalize font-medium">
                                            ₹{item?.discount ? item.discount : item.price}
                                        </td>
                                        <td className="py-2 px-4">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    className="btn_plus hover:bg-gray-200 hover:rounded-l-lg"
                                                    type="button"
                                                    onClick={() => handleIncrement(item?.id)}
                                                >
                                                    <MdAdd className="text-[#00A762]" />
                                                </button>
                                                <input
                                                    className="w-12 text-center bg-transparent border border-gray-300 rounded"
                                                    value={item?.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    className="btn_minus hover:bg-gray-200 hover:rounded-r-lg"
                                                    type="button"
                                                    onClick={() => handleDecrement(item?.id)}
                                                >
                                                    <FiMinus style={{ color: '#00A762' }} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-base font-dm">
                                            ₹{item?.totalPrice || 8}
                                        </td>
                                        <td className="py-2 px-4">
                                            <div onClick={() => handleUpdate(item?.id, item?.quantity, item?.totalPrice)}>
                                                update
                                            </div>
                                        </td>
                                        <td className="py-2 px-4">
                                            <div onClick={() => handleDelete(item?.id)}>
                                                <MdDeleteForever className="text-[#072320] text-2xl" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>

    );
}
