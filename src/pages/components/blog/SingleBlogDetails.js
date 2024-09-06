import { useNavigate } from "react-router-dom";
import BreadCrum from "../basic/BreadCrum";
import { HeadingTitle, Paragraph } from "../basic/title";
import allblog from "../../../data/allblog";
import categoriescarddata from "../../../data/categoriescarddata";
import one from '../../../assets/blog/details/1.jpg';
import SingleBlog from "./SingleBlog";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AllCategories } from "../basic/MultiUses";
import { fetchAllCategories } from "../../../redux/slices/category";
import { useEffect, useState } from "react";
import { getOnebLog } from "../../../redux/slices/blog";

const BlogsingleData = {
    id: 1,
    title: "Competently supply customized initiatives whereas sources with mission",
    description: "Authoritatively fabricate multidisciplinary  Authoritatively fabricate multidisciplinary resources with mission-critical schemas. Energistically productize ubiquitous value for excellent supply chains. Progressively expedite enterprise-wide networks rather than end-to-end relationships resources with mission-critical schemas. Energistically productize ubiquitous value for excellent supply chains. Progressively expedite enterprise-wide networks rather than end-to-end relationships.",
    date: "January 04, 2022",
    views: "12 Views",
    image: one
}


export default function SingleBlogDetails({id}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [allBlogData, setAllBlogData] = useState([]);
    const [allCategoriesData, setAllCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isLoading: categoryIsLoading, error: categoryError, categories } = useSelector(
        (state) => state.category
    );

    const { isLoading: blogIsLoading, error: BlogError, oneblog } = useSelector(
        (state) => state.blog
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getOnebLog(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (oneblog?.length) {
            setAllBlogData(oneblog);
        }
    }, [oneblog]);

    useEffect(() => {
        if (categories?.length) {
            setAllCategoriesData(categories);
        }
    }, [categories]);

    const categoriDetailsRow = (id) => {
        navigate(`/categories/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

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
                            {categoryIsLoading || loading ? (
                                <> {allCategoriesData.map((_, index) => (
                                    <div key={index} className='animate-pulse mt-2 flex justify-between py-2' >
                                        <div className='w-[150px] py-2 bg-gray-300  rounded'></div>
                                        <div className='w-10 bg-gray-300 rounded'></div>
                                    </div>
                                ))}
                                </>
                            ) : categoryError ? (
                                <p className="font-dm ">Error loading categories</p>
                            ) : allCategoriesData.length > 0 ? (

                                <table className='w-full my-2'>
                                    <tbody>
                                        {allCategoriesData.map((row, index) => (
                                            <AllCategories
                                                key={index}
                                                row={row}
                                                onDetailsRow={() => categoriDetailsRow(row.id)}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            ) : null}
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
                                                <h2 className="text-[#00A762]  
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
                                <button className="font-dm font-sm px-3  py-2 text-white bg-[#036642] capitalize">Smoothie</button>
                                <button className="font-dm font-sm px-3 py-2 text-white bg-[#036642] capitalize">Healthy</button>
                                <button className="font-dm font-sm px-3 py-2 text-white bg-[#036642] capitalize">Been</button>
                                <button className="font-dm font-sm px-3 py-2 text-white bg-[#036642] capitalize">Vegetable</button>
                                <button className="font-dm font-sm px-3 py-2 text-white bg-[#036642] capitalize">Juice</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}