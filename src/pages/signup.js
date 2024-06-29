import { SignupFrom } from "./components/basic/auth";
import { HeadingTitle, Paragraph } from "./components/basic/title";


function Signup() {
    return (
        <>
            <div className="container mx-auto flex items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="border-[2px] lg:w-2/4 md:w-3/4 w-full border-[#00A762] py-8 px-8 my-10 rounded-md shadow-md mx-auto">
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
        </>

    );
}

export default Signup;