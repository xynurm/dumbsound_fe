import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

const style = {
  textDumb: {
    color: "#EE4622"
  },

  form: {
    backgroundColor: "#D2D2D2",
    border: "2px solid #D2D2D2",
    color: "#B1B1B1"
  },

  imgfile: {
    width: "20px",
    height: "30px"
  },

  bgButton: {
    width: "500px",
    color: "white",
    backgroundColor: "#EE4622",
    border: "2px solid #EE4622"
  }
};

export default function Payment() {
  const navigate = useNavigate();

  const [state] = useContext(UserContext);

  const handlePay = useMutation(async (e) => {
    try {
      const response = await API.post("/transaction");

      const token = response.data.data.token;
      console.log(response.data.data.token);

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    // const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY; // Get REACT_APP_MIDTRANS_CLIENT_KEY from ENV here ...
    const myMidtransClientKey = "SB-Mid-client-m9h4S-nw-g1T5Qcy";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <section fluid id="payment" className="AddMusic pt-5 pb-5">
      <Container className="pt-5">
        <h3 className="text-center pt-5 pb-4 fw-bold text-white">Premium</h3>
        <div className="my-3 text-center">
          <p className="text-white fw-bold fs-6">
            Bayar sekarang dan nikmati streaming music yang kekinian dari{" "}
            <span style={style.textDumb}>DUMB</span>SOUND
          </p>
          <p className="text-white fw-bold fs-6">
            <span style={style.textDumb}>DUMB</span>SOUND : 0981312323
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            style={style.bgButton}
            className="my-4 fs-5 fw-bold"
            type="submit"
            onClick={(e) => handlePay.mutate(e)}
          >
            Pay
          </Button>
        </div>
      </Container>
    </section>
  );
}
