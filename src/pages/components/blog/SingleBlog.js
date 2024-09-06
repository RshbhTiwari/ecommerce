import { HeadingBanner, Paragraph } from "../basic/title";




export default function SingleBlog({ onedata }) {
    const { date } = onedata;

    const dateParts = date.split(' ');
    const month = dateParts[0].slice(0, 3);
    const day = dateParts[1].slice(0, -1); // 04 (remove comma)
    const year = dateParts[2]; // 2022

    return (
        <>
            <div className="overflow-hidden rounded-lg shadow relative">
                <div className="blog_one_img hover:scale-110 transition-all duration-500"
                    style={{ backgroundImage: `url(${onedata.image})` }}>
                </div>

                {/* absolute */}
                <div className="ab_date py-3 px-6  border-t-2 border-b-2 border-r-2 border-[#00A762]  rounded-r-lg ">
                    <h2 className="text-white
                                  font-dm text-lg capitalize font-medium
                                   ">{month}</h2>



                    <Paragraph title={day} textAlign='left' color='white' />
                </div>

            </div>

            <div className="my-4">
                <h1 className={`font-dm text-4xl mb-2 capitalize p-0 font-medium md:text-left text-center text-[#072320]`}>
                    {onedata.title}
                </h1>
                <Paragraph title={onedata.description} textAlign='left' />
            </div>

        </>
    );
}