// Importando react-router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";

// Componentes de layout
import Footer from "./components/pages/layout/Footer";
import Navbar from "./components/pages/layout/Navbar";
import ContainerContext from "./components/pages/layout/ContainerContext";

import { UserProvider } from "./context/UserContext";
import FlashMessage from "./components/pages/layout/FlashMessage";


const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <FlashMessage />
        <ContainerContext>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/user/profile" element={<Profile />} />
          </Routes>
        </ContainerContext>
        <Footer />
      </UserProvider>
    </Router>
  );
};

export default App;
