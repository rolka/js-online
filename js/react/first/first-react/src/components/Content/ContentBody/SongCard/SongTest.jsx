// import myImage from '/src/assets/images/album.jpg';
import myImage from './../../../../assets/images/album.jpg';
const SongTest = ( props ) =>
{
    return (
        <div className="bg-[#181818] p-4 w-fit rounded-lg max-w-[160px] max-h-[288px]">
            <img
                src={myImage || "https://placehold.co/200x200"}
                alt="Song Card"
                width="150px"
                className="rounded-lg"/>
            <h3 className="my-4  font-bold">
                {props?.song?.title || "Dainos pavadinimas"}
            </h3>
            <p className="text-slate-200 text-wrap line-clamp-2">
                {props.song?.description || "Lorem ipsum dolor sit amet consectetur adipisicing."}
            </p>
        </div>
)
}
export default SongTest;

