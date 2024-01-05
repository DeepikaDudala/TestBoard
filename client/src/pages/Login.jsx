import FormBack from "../components/FormBack";
import InputField from "../components/InputField";
import LoginLogo from "./../assets/LoginLogo.svg";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData((preFormData) => ({
      ...preFormData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <FormBack
      img={LoginLogo}
      heading="Login"
      form={
        <form className="mt-5 " onSubmit={handleSubmit}>
          <InputField
            type="email"
            place="Email"
            name="email"
            value={email}
            id="name"
            handleChange={handleChange}
          />
          <InputField
            type="password"
            place="Password"
            name="password"
            value={password}
            id="password"
            handleChange={handleChange}
          />
          <Link to="/register" className="link-text">
            Create an account
          </Link>
          <Button text="Login" />
        </form>
      }
    />
  );
}

export default Login;
