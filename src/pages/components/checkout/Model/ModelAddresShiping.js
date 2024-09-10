// Modal.js
import React, { useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import ModelEditaddress from './ModelEditaddress';

const ModelAddresShiping = ({ isOpen, onClose, id, ship,oneAddress }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 relative h-[80vh] overflow-y-auto" data-aos="zoom-in">

                <div className="flex items-center justify-between border-b-2 pb-2 border-[#072320]">
                    <h2 className={`font-dm text-2xl capitalize font-medium text-left text-[#072320]`} >Edit Address</h2>
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#072320] cursor-pointer " onClick={onClose}>
                        <RxCross2 className='text-2xl cursor-pointer text-white' />
                    </div>
                </div>
                <div className='mt-2'>
                    <ModelEditaddress
                        isEdit
                        ship={ship}
                        onClose={onClose}
                        checkship={true}
                        id={id}
                        userAdd={oneAddress}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModelAddresShiping;
