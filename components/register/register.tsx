import Image from "next/image";
import RegisterForm from "./form";
import ToLogin from "./to-login";

export default function Register() {
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem] lg:flex-row lg:justify-between lg:items-center min-h-screen lg:p-[2.5rem] pt-[calc(76px+1rem)] lg:pt-[calc(82px+1rem)]">
      <div className="flex flex-col gap-[1rem] lg:w-[50%]">
        <div className="flex flex-col gap-[1rem]">
          <h1 className="text-white text-[1.25rem] font-bold lg:text-[3rem] lg:leading-[3.625rem]">
            <span className="text-yellow">Buat</span> akun baru
          </h1>
          <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
            Yuk, buat akun di <span className="text-green">kodekodean.id</span>{" "}
            untuk mulai belajar!
          </p>
          <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
            Sudah punya akun? <ToLogin />
          </p>
        </div>
        <RegisterForm />
      </div>
      <div className="hidden lg:block lg:w-[50%]">
        <Image
          src="/assets/join-us.png"
          alt="Join us"
          width={316}
          height={579}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
