import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import User from "./pages/User";

import Header from "./components/Organisms/Header";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Dumbsound";
  }, []);
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pay" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
