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

export default function Admin() {
  // const [result, setResult] = useState([]);
  // const [due, setDue] = useState([]);

  let { data: transactions } = useQuery("transactionsCaches", async () => {
    const response = await API.get("/transactions");
    console.log("transactions :", response.data.data);

    return response.data.data;
  });

  // for (let i = 0; i < transactions?.length; i++) {
  //   const now = moment()
  //   const DueDate =transactions[i].dueDate

  //   .setResult(result)
  // }

  const income = transactions?.reduce((accum, item) => {
    return accum + item.price;
  }, 0);

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
                  <td colSpan={6}>No Transaction</td>
                </tr>
              ) : (
                transactions?.map((element, number) => {
                  number += 1;
                  // const date1 = moment()
                  // const date2 = moment(element?.dueDate);
                  // const diff = moment.preciseDiff(date2, date1, true)
                  // console.log(diff);

                  return (
                    <tr>
                      <th>{number}</th>
                      <th>{element.user.fullName}</th>
                      {/* <th>{element?.remaining }</th> */}
                      <th>
                        {element?.user.subscribe === "true" ? (
                          <label style={style.active}>Active</label>
                        ) : (
                          <label style={style.notActive}>Not Active</label>
                        )}
                      </th>
                      <th>
                        {element?.status === "pending" ? (
                          <label style={style.pending}>Pending</label>
                        ) : element?.status === "success" ? (
                          <label style={style.active}>Success</label>
                        ) : null}
                      </th>
                    </tr>
                  );
                })
              )}
              <tr>
                <td style={style.headerTable} colSpan={6}>
                  Income : {income}
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </section>
    </>
  );
}
