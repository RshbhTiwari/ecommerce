
import { useNavigate, Link } from "react-router-dom";
import productcard from "../../../data/productcard";
import { Paragraph } from "../basic/title";

export default function OrderDetailsList({ ordersitems }) {
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
                    <thead className="bg-gray-100">
                        <tr>
                            <th className=" py-3 pr-3 text-left font-dm text-[#072320] uppercase text-lg font-medium">sku</th>
                            <th className=" py-3 pr-3 text-left font-dm text-[#072320] uppercase text-lg font-medium">Description</th>
                            <th className=" py-3 pr-3 text-left font-dm text-[#072320] uppercase text-lg font-medium">Qty</th>
                            <th className=" py-3 pr-3 text-left font-dm text-[#072320] uppercase text-lg font-medium">shipped</th>
                            <th className=" py-3 pr-3 text-left font-dm text-[#072320] uppercase text-lg font-medium">price</th>
                            <th className=" py-3 pr-3 text-left font-dm text-[#072320] uppercase text-lg font-medium">total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {productcard.slice(0, 3).map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white border-b border-gray-200' : 'bg-gray-100 border-b border-gray-200'}>
                                <td className="py-4 pr-3 whitespace-nowrap"><Paragraph title={item.orderid} textAlign='left' /></td>
                                <td className="py-4 pr-3">
                                    <Paragraph title={item.subtitle} textAlign='left' />
                                </td>

                                <td className="py-4 whitespace-nowrap pr-3">
                                    <Paragraph title={item.qty} textAlign='left' />
                                </td>
                                <td className="py-4 whitespace-nowrap pr-3">
                                    <Paragraph title='0' textAlign='left' />
                                </td>
                                <td className="py-4 whitespace-nowrap pr-3">
                                    <Paragraph title='$23.00' textAlign='left' />
                                </td>
                                <td className="py-4 whitespace-nowrap pr-3">
                                    <Paragraph title='$23.00' textAlign='left' />
                                </td>
                            </tr>

                        ))}
                        <tr className="border-b border-gray-200 " >
                            <td className="py-4 whitespace-nowrap pr-3 text-right" colspan="5">
                                <Paragraph title="Subtotal" textAlign='right' />
                            </td>
                            <td className="py-4 whitespace-nowrap pr-3">
                                {/* <Paragraph title={`1*${item.categorie}`} textAlign='left' /> */}
                                <Paragraph title="$ 35.89" textAlign='left' />
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 " >
                            <td className="py-4 whitespace-nowrap pr-3 text-right" colspan="5">
                                <Paragraph title="Shipping" textAlign='right' />
                            </td>
                            <td className="py-4 whitespace-nowrap pr-3">
                                {/* <Paragraph title={`1*${item.categorie}`} textAlign='left' /> */}
                                <Paragraph title="$ 10.89" textAlign='left' />
                            </td>
                        </tr>

                        <tr className="border-b border-gray-200 " >
                            <td className="py-4 whitespace-nowrap pr-3 text-right" colspan="5">
                                <Paragraph title="Tax" textAlign='right' />
                            </td>
                            <td className="py-4 whitespace-nowrap pr-3">
                                {/* <Paragraph title={`1*${item.categorie}`} textAlign='left' /> */}
                                <Paragraph title="$ 35.89" textAlign='left' />
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 " >
                            <td className="py-4 whitespace-nowrap pr-3 text-right" colspan="5">
                                <Paragraph title="Total" textAlign='right' />
                            </td>
                            <td className="py-4 whitespace-nowrap pr-3">
                                {/* <Paragraph title={`1*${item.categorie}`} textAlign='left' /> */}
                                <Paragraph title="$ 10.89" textAlign='left' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>

    );
}
