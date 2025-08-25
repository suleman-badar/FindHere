import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import AddListingForm from './pages/AddListingForm.jsx'
import ReviewForm from './pages/ReviewForm.jsx'

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
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addListing" element={<AddListingForm />} />
          <Route path="/review/create-review/:id" element={<ReviewForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>

    </div>
  )
}

export default App
