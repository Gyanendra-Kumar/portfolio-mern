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
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminEditorRoute from "./components/PrivateAdminEditorRoute";
import CreatePost from "./pages/CreatePost";

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

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<PrivateAdminEditorRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;
