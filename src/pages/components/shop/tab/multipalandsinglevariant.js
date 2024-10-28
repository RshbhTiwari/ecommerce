// single varient salect and single varient value salect

// import React, { useState, useEffect } from 'react';
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import ProductsData from "../../../../data/productsdata";
 
// const ProductCard = () => {
//     const location = useLocation();
//     const [selectedVariants, setSelectedVariants] = useState({});
//     const isHomePath = location.pathname === '/';
//     const handleVariantClick = (productId, variant) => {

//         console.log("productId",productId,variant )
//         setSelectedVariants(prev => ({ ...prev, [productId]: { variant, value: null } }));
//     };

//     const handleValueClick = (productId, value) => {
//         console.log("productId123",productId,value )
//         setSelectedVariants(prev => ({
//             ...prev,
//             [productId]: { ...prev[productId], value }
//         }));
//     };

//     const handleAddToCart = (productId) => {

//         const selected = selectedVariants[productId];
//         if (!selected || !selected.variant || !selected.value) {
//             toast.error('Please select a variant and its value before adding to cart!');
//             return;
//         }
//         console.log('productId123 123', productId, selected.variant, selected.value);
//     };


//     return (

//         <div className="grid grid-cols-12 gap-4">
//             {ProductsData?.map((item, index) => (
//                 <div
//                     className={`md:col-span-6 ${isHomePath ? 'lg:col-span-3' : 'lg:col-span-4'} col-span-12 flex flex-col justify-between relative h-full items-center rounded-lg border-2 border-[#072320]`}
//                     key={index}
//                 >

//                     <div className='flex flex-col justify-center items-center px-4'>



//                         <div className='pb-2 flex items-center gap-2'>


//                             {item?.variant_name?.map(variant => (
//                                 <h2
//                                     className="text-[#072320] text-center cursor-pointer font-dm text-lg capitalize font-medium"
//                                     key={variant.id}
//                                     onClick={() => handleVariantClick(item.id, variant.variant)}
//                                 >
//                                     {variant.variant}
//                                 </h2>
//                             ))}

//                         </div>

//                         {selectedVariants[item.id] && (
//                             <div>
//                                 <h2 className="text-lg font-semibold">Available {selectedVariants[item.id].variant}:</h2>
//                                 <ul className="mt-2">
//                                     {item.variant_value
//                                         .find(v => v.variant === selectedVariants[item.id].variant)
//                                         ?.multiple_values.map(value => (
//                                             <li
//                                                 key={value.id}
//                                                 className="border p-2 mb-2 cursor-pointer"
//                                                 onClick={() => handleValueClick(item.id, value)}
//                                             >
//                                                 <p>{value.size}</p>
//                                                 <p>Price: ${value.prize}</p>
//                                                 <p>Discount Price: ${value.discount_price}</p>
//                                             </li>
//                                         ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {item?.discount_price ? (
//                             <div className="flex items-center gap-2 text-[#00A762] text-center font-dm text-lg capitalize font-medium pb-2">
//                                 <span className="block text-xs line-through">₹{item?.price}</span>
//                                 <span className="block">₹{item?.discount_price}</span>
//                             </div>
//                         ) : (
//                             <h2 className="text-[#00A762] font-dm text-lg capitalize font-medium pb-2">
//                                 ₹{item?.price}
//                             </h2>
//                         )}
//                     </div>

//                     <div className='flex justify-center items-center px-2 py-2 gap-2'>


//                         <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320]'>


//                             <button
//                                 onClick={() => handleAddToCart(item.id)}
//                                 // disabled={!selectedVariants[item.id]?.variant || !selectedVariants[item.id]?.value}
//                                 className={`flex items-center justify-center w-full h-full rounded-lg ${!selectedVariants[item.id]?.variant || !selectedVariants[item.id]?.value ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#072320] cursor-pointer'}`}
//                             >
//                                 <HiOutlineShoppingBag className='text-white text-[22px]' />
//                             </button>
//                         </div>

//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductCard;







// multipal variant and multipal value
// import React, { useState } from 'react';
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import ProductsData from "../../../../data/productsdata";

// const ProductCard = () => {
//     const location = useLocation();
//     const [selectedVariants, setSelectedVariants] = useState({});
//     const isHomePath = location.pathname === '/';

//     const handleVariantClick = (productId, variant) => {
//         setSelectedVariants(prev => ({
//             ...prev,
//             [productId]: { ...prev[productId], [variant]: null }
//         }));
//     };

//     const handleValueClick = (productId, variant, value) => {
//         setSelectedVariants(prev => ({
//             ...prev,
//             [productId]: { ...prev[productId], [variant]: value }
//         }));
//     };

//     const handleAddToCart = (productId) => {
//         const selected = selectedVariants[productId];

//         if (!selected) {
//             toast.error('Please select at least one variant and its value before adding to cart!');
//             return;
//         }

//         const payload = {
//             productId,
//             selectedVariants: selected
//         };

//         console.log('Payload to be sent to cart:', payload);
//         // Here you can add the logic to send the payload to your cart
//     };

