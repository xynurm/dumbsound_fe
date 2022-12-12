import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

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

export default function Admin() {
  const [state, dispatch] = useContext(UserContext);
  let { data: transactions, refetch } = useQuery("TransTable", async () => {
    const response = await API.get("/transactions");
    console.log("trans", response);
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
              <th style={style.headerTable}>Users</th>
              {/* <th style={style.headerTable}>Remaining Active</th> */}
              <th style={style.headerTable}>Status User</th>
              <th style={style.headerTable}>Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {transactions === 0 ? (
              <tr>
                <td colSpan={6}>Not Transaction</td>
              </tr>
            ) : (
              transactions?.map((element, number) => {
                number += 1;
                // remaining = element.starDate - element.dueDate
                // console.log(remaining)

                return (
                  <tr>
                    <th>{number}</th>
                    <th>{element.user.fullName}</th>
                    {/* <th>{element?.dueDate }</th> */}
                    <th>
                      {element?.user.subscribe === "true" ? (
                        <label style={style.active}>Active</label>
                      ) : (
                        <label style={style.notActive}>Not Active</label>
                      )}
                    </th>
                    <th>
                      {element.status === "pending" ? (
                        <label style={style.pending}>Pending</label>
                      ) : element.status === "Success" ? (
                        <label style={style.active}>Success</label>
                      ) : element.status === "Cancel" ? (
                        <label style={style.notActive}>Cancel</label>
                      ) : null}
                    </th>
                  </tr>
                );
              })
            )}
            {/* <tr>
              <td style={style.headerTable} colSpan={6}>
                Income :{" "}
              </td>
            </tr> */}
          </tbody>
        </Table>
      </Container>
    </section>
  
    </>
  );
}
