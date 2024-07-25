


import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

function AddressCheckbox({ id }) {
    const methods = useForm();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const storedAddress = JSON.parse(localStorage.getItem('selectedAddress'));
        setIsChecked(storedAddress && storedAddress.id === id);
    }, [id]);

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsChecked(isChecked);

        if (isChecked) {
            const payload = {
                id
            };
            localStorage.setItem('selectedAddress', JSON.stringify(payload));
        } else {
            localStorage.removeItem('selectedAddress');
        }
    };

    return (
        <FormProvider {...methods}>
            <FormContent isChecked={isChecked} onCheckboxChange={handleCheckboxChange} />
        </FormProvider>
    );
}

function FormContent({ isChecked, onCheckboxChange }) {
    const { register } = useFormContext();

    return (
        <form className='w-fit'>
            <label className='font-dm text-xs flex justify-center items-center font-medium'>
                <input className='mr-1' type="checkbox" checked={isChecked} onChange={onCheckboxChange} />
                Select this address
            </label>
        </form>
    );
}

export default AddressCheckbox;