import { HiChevronLeft } from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi2";

const ContentHeader = () =>
{
    return (
        <div className="bg-[#121212] py-8 px-5 flex flex-row">
            <div className="flex-auto">
                <div className="flex">
                    <HiChevronLeft />
                    <HiChevronRight />
                </div>
            </div>
            <div className="flex-initial">
                <a href="">Sign up</a>
                <a href="">Log in</a>
            </div>
        </div>
    )
}

export default ContentHeader;