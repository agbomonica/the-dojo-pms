import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages Components
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";

// Components
import Navbar from "./components/Navbar";

// Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="create" element={<Create />} />
            <Route path="projects/:id" element={<Project />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
