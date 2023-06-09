"use client";

import { Dispatch, SetStateAction, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { notification } from "antd";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { RegisterResponse } from "@/lib/state/response";

interface InputProps {
  type: string;
  label: string;
  errorMessage: string;
  validationFunction?: (v: string) => boolean;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  validationFunction2?: (v1: string, v2: string) => boolean;
  state2?: string;
}

function Input({
  type,
  label,
  errorMessage,
  validationFunction,
  state,
  setState,
  validationFunction2,
  state2,
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
      {validationFunction && !validationFunction(state) && (
        <p className="text-red text-[1rem] lg:text-[1.25rem]">{errorMessage}</p>
      )}
      {validationFunction2 &&
        typeof state2 === "string" &&
        !validationFunction2(state, state2) && (
          <p className="text-red text-[1rem] lg:text-[1.25rem]">
            {errorMessage}
          </p>
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

  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const validateConfirmationPassword = (v1: string, v2: string) => {
    return v1 === v2;
  };

  const [api, contextHolder] = notification.useNotification();

  const [token, setToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleRegister = async () => {
    if (
      !validateUsername(username) ||
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateConfirmationPassword(confirmationPassword, password) ||
      !token ||
      isLoading
    ) {
      return;
    }

    try {
      setIsLoading(true);
      await axios.post("/api/register", {
        username,
        email,
        password,
        token,
      });
      api.success({
        message: "Register berhasil",
        description:
          "Akun berhasil dibuat! Mengarahkan Anda ke halaman login...",
        placement: "bottomRight",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      const err = error as AxiosError;
      let errMessage = "";
      if (err.response) {
        const errResponse = err.response as RegisterResponse;
        errMessage = errResponse.data.message;
      } else {
        errMessage = err.message;
      }
      api.error({
        message: "Register gagal",
        description: errMessage,
        placement: "bottomRight",
      });
      captchaRef.current?.resetCaptcha();
      setToken(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      {contextHolder}
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
        errorMessage="Password minimal terdiri atas 8 karakter yang terdiri atas huruf alfabet (kecil atau besar) dan angka"
        validationFunction={validatePassword}
        state={password}
        setState={setPassword}
      />
      <Input
        type="password"
        label="Konfirmasi password"
        errorMessage="Password dengan konfirmasi password berbeda"
        validationFunction2={validateConfirmationPassword}
        state={confirmationPassword}
        state2={password}
        setState={setConfirmationPassword}
      />
      <HCaptcha
        ref={captchaRef}
        sitekey="cc8d0e2e-fea7-4e52-8aa9-aabe235a3589"
        onVerify={(token, _) => {
          setToken(token);
        }}
      />
      <button
        className="w-[100%] bg-primary px-[1.25rem] py-[1rem] text-white font-bold transition-all hover:bg-primary-hover text-[1rem] lg:text-[1.25rem] disabled:opacity-[0.5]"
        onClick={handleRegister}
        disabled={
          !validateUsername(username) ||
          !validateEmail(email) ||
          !validatePassword(password) ||
          !validateConfirmationPassword(confirmationPassword, password) ||
          !token ||
          isLoading
        }
      >
        Buat akun
      </button>
    </div>
  );
}
