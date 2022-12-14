import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
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

export default function AddMusic() {
  const { data: artists } = useQuery("artistsCache", async () => {
    const response = await API.get("/artists");
    console.log("datat artist :", response.data.data);
    return response.data.data;
  });

  const [modalShow, setModalShow] = useState(false);

  const [music, setMusic] = useState({
    title: "",
    year: "",
    thumbnail: "",
    attache: "",
    artisId: ""
  });

  const handleChange = (e) => {
    setMusic({
      ...music,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value
    });
  };

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("title", music.title);
      formData.set("year", music.year);
      formData.set("thumbnail", music.thumbnail[0], music.thumbnail[0].name);
      formData.set("attache", music.attache[0], music.attache[0].name);
      formData.set("artisId", music.artisId);
      const response = await API.post("/music", formData);
      console.log("music", response.data.data)
      setModalShow(true);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <section fluid id="add-music" className="AddMusic pt-5 pb-5">
        <Container className="pt-5">
          <h4 className="fw-bold py-4 text-white">Add Music</h4>
          <Form
            onSubmit={(e) => handleSubmit.mutate(e)}
            style={style.formAll}
            className="m-auto mt-3 d-grid gap-2"
          >
            <Row>
              <Form.Group className="mb-3 col-9 ">
                <Form.Control
                  onChange={handleChange}
                  name="title"
                  style={style.form}
                  type="text"
                  placeholder="Title"
                  className="p-2 fs-5"
                />
              </Form.Group>
 
                <Form.Group className="mb-3 col-sm-3 ">
                  <input
                    onChange={handleChange}
                    name="thumbnail"
                    style={style.form}
                    type="file"
                   
                  />
                  {/* <label htmlFor="uploadThumbnail">
                    <img
                      height="50px"
                      width="230px"
                      src={
                        process.env.PUBLIC_URL + "/image/upload-thumbnail.png"
                      }
                      alt="upload-thumbnail"
                    />
                  </label> */}
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                name="year"
                style={style.form}
                type="text"
                placeholder="Year"
                className="p-2 fs-5"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                style={style.form}
                className="p-2 fs-5"
                name="artisId"
                onChange={handleChange}
              >
                <option hidden selected>
                  Select Singer
                </option>
                {artists?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Col xs={3}>
              <Form.Group className="mb-3">
                <input
                  onChange={handleChange}
                  name="attache"
                  style={style.form}
                  type="file"
                />
                {/* <label htmlFor="uploadAttache">
                  <img
                    height="50px"
                    src={process.env.PUBLIC_URL + "/image/upload-attache.png"}
                    alt="upload-thumbnail"
                  />
                </label> */}
              </Form.Group>
            </Col>
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

        <PopUp
          show={modalShow}
          onHide={() => setModalShow(false)}
          name="Music Added"
        />
      </section>
    </>
  );
}
