// import React, { useEffect, useState } from 'react';
// import upiimg from '../../../../assets/myaccount/UPI.gif';
// import Walletsimg from '../../../../assets/myaccount/Wallets.gif';
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { initiateRazorpayPayment } from '../../../../redux/slices/initiaterazorpay';
// import axiosInstance from '../../../../utils/axios';
// import { useNavigate } from 'react-router-dom';
// import { Btnone } from '../../basic/button';

// const PaymentOptions = ({ onConfirmOrder, backCLick }) => {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [paymentOption, setPaymentOption] = useState('upi');
//     const [upiSubOption, setUpiSubOption] = useState('');

//     const { paymentData } = useSelector(
//         (state) => state.initiaterazorpay
//     );


//     const amount = paymentData?.amount ? parseInt(paymentData.amount, 10) : 0;
//     console.log("isAmountGreaterThan100", amount)


//     const userName = JSON.parse(localStorage.getItem('user'))?.name || null;
//     const userEmail = JSON.parse(localStorage.getItem('user'))?.email || null;
//     const userContact = JSON.parse(localStorage.getItem('user'))?.contact || null;

//     const handleOptionChange = (e) => {
//         setPaymentOption(e.target.value);
//         setUpiSubOption('');
//     };

//     const handleUpiSubOptionChange = (e) => {
//         setUpiSubOption(e.target.value);
//     };

//     const handleConfirmOrder = () => {
//         if (paymentOption === 'cod') {
//             toast.info('Order Confirmed with Cash on Delivery.');
//             onConfirmOrder();
//         } else {
//             const cart_id = localStorage?.getItem('cart_id') || null;
//             console.log("cart_id", cart_id);
//             dispatch(initiateRazorpayPayment(paymentOption, upiSubOption, cart_id))
//                 .then(() => {
                   
//                     if (paymentData) {
//                         const options = {
//                             key: 'rzp_test_9L3JL3GPuXD0YO',
//                             amount: paymentData.amount,
//                             // amount: 50000.00 ,
//                             currency: paymentData?.currency,
//                             name: 'Your Company Name',
//                             description: 'Order Payment',
//                             order_id: paymentData?.razorpay_order_id,

//                             handler: function (response) {
//                                 axiosInstance.post('/order/payment-success', {
//                                     razorpay_order_id: paymentData.razorpay_order_id,
//                                     razorpay_payment_id: response.razorpay_payment_id,
//                                     razorpay_signature: response.razorpay_signature
//                                 })
//                                     .then(res => {
//                                         if (res?.data?.status == true) {
//                                             toast.success('Payment verified successfully');
//                                             navigate('/')
//                                         } else {
//                                             toast.error('Payment Verification Failed');
//                                         }
//                                     })
//                                     .catch(error => {
//                                         toast.error('Payment Verification Error');
//                                         console.error('Error:', error);
//                                     });
//                             },
//                             prefill: {
//                                 name: userName,
//                                 email: userEmail,
//                                 contact: userContact,
//                             },
//                             theme: {
//                                 color: '#072320'
//                             }
//                         };
//                         const paymentObject = new window.Razorpay(options);
//                         paymentObject.open();
//                     }
//                 });
//         }
//     };

//     return (
//         <div className="">
//             <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'upi' ? 'bg-gray-100' : 'bg-light'}`}>
//                 <div>
//                     <input
//                         type="radio"
//                         id="upi"
//                         name="paymentOption"
//                         value="upi"
//                         checked={paymentOption === 'upi'}
//                         onChange={handleOptionChange}
//                         className='cursor-pointer'
//                     />
//                 </div>
//                 <div>
//                     <img src={upiimg} alt="UPI" className="w-6 h-6 mr-2" />
//                 </div>
//                 <div htmlFor="upi" className="flex flex-col text-base font-dm">
//                     UPI
//                     {paymentOption === 'upi' && (
//                         <div className="py-4">
//                             <h2 className="text-[#00A762] text-center font-dm text-lg capitalize font-medium">
//                                 Choose an option
//                             </h2>
//                             <div className="flex flex-col space-y-4 mt-4">
//                                 <label className="flex items-center">
//                                     <input
//                                         type="radio"
//                                         name="upiOption"
//                                         value="phonePe"
//                                         checked={upiSubOption === 'phonePe'}
//                                         onChange={handleUpiSubOptionChange}
//                                         className='cursor-pointer'
//                                     />
//                                     <span className="text-sm font-dm ml-3">PhonePe</span>
//                                 </label>
//                                 <label className="flex items-center">
//                                     <input
//                                         type="radio"
//                                         name="upiOption"
//                                         value="yourUPIID"
//                                         checked={upiSubOption === 'yourUPIID'}
//                                         onChange={handleUpiSubOptionChange}
//                                         className='cursor-pointer'
//                                     />
//                                     <span className="text-sm font-dm ml-3">Your UPI ID</span>
//                                 </label>
//                             </div>
//                         </div>
//                     )}
//                     <p className='text-sm font-dm text-[#0000009e]'>Pay by any UPI app</p>
//                 </div>
//             </div>

