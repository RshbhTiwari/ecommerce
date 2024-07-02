
import myaccountlink from "../../../../../data/myaccountlink";
import { Paragraph } from "../../title";
import turnoff from "../../../../../assets/myaccount/turn-off.png";


export default function Myaccountdrop() {
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
            <a href='/login'>
                <div className='w-full md:gap-2 gap-0 
                 flex items-center cursor-pointer py-4' >

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
                </div></a>
        </>

    );
}