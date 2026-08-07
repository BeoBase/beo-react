import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home.tsx";
import FooterMain from "./components/footer/FooterMain.tsx";
import NavbarMain from "./components/navbar/NavbarMain.tsx";

import './App.css'

function App() {

  return (
    <div className="flex min-h-screen flex-col bg-cover bg-center bg-fixed"
         style={{
           backgroundImage: "url('/dallas-bg.jpg')",
         }}
    >
      <NavbarMain/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      
      <FooterMain/>
    </div>
  )
}

export default App
