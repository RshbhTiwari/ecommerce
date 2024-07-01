
import comLogo from '../../../../assets/error/error1.jpg';

export default function ErrorPages({massage, height}) {
    const titleStyle = {
        height:height,
    };

    return (
        <>
            <div className='flex-col flex items-center justify-center'>
                 <div className={`flex items-center mb-2`} style={titleStyle}>
                    <img
                        className="h-full w-auto"
                        src={comLogo}
                        alt="logo"
                    />
                </div>

                <p className="text-center font-dm  text-xl font-light capitalize">
                   {massage}</p>
            </div>
        </>

    );
}