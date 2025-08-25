import Hero from "../components/Home/Hero.jsx"
import Footer from "../components/Footer.jsx"
import Category from "../components/Home/Category.jsx"
import Featured from "../components/Home/Featured.jsx";


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