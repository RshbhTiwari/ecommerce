import { useNavigate } from "react-router-dom";
import { Paragraph } from "../../basic/title";
import myaccountlink from "../../../../data/myaccountlink";



function AccountSideNav() {
    const navigate = useNavigate();
    return (
        <>
            {myaccountlink.map((row, index) => (
                <div className='gap-4 mb-4 
                 flex items-center border-2  border-[#072320] rounded-lg px-4 py-4 cursor-pointer' key={index} onClick={() => {
                        navigate(row.link);
                    }} >

                    <div className="w-1/6 flex items-center justify-center">
                        <img
                            src={row.image}
                            alt="User"
                            className="w-full h-full"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="flex items-left w-full text-[#072320] text-left font-dm text-lg capitalize font-medium ">{row.title}</h2>
                        <Paragraph textAlign='onyleft'
                            title={row.subtitle} />

                    </div>

                </div>
            ))
            }
        </>

    );
}

export default AccountSideNav;