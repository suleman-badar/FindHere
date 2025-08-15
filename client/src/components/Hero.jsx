import Search from "./Search"

export default function Hero() {
    return (
        <div className="flex flex-col justify-center items-center w-full bg-[#c3bafc] p-8 ">
            <h1 className="my-4">Discover Amazing Places</h1>
            <h4 className="tracking-wider"> Find the best-rated locations based on Google reviews and real user experience. </h4>
            <h4> Explore curated destinations near and far.</h4>
            <Search />
        </div >
    );
}