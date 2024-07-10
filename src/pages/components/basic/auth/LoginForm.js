import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Btnone } from '../button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postLoginUser } from '../../../../redux/slices/loginRegister';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { reset, handleSubmit, formState: { isSubmitting, isValid, errors } } = methods;

    const onSubmit = async (data) => {
        console.log("datadatadatadatadata", data);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const payload = {
                email: data.email,
                password: data.password,
            };
            dispatch(postLoginUser(payload, toast, reset, navigate));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <EmailInput />
                <PasswordInput />

                <div className='mt-3 flex items-center'>
                    <a href='/forgotpassword' className="text-[#00A762] text-center font-dm text-base capitalize font-medium">
                        Lost Your Password ?
                    </a>
                </div>

                <div className='mt-6'>
                    <Btnone
                        title="login"
                        loading={isSubmitting}
                        bgColor="#00A762"
                        type="submit"
                        width="100%"
                    />
                </div>

                <div className='mt-3 flex items-center'>
                    <h2 className="text-center font-dm text-base capitalize font-medium">
                        Not A Member?
                        <a className='text-[#00A762] ml-2' href='/signup'>Register ?</a>
                    </h2>
                </div>
            </form>
        </FormProvider>
    );
};

const EmailInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="email">Email</label>
            <input
                className='input_box w-full'
                type="email"
                id="email"
                placeholder='Enter email address'
                {...register('email')}
            />
            {errors && errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
        </div>
    );
};

const PasswordInput = () => {
    const { register, formState: { errors } } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="password">Password</label>
            <div className='relative'>
                <input
                    className='input_box w-full pr-10'
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder='Enter your password'
                    {...register('password')}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <FaEye className='text-xl text-[#072320]' />
                    ) : (
                        <FaEyeSlash className='text-xl text-[#072320]' />
                    )}
                </button>
            </div>
            {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
        </div>
    );
};

export default LoginForm;
