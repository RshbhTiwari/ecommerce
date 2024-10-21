import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { Btnone } from '../../basic/button';
import { putModelAddress } from '../../../../redux/slices/address';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ModelEditaddress = ({ isEdit = false, ship, onClose, checkship, checkbil, id, userAdd }) => {

    const dispatch = useDispatch();
    const getLocalStorageData = () => {
        const localData = localStorage.getItem('user');
        return localData ? JSON.parse(localData) : {};
    };

    const localStorageData = getLocalStorageData();
    const [loading, setLoading] = useState(false);

    const schema = Yup.object().shape({
        name: Yup.string().required('First Name is required'),
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
        email: Yup.string().email('Invalid email').required('Email is required'),
        addresstype: Yup.string().required('Address Type is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: userAdd?.name || localStorageData?.name || "",
            contact: userAdd?.contact || localStorageData?.contact || "",
            landmarkname: userAdd?.landmarkname || "",
            addressname: userAdd?.addressname || "",
            pincode: userAdd?.pincode || "",
            locality: userAdd?.locality || '',
            state: userAdd?.state || "",
            city: userAdd?.city || '',
            email: userAdd?.email || localStorageData?.email || "",
            addresstype: userAdd?.addresstype || '',
            default_shipping_address: userAdd?.default_shipping_address || false,
            is_shipping: userAdd?.is_shipping || false,

            default_billing_address: userAdd?.default_billing_address || false,
            is_billing: userAdd?.is_billing || false,
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

    const onSubmit = async (data) => {
        const cart_id = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
        const is_shipping = data?.is_shipping

        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 500));
            const payload = {
                name: data?.name,
                contact: data?.contact,
                landmarkname: data?.landmarkname,
                addressname: data?.addressname,
                pincode: data?.pincode,
                locality: data?.locality,
                state: data?.state,
                city: data?.city,
                email: data?.email,
                addresstype: data?.addresstype,

                default_billing_address: data?.default_billing_address,
                default_shipping_address: data?.default_shipping_address,

                ...(checkship ? { is_shipping: true } : { is_shipping }),
                ...(checkbil ? { is_billing: true } : {}),

                ...(cart_id && { cart_id }),
                ...(customer_id && { customer_id })
            };
            dispatch(putModelAddress(id, payload, toast, onClose))
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 md:gap-6 gap-0">
                    <div className='col-span-12 lg:col-span-6'>
                        <FirstnameInput />
                    </div>

                    <div className='col-span-12 lg:col-span-6'>
                        <ContactInput />
                    </div>

                    <div className='col-span-12 lg:col-span-6'>
                        <EmailInput />
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

                    <div className='col-span-12'>
                        <div className="grid grid-cols-12 md:gap-6 gap-0">
                            {ship ? (
                                <div className='col-span-12 md:col-span-6'>
                                    <DefaultBillingAddress />
                                </div>
                            ) : <div className='col-span-12'>
                                <DefaultShippingAddress />
                            </div>}

                            {ship && (
                                <div className='col-span-12 md:col-span-6'>
                                    <ShipAddress />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='mt-6'>
                    <Btnone
                        title={(loading ? 'Editing...' : 'Edit Address')}
                        bgColor="#00A762"
                        type="submit"
                        width="100%"
                        loading={loading}
                    />
                </div>
            </form>
        </FormProvider>
    );
};

const FirstnameInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="name">Full Name
                <span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="name"
                placeholder='Enter First Name'
                {...register('name')}
            />
            {errors.firstname && (
                <p className="text-red-500 mt-1">{errors?.name?.message}</p>
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
            {errors.city && (
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
            {errors.addresstype && (
                <p className="text-red-500 mt-1">{errors.addresstype.message}</p>
            )}
        </div>
    );
};

const ShipAddress = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3 flex'>
            <input
                type="checkbox"
                {...register('is_shipping')}
                className='rounded '
            />
            <label className='ml-2 block text-[#072320] font-dm text-lg capitalize font-medium'>
                {/* ship to this address */}
                Your Go-To Shipping Solution
            </label>

        </div>
    );
};

const DefaultBillingAddress = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3 flex'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium cursor-pointer'>
                <input
                    type="checkbox"
                    {...register('default_billing_address')}
                    className='rounded  mr-2'
                />
                Make This Default Billing Address
            </label>

        </div>
    );
};

const DefaultShippingAddress = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3 flex'>
            <label className=' block text-[#072320] font-dm text-lg capitalize font-medium cursor-pointer'>
                <input
                    type="checkbox"
                    {...register('default_shipping_address')}
                    className='rounded mr-2'
                />
                Make This Default Shipping Address
            </label>

        </div>
    );
};


export default ModelEditaddress;