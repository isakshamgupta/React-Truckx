import React from "react";
import HomeButton from "./HomeButton";
import MaterialTable from "material-table";
import axios from "axios";

export default function MaterialTableDemo() {
  const [data, setData] = React.useState(undefined);
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Username", field: "username" },
      { title: "Email", field: "email" },
      {
        title: "Phone No.",
        field: "phone",
        type: "numeric"
      },
      { title: "Created Date", field: "date" }
    ],
    data: [
      {
        name: "Saksham Gupta",
        username: "Isakshamgupta",
        email: "saksham.cse.1839@iiitbh.ac.in",
        phone: 8824821750,
        date: "08-04-2000"
      },
      {
        name: "Kumar Aryan",
        username: "Aryancool",
        email: "aryan.ece.183002@iiitbh.ac.in",
        phone: 99021456275,
        date: "08-04-2000"
      }
    ]
  });

  axios
    .get("./data.json")
    .then((result) => {
      let res = result.data.data;
      if (data === undefined) {
        setData(res);
        console.log(res);
      }
      //console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <MaterialTable
      options={{
        paging: false,
        actionsColumnIndex: -1,
        rowStyle: {
          backgroundColor: "#FFFFFF"
        },
        headerStyle: {
          backgroundColor: "#EEE"
        }
      }}
      title="MY CUSTOMERS"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
}

//export default Dashboard;
