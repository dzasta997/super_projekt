import React, {useState} from "react";
import Button from "../components/buttons/Button";
import TextInputField from "../components/TextInputField";
  
export default function Login() {

  const form = useRef(null)

  const [data, setData] = useState({
    username: "",
    password: ""
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

  // TODO request
  const onLogin = async(event) => {
    event.preventDefault();
    try {
      let formData = new FormData(form.curremt);

      fetch('https://localhost:3000/login', { method: 'POST', body: formData })
      .then(res => {
        if (res === 200) {
          setData({
            username: "",
            password: "",
            passwordConfirm: "",
            role: "EMPLOYEE"
          });
          window.location.replace("https://localhost:3000/");
        } else  {
          console.log("login failed");
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-screen bg-primaryBlue flex justify-center align-middle items-center">
      <p className="absolute top-4 left-4 font-thin text-sm text-white">Warehouse  <br/> Management <br/> System </p>
      <form ref={form} onSubmit={onLogin}>
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
            value={data.password}
            onValueChange={onPassowrdChange} />
          <div className="flex flex-row gap-4 items-center">
            <Button
              label="Log in"
              type="submit" />
            <a href="/sign-up">
            <Button
              label="Create account"
              color="transparent" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};