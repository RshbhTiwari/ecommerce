import { MdDeleteForever } from "react-icons/md";
import productcard from '../../../../data/productcard';
import { Paragraph } from "../../basic/title";

export default function OrderSummary() {
    return (
        <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
            <table className="w-full mt-6">
                <tbody>
                    {productcard.slice(0, 2).map((item, index) => (
                        <tr className="flex shadow-md glass_effect rounded-lg my-4 bg-white justify-between" key={index}>
                            <td className="flex items-center py-4 px-4 gap-4">
                                <div className='rounded-md w-32 h-24 bg-[#00a762b0] sm:block hidden'>
                                    <img
                                        src={item.image}
                                        alt='product_img'
                                        className='h-full w-full'
                                    />
                                </div>
                                <div className="flex justify-center flex-col">
                                    <h2 className="text-white text-left font-dm text-lg capitalize font-medium">{item.title}</h2>
                                    <Paragraph title={item.categorie} textAlign='onyleft' color='white' />
                                </div>
                            </td>
                            <td className="flex items-center py-4 px-4 gap-4">
                                <Paragraph title="2" textAlign='onyleft' color='white' />
                            </td>
                            <td className="flex items-center py-4 px-4 gap-4">
                                <p className={`text-base font-dm text-white`}>${item.price}</p>
                            </td>
                            <td className="flex items-center py-4 px-4 gap-4 cursor-pointer">
                                <MdDeleteForever className="text-white text-2xl" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
