
import error from '../../../../assets/error/error1.jpg';

export default function NoProducts({ height, }) {
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
                <h2 className=" my-4
                    font-dm text-2xl capitalize font-medium text-center text-[#00A762]">
                    Sorry no products found
                </h2>

            </div>
        </>

    );
}