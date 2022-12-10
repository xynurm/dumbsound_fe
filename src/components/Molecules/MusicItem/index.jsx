import React, { useState } from "react";
import { Card, Col, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginAuth from "../ModalAuth/Login";
import RegisterAuth from "../ModalAuth/Register";

export default function Musicitem(props) {
  const { title, year, thumbnail, artis } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleShowLogin = () => setShowLogin(true);
  // const [state] = useContext(UserContext);
  const isLogin = false;
  const navigate = useNavigate();

  return (
    <>
      <Col lg={3} sm={1} className="py-3">
        <Card
          style={{ backgroundColor: "#3A3A3A" }}
          className="text-white"
          onClick={() => {
            isLogin ? navigate(`/payment`) : handleShowLogin();
          }}
        >
          <Card.Img
            variant="top"
            src={thumbnail}
            width={130}
            className="p-3 pb-2"
          />
          <Card.Body className="p-4 pt-3 fs-6">
            <Stack direction="horizontal" className="justify-content-between">
              <Card.Title className="fw-bold">{title}</Card.Title>
              <Card.Title>{year}</Card.Title>
            </Stack>
            <Card.Text>{artis}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
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
