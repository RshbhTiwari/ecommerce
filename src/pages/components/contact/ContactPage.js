import BreadCrum from '../basic/BreadCrum';
import './contact.css';
import imgSrc from '../../../assets/contact/img.png';
import HeadingTitle from '../basic/title/HeadingTitle';
import { HeadingBanner, Paragraph } from '../basic/title';
import { RiMapPinLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import ContactFrom from './ContactFrom';


export default function ContactPage() {

    return (
        <>
            <BreadCrum componentName="contact" link="/contact" />

            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="bg_linear p-4 my-10 rounded-lg">

                    <div className="grid grid-cols-12 glass_effect rounded-lg">

                        <div className=' lg:col-span-5 col-span-12 
                              overflow-hidden'
                        >
                            <div
                                className='bg_contact_image rounded-tl-lg rounded-bl-lg
                              overflow-hidden hover:scale-110 transition-all w-full sm:h-full h-[500px] duration-500'
                                style={{
                                    backgroundImage: `url(${imgSrc})`
                                }}
                            >

                            </div>
                        </div>

                        <div className='lg:col-span-7 col-span-12 
                             flex flex-col justify-center '
                        >
                            <div className='md:px-6 px-4 py-10'>

                                <HeadingTitle title="our contacts" textAlign="left" color="white" border='white' />

                                <div className='mt-3'>
                                    <HeadingBanner title="need treats ? get in touch with us" />
                                </div>


                                <Paragraph title="Get in touch to discuss your employee wellbeing needs today. Please give us a call, drop us an email."
                                    textAlign="left" color='white' />


                                <div className='flex flex-col sm:items-start items-center'>
                                    <a href="https://www.google.com/maps/place/Star+Reify+Tech+Solutions/@30.9249662,76.7965496,17z/data=!3m1!4b1!4m6!3m5!1s0x390ff51e2332ed9b:0xf4e1d8a90c1e2afa!8m2!3d30.9249616!4d76.7991245!16s%2Fg%2F11qp071wvb?entry=ttu&g_ep=EgoyMDI0MDgyNy4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank" class="anchor_icontext">
                                        <div className='mt-3 flex items-center '>
                                            <RiMapPinLine className='text-2xl text-white' />
                                            <div className='ml-2'>
                                                <Paragraph title="Office No. 266, 2nd Floor, Block - B, Motia Plaza, Baddi, Distt. Solan (H.P.) India - 173205"
                                                    textAlign="left" color='white' />
                                            </div>
                                        </div>
                                    </a>

                                    <a href="tel:+911795-292032" class="anchor_icontext">

                                        <div className='mt-3 flex items-center'>
                                            <IoCallOutline className='text-2xl text-white' />
                                            <div className='ml-2'>
                                                <Paragraph title="+91-1795-292032" textAlign="left" color='white' />
                                            </div>
                                        </div>
                                    </a>


                                    <a href="mailto:info@starreify.com" class="anchor_icontext">
                                        <div className='mt-3 flex items-center'>
                                            <IoIosMail className='text-2xl text-white ' />
                                            <div className='ml-2'>
                                                <Paragraph title="info@starreify.com" textAlign="left" color='white' />
                                            </div>
                                        </div>
                                    </a>
                                </div>


                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-12 pb-10">

                    <div className='lg:col-span-7 col-span-12 
                        flex flex-col justify-center align-center'
                    >

                        <div className='md:mr-10'>
                            <HeadingTitle title="Make an order" />

                            <div className='pt-2'><Paragraph title="Your email address will not be published. Required fields are marked."
                            /></div>

                            <div className='py-8 mx-auto md:w-3/4 w-full'>
                                <ContactFrom />
                            </div>


                        </div>
                    </div>

                    <div className='lg:col-span-5 col-span-12 
                         flex flex-col justify-center '>
                        <iframe className='rounded-lg shadow' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.629948358923!2d76.79654957530812!3d30.92496617631736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff51e2332ed9b%3A0xf4e1d8a90c1e2afa!2sStar%20Reify%20Tech%20Solutions!5e0!3m2!1sen!2sin!4v1718620383559!5m2!1sen!2sin" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>

            </div>
        </>

    );
}