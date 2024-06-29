
import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../../../basic/title';
import { Btnone } from '../../../basic/button';


function DefultAddress() {
    const navigate = useNavigate();
    return (
        <>
            <div className='shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4'>

                <div className="flex sm:flex-row flex-col sm:items-center items-start  justify-between w-full ">

                    <div className={`font-dm text-md cursor-pointer uppercase flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1
                         font-medium  sm:text-left text-center text-[#00A762]`} >DEFAULT ADDRESS</div>

                    <h2 className={`font-dm text-lg capitalize sm:mt-0 mt-2   font-medium  text-left  text-[#072320]`}>
                        <span className="text-[#00A762]">+91 </span>7974842788
                    </h2>
                </div>

                <div className="mt-8">
                    <Paragraph textAlign='onyleft'
                        title='Office No. 266, 2nd Floor, Block - B, Motia Plaza, Baddi, Distt. Solan (H.P.) India - 173205' />

                </div>

                <div className="flex items-center justify-between w-full gap-3 mt-8">
                    <h2 className={`font-dm text-lg capitalize  font-medium  text-left  text-[#072320]`}>
                        <span className="text-[#00A762]">Address Type :</span> home
                    </h2>
                </div>

                <div className="flex items-center justify-between w-full gap-3 mt-8">
                    <Btnone title="delete"
                        bgColor="#00A762" width="100%" />

                    <Btnone title="update" handleClick={() => navigate('/my-account/edit-address/[2]')}
                        bgColor="#00A762" width="100%" />

                </div>

            </div>
        </>

    );
}

export default DefultAddress;

