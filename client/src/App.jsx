import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import AddListingForm from './pages/AddListingForm.jsx'
import ReviewForm from './pages/ReviewForm.jsx'
import VerifyOtp from './components/VerifyOtp.jsx';
import SendCode from './components/SendFPCode.jsx';
import VerifyForgotPasswordCode from './components/VerifyFPCode.jsx';

// import AdminLayout from "./layouts/AdminLayout";

// import Dashboard from './pages/Dashboard.jsx';
import DashboardHome from './components/DashboardHome.jsx';




import GeneralInfoEdit from "./components/ListingEditForms/GeneralInfoEdit.jsx";
import ContactEdit from "./components/ListingEditForms/ContactEdit.jsx";
import LocationEdit from "./components/ListingEditForms/LocationEdit.jsx";
import HoursEdit from "./components/ListingEditForms/HoursEdit.jsx";
import MediaEdit from "./components/ListingEditForms/MediaEdit.jsx";
import ListingReviewsEdit from "./components/ListingEditForms/ListingReviewsEdit.jsx";

import { SelectedPlaceProvider } from './context/SelectedPlaceContext.jsx'



import './App.css'

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/signin", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen w-full  ">
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-grow w-full">
        <Routes>
          {/* main pages public access */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* side pages and forms */}
          <Route path="/details/:id" element={<Details />} />
          <Route path="/addListing" element={<AddListingForm />} />
          <Route path="/review/create-review/:id" element={<ReviewForm />} />

          {/* authentication routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-otp/:email" element={<VerifyOtp />} />
          <Route path='send-fp-code' element={< SendCode />}/>
          <Route path='verify-code' element={<VerifyForgotPasswordCode />} />

          {/* admin access */}
          <Route path="/admin"
            element={
              <SelectedPlaceProvider>
                <Dashboard />
              </SelectedPlaceProvider>
            }
          >
            <Route path="dashboard" element={<DashboardHome />} />
            {/* <Route path="/admin/saved" element={<SavedPlacesCard />} /> */}
            {/* <Route path="/admin/tools" element={<Tools />} /> */}

            {/* admin access edit */}

            <Route path="edit/:placeId/general-info" element={<GeneralInfoEdit />} />
            <Route path="edit/:placeId/contact" element={<ContactEdit />} />
            <Route path="edit/:placeId/location" element={<LocationEdit />} />
            <Route path="edit/:placeId/hours" element={<HoursEdit />} />
            <Route path="edit/:placeId/media" element={<MediaEdit />} />
            <Route path="edit/:placeId/reviews" element={<ListingReviewsEdit />} />


          </Route>
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // "light" | "dark" | "colored"
      />
    </div>
  )
}

export default App
