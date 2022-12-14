import React from "react";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";

const style = {
  header: {
    color: "white"
  },

  headerTable: {
    color: "#EE4622"
  },

  active: {
    color: "#0ACF83"
  },

  pending: {
    color: "#F7941E"
  },

  notActive: {
    color: "#FF0000"
  }
};

export default function ListArtis() {
  let { data: artists } = useQuery("artistsCache", async () => {
    const response = await API.get("/artists");
    console.log("artis :", response.data.data);

    return response.data.data;
  });

  return (
    <>
      <section fluid className="AddMusic">
        <Container className="py-5 ">
          <h4 className="py-5" style={style.header}>
            Incoming Transaction
          </h4>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th style={style.headerTable}>No</th>
                <th style={style.headerTable}>Name</th>
                <th style={style.headerTable}>Old</th>
                <th style={style.headerTable}>Type</th>
                <th style={style.headerTable}>Start Career</th>
              </tr>
            </thead>
            <tbody>
              {artists === 0 ? (
                <tr>
                  <td colSpan={6}>No Artists</td>
                </tr>
              ) : (
                artists?.map((element, number) => {
                  number += 1;
                  return (
                    <tr>
                      <th>{number}</th>
                      <th>{element.name}</th>
                      <th>{element.old}</th>
                      <th>{element.type}</th>
                      <th>{element.startCareer}</th>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Container>
      </section>
    </>
  );
}
