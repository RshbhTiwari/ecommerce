import { Btnone, Btnoutline, StockBtn } from "../basic/button";
import { HeadingBanner, HeadingTitle, Paragraph } from "../basic/title";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProductRatings from "./ratings/ProductRatings";


const ShopsingleData = {
    id: 1,
    title: "Red Radish 1 pack",
    subtitle: "The color of a radish is a strong indicator of its taste. Pick the ones that are a rich, full red.The color of a radish is a strong indicator of its taste. Pick the ones that are a rich, full red The color of a radish is a strong indicator of its taste. Pick the ones that are a rich, full red",
    price: "20.00",
    offer: "new",
    stock: "IN STOCK"
}

const ProductSingleContentPage = () => {

    const navigate = useNavigate();

    const handleshoppingcardRow = () => {
        navigate("/cart");
    };

    return (
        <>
            <div className="mb-4"><StockBtn title={ShopsingleData.stock} /></div>

            <div className="mb-4">
                <HeadingBanner title={ShopsingleData.title} color='#072320' />
            </div>

            <div className="mb-4"><h2 class="text-[#00A762] font-dm text-lg capitalize sm:text-left text-center font-medium">${ShopsingleData.price}</h2></div>

            <div className="mb-8"> <Paragraph title={ShopsingleData.subtitle} textAlign='left' /></div>


            <div className="mb-8 flex items-center sm:justify-start justify-center">
                <div className="">
                    <h2 class="text-[#00A762] font-dm text-lg capitalize font-medium">Quantity</h2>
                </div>

                <div className="quantity_btn ml-4" name="quantity">
                    <button className="btn_plus" type="button" ><MdAdd style={{ color: "#00A762" }} /></button>
                    <input className="w-full focus:outline-none text-center bg-transparent" value="1" disabled style={{ border: "0px solid" }} />
                    <button className="btn_minus" type="button"><FiMinus style={{ color: "#00A762" }} /></button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mb-8">
                <div className='md:col-span-6 col-span-12'>
                    <Btnoutline title="add to cart" width="100%" handleClick={() => {
                        handleshoppingcardRow();
                    }} />
                </div>
                <div className='md:col-span-6 col-span-12'>
                    <Btnone title="buy now"
                        bgColor="#00A762" width="100%" />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="">
                    <h2 class="text-[#00A762] font-dm text-lg capitalize font-medium">Share on :</h2>
                </div>

                <div className="flex items-center justify-center sm:gap-6 gap-2">
                    <div className="rounded-full bg-[#808080] h-10 w-10 flex items-center justify-center">
                        <FaLink className="text-white text-xl" />
                    </div>

                    <div className="rounded-full bg-[#1877F2] h-10 w-10 flex items-center justify-center">
                        <FaFacebookF className="text-white text-xl" />
                    </div>

                    <div className="rounded-full bg-green-500 h-10 w-10 flex items-center justify-center">
                        <FaWhatsapp className="text-white text-2xl" />
                    </div>

                    <div className="rounded-full bg-[#1DA1F2] h-10 w-10 flex items-center justify-center">
                        <FaTwitter className="text-white text-xl" />
                    </div>


                </div>
            </div>

            <ProductRatings  title={ShopsingleData.title}/>

            
        </>
    );
};

export default ProductSingleContentPage;