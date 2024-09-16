
import { useNavigate } from 'react-router-dom';
import error from '../../../../assets/error/cartempty.png';
import { Btnone } from '../button';

export default function CartEmpty({height}) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/shop`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const titleStyle = {
        height: height,
    };
    return (
        <>
            <div className='flex-col flex items-center justify-center py-8'>
                <div className={`flex items-center `} style={titleStyle} >
                    <img
                        className="h-full w-auto"
                        src={error}
                        alt="img"
                    />
                </div>

                <h2 className=" my-4
                    font-dm text-2xl capitalize font-medium text-center text-[#00A762]">
                    Cart is empty
                </h2>

                <p className="text-center font-dm text-lg w-full mb-4 w-full font-light capitalize">
                Look like you have no items in your shopping cart.</p>

                <Btnone title="Back to shop" handleClick={handleClick}
                    bgColor="#00A762" />

            </div>
        </>

    );
}