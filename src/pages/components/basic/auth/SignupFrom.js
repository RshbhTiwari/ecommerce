import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Btnone } from '../button';
import { useDispatch } from 'react-redux';
import { postRegisterUser } from '../../../../redux/slices/loginRegister';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupFrom = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        name: Yup.string().required('Username is required'),
    });

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            contact: '',
        },
    });


    const { reset, handleSubmit, formState: { isSubmitting, isValid, errors } } = methods;

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            let formData = new FormData();
            formData.set("name", data.name);
            formData.set("contact", data.contact);
            formData.set("email", data.email);
            formData.set("password", data.password);
            dispatch(
                postRegisterUser(
                    formData,
                    reset,
                    toast,
                    navigate,
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <UsernameInput />
                <EmailInput />
                <ContactInput />
                <PasswordInput />

                <div className='mt-6'>
                    <Btnone title="Register now"
                        bgColor="#00A762" type="submit" width="100%" loading={isSubmitting} />
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
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="name">Full Name<span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="name"
                placeholder='Enter username'
                {...register('name')}
            />
            {errors.name && (
                <p className="text-red-500 mt-1">{errors.name.message}</p>
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
