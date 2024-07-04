
import error from '../../../../assets/error/error.png';
import { Btnone } from '../button';

export default function ErrorPages({ title, massage, height, handleClick }) {
    const titleStyle = {
        height: height,
    };

    return (
        <>
            <div className='flex-col flex items-center justify-center'>
                <div className={`flex items-center`} style={titleStyle}>
                    <img
                        className="h-full w-auto"
                        src={error}
                        alt="img"
                    />
                </div>

                <h2 class=" my-4
                    font-dm text-2xl capitalize font-medium text-center text-[#00A762]">
                    {title}
                </h2>

                <p className="text-center font-dm text-lg xl:w-3/6 md:w-3/4 mb-4 w-full font-light capitalize">
                    {massage}</p>

                <Btnone title="Back to Home" handleClick={handleClick}
                    bgColor="#00A762" />

            </div>
        </>

    );
}