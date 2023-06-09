import { BrowserRouter, Route, Routes} from "react-router-dom";



import MakeEvent from "./components/MakeEvent";
import AdminLoginPage from "./pages/AdminLoginPage";
import EventPage from "./pages/EventPage";

import LandingPage from "./pages/LandingPage";
import AdminLogout from "./components/AdminLogout";
import AdminRegister from "./pages/AdminRegisterPage";
import UserRegister from "./pages/UserRegisterPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserLogout from "./components/UserLogout";
import PastEventsPage from "./pages/PastEventsPage";
import { Footer } from "./components/Footer";


function App() {
 

  return (
    
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/admin-event" element={<MakeEvent/>}/>
        <Route path="/admin" element={<AdminLoginPage/>}/>
        <Route path="/adminlogout" element={<AdminLogout/>}/>
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-past-events" element={<PastEventsPage/>} />
        <Route path="/userlogout" element={<UserLogout/>}/>
        <Route path="/" element={<LandingPage/>}/>   
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/events" element={<EventPage/>}/>
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  
    
  )
}

export default App
