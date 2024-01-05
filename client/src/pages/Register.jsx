import { useState, useEffect } from "react";
import SignUpLogo from "../assets/SignUpLogo.svg";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import FormBack from "../components/FormBack";
import Button from "../components/Button";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
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
    <>
      <FormBack
        img={SignUpLogo}
        heading="Register"
        form={
          <form
            action=""
            className="d-flex flex-column mt-5"
            onSubmit={handleSubmit}
          >
            <InputField
              type="name"
              place="Name"
              name="name"
              value={name}
              id="name"
              handleChange={handleChange}
            />
            <InputField
              type="email"
              place="Email"
              name="email"
              value={email}
              id="email"
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
            <InputField
              type="password"
              place="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              id="confirmPassword"
              handleChange={handleChange}
            />
            <Link to="/login" className="link-text ">
              I am already registered
            </Link>
            <Button text="Register" />
          </form>
        }
      />
    </>
  );
}

export default Register;
