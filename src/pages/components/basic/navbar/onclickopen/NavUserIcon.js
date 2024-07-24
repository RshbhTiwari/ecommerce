import { useEffect, useRef, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import DropLogin from "./DropLogin";
import { FaRegUserCircle } from "react-icons/fa";
import Myaccountdrop from "./Myaccountdrop";

function NavUserIcon() {

    const [isOpen, setIsOpen] = useState(false);
    const [hasAccessToken, setHasAccessToken] = useState(false);

    const loginRef = useRef(null);
    const dropdownRef = useRef(null);

    //     const user = JSON.parse(localStorage.getItem('user'));

    const storedUserData = localStorage.getItem('user');
    // const userData = storedUserData ? JSON.parse(storedUserData) : null;


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setHasAccessToken(!!token);
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
                        {/* {userData?.name} */}
                        <FaRegUserCircle className='text-white text-[24px]' />
                        <h6 className='text-white font-dm text-sm ml-2 capitalize'>
                            username
                        </h6>
                    </div>
                    {isOpen && (
                        <div ref={dropdownRef} className='absolute rounded-lg shadow-lg lg:mt-4 mt-2 z-10 bg-white w-72 top-full left-1/2 transform -translate-x-1/2'>
                            <Myaccountdrop toggle={toggleMenu} />
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
                        <div ref={dropdownRef} className="logindrop absolute z-10 px-4 py-6 right-0 mt-4 w-[350px] rounded-md shadow-lg bg-white">
                            <DropLogin toggle={toggleMenu} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default NavUserIcon;