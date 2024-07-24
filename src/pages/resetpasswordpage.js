// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { ResetPasswordfrom } from './components/basic/auth';

// const ResetPasswordPage = () => {
//   const { search } = useLocation();
//   const query = new URLSearchParams(search);
//   const token = query.get('token'); 

//   return (
//     <div>
//       <h1>Reset Password</h1>
//       {token ? <ResetPasswordfrom token={token} /> : <p>Invalid token.</p>}
//     </div>
//   );
// };

// export default ResetPasswordPage;


import { HeadingTitle, Paragraph } from "./components/basic/title";
import comLogo from '../assets/vactor/reset.webp';
import { ResetPasswordfrom } from './components/basic/auth';
import { useLocation } from 'react-router-dom';

function Forgotpassword() {

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const token = query.get('token');

    return (
        <>
            <div className="container mx-auto flex items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 w-full bg-white rounded-xl shadow-md lg:p-5 p-2">
                    <div className='xl:col-span-7 lg:col-span-6  col-span-12 w-full md:gap-4 gap-0 md:p-4 flex items-center justify-center'>
                        <div className='flex items-center justify-center'>
                            <img
                                className="h-full w-auto rounded-md"
                                src={comLogo}
                                alt="logo"
                            />
                        </div>
                    </div>
                    <div className='xl:col-span-5 lg:col-span-6 col-span-12 w-full md:gap-4 gap-0 flex items-center justify-center'>
                        <div className="border-[2px] w-full border-[#00A762] py-8 px-8 rounded-md shadow-md mx-auto">
                            <HeadingTitle title="Reset your Password ?" />

                            <div className="">
                                {/* {token ?
                                <><div className="my-8 py-4 px-4 bg-[#072320] rounded-md shadow-md">
                                        <Paragraph color='white'
                                            title='Please enter your new password below. Make sure it’s at least 8 characters long.
                                            Once you’ve reset your password, you’ll be able to sign in with your new credentials.' />
                                    </div><ResetPasswordfrom token={token} /></>
                                    <ResetPasswordfrom token={token} />
                                    :
                                    <div className="my-8 py-4 px-4 bg-[#072320] rounded-md shadow-md">
                                        <Paragraph color='white'
                                            title='The token is invalid or has expired.' />
                                    </div>} */}
                                <div className="my-8 py-4 px-4 bg-[#072320] rounded-md shadow-md">
                                    <Paragraph color='white'
                                        title='Please enter your new password below. Make sure it’s at least 8 characters long.
                                            Once you’ve reset your password, you’ll be able to sign in with your new credentials.' />
                                </div>
                                <ResetPasswordfrom token={token} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Forgotpassword;

// email: location.state.email,