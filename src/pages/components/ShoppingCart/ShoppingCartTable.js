import { Paragraph } from "../basic/title";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

export default function ShoppingCartTable({ shoppingcart }) {
    return (
        <>
            <table className="w-full">

                {shoppingcart.slice(0,3).map((item, index) => (
                    <tr className={`flex shadow-md rounded-lg justify-between ${index % 2 === 0 ? '' : 'bg-gray-100 rounded-lg'}`} key={index}>

                        <td className="flex items-center w-2/4  py-4 px-4 gap-4" >
                            <div className='rounded-md w-24 h-24 bg-[#00a762b0] sm:block hidden'>
                                <img
                                    src={item.image}
                                    alt='product_img'
                                    className='h-full w-full'
                                />
                            </div>

                            <div class="flex justify-center flex-col">
                                <h2 class="text-[#00A762] text-left
                         font-dm text-lg capitalize font-medium
                        ">{item.title}</h2>

                                <Paragraph title={item.categorie} textAlign='onyleft' />
                            </div>
                        </td>



                        <td className="flex items-center  py-4 px-4 gap-4">
                            <div className="quantity_btn " name="quantity">
                                <button className="btn_plus" type="button" ><MdAdd style={{ color: "#00A762" }} /></button>
                                <input className="w-full focus:outline-none text-center bg-transparent" value="1" disabled style={{ border: "0px solid" }} />
                                <button className="btn_minus" type="button"><FiMinus style={{ color: "#00A762" }} /></button>
                            </div>
                        </td>


                        <td className="flex items-center  py-4 px-4 gap-4">
                            <Paragraph title="2" textAlign='left' />
                        </td>

                        <td className="flex items-center py-4 px-4 gap-4">
                            <p className={`text-base font-dm`}>${item.price}</p>
                        </td>

                        <td className="flex items-center py-4 px-4 gap-4 cursor-pointer" >
                        <MdDeleteForever className="text-[#072320] text-2xl"/>
                        </td>

                    </tr>
                ))
                }
            </table>
        </>

    );
}