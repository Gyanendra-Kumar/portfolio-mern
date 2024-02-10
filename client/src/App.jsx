import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import FooterComponent from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AnimateRoutes from "./components/AnimateRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <AnimateRoutes />
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;
