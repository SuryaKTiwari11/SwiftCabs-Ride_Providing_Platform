import React, { useContext, useState } from "react";
import Logo from "../assets/Logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx"; 
import {Button} from "../components/ui/Button"; 
import {Input} from "../components/ui/Input"; 
const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext); 

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        Navigate("/home");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] p-3">
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">User Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">
              What is your name?
            </label>
            <div className="flex gap-2">
              <Input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="w-1/2"
                placeholder="First Name"
              />
              <Input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="w-1/2"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">Email</label>
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">Password</label>
            <Input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full"
              placeholder="password"
            />
          </div>
          <Button
            className="w-full mb-3"
            type="submit"
          >
            Sign Up
          </Button>
          <p className="text-center font-semibold text-md">
            Already have an account?{" "}
            <Link to="/user-login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/captain-signup"
        className="bg-green-500 flex items-center justify-center font-semibold text-white py-2 rounded-md mt-3 w-full max-w-md"
      >
        Sign In As Captain
      </Link>
    </div>
  );
};

export default UserSignUp;