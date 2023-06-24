"use client";

import { Dispatch, SetStateAction, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { notification } from "antd";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { LoginResponse } from "@/lib/state/response"

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
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const validateUsernameOrEmail = (v: string) => {
    return v !== "";
  };

  const [password, setPassword] = useState<string>("");
  const validatePassword = (v: string) => {
    return v !== "";
  };

  const [api, contextHolder] = notification.useNotification();

  const [token, setToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (
      !validateUsernameOrEmail(usernameOrEmail) ||
      !validatePassword(password) ||
      isLoading
    ) {
      return;
    }

    try {
      setIsLoading(true);
      await axios.post("/api/login", {
        usernameOrEmail,
        password,
        token,
      });
      api.success({
        message: "Login berhasil",
        description: "Selamat belajar di kodekodean.id!",
        placement: "bottomRight",
      });
      router.push("/course");
    } catch (error) {
      const err = error as AxiosError;
      let errMessage = "";
      if (err.response) {
        const errResponse = err.response as LoginResponse;
        errMessage = errResponse.data.message;
      } else {
        errMessage = err.message;
      }
      api.error({
        message: "Login gagal",
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
        label="Username/email"
        errorMessage="Username/email harus diisi"
        validationFunction={validateUsernameOrEmail}
        state={usernameOrEmail}
        setState={setUsernameOrEmail}
      />
      <Input
        type="password"
        label="Password"
        errorMessage="Password harus diisi."
        validationFunction={validatePassword}
        state={password}
        setState={setPassword}
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
        onClick={handleLogin}
        disabled={
          !validateUsernameOrEmail(usernameOrEmail) ||
          !validatePassword(password) ||
          !token ||
          isLoading
        }
      >
        Masuk
      </button>
    </div>
  );
}
