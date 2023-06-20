import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function Wrapper({ children }: Props) {
  return (
    <div className="bg-black">
      <div className="max-w-[1280px] mx-auto pt-[76px] lg:pt-[82px]">
        {children}
      </div>
    </div>
  );
}
