
import myaccountlink from "../../../../../data/myaccountlink";
import { Paragraph } from "../../title";
import turnoff from "../../../../../assets/myaccount/turn-off.png";
import { useDispatch } from "react-redux";
import { postLogoutUser } from "../../../../../redux/slices/loginRegister";
import { useNavigate } from "react-router-dom";


export default function Myaccountdrop({toggle}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(postLogoutUser());
        toggle();
        navigate('/login');
    };

    return (
        <>
            {myaccountlink.map((row, index) => (
                <a href={row.link} key={index}>
                    <div className='w-full md:gap-2 gap-0 
                 flex items-center cursor-pointer py-4' >

                        <div className="w-1/4 flex items-center justify-center">
                            <img
                                src={row.image}
                                alt="User"
                                className="w-1/2"
                            />
                        </div>

                        <div className="flex w-3/4 flex-col items-center">
                            <h2 className="flex items-left w-full text-[#00A762] text-left font-dm text-base capitalize font-medium ">{row.title}</h2>
                            <Paragraph textAlign='onyleft' width="-webkit-fill-available"
                                title={row.subtitle} />

                        </div>
                    </div>
                    <hr />
                </a>

            ))
            }

            <div className='w-full md:gap-2 gap-0 
                 flex items-center cursor-pointer py-4' onClick={handleLogout}  >

                <div className="w-1/4 flex items-center justify-center">
                    <img
                        src={turnoff}
                        alt="User"
                        className="w-1/2"
                    />
                </div>

                <div className="flex w-3/4 flex-col items-center">

                    <h2 className="flex items-left w-full text-[#00A762] text-left font-dm text-lg capitalize font-semibold ">logout</h2>

                </div>
            </div>
        </>

    );
}