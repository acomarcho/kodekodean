import Image from "next/image";
import RegisterForm from "./form";
import ToRegister from "./to-register";

export default function Login() {
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem] lg:flex-row lg:justify-between lg:items-center min-h-screen lg:p-[2.5rem]">
      <div className="flex flex-col gap-[1rem] lg:w-[50%]">
        <div className="flex flex-col gap-[1rem]">
          <h1 className="text-white text-[1.25rem] font-bold lg:text-[3rem] lg:leading-[3.625rem]">
            <span className="text-yellow">Masuk</span> ke akunmu
          </h1>
          <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
            Yuk, masuk ke akunmu di{" "}
            <span className="text-green">kodekodean.id</span> untuk kembali
            belajar!
          </p>
          <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
            Belum punya akun? <ToRegister />
          </p>
        </div>
        <RegisterForm />
      </div>
      <div className="hidden lg:block lg:w-[50%]">
        <Image
          src="/assets/login.png"
          alt="Log in"
          width={316}
          height={424}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
