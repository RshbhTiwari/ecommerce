import { SearchAllproduct } from "./components/basic/Search";


function SearchProduct() {
    return (
        <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-10">
            <div className="flex items-center justify-center border-b-2 pb-2 border-[#072320]" data-aos="zoom-in" data-aos-delay="300">
                <h2 className="font-dm text-2xl capitalize font-medium text-left text-[#072320]">What Are You Looking For?</h2>
            </div>
            
            <SearchAllproduct />
        </div>

    );
}
export default SearchProduct;