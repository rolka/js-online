import Content from "../Content/Content";
import LeftSide from "../LeftSide/LeftSide";

const Layout = () =>
{
    return ( <>
            <div className="flex gap-4 p-4">
                <LeftSide/>
                <Content/>
            </div>
        </>
    )
}

export default Layout;