import { useNavigate } from 'react-router-dom';
import allblog from '../../../data/allblog';
import BreadCrum from '../basic/BreadCrum';
import { HeadingTitle, Paragraph } from '../basic/title';
import CollectionsShopCard from './CollectionsShopCard';
import './shop.css';
import categoriescarddata from '../../../data/categoriescarddata';
import ProductCard from '../home/ProductCard';
import { AllCategories, BestSeller } from '../basic/MultiUses';
import size from '../../../data/size';
import { Squarebtn } from '../basic/button';
import ProductTab from './tab/productTab';

export default function ProductPage() {
    const navigate = useNavigate();

    const handleDetailsRow = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <>
            <BreadCrum componentName="shop" link="/shop" />
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">


                <div className="grid grid-cols-12 gap-6 py-10">


                    <div className='md:col-span-4 lg:col-span-3 col-span-12'>

                        <div className='pb-10'>
                            <HeadingTitle title="Categories" textAlign='left' />
                            <AllCategories categoriescarddata={categoriescarddata} />
                        </div>

                        <div className='pb-10'>
                            <HeadingTitle title="Best Seller" textAlign='left' />

                            <BestSeller allblog={allblog} />
                        </div>

                        <div className=''>
                            <HeadingTitle title="Size" textAlign='left' />

                            <div className='my-4 flex flex-wrap gap-2'>
                                {size.map((row, index) => (
                                    <div key={index}>
                                        <Squarebtn title={row.title} bgColor="#036642" textTransform='uppercase' />
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className='md:col-span-8 lg:col-span-9 col-span-12'>
                        <ProductTab />
                    </div>

                </div>


                <div className="pb-10">
                    <HeadingTitle title="most purchased products" />
                    <div className="mt-4">
                        <CollectionsShopCard />
                    </div>
                </div>




            </div>

        </>

    );
}