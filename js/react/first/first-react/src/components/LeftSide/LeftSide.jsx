import PanelBody from "./PanelBody/PanelBody";
import PanelHeader from "./PanelHeader/PanelHeader";
import PanelFooter from "./PanelFooter/PanelFooter";

const LeftSide = () =>
{
    return (
        <div className="flex flex-col gap-4 min-h-[100vh] w-1/5">
            <PanelHeader />
            <PanelBody />
            <PanelFooter />
        </div>
    )
}
export default LeftSide;