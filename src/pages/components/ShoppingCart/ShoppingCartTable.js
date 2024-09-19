// import { MdAdd, MdDeleteForever } from "react-icons/md";
// import { FiMinus } from "react-icons/fi";
// import { useState, useEffect, useCallback } from "react";
// import { useDispatch } from 'react-redux';
// import { deleteCartItem, putCartItem } from "../../../redux/slices/addToCart";
// import { toast } from 'react-toastify';
// import { RxCross2 } from "react-icons/rx";
// import { Modeldelete, Modelminidelete } from "../basic/model";

// export default function ShoppingCartTable({ shoppingcart, minicart, cartIsLoading, cartErorr }) {

//     const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/'; 

//     const dispatch = useDispatch();

//     const [cartItems, setCartItems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [cartitemId, setCartItemId] = useState(null);

//     const openModal = (id) => {

//         setCartItemId(id);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setCartItemId(null);
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);
//         return () => clearTimeout(timer);
//     }, []);

//     useEffect(() => {
//         setCartItems(shoppingcart);
//     }, [shoppingcart]);

//     // Handle increment logic
//     const handleIncrement = useCallback((itemId) => {
//         setCartItems((prevItems) => {
//             const updatedItems = prevItems.map(item => {
//                 if (item.id === itemId) {
//                     const newQuantity = item.quantity + 1;
//                     const newTotalPrice = item.discount
//                         ? item.discount * newQuantity
//                         : item.price * newQuantity;

//                     return {
//                         ...item,
//                         quantity: newQuantity,
//                         totalPrice: newTotalPrice
//                     };
//                 }
//                 return item;
//             });



//             return updatedItems;
//         });
//     }, []);

//     // Handle decrement logic
//     const handleDecrement = useCallback((itemId) => {
//         setCartItems((prevItems) => {
//             const updatedItems = prevItems.map(item => {
//                 if (item.id === itemId && item.quantity > 1) {
//                     const newQuantity = item.quantity - 1;
//                     const newTotalPrice = item.discount
//                         ? item.discount * newQuantity
//                         : item.price * newQuantity;

//                     return {
//                         ...item,
//                         quantity: newQuantity,
//                         totalPrice: newTotalPrice
//                     };
//                 }
//                 return item;
//             });


//             return updatedItems;
//         });
//     }, []);

//     // Update the cart item
//     const handleUpdate = (itemId, quantity, totalPrice) => {
//         const cart_id = localStorage?.getItem('cart_id') || null;
//         const payload = {
//             item_id: itemId,
//             quantity,
//             total_prize: totalPrice,
//             ...(cart_id && { cart_id }),
//         };
//         dispatch(putCartItem(itemId, payload, toast));
//     };

//     const handleDelete = useCallback(async () => {
//         try {
//             console.log("cartitemId", cartitemId)
//             dispatch(deleteCartItem(cartitemId, toast));
//             const filterData = cartItems.filter((item) => item?.id !== cartitemId);
//             setCartItems(filterData);
//         } catch (error) {
//             console.error("Error handling delete operation:", error);
//             toast.error("There was an issue deleting the item.");
//         } finally {
//             closeModal();
//         }

//     }, [dispatch, cartitemId, closeModal]);




//     return (

//         <>
//             {minicart ? (
//                 <div className="mt-4 max-h-[450px] overflow-y-auto">
//                     {loading || cartIsLoading ? (
//                         <SkeletonLoader cartItems={cartItems} />
//                     ) : (cartItems.map((item, index) => (
//                         <div
//                             className={`flex shadow-md rounded-lg justify-between relative my-4  ${index % 2 === 0 ? '' : 'bg-gray-100'}`}
//                             key={index}>

//                             <div className="flex items-center justify-center cursor-pointer h-8 w-8 rounded-md absolute right-[10px] top-[20px] p-2 bg-[#00000054]" onClick={() => openModal(item?.id)}>
//                                 <RxCross2 className='text-2xl text-[#072320]' />
//                             </div>

