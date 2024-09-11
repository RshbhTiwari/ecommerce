import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneAddress, postCheckboxAddress } from '../../../../../redux/slices/address';
import { toast } from 'react-toastify';
import { FormProvider } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { Paragraph } from '../../../basic/title';
import { Btnone } from '../../../basic/button';
import { ModelAddresShiping } from '../../../checkout/Model';

function CheckoutshippingAddress({ allAddressData, handleClick, handlebackClick }) {

    const dispatch = useDispatch();
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAddressId, setCurrentAddressId] = useState(null);

    const handleEditRow = (id) => {
        setCurrentAddressId(id);
        setIsModalOpen(true);
        dispatch(getOneAddress(id));
    };
    const { oneAddress } = useSelector((state) => state.address);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCheckboxChange = (id) => {
        setSelectedAddressId(id);
        localStorage.setItem('shipAddress', JSON.stringify({ id }));
    };

    useEffect(() => {
        const storedAddress = JSON.parse(localStorage.getItem('shipAddress'));
        if (storedAddress) {
            setSelectedAddressId(storedAddress.id);
        }
    }, []);

    const handleUpdateaddress = () => {
        const cart_id = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
        const address_id = JSON?.parse(localStorage?.getItem('shipAddress'))?.id || null;
        const payload = {
            is_billing: false,
            ...(address_id && { address_id }),
            ...(cart_id && { cart_id }),
            ...(customer_id && { customer_id })
        };
        dispatch(postCheckboxAddress(payload, toast, handleClick));
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-2 my-2">
                {allAddressData?.map((item, index) => (
                    <div className='lg:col-span-6 col-span-12 shadow-md rounded-lg p-4 border-[#00A762] border-2' key={index}>

                        <div className="flex w-full items-center justify-between">
                            {item?.default_shipping_address === true ? (
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
                            <Paragraph textAlign='onyleft' title={item?.name} />
                            <Paragraph textAlign='onyleft' title={item?.email} />
                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                <span className="text-[#00A762]">+91 </span>{item?.contact}
                            </p>
                        </div>

                        <div className="flex flex-col w-full mt-4">
                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                <span className="text-[#00A762]">Addressname : </span>{item?.addressname}
                            </p>
                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                <span className="text-[#00A762]">Landmarkname : </span>{item?.landmarkname}
                            </p>
                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                <span className="text-[#00A762]">City : </span>{item?.city}
                            </p>
                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                <span className="text-[#00A762]">Pincode : </span>{item?.pincode}
                            </p>

                            <div className="flex w-full items-center justify-between mt-4">
                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Address Type : </span>{item?.addresstype}
                                </p>

                                <div
                                    className="flex items-center cursor-pointer justify-center font-dm font-medium text-[#072320] capitalize "
                                    onClick={() => handleEditRow(item?.id)}
                                >
                                    <FaRegEdit className='text-[#072320] mr-2 text-xl' /> edit
                                </div>
                            </div>
                        </div>


                    </div>
                ))}
            </div>
            <div className="flex  items-start w-full gap-2">

                <Btnone title="Back" handleClick={handlebackClick}
                    bgColor="#00A762" />

                {selectedAddressId !== null ? (
                    <button
                        className="bg-[#00A762] text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize"
                        onClick={handleUpdateaddress}
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

            <ModelAddresShiping
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                id={currentAddressId}
                ship={false}
                oneAddress={oneAddress}
            />
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
                Select this address
            </label>
        </form>
    );
}



export default CheckoutshippingAddress;


