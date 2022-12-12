import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import User from "./pages/User";
import { useContext, useEffect } from "react";
import Header from "./components/Organisms/Header";
import { UserContext } from "./context/userContext";
import AddMusic from "./pages/Admin/AddMusic";
import AddArtis from "./pages/Admin/AddArtis";
import Payment from "./pages/User";
import Admin from "./pages/Admin";

function App() {
  useEffect(() => {
    document.title = "Dumbsound";
  }, []);

  const [state, dispatch] = useContext(UserContext);

  return (
    <>
      <Header />
      {state.user.listAs === "1" ? (
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/add-music" element={<AddMusic />} />
          <Route path="/add-artis" element={<AddArtis />} />
  
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      )}
    </>
  );
}

export default App;
