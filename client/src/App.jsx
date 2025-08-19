import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'
import Categories from './pages/Categories.jsx'
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Footer from './components/Footer.jsx'

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
          <Route path="/details" element={<Details />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
      {!shouldHideNavbar && <Footer />}

    </div>
  )
}

export default App
