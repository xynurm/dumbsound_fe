import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../../../config/api";
import { UserContext } from "../../../context/userContext";
import LoginAuth from "../../Molecules/ModalAuth/Login";
import RegisterAuth from "../../Molecules/ModalAuth/Register";
import DropdownAdmin from "../Admin/Dropdown";
import DropdownUser from "../Dropdown/DropdownUser";

const adminStyle = {
  backgroundColor: "#1F1F1F",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
};

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR"
        });
      }
      // Get user data
      let payload = response.data.data;

      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate(0);
  };

  return (
    <>
      {state.user.listAs === "1" ? (
        <>
          <Navbar scrolling light expand="md" fixed="top" style={adminStyle}>
            <Container fluid>
              <Navbar.Brand href="/landing-page">
                <img
                  src={process.env.PUBLIC_URL + "/image/admin-logo.png"}
                  width="200vw"
                  className="d-inline-block align-top "
                  alt="dumbsound logo"
                />
              </Navbar.Brand>
              {state.isLogin ? (
                state.user.listAs === "1" ? (
                  <DropdownAdmin logOut={logOut} />
                ) : (
                  <DropdownUser logOut={logOut} />
                )
              ) : (
                <>
                  <Navbar.Toggle
                    aria-controls="offcanvasNavbar-expand-md"
                    className="bg-light"
                  />
                  <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-md"
                    aria-labelledby="offcanvasNavbarLabel-expand-md"
                    placement="end"
                    className="bg-transparent"
                  >
                    <Offcanvas.Header closeButton className="bg-dark">
                      <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                        <img
                          src={process.env.PUBLIC_URL + "/image/logo3.png"}
                          width="230vw"
                          className="d-inline-block align-top "
                          alt="dumbsound logo"
                        />
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Nav className="justify-content-end flex-row-2 pe-3">
                      <Offcanvas.Body>
                        <button
                          className="mx-2 btnSecond fw-bold"
                          onClick={() => setShowLogin(true)}
                        >
                          Login
                        </button>
                        <button
                          className="mx-2 btnFirst fw-bold"
                          onClick={() => setShowRegister(true)}
                        >
                          Register
                        </button>
                      </Offcanvas.Body>
                    </Nav>
                  </Navbar.Offcanvas>
                </>
              )}
            </Container>
          </Navbar>
          <LoginAuth
            show={showLogin}
            onHide={() => setShowLogin(false)}
            switchLink={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
          />
          <RegisterAuth
            show={showRegister}
            onHide={() => setShowRegister(false)}
            switchLink={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        </>
      ) : (
        <>
          <Navbar scrolling="true" light="true" expand="md" fixed="top" className="mb-3">
            <Container fluid>
              <Navbar.Brand href="/">
                <img
                  src={process.env.PUBLIC_URL + "/image/logo3.png"}
                  width="230vw"
                  className="d-inline-block align-top "
                  alt="dumbsound logo"
                />
              </Navbar.Brand>
              {state.isLogin ? (
                state.user.listAs === "1" ? (
                  <DropdownAdmin logOut={logOut} />
                ) : (
                  <DropdownUser logOut={logOut} />
                )
              ) : (
                <>
                  <Navbar.Toggle
                    aria-controls="offcanvasNavbar-expand-md"
                    className="bg-light"
                  />
                  <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-md"
                    aria-labelledby="offcanvasNavbarLabel-expand-md"
                    placement="end"
                    className="bg-transparent"
                  >
                    <Offcanvas.Header closeButton className="bg-dark">
                      <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                        <img
                          src={process.env.PUBLIC_URL + "/image/logo3.png"}
                          width="230vw"
                          className="d-inline-block align-top "
                          alt="dumbsound logo"
                        />
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Nav className="justify-content-end flex-row-2 pe-3">
                      <Offcanvas.Body>
                        <button
                          className="mx-2 btnSecond fw-bold"
                          onClick={() => setShowLogin(true)}
                        >
                          Login
                        </button>
                        <button
                          className="mx-2 btnFirst fw-bold"
                          onClick={() => setShowRegister(true)}
                        >
                          Register
                        </button>
                      </Offcanvas.Body>
                    </Nav>
                  </Navbar.Offcanvas>
                </>
              )}
            </Container>
          </Navbar>
          <LoginAuth
            show={showLogin}
            onHide={() => setShowLogin(false)}
            switchLink={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
          />
          <RegisterAuth
            show={showRegister}
            onHide={() => setShowRegister(false)}
            switchLink={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        </>
      )}
    </>
  );
}
