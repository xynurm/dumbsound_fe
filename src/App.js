import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Organisms/Header";
import { UserContext } from "./context/userContext";
import Admin from "./pages/Admin";
import AddArtis from "./pages/Admin/AddArtis";
import AddMusic from "./pages/Admin/AddMusic";
import ListArtis from "./pages/Admin/ListArtis";
import LandingPage from "./pages/LandingPage";
import Payment from "./pages/User";

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
          <Route path="/artis" element={<ListArtis />} />
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
