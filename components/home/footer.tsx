import RegisterButton from "./register-button"

export default function Footer() {
  return (
    <div className="w-[100vw] bg-dark-gray">
      <div className="max-w-[1280px] mx-auto">
        <div className="p-[1rem] flex flex-col gap-[1rem] lg:p-[2.5rem]">
          <p className="text-[1.25rem] text-white text-center font-bold lg:text-[3rem]">Yuk, belajar sekarang di kodekodean.id!</p>
          <RegisterButton />
        </div>
      </div>
    </div>
  )
}