//                             <div className="flex items-center py-4 px-4 gap-4">
//                                 <div className='rounded-md w-24 h-24 bg-[#00a762b0]  p-2'>
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
//                     ))
//                     )}
//                 </div>
//             ) : (
//                 <>
//                     {loading || cartIsLoading ? (
//                         <SkeletonTable cartItems={cartItems} />
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//                                 <thead className="bg-gray-100">
//                                     <tr>
//                                         <th className="py-2 px-4 font-dm text-[#00A762] capitalize md:block hidden">Image</th>
//                                         <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Name</th>
//                                         <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Prize of the Month</th>
//                                         <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Quantity</th>
//                                         <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Total Price</th>
//                                         <th className="py-2 px-4 font-dm text-[#00A762] capitalize" colSpan={2}>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {cartItems.map((item, index) => (
//                                         <tr key={item.id} className={index % 2 === 0 ? '' : 'bg-gray-100'}>
//                                             <td className="py-2 px-4 md:block hidden">
//                                                 <img
//                                                     src={BASE_IMAGE_URL + item?.additional_images[0]}
//                                                     alt="product_img"
//                                                     className="h-24 w-32 object-cover rounded-md"
//                                                 />
//                                             </td>
//                                             <td className="py-2 px-4 text-[#00A762] text-left font-dm text-lg capitalize font-medium">
//                                                 {item?.name}
//                                             </td>
//                                             <td className="py-2 px-4 text-[#072320] text-left font-dm text-md capitalize font-medium">
//                                                 ₹{item?.discount ? item.discount : item.price}
//                                             </td>
//                                             <td className="py-2 px-4">
//                                                 <div className="flex items-center justify-center gap-1">
//                                                     <button
//                                                         className="btn_plus hover:bg-gray-200 hover:rounded-l-lg"
//                                                         type="button"
//                                                         onClick={() => handleIncrement(item?.id)}
//                                                     >
//                                                         <MdAdd className="text-[#00A762]" />
//                                                     </button>
//                                                     <input
//                                                         className="w-12 text-center bg-transparent border border-gray-300 rounded"
//                                                         value={item?.quantity}
//                                                         readOnly
//                                                     />
//                                                     <button
//                                                         className="btn_minus hover:bg-gray-200 hover:rounded-r-lg"
//                                                         type="button"
//                                                         onClick={() => handleDecrement(item?.id)}
//                                                     >
//                                                         <FiMinus style={{ color: '#00A762' }} />
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                             <td className="py-2 px-4 text-base font-dm">
//                                                 ₹{item?.totalPrice}
//                                             </td>

//                                             <td className="py-2 cursor-pointer" onClick={() => handleUpdate(item?.id, item?.quantity, item?.totalPrice)}>
//                                                 <h1 className="text-[#00A762] font-dm">Update</h1>
//                                             </td>

//                                             <td className="py-2 cursor-pointer"
//                                                 onClick={() => openModal(item?.id)}

//                                             >
//                                                 <MdDeleteForever className="text-[#00A762] text-2xl" />
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </>
//             )}

//             {minicart ? (
//                 <Modelminidelete
//                     isOpen={isModalOpen}
//                     onClose={closeModal}
//                     onConfirm={handleDelete}
//                 />
//             ) : (
//                 <Modeldelete
//                     isOpen={isModalOpen}
//                     onClose={closeModal}
//                     onConfirm={handleDelete}
//                 />
//             )}
//         </>

//     );
// }

// const SkeletonRow = () => (
//     <tr className="animate-pulse">
//         <td className="py-2 px-2">
//             <div className="bg-gray-200 h-24 w-32 rounded-md"></div>
//         </td>
//         <td className="py-2 px-2">
//             <div className="bg-gray-200 h-6 w-32 rounded-md"></div>
//         </td>
//         <td className="py-2 px-2">
//             <div className="bg-gray-200 h-6 w-24 rounded-md"></div>
//         </td>
//         <td className="py-2 px-2">
//             <div className="bg-gray-200 h-6 w-24 rounded-md"></div>
//         </td>
//         <td className="py-2 px-2">
//             <div className="bg-gray-200 h-6 w-24 rounded-md"></div>
//         </td>
//         <td className="py-2 px-2 ">
//             <div className="bg-gray-200 h-6 w-6 rounded-md float-left"></div>
//             <div className="bg-gray-200 h-6 w-6 rounded-md float-right"></div>
//         </td>
//     </tr>
// );

