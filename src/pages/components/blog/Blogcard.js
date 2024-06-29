import './blog.css';
import { useNavigate } from "react-router-dom";
import { Paragraph } from '../basic/title';

const Blogcard = ({allblog}) => {
    const navigate = useNavigate();

    const handleDetailsRow = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                {allblog.map((item, index) => (
                    <div className='md:col-span-6 lg:col-span-4 col-span-12 flex flex-col justify-center relative cursor-pointer h-full items-center blog_card'
                        key={index}
                        onClick={() => {
                            handleDetailsRow(item.id);
                        }}>

                        <div className='overflow-hidden rounded-t-lg'>
                            <img
                                src={item.image}
                                alt="image"
                                className="responsive_image_card rounded-t-lg shadow
                                            overflow-hidden hover:scale-110 transition-all duration-500"
                            />
                        </div>

                        <div className='py-4'>

                            <h2 className="text-white text-center 
                                          font-dm text-lg capitalize font-medium">{item.title}</h2>

                            <div className='flex flex-col justify-center items-center'>

                                <Paragraph title={item.date} color="#00A762" /> <Paragraph color="#00A762" title={item.views} />

                            </div>

                        </div>

                    </div>
                ))
                }
            </div>
        </>

    );
};

export default Blogcard;
