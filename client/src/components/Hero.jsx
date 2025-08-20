import Search from "./Search";
import bgVideo from "../assets/bg.mp4";

export default function Hero() {
    return (
        <div className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Video background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src={bgVideo} type="video/mp4"
            >
            </video>

            {/* Content */}
            <div className="relative z-20 text-white p-8">
                <h1 className="my-4">Discover Amazing Places</h1>
                <h4 className="tracking-wider">
                    Find the best-rated locations based on Google reviews and real user experience.
                </h4>
                <h4>Explore curated destinations near and far.</h4>
                <Search />
            </div>
        </div>
    );
}
