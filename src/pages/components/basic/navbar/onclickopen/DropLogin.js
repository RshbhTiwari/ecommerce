import { RxCross2 } from "react-icons/rx";
import { LoginForm } from "../../auth";

export default function DropLogin({toggle}) {

    return (
        <>
            <div className="flex items-center justify-between border-b-2 pb-2 border-[#072320]">
                <h2 className={`font-dm text-2xl capitalize  font-medium  text-left  text-[#072320]`} >login</h2>

                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer " onClick={toggle}>
                    <RxCross2 className='text-xl cursor-pointer text-white' />
                </div>

            </div>

            <div className="mt-4">
                <LoginForm />
            </div>

        </>

    );
}