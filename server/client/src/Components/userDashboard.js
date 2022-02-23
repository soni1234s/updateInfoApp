import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import emailJs from "emailjs-com";
import "./userDashboard.css";


function UserDashBoard() {

  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < 24; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const history = useHistory();
  const [user, setUser] = useState({
    id: result,
    name: "",
    email: "",
    mobile: "",
  });

  let name, value;

  const handleUser = (e) => {
    name = e.target.name;
    value = e.target.value;
     

    setUser({ ...user, [name]: value });

  };
  
  const sendEmail = (e) => {
    e.preventDefault();

    emailJs.sendForm('service_ir8obnq', 'template_hgkj6nm', e.target, 'user_RFJRoiUqSUfROgm6acBLw').then((res) => {
      //console.log(res);
    }).catch(err => console.log(err));

  }

  const uploadData = async (e) => {

    e.preventDefault();
    const { name, email, mobile,id } = user;
 
    if(!name || !email || !mobile){
      window.alert("please Filled all data!");
    }
    const response = await fetch("http://localhost:5000/profile", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          email,
          mobile,
        }),

      })

      const data = await response.json();
      if(data.status === 422 || !data){
         window.alert("INVALID REGISTERATION");
         console.log("INVALID REGISTERATION");
      }else{
        window.alert("REGISTERATION SUCCESSFUL");
        console.log("REGISTERATION SUCCESSFUL");
        
        sendEmail(e);
        history.push("/profile");
      }


       
    };

  return (
    <div className="main">
      <h2>USER DASHBOARD</h2>
      <div className="container" id="container">
        <div className="form-container personal-in-container py-2">
          <form method="POST" onSubmit={uploadData}>
            <h1>Personal Information</h1>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleUser}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleUser}
              placeholder="Email"
            />
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleUser}
              placeholder="Phone No."
              maxlength="10"
            />

            <button type="submit">Update</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and keep supporting us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashBoard;
