import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Btnone } from '../button';

const SignupFrom = () => {
    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        username: Yup.string().required('Username is required'),
    });

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
            contact: '',
            city: '',
            pincode: '',
        },
    });

    const { handleSubmit, formState: { errors } } = methods;

    const onSubmit = (data) => {
        console.log("data", data);
        // Handle submission logic, e.g., API call to reset password
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>


                <UsernameInput />
                <EmailInput />
                <ContactInput />
                <CityInput />
                <PincodeInput />
                <PasswordInput />

                <div className='mt-6'>
                    <Btnone title="Register now"
                        bgColor="#00A762" type="submit" width="100%" />
                </div>
                <div className='mt-3 flex  items-center'>
                    <h2 href='#' className="text-center 
                                  font-dm text-base capitalize font-medium 
                                   ">You A Member?
                        <a className='text-[#00A762] ml-2' href='/login'>Login</a></h2>
                </div>
            </form>
        </FormProvider>
    );
};


const UsernameInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="username">Username<span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="username"
                placeholder='Enter username'
                {...register('username')}
            />
            {errors.username && (
                <p className="text-red-500 mt-1">{errors.username.message}</p>
            )}
        </div>
    );
};

const EmailInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="email">Email<span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="email"
                id="email"
                placeholder='Enter email address'
                {...register('email')}
            />
            {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
        </div>
    );
};

const ContactInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="contact">Contact Number</label>
            <input
                className='input_box w-full'
                type="tel"
                id="contact"
                placeholder='Enter contact number'
                {...register('contact')}
                   pattern="\d{10}"
                      title="Please enter a 10-digit contact number"
            />
        </div>
    );
};

const CityInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="city">City</label>
            <input
                className='input_box w-full'
                type="text"
                id="city"
                placeholder='Enter city'
                {...register('city')}
            />
        </div>
    );
};

const PincodeInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="pincode">Pincode</label>
            <input
                className='input_box w-full'
                type="text"
                id="pincode"
                placeholder='Enter pincode'
                {...register('pincode')}
                 pattern="\d{6}"
                title="Please enter a 6-digit pincode"
            />
            
        </div>
    );
};


const PasswordInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="password">Password<span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="password"
                id="password"
                placeholder='password'
                {...register('password')}
            />
            {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
        </div>
    );
};


export default SignupFrom;
