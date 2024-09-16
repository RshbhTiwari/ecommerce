import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteAddress } from '../../../../../redux/slices/address';
import { toast } from 'react-toastify';
import { FormProvider } from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Paragraph } from '../../../basic/title';

function CheckoutAddress({ allAddressData, deletClick, handleClick }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingId, setLoadingId] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const handleDeleteRow = async (id) => {
        setLoadingId(id);
        try {
            await dispatch(deleteAddress(id, toast));
        } catch (error) {
            toast.error('Failed to delete address.');
        } finally {
            setLoadingId(null);
            deletClick(id);
        }
    };

    const handleEditRow = (id) => {
        navigate(`/my-account/edit-address/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleCheckboxChange = (id) => {
        setSelectedAddressId(id);
        localStorage.setItem('selectedAddress', JSON.stringify({ id }));
    };

    useEffect(() => {
        const storedAddress = JSON.parse(localStorage.getItem('selectedAddress'));
        if (storedAddress) {
            setSelectedAddressId(storedAddress.id);
        }
    }, []);

    return (
        <>
            <div className="grid grid-cols-12 gap-2 my-2">
                {allAddressData?.map((item, index) => (
                    <div className='lg:col-span-6 col-span-12 shadow-md rounded-lg p-4 border-[#00A762] border-2' key={index}>

                        <div className="flex w-full items-center justify-between">
                            {item?.default_shipping_address === true || item?.default_billing_address === true ? (
                                <div className={`font-dm text-xs cursor-pointer uppercase flex items-center 
                        rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 
                                font-medium sm:text-left text-center text-[#00A762]`}
                                >
                                    default address
                                </div>
                            ) : null}

                            <div className="">

                                <FormProvider>
                                    <FormContent id={item.id} isChecked={selectedAddressId === item.id} onCheckboxChange={handleCheckboxChange} />
                                </FormProvider>

                            </div>

                        </div>

                        <div className="mt-4">
                            <Paragraph textAlign='onyleft' title={item?.addressname} />
                        </div>

                        <div className="flex flex-col w-full mt-4">
                            <h2 className={`font-dm text-lg capitalize font-medium text-left text-[#072320]`}>
                                <span className="text-[#00A762]">+91 </span>{item?.contact}
                            </h2>
                            <h2 className={`font-dm text-lg capitalize font-medium text-left text-[#072320]`}>
                                <span className="text-[#00A762]">Address Type :</span> {item?.addresstype}
                            </h2>
                        </div>

                        <div className="flex items-center justify-between w-full gap-3 mt-4">
                            <button
                                className={`flex items-center justify-center rounded-lg shadow-md font-dm px-3 py-1 capitalize w-full border-2 border-[#072320]
                                    ${loadingId === item?.id ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-white text-[#072320]'}`}
                                onClick={() => !loadingId && handleDeleteRow(item?.id)}
                                disabled={loadingId === item?.id}
                            >
                                {loadingId === item?.id ? 'Deleting...' : <MdDeleteOutline className='text-[#072320] mr-2 text-xl' />}
                                {loadingId === item?.id ? '' : 'delete'}
                            </button>

                            <button
                                className="flex items-center justify-center rounded-lg shadow-md font-dm px-3 py-1 capitalize w-full border-2 border-[#072320]"
                                onClick={() => handleEditRow(item?.id)}
                            >
                                <FaRegEdit className='text-[#072320] mr-2 text-xl' /> edit
                            </button>
                        </div>

                    </div>
                ))}
            </div>
            <div className="flex flex-col items-start w-full pt-2">


                {selectedAddressId !== null ? (
                    <button
                        className="bg-[#00A762] text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize"
                        onClick={handleClick}
                    >
                        Continue
                    </button>
                ) : (
                    <button
                        className="bg-[#072320] cursor-not-allowed text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize"
                    >
                        Continue
                    </button>
                )}

            </div>
        </>

    );
}

function FormContent({ id, isChecked, onCheckboxChange }) {
    return (
        <form className="w-fit">
            <label className="font-dm text-xs flex justify-center items-center font-medium">
                <input
                    className="mr-1 cursor-pointer"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onCheckboxChange(id)}
                />
                Set as default
            </label>
        </form>
    );
}



export default CheckoutAddress;

