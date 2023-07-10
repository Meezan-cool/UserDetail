import React, { useState } from "react";
import "./Create.css";
// import "./Create.scss";
import { useNavigate } from "react-router";
function Create({ test, isEdit, selectkey, data }) {
  const navigate = useNavigate();
  const [isEdit2, setIsEdit2] = useState(isEdit);
  const [isEdit3, setIsEdit3] = useState(isEdit);
  const [isEdit4, setIsEdit4] = useState(isEdit);

  const [reqname, setReqname] = useState(false);
  const [reqemail, setReqemail] = useState(false);
  const [reqnumber, setReqnumber] = useState(false);
  const [username, setUsername] = useState(isEdit2 ? test.username : "");
  const [email, setEmail] = useState(isEdit3 ? test.email : "");
  const [number, setNumber] = useState(isEdit4 ? test.number : "");

  
  // TO GET THE VALUE OF NAME INPUT FIELD
  const handlename = (e) => {
    setIsEdit2(false);
    setUsername(e.target.value);
    setReqname(false);
  };

   // TO GET THE VALUE OF EMAIL INPUT FIELD
  function handlemail(e) {
    setIsEdit3(false);
    setEmail(e.target.value);
    setReqemail(false);
  }

   // TO GET THE VALUE OF NUMBER INPUT FIELD
  function handlenumber(e) {
    setIsEdit4(false);
    setNumber(e.target.value);
    setReqnumber(false);
  }

  // TO SUBMIT THE GIVEN VALUE
  function submit() {
    const retain = JSON.parse(localStorage.getItem("data"));
    if (retain) {
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...retain,
          { username: username, email: email, number: number },
        ])
      );
    } else {
      localStorage.setItem(
        "data",
        JSON.stringify([{ username: username, email: email, number: number }])
      );
    }
    setUsername("");
    setEmail("");
    setNumber("");
    navigate("/display");
  }


  // TO UPDATE THE SELECTED VALUE
  function update() {
    setUsername(username);
    setEmail(email);
    setNumber(number);
    const retain = JSON.parse(localStorage.getItem("data"));
    retain.splice(selectkey, 1, {
      username: username,
      email: email,
      number: number,
    });
    localStorage.setItem("data", JSON.stringify(retain));
    // console.log([username, email, number]);
    setUsername("");
    setEmail("");
    setNumber("");
    navigate("/display");
  }

  let isreq = () => {
    setReqname(true);
    setReqemail(true);
    setReqnumber(true);
  };

  const display = () => {
    navigate("/display");
  };

  return (
    <div className="CreateContainer" >
        <h1>ENTER USER DETAILS</h1>
       <form action="">
          <input
            className={reqname ? "red" : ""}
            required="required"
            type="text"
            placeholder={reqname ? "username is required !" : "Username"}
            value={username}
            onChange={handlename}
          />
          <input
            required="required"
            className={reqemail ? "red" : ""}
            type="email"
            placeholder={reqemail ? "email is required !" : "Email"}
            value={email}
            onChange={handlemail}
          />
          <input
            required="required"
            className={reqnumber ? "red" : ""}
            type="number"
            placeholder={
              reqnumber ? "contact no. is required !" : "Contact No."
            }
            value={number}
            onChange={handlenumber}
          />
          {isEdit ? (
            <button
              onClick={username && email && number ? update : isreq}
            >
              UPDATE{" "}
            </button>
          ) : (
            <button
              onClick={username && email && number ? submit : isreq}
             
            >
              SUBMIT{" "}
            </button>
          )}
          </form>
        
      <button onClick={display} >
        DISPLAY
      </button>{" "}
    </div>
  );
}

export default Create