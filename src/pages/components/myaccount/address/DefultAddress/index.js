
import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../../../basic/title';
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function DefultAddress({ handleClick }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="grid grid-cols-12 gap-2">
                <div className='lg:col-span-6 col-span-12'
                // key={index}
                >
                    <div className='shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4'>

                        <div className="flex sm:flex-row flex-col sm:items-center items-start  justify-between w-full ">

                            <div className={`font-dm text-sm cursor-pointer uppercase flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1
                         font-medium  sm:text-left text-center text-[#00A762]`}
                                onClick={() => handleClick()}
                            >deliver to this address</div>


                        </div>

                        <div className="mt-4">
                            <Paragraph textAlign='onyleft'
                                title='Office No. 266, 2nd Floor, Block - B, Motia Plaza, Baddi, Distt. Solan (H.P.) India - 173205' />
                        </div>

                        <div className="flex flex-col w-full mt-4">
                            <h2 className={`font-dm text-lg capitalize font-medium  text-left  text-[#072320]`}>
                                <span className="text-[#00A762]">+91 </span>7974842788
                            </h2>

                            <h2 className={`font-dm text-lg capitalize  font-medium  text-left  text-[#072320]`}>
                                <span className="text-[#00A762]">Address Type :</span> home
                            </h2>
                        </div>

                        <div className="flex items-center justify-between w-full gap-3 mt-4">


                            <button className="flex items-center justify-center rounded-lg shadow-md font-dm px-3 py-1 capitalize w-full 
                    border-2 border-[#072320]" onClick={() => navigate('/my-account/edit-address/[2]')}
                            >
                                <MdDeleteOutline className='text-[#072320] mr-2 text-xl' /> delete
                            </button>

                            <button className="flex items-center justify-center rounded-lg shadow-md font-dm px-3 py-1 capitalize w-full 
                    border-2 border-[#072320]" onClick={() => navigate('/my-account/edit-address/[2]')}
                            >
                                <FaRegEdit className='text-[#072320] mr-2 text-xl' /> edit
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}

export default DefultAddress;

