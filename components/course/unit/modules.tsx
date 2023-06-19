"use client";

export default function Modules() {
  const modules = [
    {
      id: 1,
      title: "Apa itu paradigma fungsional?",
      finished: true,
      rank: 1,
    },
    {
      id: 2,
      title: "Instalasi Haskell",
      finished: false,
      rank: 2,
    },
    {
      id: 3,
      title: "Program Haskell pertama Anda",
      finished: false,
      rank: 3,
    },
  ];

  return (
    <div className="p-[1rem] flex flex-col gap-[1rem] lg:px-[2.5rem] lg:gap-[1.5rem]">
      {modules.map(({ id, title, finished, rank }) => {
        return (
          <div className="p-[1rem] bg-dark-gray lg:p-[1.5rem]" key={id}>
            <h1 className="text-white text-[1rem] font-bold lg:text-[2rem]">
              <span
                className={`${finished ? "text-green" : "text-yellow"}`}
              >{`#${rank}`}. </span>
              {title}
            </h1>
          </div>
        );
      })}
    </div>
  );
}
