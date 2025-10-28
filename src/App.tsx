import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SnacksPage from "./pages/Snacks.tsx";
// import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snacks" element={<SnacksPage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