//             <hr />
//             <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'wallets' ? 'bg-gray-100' : 'bg-light'}`}>
//                 <div>
//                     <input
//                         type="radio"
//                         id="wallets"
//                         name="paymentOption"
//                         value="wallets"
//                         checked={paymentOption === 'wallets'}
//                         onChange={handleOptionChange}
//                         className='cursor-pointer'
//                     />
//                 </div>
//                 <div>
//                     <img src={Walletsimg} alt="Wallets" className="w-6 h-6 mr-2" />
//                 </div>
//                 <div htmlFor="wallets" className="flex flex-col text-base font-dm">
//                     Wallets
//                     <p className='text-sm font-dm text-[#0000009e]'>Use your preferred digital wallet.</p>
//                 </div>
//             </div>

//             <hr />
//             <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'cards' ? 'bg-gray-100' : 'bg-light'}`}>
//                 <div>
//                     <input
//                         type="radio"
//                         id="cards"
//                         name="paymentOption"
//                         value="cards"
//                         checked={paymentOption === 'cards'}
//                         onChange={handleOptionChange}
//                         className='cursor-pointer'
//                     />
//                 </div>
//                 <div htmlFor="cards" className="flex flex-col text-base font-dm">
//                     Credit / Debit / ATM Card
//                     <p className='text-sm font-dm text-[#0000009e]'>Add and secure cards as per RBI guidelines</p>
//                 </div>
//             </div>

//             <hr />
//             <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'netbanking' ? 'bg-gray-100' : 'bg-light'}`}>
//                 <div>
//                     <input
//                         type="radio"
//                         id="netbanking"
//                         name="paymentOption"
//                         value="netbanking"
//                         checked={paymentOption === 'netbanking'}
//                         onChange={handleOptionChange}
//                         className='cursor-pointer'
//                     />
//                 </div>
//                 <div htmlFor="netbanking" className="flex flex-col text-base font-dm">
//                     Net Banking
//                     <p className='text-sm font-dm text-[#0000009e]'>This instrument has low success, use UPI or cards for better experience</p>
//                 </div>
//             </div>

//             <hr />
//             <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'cod' ? 'bg-gray-100' : 'bg-light'}`}>
//                 <div>
//                     <input
//                         type="radio"
//                         id="cod"
//                         name="paymentOption"
//                         value="cod"
//                         checked={paymentOption === 'cod'}
//                         onChange={handleOptionChange}
//                         className='cursor-pointer'
//                     />
//                 </div>
//                 <div htmlFor="cod" className="flex flex-col text-base font-dm">
//                     Cash on Delivery
//                     <p className='text-sm font-dm text-[#0000009e]'>Pay when you receive your order</p>
//                 </div>
//             </div>

            // <div className='px-3 py-6 flex gap-4'>
            //     <Btnone
            //         title='Back'
            //         bgColor="#072320"
            //         width="100%"
            //         handleClick={backCLick}
            //     />

            //     <Btnone
            //         title='Confirm Order'
            //         bgColor="#072320"
            //         width="100%"
            //         handleClick={handleConfirmOrder}
            //     />
            // </div>


//         </div>
//     );
// };

// export default PaymentOptions;


import React, { useEffect, useState } from 'react';
import upiimg from '../../../../assets/myaccount/UPI.gif';
import Walletsimg from '../../../../assets/myaccount/Wallets.gif';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { initiateRazorpayPayment } from '../../../../redux/slices/initiaterazorpay';
import { useNavigate } from 'react-router-dom';
import { Btnone } from '../../basic/button';

