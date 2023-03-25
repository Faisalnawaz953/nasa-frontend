import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Signin from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./pages/logout";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Signin />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout/>}/>
      </Routes>
    </div>
  );
}

export default App;