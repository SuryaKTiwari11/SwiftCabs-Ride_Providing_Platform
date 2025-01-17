import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import {Button} from "../components/ui/Button"; // Assuming Button is a custom component
import {Input} from "../components/ui/Input"; // Assuming Input is a custom component

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email} Password: ${password} Submitted Successfully`);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] p-3">
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">Captain Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">What is your email?</label>
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
            <label className="block font-semibold text-lg mb-1">Enter Password</label>
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
            New Here? Create account {" "}
            <Link to="/captain-signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/user-login"
        className="bg-purple-500 flex items-center justify-center font-semibold text-white py-2 rounded-md mt-3 w-full max-w-md"
      >
        Sign In As User
      </Link>
    </div>
  );
};

export default CaptainLogin;
