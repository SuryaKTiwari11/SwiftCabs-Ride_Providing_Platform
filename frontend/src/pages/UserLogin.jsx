import React, { useContext, useState } from "react";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import {Button} from "../components/ui/Button"; 
import {Input} from "../components/ui/Input"; 

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const Navigate = useNavigate();

  const SubmitHandlingFunc = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        newUser
      );
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        Navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    setPassword("");
    setEmail("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] p-3">
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">User Login</h1>
        <form onSubmit={SubmitHandlingFunc}>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">
              What is your email?
            </label>
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
            <label className="block font-semibold text-lg mb-1">
              Enter Password
            </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="w-full"
              required
            />
          </div>
          <Button
            className="w-full mb-3"
            type="submit"
          >
            Login
          </Button>
          <p className="text-center font-semibold text-md">
            New Here? Create account{" "}
            <Link to="/user-signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/captain-login"
        className="bg-green-500 flex items-center justify-center font-semibold text-white py-2 rounded-md mt-3 w-full max-w-md"
      >
        Sign In As Captain
      </Link>
    </div>
  );
};

export default UserLogin;
