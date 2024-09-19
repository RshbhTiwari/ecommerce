import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../../../basic/title';
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteAddress, postDefaultaddress } from '../../../../../redux/slices/address';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Modeldelete } from '../../../basic/model';
 
function UserAddress({ allAddressData, deletClick }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loadingId, setLoadingId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemId, setItemId] = useState(null);

    const openModal = (id) => {
        setItemId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setItemId(null);
    };

    // const handleCheckboxChange = async (id) => {
    //     try {
    //         const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
    //         const checkboxItem = {
    //             address_id: id,
    //             defaultaddress: true,
    //             ...(customer_id && { customer_id })
    //         };
    //         dispatch(postDefaultaddress(checkboxItem, toast));
    //     ;
    //     } catch (error) {
    //         toast.error('Failed to update address.');
    //     }
    // };

    const handleDeleteRow = async () => {
        try {
            dispatch(deleteAddress(itemId, toast));
        } catch (error) {
            toast.error('Failed to delete address.');
        } finally {
            closeModal();
            deletClick(itemId);
        }
    };

    const handleEditRow = (id) => {
        navigate(`/my-account/edit-address/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-2 my-2" data-aos="fade-up" data-aos-duration="1000">


                {allAddressData?.map((item, index) => {
                    const isChecked = item?.is_billing === true && item?.is_shipping === true && item?.default_billing_address === true && item?.default_shipping_address === true;
                    return (
                        <div className='lg:col-span-6 col-span-12 shadow-md rounded-lg p-4 border-[#00A762] border-2' key={index}>
                            <div className="flex w-full items-center justify-between">
                                {isChecked && (
                                    <div className={`font-dm text-xs cursor-pointer uppercase flex items-center rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium sm:text-left text-center text-[#00A762]`}>
                                        default address
                                    </div>
                                )}

                                {/* <div>
                    <FormProvider>
                        <FormContent
                            id={item?.id}
                            isChecked={isChecked}
                            onCheckboxChange={handleCheckboxChange}
                        />
                    </FormProvider>
                </div> */}
                            </div>
                            <div className="mt-2">
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

                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Address Type : </span>{item?.addresstype}
                                </p>
                            </div>
                            <div className="flex items-center justify-between w-full gap-3 mt-4">
                                <button
                                    className="flex items-center justify-center rounded-lg shadow-md font-dm px-3 py-1 capitalize w-full border-2 border-[#072320]"
                                    onClick={() => openModal(item?.id)}
                                >
                                    <MdDeleteOutline className='text-[#072320] mr-2 text-xl' />
                                    delete
                                </button>
                                <button
                                    className="flex items-center justify-center rounded-lg shadow-md font-dm px-3 py-1 capitalize w-full border-2 border-[#072320]"
                                    onClick={() => handleEditRow(item?.id)}
                                >
                                    <FaRegEdit className='text-[#072320] mr-2 text-xl' /> edit
                                </button>
                            </div>
                        </div>
                    );
                })}


            </div>
            <Modeldelete
                isOpen={isModalOpen}
                onClose={closeModal} 
                onConfirm={handleDeleteRow}
            />
        </>

    );
}

// function FormContent({ id, isChecked, onCheckboxChange }) {
//     return (
//         <form className="w-fit">
//             <label className="font-dm text-xs flex justify-center items-center font-medium">
//                 <input
//                     className="mr-1 cursor-pointer"
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={() => onCheckboxChange(id)}
//                 />
//                 Set as default
//             </label>
//         </form>
//     );
// }

export default UserAddress;