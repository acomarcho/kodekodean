"use client";

import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

interface InputProps {
  type: string;
  label: string;
  errorMessage: string;
  validationFunction: (v: string) => boolean;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

function Input({
  type,
  label,
  errorMessage,
  validationFunction,
  state,
  setState,
}: InputProps) {
  return (
    <div className="flex gap-[0.5rem] flex-col align-start">
      <p className="text-white font-bold text-[1rem] lg:text-[1.25rem]">
        {label}
      </p>
      <input
        className="px-[1rem] py-[0.5rem] text-[1rem] lg:text-[1.25rem]"
        type={type}
        value={state}
        onChange={(e) => setState(e.currentTarget.value)}
      />
      {!validationFunction(state) && (
        <p className="text-red text-[1rem] lg:text-[1.25rem]">{errorMessage}</p>
      )}
    </div>
  );
}

export default function RegisterForm() {
  const [username, setUsername] = useState<string>("");
  const validateUsername = (v: string) => {
    return v !== "";
  };

  const [email, setEmail] = useState<string>("");
  const validateEmail = (v: string) => {
    return v.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null;
  };

  const [password, setPassword] = useState<string>("");
  const validatePassword = (v: string) => {
    return (
      v.length >= 8 &&
      v.match(/[a-z]/) !== null &&
      v.match(/[A-Z]/) !== null &&
      v.match(/[0-9]/) !== null
    );
  };

  const handleRegister = async () => {
    if (
      !validateUsername(username) ||
      !validateEmail(email) ||
      !validatePassword(password)
    ) {
      return;
    }

    await axios.post("/api/register", {
      username,
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      <Input
        type="text"
        label="Username"
        errorMessage="Username harus diisi"
        validationFunction={validateUsername}
        state={username}
        setState={setUsername}
      />
      <Input
        type="email"
        label="Email"
        errorMessage="Format email tidak valid"
        validationFunction={validateEmail}
        state={email}
        setState={setEmail}
      />
      <Input
        type="password"
        label="Password"
        errorMessage="Password minimal terdiri atas 8 karakter yang terdiri atas huruf alfabet (kecil atau besar) dan angka."
        validationFunction={validatePassword}
        state={password}
        setState={setPassword}
      />
      <button
        className="w-[100%] bg-primary px-[1.25rem] py-[1rem] text-white font-bold transition-all hover:bg-primary-hover text-[1rem] lg:text-[1.25rem]"
        onClick={handleRegister}
      >
        Buat akun
      </button>
    </div>
  );
}
