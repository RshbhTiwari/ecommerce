import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
};

const userName = JSON.parse(localStorage.getItem('user'))?.name || null;
const userEmail = JSON.parse(localStorage.getItem('user'))?.email || null;
const userContact = JSON.parse(localStorage.getItem('user'))?.contact || null;

const initiaterazorpaySlice = createSlice({
    name: "initiaterazorpay",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.error = null;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { startLoading, hasError } = initiaterazorpaySlice.actions;

export default initiaterazorpaySlice.reducer;

export const initiateRazorpayPayment = ( cart_id, customer_id, toast, navigate) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.post("/order/create", { customer_id, cart_id });

        const paymentData = response?.data?.data;

        if (paymentData) {
            const options = {
                key: 'rzp_test_9L3JL3GPuXD0YO',
                amount: paymentData.amount,
                currency: paymentData.currency,
                name: 'Your Company Name',
                description: 'Order Payment',
                order_id: paymentData.razorpay_order_id,
                handler: function (response) {
                    axios.post('/order/payment-success', {
                        razorpay_order_id: paymentData.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    })
                        .then((res) => {
                            if (res.data.status === true) {
                                toast.success('Payment verified successfully');
                                navigate(`/my-account/orders/${paymentData?.order_id}`);
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                            } else {
                                toast.error('Payment Verification Failed');
                            }
                        })
                        .catch((error) => {
                            toast.error('Payment Verification Error');
                            console.error('Error:', error);
                        });
                },
                prefill: {
                    name: userName,
                    email: userEmail,
                    contact: userContact,
                },
                theme: {
                    color: '#00A762',
                },
            };


            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                axios.post('/order/payment-failed', {
                    razorpay_order_id: response.error.metadata.order_id,
                    razorpay_payment_id: response.error.metadata.payment_id,
                    error_description: response.error.description,
                })
                .then(() => {
                    toast.error('Payment Failed');
                })
                .catch((error) => {
                    toast.error('Error in handling payment failure');
                    console.error('Error:', error);
                });
            });
            paymentObject.open();
        }
    } catch (error) {
        console.error("Refresh the page and try again later.", error);
        dispatch(hasError(error));
    }
};