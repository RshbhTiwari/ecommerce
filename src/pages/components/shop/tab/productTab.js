import { useEffect, useState } from 'react';
import { FaListUl } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import PaginationshopCard from './PaginationshopCard';
import PaginationshoplistCard from './PaginationshoplistCard';

const ProductTab = ({ allproducts, productIsLoading, productError }) => {
    const [activeTab, setActiveTab] = useState('tab_a');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    return (
        <>
            {allproducts?.length ? (
                <div className="flex space-x-2">
                    <div
                        className={`px-3 py-2 bg-[#00A762] justify-center cursor-pointer items-center text-white rounded-md flex  ${activeTab === 'tab_a' ? 'bg-teal-950' : ''
                            }`}
                        onClick={() => handleTabClick('tab_a')}
                    >
                        <CgMenuGridR className='text-2xl' />
                    </div>

                    <div
                        className={`px-3 py-2 bg-[#00A762] justify-center cursor-pointer items-center text-white rounded-md flex  ${activeTab === 'tab_b' ? 'bg-teal-950' : ''
                            }`}
                        onClick={() => handleTabClick('tab_b')}
                    ><FaListUl className='text-xl' />

                    </div>
                </div>
            ) : null}

            <div className="mt-4 h-full"  >
                {activeTab === 'tab_a' && (
                    <div data-aos="fade-up" data-aos-delay="100">
                        <PaginationshopCard products={allproducts} productIsLoading={productIsLoading}
                            productError={productError} /></div>
                )}
                {activeTab === 'tab_b' && (
                    <div data-aos="fade-up" data-aos-delay="100">
                        <PaginationshoplistCard products={allproducts} productIsLoading={productIsLoading}
                            productError={productError} /></div>
                )}
            </div>
        </>

    );
};

export default ProductTab;





// const ProductTab = ({ allproducts }) => {
//     const dispatch = useDispatch();
//     const cart_id = localStorage?.getItem('cart_id') || null;
//     const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
//     const token = localStorage?.getItem('accessToken') || null;


//     const [localCartItems, setLocalCartItems] = useState([]);
//     const { allCartItems, isLoading: cartIsLoading, error: cartErorr } = useSelector(
//         (state) => state.addToCart
//     );

//     useEffect(() => {
//         if (allCartItems?.items) {
//             setLocalCartItems(allCartItems?.items);
//         }
//     }, [allCartItems]);

//     useEffect(() => {
//         if (token) {
//             const payload = {
//                 status: true,
//             };
//             dispatch(getAllCartItems(customer_id, payload));
//         } else {
//             const payload = {
//                 status: false,
//             };
//             dispatch(getAllCartItems(cart_id, payload));
//         }
//     }, [dispatch, cart_id, customer_id, token]);




//     return (
//         <>
//             {allproducts.map((item, index) => (
//                 <>
//                     <div
//                         className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer'
//                         onClick={() => handleAddToCart(item?.id)}
//                     >
//                         add to cart
//                     </div>

//                 </>


//             ))}
//         </>

//     );
// };

// export default ProductTab;