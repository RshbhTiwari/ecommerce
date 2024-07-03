import BreadCrum from '../basic/BreadCrum';
import './blog.css';
import allblog from "../../../data/allblog";
import { HeadingTitle } from '../basic/title';
import categoriescarddata from '../../../data/categoriescarddata';
import { AllCategories, LatestPosts } from '../basic/MultiUses';
import populartagsdata from '../../../data/populartagsdata';
import { Squarebtn } from '../basic/button';
import PaginationBlog from './PaginationBlog';

const BlogPage = () => {

    return (
        <>
            <BreadCrum componentName="blog" link="/blog" />
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 gap-6 py-10">

                    <div className='md:col-span-8 lg:col-span-9 col-span-12 flex flex-col justify-center relative h-full items-center'>
                        <PaginationBlog />
                    </div>

                    <div className='md:col-span-4 lg:col-span-3 col-span-12 '>

                        <div className='pb-10'>
                            <HeadingTitle title="Categories" textAlign='left' />
                            {/* <AllCategories categoriescarddata={categoriescarddata} /> */}
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
