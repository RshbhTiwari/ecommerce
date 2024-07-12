

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { Btnone } from '../../basic/button';
import { useLocation } from 'react-router-dom';

const AddEditAddressFrom = ({ isEdit = false, userAdd }) => {

    const location = useLocation();

    const schema = Yup.object().shape({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        contact: Yup.string()
            .matches(/^\d{10}$/, 'Invalid Mobile Number')
            .required('Mobile Number is required'),
        pincode: Yup.string()
            .matches(/^\d{6}$/, 'Invalid Pincode')
            .required('Pincode is required'),
        addressname: Yup.string().required('Address is required'),
        landmarkname: Yup.string().required('Landmark is required'),
        locality: Yup.string().required('Locality is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
    });

    const defaultValues = useMemo(
        () => ({
            _id: userAdd?._id || "",
            firstname: userAdd?.firstname || "",
            lastname: userAdd?.lastname || "",
            contact: userAdd?.contact || "",
            landmarkname: userAdd?.landmarkname || "",
            addressname: userAdd?.addressname || "",
            pincode: userAdd?.pincode || "",
            locality: userAdd?.locality || '',
            state: userAdd?.state || "",
            city: userAdd?.city || '',
            state: userAdd?.state || "",
            addresstype: userAdd?.addresstype || '',
            defaultAddress: userAdd?.defaultAddress || '',
        }),
        [userAdd]
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
        if (isEdit && userAdd) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, userAdd]);


    const onSubmit = (data) => {
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 md:gap-6 gap-0">
                    <div className='col-span-12 lg:col-span-6'>
                        <FirstnameInput />
                    </div>

                    <div className='col-span-12 lg:col-span-6'>
                        <LastnameInput />
                    </div>

                    <div className='col-span-12 lg:col-span-6'>
                        <ContactInput />
                    </div>



                    <div className='col-span-12 lg:col-span-6'>
                        <LandmarknamenameInput />
                    </div>

                    <div className='col-span-12 lg:col-span-8'>
                        <AddressnameInput />
                    </div>

                    <div className='col-span-12 lg:col-span-4'>
                        <PincodeInput />
                    </div>

                    <div className='col-span-12'>
                        <LocalityInput />
                    </div>

                    <div className='col-span-12 lg:col-span-6'>
                        <StateInput />
                    </div>


                    <div className='col-span-12 lg:col-span-6'>
                        <CityInput />
                    </div>
                    <div className='col-span-12 '>
                        <AddressTypeInput />
                    </div>


                    {/* Conditionally render DefaultAddress based on the route */}
                    {location.pathname === '/my-account/add-address' ||
                        location.pathname.startsWith('/my-account/edit-address/') ? (
                        <div className='col-span-12 '>
                            <DefaultAddress />
                        </div>
                    ) : null}

                </div>
                <div className='mt-6'>
                    <Btnone title={isEdit ? 'edit address' : 'Post address'} bgColor="#00A762" type="submit" width="100%" />
                </div>
            </form>
        </FormProvider>
    );
};

const FirstnameInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="firstname">First Name
                <span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="firstname"
                placeholder='Enter First Name'
                {...register('firstname')}
            />
            {errors.firstname && (
                <p className="text-red-500 mt-1">{errors.firstname.message}</p>
            )}
        </div>
    );
};

const LastnameInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="lastname">Last Name
                <span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="lastname"
                placeholder='Enter Last Name'
                {...register('lastname')}
            />
            {errors.lastname && (
                <p className="text-red-500 mt-1">{errors.lastname.message}</p>
            )}
        </div>
    );
};

const ContactInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="contact">Mobile Number</label>
            <input
                className='input_box w-full'
                type="tel"
                id="contact"
                placeholder='Enter Mobile Number'
                pattern="\d{10}"
                {...register('contact', {
                    required: 'Mobile Number is required',
                    pattern: {
                        value: /^\d{10}$/,
                        message: 'Invalid Mobile Number'
                    }
                })}
            />
            {errors.contact && (
                <p className="text-red-500 mt-1">{errors.contact.message}</p>
            )}
        </div>
    );
};


const LandmarknamenameInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="landmarkname">Landmark
                <span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="landmarkname"
                placeholder='Enter Landmark'
                {...register('landmarkname')}
            />
            {errors.landmarkname && (
                <p className="text-red-500 mt-1">{errors.landmarkname.message}</p>
            )}
        </div>
    );
};

const AddressnameInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="addressname">Address (Flat no., Building, Company, Street)
                <span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="addressname"
                placeholder='Enter Flat no./Building Name/ Society'
                {...register('addressname')}
            />
            {errors.addressname && (
                <p className="text-red-500 mt-1">{errors.addressname.message}</p>
            )}
        </div>
    );
};

const PincodeInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="pincode">Pincode
                <span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="pincode"
                placeholder='Enter pincode'
                pattern="\d{6}"
                title="Please enter a 6-digit pincode"
                {...register('pincode', {
                    required: 'Pincode is required',
                    pattern: {
                        value: /^\d{6}$/,
                        message: 'Invalid Pincode'
                    }
                })}
            />
            {errors.pincode && (
                <p className="text-red-500 mt-1">{errors.pincode.message}</p>
            )}
        </div>
    );
};




const LocalityInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="locality">Locality / Sector / Area
                <span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="locality"
                placeholder='Enter Locality / Sector / Area*'
                {...register('locality')}
            />
            {errors.locality && (
                <p className="text-red-500 mt-1">{errors.locality.message}</p>
            )}
        </div>
    );
};

const StateInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="state">State
                <span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="state"
                placeholder='Enter State'
                {...register('state')}

            />
            {errors.state && (
                <p className="text-red-500 mt-1">{errors.state.message}</p>
            )}
        </div>
    );
};



const CityInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="city">City
                <span className=' font-medium text-red-500'>*</span>
            </label>
            <input
                className='input_box w-full'
                type="text"
                id="city"
                placeholder='Enter city'
                {...register('city')}
            />
            {errors.state && (
                <p className="text-red-500 mt-1">{errors.city.message}</p>
            )}
        </div>
    );
};

const AddressTypeInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium'>Address Type</label>
            <div className='flex mt-2 gap-4'>
                <label className='flex items-center text-base font-dm '>
                    <input
                        type="radio"
                        {...register('addresstype')}
                        value="home"
                        className='mr-2 '
                    />
                    Home
                </label>
                <label className='flex items-center text-base font-dm '>
                    <input
                        type="radio"
                        {...register('addresstype')}
                        value="work"
                        className='mr-2'
                    />
                    Work
                </label>

                <label className='flex items-center text-base font-dm '>
                    <input
                        type="radio"
                        {...register('addresstype')}
                        value="other"
                        className='mr-2'
                    />
                    Other
                </label>
            </div>
        </div>
    );
};


const DefaultAddress = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3 flex'>
            <input
                type="checkbox"
                {...register('defaultAddress')}
                className='ml-2 rounded '
            />
            <label className='ml-2 block text-[#072320] font-dm text-lg capitalize font-medium'>
                Make This My Default Address
            </label>

        </div>
    );
};


export default AddEditAddressFrom;