// const SkeletonTable = ({ cartItems }) => (
//     <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//             <thead className="bg-gray-100">
//                 <tr>
//                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize h-full md:block hidden">Image</th>
//                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Name</th>
//                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Prize of the Month</th>
//                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Quantity</th>
//                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Total Price</th>
//                     <th className="py-2 px-4 font-dm text-[#00A762] capitalize" colSpan={2}>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {cartItems.map((_, index) => (
//                     <SkeletonRow key={index} />
//                 ))}
//             </tbody>
//         </table>
//     </div>
// );

// const SkeletonLoader = ({ cartItems }) => {
//     return (
//         <div className="space-y-4">
//             {cartItems.map((_, index) => (
//                 <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-md animate-pulse">
//                     <div className="w-24 h-24 bg-gray-300 rounded-md"></div>
//                     <div className="flex-1 space-y-4">
//                         <div className="h-4 bg-gray-300 rounded"></div>
//                         <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//                         <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

import { MdAdd, MdDeleteForever } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { deleteCartItem, putCartItem } from "../../../redux/slices/addToCart";
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import { Modeldelete, Modelminidelete } from "../basic/model";
import { FormProvider } from "react-hook-form";

export default function ShoppingCartTable({ shoppingcart, minicart, cartIsLoading, cartErorr, selectItemCartData }) {

    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartitemId, setCartItemId] = useState(null);

    const openModal = (id) => {

        setCartItemId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCartItemId(null);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

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
        const cart_id = localStorage?.getItem('cart_id') || null;
        const payload = {
            item_id: itemId,
            quantity,
            total_prize: totalPrice,
            ...(cart_id && { cart_id }),
        };
        dispatch(putCartItem(itemId, payload, toast));
    };

    const handleDelete = useCallback(async () => {
        try {
            console.log("cartitemId", cartitemId)
            dispatch(deleteCartItem(cartitemId, toast));
            const filterData = cartItems.filter((item) => item?.id !== cartitemId);
            setCartItems(filterData);
        } catch (error) {
            console.error("Error handling delete operation:", error);
            toast.error("There was an issue deleting the item.");
        } finally {
            closeModal();
        }

    }, [dispatch, cartitemId, closeModal]);


    const handleCheckboxChange = async (e) => {
        try {

        } catch (error) {
            toast.error('');
        }
    };

    const isCheckedItemInCart = (itemId) => {
        return selectItemCartData?.some((item) => item?.id === itemId);
    };

    return (

        <>
            {minicart ? (
                <div className="mt-4 max-h-[450px] overflow-y-auto">
                    {loading || cartIsLoading ? (
                        <SkeletonLoader cartItems={cartItems} />
                    ) : (cartItems.map((item, index) => (
                        <div
                            className={`flex shadow-md rounded-lg justify-between relative my-4  ${index % 2 === 0 ? '' : 'bg-gray-100'}`}
                            key={index}>

                            <div className="flex items-center justify-center cursor-pointer h-8 w-8 rounded-md absolute right-[10px] top-[20px] p-2 bg-[#00000054]" onClick={() => openModal(item?.id)}>
                                <RxCross2 className='text-2xl text-[#072320]' />
                            </div>

                            <div className="flex items-center py-4 px-4 gap-4">
                                <div className='rounded-md w-24 h-24 bg-[#00a762b0] relative p-2'>

                                    <div className="relative h-full w-full">
                                        <img
                                            src={BASE_IMAGE_URL + item?.additional_images[0]}
                                            alt='product_img'
                                            className='h-full w-full rounded-md'
                                        />
                                        <div className="absolute left-1 top-1">
                                            <FormProvider>
                                                <FormContent
                                                    isChecked={isCheckedItemInCart(item?.id)}
                                                    onCheckboxChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </FormProvider>
                                        </div>
                                    </div>

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
                    ))
                    )}
                </div>
            ) : (
                <>
                    {loading || cartIsLoading ? (
                        <SkeletonTable cartItems={cartItems} />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-2 px-4 font-dm text-[#00A762] capitalize ">Image</th>
                                        <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Name</th>
                                        <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Prize of the Month</th>
                                        <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Quantity</th>
                                        <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Total Price</th>
                                        <th className="py-2 px-4 font-dm text-[#00A762] capitalize" colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={item.id} className={index % 2 === 0 ? '' : 'bg-gray-100'}>

                                            <td className="py-2 px-4 relative">
                                                <div className="relative">
                                                    <img
                                                        src={BASE_IMAGE_URL + item?.additional_images[0]}
                                                        alt="product_img"
                                                        className="h-24 w-32 object-cover  rounded-md"
                                                    />
                                                    <div className="absolute left-1 top-1">
                                                        <FormProvider>
                                                            <FormContent
                                                                isChecked={isCheckedItemInCart(item?.id)}
                                                                onCheckboxChange={() => handleCheckboxChange(item.id)}
                                                            />
                                                        </FormProvider>
                                                    </div>
                                                </div>
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
                                                ₹{item?.totalPrice}
                                            </td>

                                            <td className="py-2 cursor-pointer" onClick={() => handleUpdate(item?.id, item?.quantity, item?.totalPrice)}>
                                                <h1 className="text-[#00A762] font-dm">Update</h1>
                                            </td>

                                            <td className="py-2 cursor-pointer"
                                                onClick={() => openModal(item?.id)}

                                            >
                                                <MdDeleteForever className="text-[#00A762] text-2xl" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            {minicart ? (
                <Modelminidelete
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleDelete}
                />
            ) : (
                <Modeldelete
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleDelete}
                />
            )}
        </>

    );
}

const SkeletonRow = () => (
    <tr className="animate-pulse">
        <td className="py-2 px-2">
            <div className="bg-gray-200 h-24 w-32 rounded-md"></div>
        </td>
        <td className="py-2 px-2">
            <div className="bg-gray-200 h-6 w-32 rounded-md"></div>
        </td>
        <td className="py-2 px-2">
            <div className="bg-gray-200 h-6 w-24 rounded-md"></div>
        </td>
        <td className="py-2 px-2">
            <div className="bg-gray-200 h-6 w-24 rounded-md"></div>
        </td>
        <td className="py-2 px-2">
            <div className="bg-gray-200 h-6 w-24 rounded-md"></div>
        </td>
        <td className="py-2 px-2 ">
            <div className="bg-gray-200 h-6 w-6 rounded-md float-left"></div>
            <div className="bg-gray-200 h-6 w-6 rounded-md float-right"></div>
        </td>
    </tr>
);

const SkeletonTable = ({ cartItems }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
                <tr>
                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize h-full md:block hidden">Image</th>
                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Name</th>
                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Prize of the Month</th>
                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Quantity</th>
                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize">Total Price</th>
                    <th className="py-2 px-4 font-dm text-[#00A762] capitalize" colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((_, index) => (
                    <SkeletonRow key={index} />
                ))}
            </tbody>
        </table>
    </div>
);

const SkeletonLoader = ({ cartItems }) => {
    return (
        <div className="space-y-4">
            {cartItems.map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-md animate-pulse">
                    <div className="w-24 h-24 bg-gray-300 rounded-md"></div>
                    <div className="flex-1 space-y-4">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};


function FormContent({ isChecked, onCheckboxChange }) {
    return (
        // <form className="w-fit">
        //     <input
        //         type="checkbox"
        //         checked={isChecked}
        //         onChange={onCheckboxChange}
        //     />
        // </form>
        <form className="w-fit">
            <label className="custom-checkbox">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={onCheckboxChange}
                />
                <span className="checkmark"></span>
            </label>
        </form>
    );
}
