import React, {useState} from "react";
import Button from "../components/buttons/Button";
import LoginDropdown from "../components/LoginDropdown";
import TextInputField from "../components/TextInputField";
  
export default function SignUp() {

  const [data, setData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    role: "employee"
  })

  function onUsernameChange(e) {
    let newObject = {...data};
    newObject.username = e.target.value;
    setData(newObject);
  }

  function onPassowrdChange(e) {
    let newObject = {...data};
    newObject.password = e.target.value;
    setData(newObject);
  }

  function onPasswordConfirmChange(e) {
    let newObject = {...data};
    newObject.passwordConfirm = e.target.value;
    setData(newObject);
  }

  function onRoleChange(e) {
    let newObject = {...data};
    newObject.role = e.target.value;
    setData(newObject);
  }

  // TODO request
  function onCreateAccount() {}

  return (
    <div className="w-full h-screen bg-primaryBlue flex justify-center align-middle items-center">
      <p className="absolute top-4 left-4 font-thin text-sm text-white">Warehouse  <br/> Management <br/> System </p>
      <a className="absolute bottom-4 left-4 font-thin text-sm text-white" href="/login"> Return </a>
      <form onSubmit={onCreateAccount}>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-thin text-white">Sign up</h1>
          <TextInputField
            label="Username"
            width="w-80"
            value={data.username}
            onValueChange={onUsernameChange} />
          <TextInputField
            label="Password" 
            width="w-80"
            value={data.password}
            onValueChange={onPassowrdChange} />
          <TextInputField
            label="Confirm password" 
            width="w-80"
            value={data.passwordConfirm}
            onValueChange={onPasswordConfirmChange} />
          <LoginDropdown onRoleChange={onRoleChange}/>
          <div>
            <Button
              label="Create account"
              type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};