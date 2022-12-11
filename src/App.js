import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import User from "./pages/User";
import { useContext, useEffect } from "react";
import Header from "./components/Organisms/Header";
import { UserContext } from "./context/userContext";

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
          <Route path="/admin" element={<LandingPage />} />
          <Route path="/pay" element={<User />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/payment" element={<User />} />
        </Routes>
      )}
    </>
  );
}

export default App;
