import BreadCrum from '../basic/BreadCrum';
import './blog.css';
import allblog from "../../../data/allblog";
import { HeadingTitle } from '../basic/title';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllCategories, LatestPosts } from '../basic/MultiUses';
import populartagsdata from '../../../data/populartagsdata';
import { Squarebtn } from '../basic/button';
import PaginationBlog from './PaginationBlog';

const BlogPage = ({
    allCategoriesData,
    categoryIsLoading,
    categoryError,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    

    const categoriDetailsRow = (id) => {
        navigate(`/categories/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <BreadCrum componentName="blog" link="/blog" />
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 gap-6 py-10">

                    <div className='md:col-span-8 lg:col-span-9 col-span-12 flex flex-col justify-center relative h-full items-center'>
                        <div data-aos="fade-up" data-aos-delay="200"><PaginationBlog /></div>
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
                            <LatestPosts allblog={allblog} />
                        </div>

                        <div className='pb-10'>
                            <HeadingTitle title="Popular Tags" textAlign='left' />
                            <div className='my-4 flex flex-wrap gap-2'>
                                {populartagsdata.map((row, index) => (
                                    <div key={index}>
                                        <Squarebtn title={row.title} bgColor="#036642" />
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BlogPage;
