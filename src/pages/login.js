import { LoginForm } from "./components/basic/auth";
import { HeadingTitle } from "./components/basic/title";


function Login() {
    return (
        <>
            <div className="container mx-auto flex items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="border-[2px] lg:w-2/4 md:w-3/4 w-full border-[#00A762] py-8 px-8 my-10 rounded-md shadow-md mx-auto">
                    <HeadingTitle title="Login" />
                    <div className="mt-10">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>

    );
}

export default Login;