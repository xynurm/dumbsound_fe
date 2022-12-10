import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

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
export default function LoginAuth({
  show,
  onHide,
  switchLink,
}) {
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body className="bg-dark rounded-2">
        <Modal.Title className=" text-white fw-bold fs-2 px-2 py-3">
          Login
        </Modal.Title>
        {/* {message && message} */}
        <Form
          // onSubmit={(e) => handleSubmit.mutate(e)}
          className="w-100 m-auto mt-3 d-grid gap-2 p-2"
        >
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Control
              // onChange={handleOnChange}
              // value={dataSignin.email}
              // name="email"
              style={style.form}
              type="email"
              className="p-3"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              // onChange={handleOnChange}
              // value={dataSignin.password}
              // name="password"
              style={style.form}
              type="password"
              className="p-3"
              placeholder="Password"
            />
          </Form.Group>

          <Button
            style={style.bgButton}
            variant="outline-none"
            className="fw-bold p-3"
            type="submit"
          >
            Login
          </Button>
          <Form.Label className="text-center text-white">
            Don't have an account ? Klik
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
