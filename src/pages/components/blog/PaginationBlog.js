import React, { useState } from 'react';
import blogcarddata from '../../../data/allblog';
import Blogcard from './Blogcard';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Paragraph } from '../basic/title';

const PaginationBlog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentblogs = blogcarddata.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(blogcarddata.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationRange = 3;

    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - paginationRange); i <= Math.min(totalPages, currentPage + paginationRange); i++) {
        pageNumbers.push(i);
    }


    return (
        <>

            <Blogcard allblog={currentblogs} />

            {/* Pagination controls */}
            <div className="flex justify-center  mt-8 w-full">

                <div className='flex justify-center items-center space-x-4 lg:hidden block'>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize bg-[#072320] disabled:font-medium disabled:bg-[#00a762b5]"
                    >
                        <FaAngleLeft className='text-white text-lg' />
                    </button>
                    {/* Current page indicator */}
                    <div className="flex items-center justify-center  font-dm capitalize text-[#072320] font-bold ">
                        page no : &nbsp;
                        <Paragraph title={currentPage} />

                        <h2 class="text-[#00A762] text-center px-2
                        font-dm text-lg capitalize font-medium
                        ">of</h2>
                        <Paragraph title={totalPages} />
                    </div>

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize bg-[#072320] disabled:font-medium disabled:bg-[#00a762b5]"
                    >
                        <FaAngleRight className='text-white text-lg' />
                    </button>

                </div>

                <div className="flex items-center justify-center lg:block hidden">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize bg-[#072320] disabled:font-medium disabled:bg-[#00a762b5]"
                    >
                        Previous
                    </button>

                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 ${currentPage === number ? 'bg-[#072320]' : 'bg-[#00a762b5]'} text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize mx-1`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="text-white rounded-lg shadow-md font-dm px-3 py-2 capitalize bg-[#072320] disabled:font-medium disabled:bg-[#00a762b5]"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default PaginationBlog;
