import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../config/api";
import { UserContext } from "../../../context/userContext";
import PopUp from "../../Organisms/PopUp";

const style = {
  colorText: {
    color: "#B1B1B1"
  },

  bgButton: {
    backgroundColor: "#EE4622",
    color: "white"
  },

  form: {
    backgroundColor: "#454545",
    border: "2px solid #D2D2D2",
    color: "white"
  }
};
export default function LoginAuth({ show, onHide, switchLink }) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      const response = await API.post("/login", form);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
      });

      navigate(0);
      setModalShow(true);
    } catch (err) {
      console.log(err);
      alert("login failed");
    }
  });

  return (
    <>
      <Modal show={show} onHide={onHide} size="md" centered>
        <Modal.Body className="bg-dark rounded-2">
          <Modal.Title className=" text-white fw-bold fs-2 px-2 py-3">
            Login
          </Modal.Title>

          <Form
            onSubmit={(e) => handleSubmit.mutate(e)}
            className="w-100 m-auto mt-3 d-grid gap-2 p-2"
          >
            <Form.Group className="mb-3 ">
              <Form.Control
                onChange={handleChange}
                name="email"
                style={style.form}
                type="email"
                className="p-3 fs-5"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                name="password"
                style={style.form}
                type="password"
                className="p-3 fs-5"
                placeholder="Password"
              />
            </Form.Group>

            <Button
              style={style.bgButton}
              variant="outline-none"
              className="p-3 fs-5 fw-bold"
              onClick={(e) => handleSubmit.mutate(e)}
            >
              Login
            </Button>
            <Form.Label className="text-center text-white">
              Don't have an account ? Klik
              <Link
                style={{ textDecoration: "inherit", color: "inherit" }}
                onClick={switchLink}
              >
                <span className=" fw-bold ps-1 ">Here</span>
              </Link>
            </Form.Label>
          </Form>
        </Modal.Body>
      </Modal>
      <PopUp show={modalShow} onHide={() => setModalShow(false)} name="Login" />
    </>
  );
}
