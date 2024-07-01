import { SignupFrom } from "./components/basic/auth";
import { HeadingTitle, Paragraph } from "./components/basic/title";
import comLogo from '../assets/vactor/sinup.jpg';

function Signup() {
    return (
        <>
            <div className="container mx-auto flex items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                {/* <div className="border-[2px] lg:w-2/4 md:w-3/4 w-full border-[#00A762] py-8 px-8 my-10 rounded-md shadow-md mx-auto">
                    <HeadingTitle title="Register" />
                    <div className="my-8 py-4 px-4 bg-[#072320] rounded-md shadow-md">
                        <Paragraph color='white'
                         title='Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.' />
                    </div>
                    <div className="">
                        <SignupFrom />
                    </div>
                </div> */}
                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 w-full bg-white rounded-xl shadow-md lg:p-5 p-2">

                    <div className='lg:col-span-6  col-span-12 w-full md:gap-4 gap-0 md:p-4 flex items-center justify-center'>
                        <div className='flex items-center justify-center'>
                            <img
                                className="h-full w-auto rounded-md"
                                src={comLogo}
                                alt="logo"
                            />
                        </div>
                    </div>

                    <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0 flex items-center justify-center'>
                    <div className="border-[2px] w-full border-[#00A762] py-8 px-8 my-10 rounded-md shadow-md mx-auto">
                    <HeadingTitle title="Register" />
                    <div className="my-8 py-4 px-4 bg-[#072320] rounded-md shadow-md">
                        <Paragraph color='white'
                         title='Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.' />
                    </div>
                    <div className="">
                        <SignupFrom />
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Signup;