import BreadCrum from "../basic/BreadCrum";
import usebg from '../../../assets/myaccount/usebg1.png';
import { useNavigate } from 'react-router-dom';
import { HeadingTitle, Paragraph } from "../basic/title";
import UpdateAccountFrom from "./UpdateAccountFrom";
import { Btnone } from "../basic/button";
import productcard from "../../../data/productcard";
import { AccountSideNav } from "./sidenav";


function Useramyccount() {
    const navigate = useNavigate();
    return (
        <>
            <BreadCrum componentName="my account" link="/my-account" />

            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>
                    <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full md:gap-4 gap-0'>
                        <HeadingTitle title="my account" textAlign='left' />
                        <div className="border-[2px] mt-8 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                            <HeadingTitle title="Account Summary" textAlign='left' />

                            <div className="grid grid-cols-12 md:gap-4 gap-0 mt-4">

                                <div className='md:col-span-6 lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>

                                    <h3 className='block  text-[#072320] 
                                     font-dm text-lg capitalize font-medium'>customer Name :
                                        <br />rishabh tiwari</h3>
                                </div>

                                <div className='md:col-span-6 lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>

                                    <h3 className='block  text-[#072320] 
                                     font-dm text-lg capitalize font-medium'>Email : <br />rishabh@gmail.com</h3>
                                </div>

                                <div className='md:col-span-6 lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>

                                    <h3 className='block  text-[#072320] 
                                    font-dm text-lg capitalize font-medium'>password : <br />***********</h3>
                                </div>

                                <div className='col-span-12 w-full md:gap-4 gap-0'>
                                    <Btnone title="edit" bgColor="#00A762" handleClick={() => navigate('/my-account/update-profile')} />
                                </div>


                            </div>

                        </div>

                        <div className="border-[2px] mt-8 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                            <HeadingTitle title="address information" textAlign='left' />

                            <div className="grid grid-cols-12 gap-4 mt-4">


                                <div className='md:col-span-6 col-span-12 w-full gap-4 '>
                                    <h3 className='block  text-[#072320] sm:text-left text-center
                                     font-dm text-lg capitalize font-medium'>default billing address</h3>

                                    <div className="mt-4">
                                        <Paragraph textAlign='left'
                                            title='Office No. 266, 2nd Floor, Block - B, Motia Plaza, Baddi, Distt. Solan (H.P.) India - 173205' />

                                        <Paragraph textAlign='left'
                                            title='7974842788' />

                                    </div>

                                    <div className="mt-4 sm:text-left text-center">
                                        <Btnone title="edit" bgColor="#00A762" handleClick={() => navigate('/my-account/update-profile')} />
                                    </div>
                                </div>

                                <div className='md:col-span-6 col-span-12 w-full md:gap-4 gap-0'>
                                    <h3 className='block  text-[#072320] 
                                     font-dm text-lg capitalize font-medium sm:text-left text-center'>default shipping address</h3>

                                    <div className="mt-4">
                                        <Paragraph textAlign='left'
                                            title='Office No. 266, 2nd Floor, Block - B, Motia Plaza, Baddi, Distt. Solan (H.P.) India - 173205' />

                                        <Paragraph textAlign='left'
                                            title='7974842788' />

                                    </div>

                                    <div className="mt-4 sm:text-left text-center">
                                        <Btnone title="edit" bgColor="#00A762" handleClick={() => navigate('/my-account/update-profile')} />
                                    </div>
                                </div>





                            </div>

                        </div>

                        <div className="border-[2px] mt-8 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                            <HeadingTitle title="orders" textAlign='left' />

                            <div className="grid grid-cols-12 md:gap-4 gap-0 mt-4 w-full">
                               
                                    {productcard.slice(0, 4).map((item, index) => (
                                        <div className="md:col-span-6 col-span-12 w-full md:gap-4 gap-0
                                        flex shadow-md rounded-lg justify-between relative my-4" key={index}>


                                            <div className="flex items-center py-4 px-4 gap-4">
                                                <div className='rounded-md w-24 h-24 bg-[#00a762b0] sm:block hidden'>
                                                    <img
                                                        src={item.image}
                                                        alt='product_img'
                                                        className='h-full w-full'
                                                    />
                                                </div>

                                                <div className="flex justify-center flex-col">
                                                    <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                                        {item.title}
                                                    </h2>

                                                    <Paragraph title='Delivered on 21 March 2024' textAlign='onyleft' />
                                                </div>


                                            </div>
                                        </div>
                                    ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
          

        </>

    );
}

export default Useramyccount;

{/* <div className="relative flex items-center px-4 py-8  w-full  border-[2px] border-[#00A762] rounded-lg bg_img_user"
style={{
    backgroundImage: `url(${usebg})`,
}}>

 <div className="rounded-full w-40 p-4 h-40 border-[2px] border-[#00A762]">
<img
 src={userimg}
 alt="User"
className="w-full h-full rounded-full"
 />
</div> 


<h2 className="ml-8 font-dm text-3xl capitalize font-medium text-left text-[#072320]">my account</h2>

</div> */}