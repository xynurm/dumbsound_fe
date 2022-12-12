import React from "react";
import { Nav, OverlayTrigger, Popover } from "react-bootstrap";
import Logout from "../../../../assets/image/logout.png";
import Music from "../../../../assets/image/music.png";
import Profile from "../../../../assets/image/profile.png";
import Artis from "../../../../assets/image/artis.png";
import { useNavigate } from "react-router-dom";
const style = {
  bgDropdown: {
    backgroundColor: "#3A3A3A",
    width: "200px",
    maxWidth: "200px"
  },

  link: {
    alignItems: "center"
  },

  line: {
    border: "2px solid #A8A8A8"
  },

  img: {
    width: "25px",
    height: "25px",
    marginRight: "15px"
  },

  trigger: {
    width: "70px",
    heigth: "70px"
  },

  imgProfile: {
    height: "53px",
    borderRadius: "50%",
    objectFit: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: "4px solid #ffff"
  }
};

export default function DropdownAdmin({ logOut }) {
  const navigate = useNavigate();

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={
        <Popover id="popover-basic" style={style.bgDropdown}>
          <Popover.Body>
            <Nav.Link
              style={style.link}
              className="mb-4 "
              onClick={() => {
                navigate("/add-music");
              }}
            >
              <img alt="pay-img" src={Music} style={style.img} />
              <span className="text-white fs-5  fw-semibold">Add Music</span>
            </Nav.Link>
            <Nav.Link
              style={style.link}
              onClick={() => {
                navigate("/add-artis");
              }}
            >
              <img alt="pay-img" src={Artis} style={style.img} />
              <span className="text-white fs-5 fw-semibold">Add Artis</span>
            </Nav.Link>
          </Popover.Body>
          <hr style={style.line} />
          <Popover.Body>
            <Nav.Link onClick={logOut} style={style.link}>
              <img alt="logout-img" src={Logout} style={style.img} />
              <span className="text-white fs-5 fw-semibold">Logout</span>
            </Nav.Link>
          </Popover.Body>
        </Popover>
      }
      style={style.trigger}
    >
      <img
        alt=""
        src={Profile}
        className="d-inline-block align-top btn p-0 mx-3  "
        style={style.imgProfile}
      />
    </OverlayTrigger>
  );
}
