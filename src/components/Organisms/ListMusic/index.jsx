import React from "react";
import { Container, Row } from "react-bootstrap";
import Musicitem from "../../Molecules/MusicItem";

export default function ListMusic() {
  return (
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
            <Musicitem
              title="tes1213"
              thumbnail="/image/music-1.png"
              artis="eminem"
              year={1990}
            />
            <Musicitem
              title="tes1213"
              thumbnail="/image/music-1.png"
              artis="eminem"
              year={1990}
            />
            <Musicitem
              title="tes1213"
              thumbnail="/image/music-1.png"
              artis="eminem"
              year={1990}
            />
            <Musicitem
              title="tes1213"
              thumbnail="/image/music-1.png"
              artis="eminem"
              year={1990}
            />
            <Musicitem
              title="tes1213"
              thumbnail="/image/music-1.png"
              artis="eminem"
              year={1990}
            />
          </Row>
        </div>
      </Container>
    </section>
  );
}
