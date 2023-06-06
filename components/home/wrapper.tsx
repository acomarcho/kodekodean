import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function Wrapper({ children }: Props) {
  return (
    <div className="bg-black">
      <div className="p-[1rem] max-w-[1160px] lg:p-[2rem] mx-auto">
        {children}
      </div>
    </div>
  );
}
