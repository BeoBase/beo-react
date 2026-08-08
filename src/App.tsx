import {Route, Routes} from "react-router-dom";

import FooterMain from "./components/footer/FooterMain.tsx";
import NavbarMain from "./components/navbar/NavbarMain.tsx";

import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {

  return (
    <div className="flex min-h-screen flex-col bg-cover bg-center bg-fixed"
         style={{
           backgroundImage: "url('/dallas-bg.jpg')",
         }}
    >
      <NavbarMain/>
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        
        {/* Protected Routes - Generated Dynamically */}
        
        {/* Handle error and all pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <FooterMain/>
    </div>
  )
}

export default App
