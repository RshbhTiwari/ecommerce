import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Btnone } from '../basic/button';

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    // email: Yup.string().email('Invalid email').required('Email is required'),
    number: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').required('Number is required'),
    city: Yup.string().required('City is required'),
});

const ContactForm = () => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            number: '',
            city: '',
        },
    });

    const { handleSubmit, formState: { errors } } = methods;

    const onSubmit = (data) => {
        console.log("data", data); 
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <NameInput />
                <EmailInput />
                <NumberInput />
                <CityInput />

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
            font-dm text-lg capitalize font-medium' htmlFor="name">Name <span className=' font-medium text-red-500'>*</span></label>
            <input className='input_box w-full' type="text" id="name" {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
        </div>
    );
};

const EmailInput = () => {
    const { register } = useFormContext();
    return (
        <div className='mt-2'>
            <label className='block  text-[#072320] 
            font-dm text-lg capitalize font-medium' htmlFor="email">Email</label>
            <input  className='input_box w-full' type="email" id="email" {...register('email')} />
        </div>
    );
};

const NumberInput = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className='mt-2'>
            <label className='block  text-[#072320] 
            font-dm text-lg capitalize font-medium' htmlFor="number">Number <span className=' font-medium text-red-500'>*</span></label>
            <input  className='input_box w-full' type="text" id="number" {...register('number')} />
            {errors.number && <p className='text-red-500 font-dm text-sm capitalize'>{errors.number.message}</p>}
        </div>
    );
};

const CityInput = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className='mt-2'>
            <label className='block  text-[#072320] 
            font-dm text-lg capitalize font-medium' htmlFor="city">City <span className=' font-medium text-red-500'>*</span></label>
            <input  className='input_box w-full' type="text" id="city" {...register('city')} />
            {errors.city && <p className='text-red-500 font-dm text-sm capitalize'>{errors.city.message}</p>}
        </div>
    );
};

export default ContactForm;
