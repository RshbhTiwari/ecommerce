import React from 'react';
import PropTypes from 'prop-types';
import useBodyScroll from './useBodyScroll';
import { Paragraph } from '../title';
import { Btnone } from '../button';

const Modeldelete = ({ isOpen, onClose, onConfirm }) => {

  useBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg  shadow-lg relative z-10 
      w-11/12 
      md:w-8/12 
      lg:w-7/12
      xl:w-1/3" data-aos="zoom-in">

        <div className="flex items-center justify-between border-b-2 pb-2 border-[#072320]">
          <h2 className="font-dm text-xl capitalize font-medium text-left text-[#072320]">Confirm Deletion</h2>
        </div>

        <div className='my-4'>
          <Paragraph title="Are you sure you want to delete this item?" textAlign='onyleft' />
        </div>


        <div className="flex justify-start space-x-4">

          <button
            className="bg-[#072320] text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize"
            onClick={onClose}
          >
            Cancel
          </button>


          <Btnone title="Confirm" handleClick={onConfirm}
            bgColor="#00A762" />

        </div>
      </div>
    </div>
  );
};

Modeldelete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modeldelete;
