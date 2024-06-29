import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Btnone } from '../button';

const ForgotPasswordForm = () => {
    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
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
                <EmailInput />
                <NewPassword />
                <ConfirmPassword />

                <div className='mt-6'>
                    <Btnone title="Reset Password"
                        bgColor="#00A762" type="submit" width="100%" />
                </div>
            </form>
        </FormProvider>
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

const NewPassword = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="password">New Password<span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="password"
                id="password"
                placeholder='Create new password'
                {...register('password')}
            />
            {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
        </div>
    );
};

const ConfirmPassword = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="confirmPassword">Confirm Password<span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="password"
                id="confirmPassword"
                placeholder='Confirm your password'
                {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
                <p className="text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
        </div>
    );
};

export default ForgotPasswordForm;
