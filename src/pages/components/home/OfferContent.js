import React from 'react';
import offercontent from "../../../data/offercontent";
import { Paragraph } from '../basic/title';

const OfferContent = () => {
    return (
        <div className="grid grid-cols-12 gap-2">
            {offercontent.map((item, index) => (
                <div key={index}
                    className='lg:col-span-3 md:col-span-6 col-span-12 flex flex-col justify-center relative h-full
                              items-center rounded-lg p-3 border-2 border-[#072320]'>

                    <div className='w-[75px] mb-2 mx-auto'>
                        <img
                            src={item.image}
                            alt="image"
                            className=" "
                        />
                    </div>

                    <h2 className="text-[#00A762] text-center 
                                  font-dm text-lg capitalize font-medium
                                   ">{item.title}</h2>

                    <Paragraph title={item.subtitle} />
                </div>
            ))
            }
        </div >
    );
};

export default OfferContent;