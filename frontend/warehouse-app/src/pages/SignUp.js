import React, {useState} from "react";
import Button from "../components/buttons/Button";
import LoginDropdown from "../components/LoginDropdown";
import TextInputField from "../components/TextInputField";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
  
export default function SignUp() {

  const [isSuccess, setIsSuccess] = useState({
    value: false,
    title: "",
    message: "",
  });

  const onSuccessChange = (obj) => setIsSuccess(obj);
  const onSuccessReset = () => { setIsSuccess({
    value: false,
    title: "",
    message: "",
  }) }

  const [isError, setIsError] = useState({
    value: false,
    title: "",
    message: "",
  });

  const onErrorChange = (obj) => setIsError(obj);
  const onErrorReset = () => { setIsError({
    value: false,
    title: "",
    message: "",
  }) }

  const [data, setData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    role: "EMPLOYEE"
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

  const onCreateAccount = async(event) => {
    event.preventDefault();
    onErrorReset();

    if (data.password != data.passwordConfirm) {
      onErrorChange({
        value: true,
        title: "Password error!",
        message: "Passwords don't match.",
      });
      return;
    } else if (data.password.length < 8) {
      onErrorChange({
        value: true,
        title: "Password error!",
        message: "Password should be at least 8 characters long.",
      });
      return;
    }

    try {
      let requestBody = JSON.stringify({
        username: data.username,
        password: data.password,
        role: data.role
      });

      let res = await fetch('http://localhost:8080/user', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody,
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
      });

      if (res.status === 200) {
        setData({
          username: "",
          password: "",
          passwordConfirm: "",
          role: "EMPLOYEE"
        });
        onSuccessChange({
          value: true,
          title: "Success!",
          message: "Successfully created new account.",
        });
      } else {
        console.log("create account failed")
        onErrorChange({
          value: true,
          title: "Create account error!",
          message: "Could not create new account.",
        });
      }
    } catch (error) {
      console.log(error);
      onErrorChange({
        value: true,
        title: "Create account error!",
        message: "Could not create new account.",
      });
    }
  }

  return (
    <div className="w-full h-screen bg-primaryBlue flex justify-center align-middle items-center">
      <p className="absolute top-4 left-4 font-thin text-sm text-white">Warehouse  <br/> Management <br/> System </p>
      <a className="absolute bottom-4 left-4 font-thin text-sm text-white" href="/"> Return </a>
      { isError.value ? <ErrorAlert title={isError.title} text={isError.message} onClose={onErrorReset} /> : null }
      { isSuccess.value ? <SuccessAlert title={isSuccess.title} text={isSuccess.message} onClose={onSuccessReset} /> : null}
      <form onSubmit={onCreateAccount}>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-thin text-white">Create account</h1>
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
            onValueChange={onPassowrdChange} />
          <TextInputField
            label="Confirm password" 
            width="w-80"
            type="password"
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