import React, { useState } from "react";
import Button from "../components/buttons/Button";
import ErrorAlert from "../components/ErrorAlert";
import TextInputField from "../components/TextInputField";
import { redirect } from "react-router-dom";
  
export default function Login({
  onUserChange,
  onUserIdChange,
}) {

  const [isError, setIsError] = useState(false);
  const onError = () => setIsError(true);
  const onCloseAlert = () => setIsError(false);

  const [data, setData] = useState({
    username: "",
    password: ""
  })

  function onUsernameChange(e) {
    let newObject = {...data};
    newObject.username = e.target.value;
    setData(newObject);
  }

  function onPasswordChange(e) {
    let newObject = {...data};
    newObject.password = e.target.value;
    setData(newObject);
  }

  let onLogin = async(event) => {
    console.log("on login clicked")
    event.preventDefault();
    try {
      let formData = new FormData();
      formData.append('username', data.username);
      formData.append('password', data.password);

      let res = await fetch('http://localhost:8080/login', { 
        method: 'POST',
        body: formData,
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
      });

      if (res.status === 200) {
        console.log("login succeeded");
        setData({
          username: "",
          password: "",
        });

        let userRole = await fetch('http://localhost:8080/user/role', {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          origin: "http://localhost:3000/",
        });

        if (userRole.status === 200) {
          let role = await userRole.text();
          redirect("/");
          onUserChange(role);
        } else {
          console.log("user role failed, status: " + userRole.status);
          onError();
        }

        let userId = await fetch('http://localhost:8080/user/employee', {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          origin: "http://localhost:3000/",
        });

        if (userId.status === 200) {
          let id = await userId.text();
          console.log("userId");
          console.log(id);
          onUserIdChange(id);
        }
      } else  {
        console.log("login failed");
        onError();
      }
    } catch (error) {
      console.log(error);
      onError();
    }
  }

  return (
    <div className="w-full h-screen bg-primaryBlue flex justify-center align-middle items-center">
      <p className="absolute top-4 left-4 font-thin text-sm text-white">Warehouse  <br/> Management <br/> System </p>
      { isError ? <ErrorAlert title="Login failed!" text="Incorrect username or password." onClose={onCloseAlert} /> : null }
      <form onSubmit={onLogin}>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-thin text-white">Please log in</h1>
          <TextInputField
            label="Username"
            width="w-80"
            value={data.username}
            onValueChange={onUsernameChange} />
          <TextInputField
            label="Password" 
            width="w-80" 
            type="password"
            value={data.password}
            onValueChange={onPasswordChange} />
          <div className="flex flex-row gap-4 items-center">
            <Button
              label="Log in"
              type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};