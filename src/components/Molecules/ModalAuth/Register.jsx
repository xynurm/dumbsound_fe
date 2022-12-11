import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { API } from "../../../config/api";

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
    color: "#D2D2D2"
  }
};

export default function RegisterAuth({ show, onHide, switchLink }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  console.log("change",form)




  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);
      console.log("data berhasil ditambahkan", response.data.data);
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body className="bg-dark rounded-2">
        <Modal.Title className=" text-white fw-bold fs-2 px-2 py-3">
          Register
        </Modal.Title>
        <Form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="w-100 m-auto mt-3 d-grid gap-2 p-2"
        >
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Control
              name="email"
              style={style.form}
              type="email"
              className="p-3 fs-5 "
              placeholder="Email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="password"
              style={style.form}
              type="password"
              className="p-3 fs-5  "
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="fullName"
              style={style.form}
              type="text"
              className="p-3 fs-5  "
              placeholder="Full Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Select
              style={style.form}
              className="fs-5 p-3 "
              name= "gender"
              onChange={handleChange}
            >
              <option disabled selected hidden>
                Gender
              </option>
              <option value="male">
                Male
              </option>
              <option value="female">
                Female
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="phone"
              style={style.form}
              type="text"
              className="p-3 fs-5  "
              placeholder="Phone"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="address"
              style={style.form}
              type="text"
              className="p-3 fs-5  "
              placeholder="Address"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            style={style.bgButton}
            variant="outline-none"
            className="fw-bold p-3"
            type="submit"
            onClick={(e) => handleSubmit.mutate(e)}
          >
            Register
          </Button>
          <Form.Label className="text-center text-white">
            Have an Account ? Klik
            <Link
              style={{ textDecoration: "inherit", color: "inherit" }}
              onClick={switchLink}
            >
              <span className=" fw-bold ps-1">Here</span>
            </Link>
          </Form.Label>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
