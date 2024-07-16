import { ShoppingCard } from "./components/ShoppingCart";

function Cart() {
    return (
        <>
            <ShoppingCard />
        </>
    );
}
export default Cart;

// import React, { useState, useEffect, Fragment } from "react";
// import Link from "next/link";
// import { Cartfrom, DesktopCart, MobileCart } from "../../components/cart";
// import { LayoutOne } from "../../components/layouts";
// import { FadeIn } from "../../components/animations";
// import {
//   AddQuantityInCart,
//   MinusQuantityInCart,
//   removeCartIdItems,
//   removeCartItems,
// } from "../../redux/slices/addToCart";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import { ButtonSix } from "../../components/buttons";

// export default function Cart() {

//   const dispatch = useDispatch();
//   const { allCartItems, cartLoading } = useSelector((state) => state.addToCart);
//   const [totalPrice, setTotalPrice] = useState();
//   const [pageLoading, setPageLoading] = useState(true);
//   const { loginUser, userAccessToken } = useSelector(
//     (state) => state.loginRegister
//   );
//   useEffect(() => {
//     if (allCartItems?.length > 0) {
//       let newArray = allCartItems?.map((item) => {
//         return item?.b2csellprice * item?.quantity;
//       });
//       let totalAll = newArray?.reduce((total, single) => {
//         return total + single;
//       });
//       setTotalPrice(totalAll);
//     }
//   }, [allCartItems]);
//   //quantity
//   const handleAddItems = (item) => {
//     if (item?.product_stock != null) {
//       if (item?.quantity < item?.product_stock) {
//         if (item?.varients != undefined) {
//           dispatch(AddQuantityInCart(item, "varients"));
//         } else {
//           dispatch(AddQuantityInCart(item, "id"));
//         }
//       }
//     } else {
//       if (item?.varients != undefined) {
//         dispatch(AddQuantityInCart(item, "varients"));
//       } else {
//         dispatch(AddQuantityInCart(item, "id"));
//       }
//     }
//   };
//   const handleMinusItems = (item) => {
//     if (item?.quantity > 1) {
//       if (item?.varients != undefined) {
//         dispatch(MinusQuantityInCart(item, "varients"));
//       } else {
//         dispatch(MinusQuantityInCart(item, "id"));
//       }
//     }
//   };
//   useEffect(() => {
//     if (cartLoading == false) {
//       setTimeout(() => {
//         setPageLoading(false);
//       }, 2000);
//     }
//   }, [cartLoading]);

//   return (
//     <section>
//       <ToastContainer />
//       <LayoutOne>
//         <div className="md:container mx-auto">
//           <FadeIn durationTime={"1s"}>
//             {allCartItems?.length > 0 ? (
//               <>
//                 {/* {/ desktop /} */}
//                 <DesktopCart
//                   pageLoading={pageLoading}
//                   handleAddItems={handleAddItems}
//                   handleMinusItems={handleMinusItems}
//                   removeCartIdItems={removeCartIdItems}
//                   removeCartItems={removeCartItems}
//                   allCartItems={allCartItems}
//                   totalPrice={totalPrice}
//                 /> 
//                  {/* {/ mobile /} */}
//                 <MobileCart
//                   pageLoading={pageLoading}
//                   handleAddItems={handleAddItems}
//                   handleMinusItems={handleMinusItems}
//                   removeCartIdItems={removeCartIdItems}
//                   removeCartItems={removeCartItems}
//                   allCartItems={allCartItems}
//                   totalPrice={totalPrice}
//                 />
//                 {/* {/ checkout /} */}
//                 <div className="mt-5 md:px-0 px-3 w-full">
//                   <Cartfrom />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="h-[400px] mt-10 mx-auto w-[70%]">
//                   <img
//                     className="h-full w-full object-cover"
//                     src="https://www.adasglobal.com/img/empty-cart.png"
//                   />
//                 </div>
//                 <Link href={"/shop"}>
//                   <div className="py-10 mx-auto w-fit">
//                     <ButtonSix type={"button"} btnName={"shop now"} />
//                   </div>
//                 </Link>
//               </>
//             )}
//           </FadeIn>
//         </div>
//       </LayoutOne>
//     </section>
//   );
// }