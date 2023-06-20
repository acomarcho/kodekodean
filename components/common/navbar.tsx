import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black">
      <div className="max-w-[1280px] mx-auto">
        <div className="p-[1rem] lg:px-[2.5rem]">
          <Link href="/">
            <Image
              src="/icons/kodekodean.svg"
              alt="kodekodean.id's logo"
              width={232}
              height={39}
              className="w-[145px] h-[24px] lg:w-[232px] lg:h-[39px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
