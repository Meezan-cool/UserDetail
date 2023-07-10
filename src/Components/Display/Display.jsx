import { React, useEffect, useState } from "react";
import "./Display.css";
import { useNavigate } from "react-router";
// striped bordered hover variant="dark"
// import { Table } from "react-bootstrap";
function Display({ editdata, isNotEdit }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // TO SET IN LOCAL STORAGE
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")));
  }, []);


  // TO DELETE SELECTED DETAIL
  function deletedata(index) {
    const newdata = data.filter((data2, index2) => {
      return index2 !== index;
    });
    setData(newdata);
    localStorage.setItem("data", JSON.stringify(newdata));
  }

  return (
    <div className="wrapper" >
      <h1>Users Details</h1>

      <table >
        {/* <caption>User Details</caption> */}
        <thead >
          <tr className="Thead">
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th colSpan={2}>Action Button</th>
          </tr>
        </thead>
        {data &&
          data.map((data, index) => {
            return (
              <tbody  key={index}>
                <tr >
                  <td data-cell="serial No" >{index + 1}</td>
                  <td data-cell="Name">{data.username} </td>
                  <td data-cell="Email">{data.email}</td>
                  <td data-cell="Number">{data.number}</td>

                  <td data-cell="Action Button" className="Action">
                    <button
                    className="Edit"
                      onClick={() => {
                        navigate("/");
                        editdata(index);
                      }}
                      
                    >
                      Edit
                    </button>{" "}
                    <button 
                    className="Delete"
                      onClick={() => {
                        deletedata(index);
                      }}
                    >
                      Delete
                    </button>{" "}
                  </td>
                  {/* <td  data-cell="Action Button"> */}
                    
                  {/* </td> */}
                </tr>
              </tbody>
            );
          })}
         
      </table>
      <button
      className="Back"
        onClick={() => {
          isNotEdit();
          navigate("/");
        }}
        
      >
        Back
      </button>
      
    </div>
  );
}

export default Display;