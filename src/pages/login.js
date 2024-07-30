import { LoginForm } from "./components/basic/auth";
import { HeadingTitle } from "./components/basic/title";
import comLogo from '../assets/vactor/log.jpg';

function Login() {
    return (
        <>
            <div className="container mx-auto flex items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">
            
                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 w-full bg-white rounded-xl shadow-md lg:p-5 p-2">

                    <div className='xl:col-span-7 lg:col-span-6 col-span-12 w-full md:gap-4 gap-0 md:p-4 flex items-center justify-center'>
                        <div className='flex items-center justify-center'>
                            <img
                                className="h-full w-auto rounded-md"
                                src={comLogo}
                                alt="logo"
                            />
                        </div>
                    </div>

                    <div className='xl:col-span-5 lg:col-span-6 col-span-12 w-full md:gap-4 gap-0 flex items-center justify-center'>
                        <div className="border-[2px] border-[#00A762] py-8 px-8 w-full rounded-md shadow-md mx-auto">
                            <HeadingTitle title="Login" />
                            <div className="mt-10">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Login;