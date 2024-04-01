import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import PrivateRoutes from "./Pages/PrivateRoute";

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.withCredentials = true

function App() {
  return (

    <div className="bg-gradient-to-r from-[#f8dcfc] to-[#e2dbfc] p-2 sm:p-6 md:px-12 min-h-[100vh] ">
      <BrowserRouter  >
        <Toaster postiton='top-right' toastOptions={{ duration: 2000 }} />
        <Routes>

          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/home" exact />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </BrowserRouter>
    </div >
  );
}

export default App;
