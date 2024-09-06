import { useEffect, useRef, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import DropLogin from "./DropLogin";
import { FaRegUserCircle } from "react-icons/fa";
import Myaccountdrop from "./Myaccountdrop";
import { useSelector } from "react-redux";

function NavUserIcon() {

    const [isOpen, setIsOpen] = useState(false);
    const [hasAccessToken, setHasAccessToken] = useState(false);

    const loginRef = useRef(null);
    const dropdownRef = useRef(null);

    const { loginUser, userAccessToken } = useSelector(
        (state) => state.loginRegister
    );


    const userName = JSON.parse(localStorage.getItem('user'))?.name || null;

    useEffect(() => {
        if (userAccessToken) {
            setHasAccessToken(true);
        } else {
            const token = localStorage.getItem('accessToken');
            setHasAccessToken(token);
        }
    }, [userAccessToken]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                loginRef.current && !loginRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };
    return (
        <div className="relative">
            {hasAccessToken ? (
                <>
                    <div className='flex items-center cursor-pointer' onClick={toggleMenu} ref={loginRef}>

                        <FaRegUserCircle className='text-white text-[24px]' />
                        <h6 className='text-white font-dm text-sm ml-2 capitalize'>
                            {userName || loginUser?.name}
                        </h6>
                    </div>
                    {isOpen && (
                        <div ref={dropdownRef} className='absolute lg:mt-4 mt-2 z-10 w-72 top-full left-1/2 
                        transform -translate-x-1/2'>
                            <div className="bg-white rounded-lg shadow-lg" data-aos="fade-up">
                                <Myaccountdrop toggle={toggleMenu} />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className='flex items-center cursor-pointer' onClick={toggleMenu} ref={loginRef}>
                        <AiOutlineLogin className='text-white text-[24px]' />
                        <h6 className='text-white font-dm text-sm ml-2 capitalize'>login</h6>
                    </div>
                    {isOpen && (
                        <div ref={dropdownRef} className="logindrop absolute z-10 right-0 
                        lg:mt-4 mt-2
                       
                        w-[300px] lg:w-[350px]
                        ">
                            <div className="bg-white rounded-lg shadow-lg px-4 py-6" data-aos="fade-up">
                                <DropLogin toggle={toggleMenu} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default NavUserIcon;