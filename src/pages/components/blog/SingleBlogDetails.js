import { useNavigate } from "react-router-dom";
import BreadCrum from "../basic/BreadCrum";
import { HeadingTitle, Paragraph } from "../basic/title";
import allblog from "../../../data/allblog";
import categoriescarddata from "../../../data/categoriescarddata";
import one from '../../../assets/blog/details/1.jpg';
import SingleBlog from "./SingleBlog";
import { useParams } from 'react-router-dom';

const BlogsingleData = {
    id: 1,
    title: "Competently supply customized initiatives whereas sources with mission",
    description: "Authoritatively fabricate multidisciplinary  Authoritatively fabricate multidisciplinary resources with mission-critical schemas. Energistically productize ubiquitous value for excellent supply chains. Progressively expedite enterprise-wide networks rather than end-to-end relationships resources with mission-critical schemas. Energistically productize ubiquitous value for excellent supply chains. Progressively expedite enterprise-wide networks rather than end-to-end relationships.",
    date: "January 04, 2022",
    views: "12 Views",
    image: one
}


export default function SingleBlogDetails() {

    let { id } = useParams();
    const navigate = useNavigate();

    const handleDetailsRow = (id) => {
        navigate(`/blog/${id}`);
    };


    return (
        <>

            <BreadCrum componentName="blog" link="/blog" componentSecondName="blog Details" />
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 gap-4 py-10">

                    <div className='md:col-span-8 lg:col-span-9 col-span-12'>
                        <SingleBlog onedata={BlogsingleData} />
                    </div>

                    <div className='md:col-span-4 lg:col-span-3 col-span-12 '>

                        <div className='pb-10'>
                            <HeadingTitle title="Categories" textAlign='left' />
                            <table className='w-full my-2'>
                                <tbody>
                                    {categoriescarddata.slice(0, 3).map((row, index) => (
                                        <tr className='border-b' key={index} >
                                            <td className='font-dm py-2 text-[#00A762]'>{row.title}</td>
                                            <td className='font-dm py-2 text-end text-[#00A762]'>{row.item}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='pb-10'>
                            <HeadingTitle title="Latest Posts" textAlign='left' />
                            <table className='w-full my-2'>
                                <tbody>
                                    {allblog.slice(0, 3).map((row, index) => (
                                        <tr className='border-b cursor-pointer' key={index} onClick={() => {
                                            handleDetailsRow(row.id);
                                        }} >

                                            <td className='font-dm py-2 text-[#00A762] overflow-hidden w-1/4 rounded-lg'>
                                                <img
                                                    src={row.image}
                                                    alt="image"
                                                    className="h-full w-full rounded-lg shadow
                                                    overflow-hidden hover:scale-110 transition-all duration-500"
                                                />
                                            </td>

                                            <td className='font-dm py-2 pl-4 text-end text-[#00A762]'>
                                                <h2 class="text-[#00A762]  
                                                 font-dm text-base capitalize font-medium">{row.title}</h2>
                                                <Paragraph title={row.date} textAlign='right' />
                                            </td>

                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </table>
                        </div>

                        <div className='pb-10'>
                            <HeadingTitle title="Popular Tags" textAlign='left' />
                            <div className='my-4 flex flex-wrap gap-2' >
                                <button class="font-dm font-sm px-3  py-2 text-white bg-[#036642] capitalize">Smoothie</button>
                                <button class="font-dm font-sm px-3 py-2 text-white bg-[#036642] capitalize">Healthy</button>
                                <button class="font-dm font-sm px-3 py-2 text-white bg-[#036642] capitalize">Been</button>
                                <button class="font-dm font-sm px-3 py-2 text-white bg-[#036642] capitalize">Vegetable</button>
                                <button class="font-dm font-sm px-3 py-2 text-white bg-[#036642] capitalize">Juice</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}