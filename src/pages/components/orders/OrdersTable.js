import { Paragraph } from "../basic/title";
import { useNavigate, Link } from "react-router-dom";
import { Btnone } from "../basic/button";
import OrderStatus from "./OrderStatus";
export default function OrdersTable({ ordersitems }) {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('en-US', options);
    };


    
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table-auto min-w-full divide-y divide-gray-200">
                    <thead className="">
                        <tr>
                            <th className=" py-3 px-3 text-left font-dm text-[#072320] uppercase text-lg font-medium text-nowrap">reorder</th>
                            <th className=" py-3 px-3 text-left font-dm text-[#072320] uppercase text-lg font-medium text-nowrap">Order id</th>
                            <th className=" py-3 px-3 text-left font-dm text-[#072320] uppercase text-lg font-medium text-nowrap">order date</th>
                            <th className=" py-3  px-3 text-left font-dm text-[#072320] uppercase text-lg font-medium text-nowrap">order status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">


                        {ordersitems.slice(0, 3).map((item, index) => (

                            <tr key={index}  className={`border-b border-gray-200 ${index % 2 === 0 ? '' : 'bg-gray-100 rounded-lg'}`}>
                                <td className="py-4 px-3 whitespace-nowrap"> <Btnone title="reorder"
                                    // onClick={handleClick} 
                                    bgColor="#00A762" borderColor="#00A762" /></td>

                                    

                                <td className="py-4 px-3 whitespace-nowrap"><Paragraph title={item.orderid} textAlign='left' /></td>
                                <td className="py-4 px-3  whitespace-nowrap"><Paragraph title={`Order Date: ${formatDate(item.date)}`} textAlign='left' /></td>
                                <td className="py-4 px-3 whitespace-nowrap">
                                    <OrderStatus status={item?.status}  />
                                </td>
                                <td className="py-4 whitespace-nowrap">
                                    <Link to={`/my-account/orders/${item.id}`}>
                                        <Paragraph title='View Details' textAlign='left' color='#00A762' />
                                    </Link>
                                </td>

                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>
        </>

    );
}
