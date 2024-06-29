import { Paragraph } from "../basic/title";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Btnone } from '../basic/button';
export default function WishlistTable({ wishlistitems }) {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('en-US', options); 
    };
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <tbody>
                    {wishlistitems.slice(0,3).map((item, index) => (
                        <tr  className={`flex shadow-md rounded-lg justify-between ${index % 2 === 0 ? '' : 'bg-gray-100 rounded-lg'}`}
                      key={index}>
                            <td className="flex items-center py-4 px-2 gap-4 cursor-pointer">
                                <MdDeleteForever className="text-[#072320] text-2xl" />
                            </td>
                            <td className="flex items-center w-2/4 py-4 pr-4 gap-4">
                                <div className='rounded-md w-24 h-24 bg-[#00a762b0] sm:block hidden'>
                                    <img
                                        src={item.image}
                                        alt='product_img'
                                        className='h-full w-full'
                                    />
                                </div>

                                <div className="flex justify-center flex-col">
                                    <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                        {item.title}
                                    </h2>
                                    <Paragraph title={`Added on: ${formatDate(item.date)}`}  textAlign='left' />
                                </div>
                            </td>

                            <td className="flex items-center py-4 px-4 gap-4">
                                <p className="text-base font-dm">${item.price}</p>
                            </td>

                            <td className="flex items-center py-4 px-4 gap-4">
                                 <Btnone textwrap='nowarp' title="move to cart" bgColor="#00A762" handleClick={() => navigate('/cart')} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
