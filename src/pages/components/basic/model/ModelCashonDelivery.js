import React from 'react';
import PropTypes from 'prop-types';
import useBodyScroll from './useBodyScroll';
import { Paragraph } from '../title';
import { Btnone } from '../button';
import cod from '../../../../assets/home/approved.png';

const ModelCashonDelivery = ({ isOpen, onClose, oncontinueshopping }) => {

  useBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg  shadow-lg relative z-10 w-11/12 sm:w-1/3" data-aos="zoom-in">

        <div className='h-20 w-20 mx-auto mb-2'>
          <img src={cod} alt="cod" height="100%" width="100%" />
        </div>

        <div className="flex items-center justify-center border-b-2 pb-2 border-[#072320]">
          <h2 className="font-dm text-xl capitalize font-bold text-center text-[#072320]">Thank You!</h2>
        </div>

        <div className='my-4'>
          <Paragraph title="Order Confirmed with Cash on Delivery." />
        </div>


        <div className="flex justify-start space-x-4">
          <Btnone
            title='Cancel'
            bgColor="#072320"
            width="100%"
            handleClick={onClose}
          />

          <Btnone
            title='continue shopping'
            bgColor="#072320"
            width="100%"
            handleClick={oncontinueshopping}
          />


          {/* <Btnone title="Confirm" handleClick={onConfirm}
            bgColor="#00A762" /> */}

        </div>
      </div>
    </div>
  );
};

ModelCashonDelivery.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ModelCashonDelivery;
