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

export const initiateRazorpayPayment = (paymentOption, upiSubOption, cart_id, customer_id, toast, navigate) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.post("/order/create", { paymentOption, upiSubOption, customer_id, cart_id });

        const paymentData = response?.data?.data;
        if (paymentData) {
            console.log("paymentOption", paymentOption, upiSubOption)
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
                                navigate('/'); // Ensure `navigate` is available in this context
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

                method: "netbanking", // Pass the selected payment method
                ...(paymentOption === 'upi' && {
                    upi: {
                        vpa: upiSubOption, // prefill UPI VPA if any
                    }
                })
            };

            console.log("options", options);

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
    } catch (error) {
        console.error("Refresh the page and try again later.", error);
        dispatch(hasError(error));
    }
};
