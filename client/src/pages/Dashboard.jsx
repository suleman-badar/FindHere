import Btn from "../components/Btn.jsx";
import Footer from "../components/Footer.jsx"


export default function Dashboard() {
    return (
        <div>
            <Btn text="Add New " to="/addListing"></Btn>
            <Footer />
        </div>
    );
}
