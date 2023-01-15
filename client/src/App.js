import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

const App = () => {
  // Back to Top Button
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    });
  }, []);

  return (
    <>
      {showTopButton && (
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="back-to-top-button"
          title="Go to top"
        >
          <FaArrowUp size={25} />
        </button>
      )}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
