import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import LoginAuth from "../../Molecules/ModalAuth/Login";
import RegisterAuth from "../../Molecules/ModalAuth/Register";
import DropdownUser from "../Dropdown/DropdownUser";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const isLogin = false;
  return (
    <>
      <Navbar scrolling light expand="md" fixed="top" className="mb-3">
        <Container fluid>
          <Navbar.Brand
            href="#"
            src={process.env.PUBLIC_URL + "/image/logo3.png"}
          >
            <img
              src={process.env.PUBLIC_URL + "/image/logo3.png"}
              width="230vw"
              className="d-inline-block align-top "
              alt="dumbsound logo"
            />
          </Navbar.Brand>
          {!isLogin ? (
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
          ) : (
            <DropdownUser />
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
  );
}
