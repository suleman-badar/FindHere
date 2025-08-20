import Hero from "../components/Hero.jsx"
import Footer from "../components/Footer.jsx"
import Category from "../components/Category.jsx"
import Featured from "../components/Featured.jsx";

export default function Home() {
    return (
        <div className="bg-white">
            <Hero />
            <Category />
            <Featured />
            <Footer />
        </div>

    );
}