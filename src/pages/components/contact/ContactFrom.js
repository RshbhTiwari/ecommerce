import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Btnone } from '../basic/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postContact } from '../../../redux/slices/contactfrom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required'),
});

const ContactForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            message: ''
        },
    });

    const { reset, handleSubmit, formState: { errors } } = methods;

    const onSubmit = async (data) => {
        console.log("data", data)
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 500));
            const payload = {
                name: data?.name,
                email: data?.email,
                message: data?.message,
            };
            dispatch(postContact(payload, toast, reset));
       
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <NameInput />
                <EmailInput />
                <MessageInput />

                <div className='mt-6'>
                    <Btnone title="Submit"
                        bgColor="#00A762" type="submit" />
                </div>
            </form>
        </FormProvider>
    );
};

const NameInput = () => {
    const { register, formState: { errors } } = useFormContext();
    return (

        <div>
            <label className='block  text-[#072320] 
            font-dm text-lg capitalize font-medium' htmlFor="Your name">Your Name <span className=' font-medium text-red-500'>*</span></label>
            <input className='input_box w-full' type="text" id="name" {...register('name')} />
            {errors.name && <p className='text-red-500 font-dm text-sm capitalize'>{errors.name.message}</p>}
        </div>
    );
};

const EmailInput = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className='mt-2'>
            <label className='block  text-[#072320] 
            font-dm text-lg capitalize font-medium' htmlFor="email">Your Email</label>
            <input className='input_box w-full' type="email" id="email" {...register('email')} />
            {errors.email && <p className='text-red-500 font-dm text-sm capitalize'>{errors.email.message}</p>}
        </div>
    );
};

const MessageInput = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className='mt-2'>
            <label className='block  text-[#072320] 
            font-dm text-lg capitalize font-medium' htmlFor="message">Your Message (optional) <span className=' font-medium text-red-500'>*</span></label>

            <textarea
                rows="3"
                className='input_box w-full'
                id="message" {...register('message')}
            />

            {errors.message && <p className='text-red-500 font-dm text-sm capitalize'>{errors.message.message}</p>}
        </div>
    );
};

export default ContactForm;