const PaymentOptions = ({ onConfirmOrder, backCLick }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentOption, setPaymentOption] = useState('upi');
    const [upiSubOption, setUpiSubOption] = useState('');

    const handleOptionChange = (e) => {
        setPaymentOption(e.target.value);
        setUpiSubOption('');
    };



    const handleUpiSubOptionChange = (e) => {
        setUpiSubOption(e.target.value);
    };

    const handleConfirmOrder = () => {
        if (paymentOption === 'cod') {
            toast.info('Order Confirmed with Cash on Delivery.');
            onConfirmOrder();
        } else {
            const cart_id = localStorage?.getItem('cart_id') || null;
            dispatch(initiateRazorpayPayment(paymentOption, upiSubOption, cart_id, toast, navigate))
        }
    };

    return (
        <div className="">
            <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'upi' ? 'bg-gray-100' : 'bg-light'}`}>
                <div>
                    <input
                        type="radio"
                        id="upi"
                        name="paymentOption"
                        value="upi"
                        checked={paymentOption === 'upi'}
                        onChange={handleOptionChange}
                        className='cursor-pointer'
                    />
                </div>
                <div>
                    <img src={upiimg} alt="UPI" className="w-6 h-6 mr-2" />
                </div>
                <div htmlFor="upi" className="flex flex-col text-base font-dm">
                    UPI
                    {paymentOption === 'upi' && (
                        <div className="py-4">
                            <h2 className="text-[#00A762] text-center font-dm text-lg capitalize font-medium">
                                Choose an option
                            </h2>
                            <div className="flex flex-col space-y-4 mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="upiOption"
                                        value="phonePe"
                                        checked={upiSubOption === 'phonePe'}
                                        onChange={handleUpiSubOptionChange}
                                        className='cursor-pointer'
                                    />
                                    <span className="text-sm font-dm ml-3">PhonePe</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="upiOption"
                                        value="yourUPIID"
                                        checked={upiSubOption === 'yourUPIID'}
                                        onChange={handleUpiSubOptionChange}
                                        className='cursor-pointer'
                                    />
                                    <span className="text-sm font-dm ml-3">Your UPI ID</span>
                                </label>
                            </div>
                        </div>
                    )}
                    <p className='text-sm font-dm text-[#0000009e]'>Pay by any UPI app</p>
                </div>
            </div>

            <hr />
            <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'wallets' ? 'bg-gray-100' : 'bg-light'}`}>
                <div>
                    <input
                        type="radio"
                        id="wallets"
                        name="paymentOption"
                        value="wallets"
                        checked={paymentOption === 'wallets'}
                        onChange={handleOptionChange}
                        className='cursor-pointer'
                    />
                </div>
                <div>
                    <img src={Walletsimg} alt="Wallets" className="w-6 h-6 mr-2" />
                </div>
                <div htmlFor="wallets" className="flex flex-col text-base font-dm">
                    Wallets
                    <p className='text-sm font-dm text-[#0000009e]'>Use your preferred digital wallet.</p>
                </div>
            </div>

            <hr />
            <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'cards' ? 'bg-gray-100' : 'bg-light'}`}>
                <div>
                    <input
                        type="radio"
                        id="cards"
                        name="paymentOption"
                        value="cards"
                        checked={paymentOption === 'cards'}
                        onChange={handleOptionChange}
                        className='cursor-pointer'
                    />
                </div>
                <div htmlFor="cards" className="flex flex-col text-base font-dm">
                    Credit / Debit / ATM Card
                    <p className='text-sm font-dm text-[#0000009e]'>Add and secure cards as per RBI guidelines</p>
                </div>
            </div>

            <hr />
            <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'netbanking' ? 'bg-gray-100' : 'bg-light'}`}>
                <div>
                    <input
                        type="radio"
                        id="netbanking"
                        name="paymentOption"
                        value="netbanking"
                        checked={paymentOption === 'netbanking'}
                        onChange={handleOptionChange}
                        className='cursor-pointer'
                    />
                </div>
                <div htmlFor="netbanking" className="flex flex-col text-base font-dm">
                    Net Banking
                    <p className='text-sm font-dm text-[#0000009e]'>This instrument has low success, use UPI or cards for better experience</p>
                </div>
            </div>

            <hr />
            <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'cod' ? 'bg-gray-100' : 'bg-light'}`}>
                <div>
                    <input
                        type="radio"
                        id="cod"
                        name="paymentOption"
                        value="cod"
                        checked={paymentOption === 'cod'}
                        onChange={handleOptionChange}
                        className='cursor-pointer'
                    />
                </div>
                <div htmlFor="cod" className="flex flex-col text-base font-dm">
                    Cash on Delivery
                    <p className='text-sm font-dm text-[#0000009e]'>Pay when you receive your order</p>
                </div>
            </div>

            <div className='px-3 py-6 flex gap-4'>
                <Btnone
                    title='Back'
                    bgColor="#072320"
                    width="100%"
                    handleClick={backCLick}
                />

                <Btnone
                    title='Confirm Order'
                    bgColor="#072320"
                    width="100%"
                    handleClick={handleConfirmOrder}
                />
            </div>
        </div>
    );
};

export default PaymentOptions;
