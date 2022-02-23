import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UpdateInfo = (props) => {

  const [data, setData] = useState({
    id: props.location.state.user.id,
    name: props.location.state.user.name,
    email: props.location.state.user.email,
    mobile: props.location.state.user.mobile,
  });

  let name, value;
  const history = useHistory();

  const handleUser = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const updateData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, id} = data;

    if (!name || !email || !mobile) {
      window.alert("please Filled all data!");
    }

    const res = await axios.put(`http://localhost:5000/profile/${id}`, data);

    setData(res.data);
    history.push("/profile");
  };

  const DeleteData = async () => {
    await axios
      .delete(`http://localhost:5000/profile/${data.id}`)
      .then((res) => window.alert("Data deleted successfully"))
      .catch((err) => console.log(err));

      history.push("/profile");
  };

  return (
    <div>
      <form method="PUT" onSubmit={updateData}>
        <h1>UPDATE INFORMATION</h1>

        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleUser}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={data.email}
          placeholder="Email"
          disabled
        />
        <input
          type="text"
          name="mobile"
          value={data.mobile}
          onChange={handleUser}
          placeholder="Phone No."
          maxlength="10"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <button type="submit" style={{ marginRight: "10px" }}>
            Update
          </button>
          <button onClick={DeleteData}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInfo;
