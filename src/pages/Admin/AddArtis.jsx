import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import PopUp from "../../components/Organisms/PopUp";
import { API } from "../../config/api";
const style = {
  formAll: {
    width: "90%"
  },

  form: {
    backgroundColor: "#454545",
    border: "2px solid #D2D2D2",
    color: "white"
  },

  bgButton: {
    width: "90%",
    color: "white",
    backgroundColor: "#EE4622",
    border: "2px solid #EE4622"
  }
};

export default function AddArtis() {
  const [modalShow, setModalShow] = useState(false);

  const [artis, setArtis] = useState({
    name: "",
    old: "",
    type: "",
    startCareer: ""
  });

  const handleChange = (e) => {
    setArtis({
      ...artis,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("name", artis.name);
      formData.set("old", artis.old);
      formData.set("type", artis.type);
      formData.set("startCareer", artis.startCareer);
      await API.post("/artis", formData);
      setModalShow(true);
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <section fluid id="add-music" className="AddMusic pt-5 pb-5">
      <Container className="pt-5">
        <h4 className="fw-bold py-4 text-white">Add Artis</h4>
        <Form
          onSubmit={(e) => handleSubmit.mutate(e)}
          style={style.formAll}
          className="m-auto mt-3 d-grid gap-2"
        >
          <Form.Group className="mb-3 ">
            <Form.Control
              name="name"
              style={style.form}
              type="text"
              placeholder="Name"
              className="p-2 fs-5"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              name="old"
              style={style.form}
              type="text"
              placeholder="Old"
              className="p-2 fs-5"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select
              style={style.form}
              className="p-2 fs-5"
              name="type"
              onChange={handleChange}
            >
              <option hidden selected>
                Select Type
              </option>
              <option value="Solo">Solo</option>
              <option value="Band">Band</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="startCareer"
              style={style.form}
              type="text"
              placeholder="Start a Career"
              className="p-2 fs-5"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              variant="outline-none"
              className="p-2 fs-5 fw-bold"
              style={style.bgButton}
              type="submit"
            >
              Add Song
            </Button>
          </div>
        </Form>
      </Container>
      <PopUp show={modalShow} onHide={() => setModalShow(false)} name="Artis Added" />
    </section>
  );
}
