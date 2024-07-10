import { useEffect, useRef, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import DropLogin from "./DropLogin";
import { FaRegUserCircle } from "react-icons/fa";
import { Paragraph } from "../../title";
import myaccountlink from "../../../../../data/myaccountlink";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Myaccountdrop from "./Myaccountdrop";

function NavUserIcon() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const loginRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !loginRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);


    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <div className='flex items-center cursor-pointer' onClick={toggleMenu} ref={loginRef}>
                <AiOutlineLogin className='text-white text-[24px]' />
                <h6 className='text-white font-dm text-sm ml-2 capitalize'>login</h6>
            </div>

            {isOpen && (
                <div ref={dropdownRef} className="logindrop absolute z-10 px-4 py-6 right-0 mt-4 w-[350px] rounded-md shadow-lg bg-white">
                    <DropLogin onClick={toggleMenu}/>
                </div>
            )}

            {/* <div className="relative">
                <div className='flex items-center cursor-pointer'
                    onClick={toggleMenu}
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave} 
                    ref={loginRef}>
                    <FaRegUserCircle className='text-white text-[24px]' />
                    <h6 className='text-white font-dm text-sm ml-2 capitalize'>username</h6>
                </div>
                {isOpen && (
                    <div ref={dropdownRef}
                        className='absolute rounded-lg shadow-lg lg:mt-4 mt-2 z-10  bg-white w-72 top-full left-1/2 transform -translate-x-1/2'>
                        <Myaccountdrop />
                    </div>
                )}
            </div> */}
        </div>
    );
}

export default NavUserIcon;