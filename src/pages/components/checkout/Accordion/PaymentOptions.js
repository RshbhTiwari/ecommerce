import React, { useState } from 'react';
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
    const [paymentOption, setPaymentOption] = useState('paymentgateway');

    const handleOptionChange = (e) => {
        setPaymentOption(e.target.value);
    };

    const handleConfirmOrder = () => {
        if (paymentOption === 'cod') {
            onConfirmOrder();
        } else {
            const cart_id = localStorage?.getItem('cart_id') || null;
            const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
            console.log("customer_id?", "ddf", customer_id)
            dispatch(initiateRazorpayPayment(cart_id, customer_id, toast, navigate))
        }
    };

    return (
        <div className="">

            <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'paymentgateway' ? 'bg-gray-100' : 'bg-light'}`}>
                <div>
                    <input
                        type="radio"
                        id="paymentgateway"
                        name="paymentOption"
                        value="paymentgateway"
                        checked={paymentOption === 'paymentgateway'}
                        onChange={handleOptionChange}
                        className='cursor-pointer'
                    />
                </div>
                <div htmlFor="paymentgateway" className="flex flex-col text-base font-dm">
                    Payment Gateway
                    <p className='text-sm font-dm text-[#0000009e]'>Accept multiple payment methods (e.g., credit cards, UPI, net banking).</p>
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


// const [paymentOption, setPaymentOption] = useState('upi');
// const [upiSubOption, setUpiSubOption] = useState('');

// const handleOptionChange = (e) => {
//     setPaymentOption(e.target.value);
//     setUpiSubOption('');
// };

// const handleUpiSubOptionChange = (e) => {
//     setUpiSubOption(e.target.value);
// };

// const handleConfirmOrder = () => {
//     if (paymentOption === 'cod') {
//         onConfirmOrder();
//     } else {
//         const cart_id = localStorage?.getItem('cart_id') || null;
//         const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
//         console.log("customer_id?", "ddf", customer_id)
//         dispatch(initiateRazorpayPayment(paymentOption, upiSubOption, cart_id, customer_id, toast, navigate))
//     }
// };

{/* <div className={`flex px-3 py-6 space-x-4 ${paymentOption === 'upi' ? 'bg-gray-100' : 'bg-light'}`}>
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

            <hr /> */}

{/* <div className="grid grid-cols-12 gap-4 px-3 py-6">

    <div
        className=" col-span-12 lg:col-span-12 "
    >
        <Btnone
            title='Back'
            bgColor="#072320"
            width="100%"
            handleClick={backCLick}
        />
    </div>
   <Btnone
    title='Confirm Order'
    bgColor="#072320"
    width="100%"
    handleClick={handleConfirmOrder}
/> 
</div> */}

