import React, { useContext, useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../../config/api";
import { UserContext } from "../../../context/userContext";
import LoginAuth from "../../Molecules/ModalAuth/Login";
import RegisterAuth from "../../Molecules/ModalAuth/Register";
import Audio from "../../Molecules/MusicItem/Audio";

export default function ListMusic() {
  let { data: musics } = useQuery("musicsCaches", async () => {
    const response = await API.get("/musics");
    return response.data.data;
  });

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const [state, dispatch] = useContext(UserContext);

  const [audioShow, setAudioShow] = useState(false);
  const [dataAudio, setDataAudio] = useState();

  const handleShow = () => setAudioShow(true);
  const handleClose = () => setAudioShow(false);

  const handleMusicDetail = (item) => {
    setDataAudio(item);
    handleShow();
  };
  const navigate = useNavigate();

  return (
    <>
      <section className="ListMusic">
        <Container fluid>
          <div className="">
            <h4
              className="text-center fw-bold py-5 "
              style={{ color: "#EE4622" }}
            >
              Dengarkan Dan Rasakan
            </h4>
            <Row className="justify-content-start px-5">
              {musics?.map((music, index) => (
                <Col lg={3} sm={1} className="py-3" key={index}>
                  <Card
                    style={{ backgroundColor: "#3A3A3A" }}
                    className="text-white"
                    onClick={() => {
                      state.isLogin === false
                        ? handleShowLogin()
                        : state.user.subscribe === "true"
                        ? handleMusicDetail(music)
                        : navigate("/payment");
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={music?.thumbnail}
                      width="230px"
                      height="230px"
                      className="p-3 pb-2"
                    />
                    <Card.Body className="p-4 pt-3 fs-6">
                      <Stack
                        direction="horizontal"
                        className="justify-content-between"
                      >
                        <Card.Title className="fw-bold text-truncate">
                          {music?.title}
                        </Card.Title>
                        <Card.Title className="fs-5">{music?.year}</Card.Title>
                      </Stack>
                      <Card.Text>{music?.artis.name}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>
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

      <Audio show={audioShow} onHide={handleClose} dataAudio={dataAudio} />
    </>
  );
}
