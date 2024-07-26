import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Btnone } from '../button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postResetPasswordUser } from '../../../../redux/slices/loginRegister';
import { useEffect, useState } from 'react';

const ResetPasswordfrom = ({ token }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [defaultEmail, setDefaultEmail] = useState('');

    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailFromUrl = urlParams.get('email');
        if (emailFromUrl) {
            setDefaultEmail(emailFromUrl);
        }
    }, []);

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: defaultEmail,
            password: '',
            confirmPassword: '',
        },
    });
    
    const { reset, handleSubmit, formState: { isSubmitting, isValid, errors } } = methods;

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const payload = {
                token,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword,
            };
            dispatch(postResetPasswordUser(payload, toast, reset));
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <EmailInput />
                <NewPassword />
                <ConfirmPassword />

                <div className='mt-6'>
                    <Btnone title="Reset Password"
                        bgColor="#00A762" type="submit" width="100%" loading={isSubmitting} />
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

export default ResetPasswordfrom;
