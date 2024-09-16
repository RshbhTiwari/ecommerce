
import BreadCrum from '../../basic/BreadCrum';
import { AccountSideNav } from '../sidenav';
import { HeadingTitle } from '../../basic/title';
import AddEditAddressFrom from './AddEditAddressFrom';


function AddAddress() {
    return (
        <>
            <BreadCrum componentName="my account" link="/my-account" componentSecondName='Add Address' />
            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 gap-4 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full gap-4 '>
                        <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full gap-4 '>
                        <div className="border-[2px]  w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                            <HeadingTitle title="Add New Address" textAlign='left' />

                            <div className="">
                                <AddEditAddressFrom />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default AddAddress;

