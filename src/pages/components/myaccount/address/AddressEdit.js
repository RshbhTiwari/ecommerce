
import { useNavigate } from 'react-router-dom';
import BreadCrum from '../../basic/BreadCrum';
import { AccountSideNav } from '../sidenav';
import { HeadingTitle, Paragraph } from '../../basic/title';
import { Btnone } from '../../basic/button';
import AddEditAddressFrom from './AddEditAddressFrom';

const userAdd = {
    id: "1",
    username: "rishabh",
    contact: 7974842788,
    nickname: 'satna',
    landmarkname: 'sbi ATM',
    addressname: 'RAIPUR',
    pincode: 123456,
    locality: 'RAIPUR',
    city: 'RAIPUR',
    state: 'CHHATTISGARH',
    addresstype: 'home', 
    defaultAddress: true,
};


function AddressEdit() {
    const navigate = useNavigate();
    return (
        <>
            <BreadCrum componentName="my account" link="/my-account" componentSecondName='Edit Address' />
            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>
                        <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full md:gap-4 gap-0'>
                    
                    <div className="border-[2px]  w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                            <HeadingTitle title="Edit Address" textAlign='left' />

                            <div className="">
                                <AddEditAddressFrom isEdit userAdd={userAdd} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default AddressEdit;

