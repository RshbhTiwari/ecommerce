import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Btnone } from '../basic/button';
import { useEffect, useMemo } from 'react';

const UpdateAccountFrom = ({ isEdit = false, userData }) => {

        // Function to format date to 'YYYY-MM-DD'
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extracts 'YYYY-MM-DD' part
};

    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        username: Yup.string().required('Username is required'),
    });

    const defaultValues = useMemo(
        () => ({
            _id: userData?._id || "",
            username: userData?.username || "",
            email: userData?.email || "",
            password: userData?.password || "",
            contact: userData?.contact || "",
            city: userData?.city || "",
            pincode: userData?.pincode || "",
            dob: userData?.dob ? formatDate(userData.dob) : '', // Format date function
            gender: userData?.gender || '',
        }),
        [userData]
    );



    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    

    const {
        reset,
        setValue,
        handleSubmit,
        formState: { errors },
    } = methods;


    useEffect(() => {
        if (isEdit && userData) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, userData]);


    const onSubmit = (data) => {
        console.log("data", data);
        // Handle submission logic, e.g., API call to update account
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 md:gap-6 py-6 gap-0">
                    <div className='col-span-12 lg:col-span-6'>
                        <UsernameInput />
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                        <EmailInput />
                    </div>
                    <div className='col-span-12'>
                        <GenderInput />
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                        <ContactInput />
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                        <CityInput />
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                        <PincodeInput />
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                        <DateOfBirthInput />
                    </div>

                </div>
                <div className='mt-6'>
                    <Btnone title="Save Changes" bgColor="#00A762" type="submit" width="100%" />
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
    const { register, formState: { errors }, setValue } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="contact">Contact Number</label>
            <input
                className='input_box w-full'
                type="tel"
                id="contact"
                placeholder='Enter contact number'
                pattern="\d{10}"
                {...register('contact')}
                title="Please enter a 10-digit contact number"
            />
            {errors.contact && (
                <p className="text-red-500 mt-1">{errors.contact.message}</p>
            )}
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
    const { register, formState: { errors }, setValue } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="pincode">Pincode</label>
            <input
                className='input_box w-full'
                type="text"
                id="pincode"
                placeholder='Enter pincode'
                pattern="\d{6}"
                title="Please enter a 6-digit pincode"
                {...register('pincode')}
                onChange={(e) => {
                    setValue('pincode', e.target.value);
                }}
            />
            {errors.pincode && (
                <p className="text-red-500 mt-1">{errors.pincode.message}</p>
            )}
        </div>
    );
};

const DateOfBirthInput = () => {
    const { register } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="dob">Date of Birth</label>
            <input
                className='input_box w-full'
                type="date"
                id="dob"
                {...register('dob')}
                defaultValue={register('dob').value}
            />
        </div>
    );
};

const GenderInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='sm:my-3 my-4'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium'>Gender</label>
            <div className='flex sm:flex-row flex-col mt-2 gap-4'>
                <label className='flex items-center text-base font-dm '>
                    <input
                        type="radio"
                        {...register('gender')}
                        value="male"
                        className='mr-2 '
                    />
                    Male
                </label>
                <label className='flex items-center text-base font-dm '>
                    <input
                        type="radio"
                        {...register('gender')}
                        value="female"
                        className='mr-2'
                    />
                    Female
                </label>

                <label className='flex items-center text-base font-dm '>
                    <input
                        type="radio"
                        {...register('gender')}
                        value="transgender"
                        className='mr-2'
                    />
                    Transgender
                </label>

                <label className='flex items-center text-base font-dm '>
                    <input
                        type="radio"
                        {...register('gender')}
                        value="rather"
                        className='mr-2'
                    />
                    I’d rather not say
                </label>
            </div>
        </div>
    );
};

export default UpdateAccountFrom;