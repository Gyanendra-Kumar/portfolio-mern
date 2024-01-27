import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  ContactMe,
  Dashboard,
  Home,
  Projects,
  SignIn,
  SignUp,
} from "./pages";
import Header from "./components/Header";
import FooterComponent from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;
