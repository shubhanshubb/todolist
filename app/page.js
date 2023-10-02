"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      // onLogin(true);
      router.push("/todo");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="items-center pt-10 pb-96 bg-teal-700">
      <h1 className="text-3xl font-bold mb-4 text-center mb-20">Login Page</h1>
      <form
        onSubmit={handleSubmit}
        className="ml-50 flex flex-col justify-center items-center"
      >
        <input
          type="text"
          className="text-2xl font-normal border-black border-2 mb-10 pl-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="text-2xl font-normal border-black border-2 mb-10 pl-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={onLogin}
          className="bg-black text-white px-4 py-3 text-xl font-bold rounded-xl mt-4"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default page;