//     return (
//         <div className="grid grid-cols-12 gap-4">
//             {ProductsData.map((item, index) => (
//                 <div
//                     className={`md:col-span-6 ${isHomePath ? 'lg:col-span-3' : 'lg:col-span-4'} col-span-12 flex flex-col justify-between relative h-full items-center rounded-lg border-2 border-[#072320]`}
//                     key={index}
//                 >
//                     <div className='flex flex-col justify-center items-center px-4'>
//                         <div className='pb-2 flex items-center gap-2'>
//                             {item.variant_name.map(variant => (
//                                 <h2
//                                     className="text-[#072320] text-center cursor-pointer font-dm text-lg capitalize font-medium"
//                                     key={variant.id}
//                                     onClick={() => handleVariantClick(item.id, variant.variant)}
//                                 >
//                                     {variant.variant}
//                                 </h2>
//                             ))}
//                         </div>



//                         {selectedVariants[item.id] && (
//                             <div>
//                                 <h2 className="text-lg font-semibold">
//                                     Select variant {Object.keys(selectedVariants[item.id]).join(', ')}:
//                                 </h2>
//                                 {item.variant_value.map(v => {
//                                     // Only render the section if the variant has not been selected
//                                     if (selectedVariants[item.id][v.variant] === null) {
//                                         return (
//                                             <div key={v.variant} className="mt-4">
//                                                 <h3 className="text-md font-semibold">{v.variant}:</h3>
//                                                 <ul className="mt-2">
//                                                     {v.multiple_values.map(value => (
//                                                         <li
//                                                             key={value.id}
//                                                             className="border p-2 mb-2 cursor-pointer"
//                                                             onClick={() => handleValueClick(item.id, v.variant, value)}
//                                                         >
//                                                             <p>{value.size}</p>
//                                                             <p>Price: ${value.prize}</p>
//                                                             <p>Discount Price: ${value.discount_price}</p>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         );
//                                     }
//                                     return null; // Don't render anything if the value is already selected
//                                 })}
//                             </div>
//                         )}


//                         {item.discount_price ? (
//                             <div className="flex items-center gap-2 text-[#00A762] text-center font-dm text-lg capitalize font-medium pb-2">
//                                 <span className="block text-xs line-through">₹{item.price}</span>
//                                 <span className="block">₹{item.discount_price}</span>
//                             </div>
//                         ) : (
//                             <h2 className="text-[#00A762] font-dm text-lg capitalize font-medium pb-2">
//                                 ₹{item.price}
//                             </h2>
//                         )}
//                     </div>
//                     <div className='flex justify-center items-center px-2 py-2 gap-2'>
//                         <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320]'>
//                             <button
//                                 onClick={() => handleAddToCart(item.id)}
//                                 className={`flex items-center justify-center w-full h-full rounded-lg ${!selectedVariants[item.id] || Object.values(selectedVariants[item.id]).some(value => value === null) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#072320] cursor-pointer'}`}
//                             >
//                                 <HiOutlineShoppingBag className='text-white text-[22px]' />
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductCard;



// single object page salect indivisual and diffrent deffrent value send pay load 

// import React, { useState } from 'react';
// import { HiOutlineShoppingBag } from "react-icons/hi";

// const ProductSingleContentPage = ({ oneproduct }) => {
//     const { id, variant_name = [], variant_value = [] } = oneproduct;
    
//     // State to hold selected values
//     const [selectedValues, setSelectedValues] = useState({});

//     const handleSelectValue = (variant, value) => {
//         setSelectedValues(prev => ({
//             ...prev,
//             [variant]: value
//         }));
//     };

//     const handleAddToCart = () => {
//         const payload = {
//             productId: id,
//             selectedVariants: selectedValues,
//         };

//         console.log('Payload to be sent to cart:', payload);
//     };

//     return (
//         <div className='p-4'>
//             {variant_name.map((variant) => {
//                 const matchedValues = variant_value.find(v => v.variant === variant.variant);
//                 return (
//                     <div key={variant.id} className='my-2'>
//                         <h3>{variant.variant}</h3>
//                         {matchedValues?.multiple_values.map((value) => (
//                             <div
//                                 key={value.id}
//                                 onClick={() => handleSelectValue(variant.variant, value)}
//                                 className={`p-2 cursor-pointer rounded-lg ${
//                                     selectedValues[variant.variant]?.id === value.id 
//                                     ? 'bg-blue-500 text-white' 
//                                     : 'bg-gray-200'
//                                 }`}
//                             >
//                                 {value.size} - ${value.price} (Discount: ${value.discount_price})
//                             </div>
//                         ))}
//                     </div>
//                 );
//             })}

//             <div className='flex justify-center items-center px-2 py-2 gap-2'>
//                 <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320]'>
//                     <button
//                         onClick={handleAddToCart}
//                         className={`flex items-center justify-center w-full h-full rounded-lg bg-[#072320] cursor-pointer`}
//                     >
//                         <HiOutlineShoppingBag className='text-white text-[22px]' />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductSingleContentPage;