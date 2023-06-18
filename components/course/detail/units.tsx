"use client";

export default function Units() {
  const units = [
    {
      id: 1,
      title: "Paradigma fungsional dan Haskell",
      moduleCount: 7,
      finishedCount: 7,
    },
    {
      id: 2,
      title: "Rekursi sederhana pada Haskell",
      moduleCount: 7,
      finishedCount: 3,
    },
    {
      id: 3,
      title: "Pemrosesan list pada Haskell",
      moduleCount: 7,
      finishedCount: 2,
    },
    {
      id: 2,
      title: "Fungsi lambda dan fungsi sebagai parameter",
      moduleCount: 7,
      finishedCount: 6,
    },
  ];

  return (
    <div className="p-[1rem] grid grid-cols-1 gap-[1rem] lg:px-[2.5rem] lg:grid-cols-2">
      {units.map(({ id, title, moduleCount, finishedCount }, idx) => {
        return (
          <div
            className="w-[100%] bg-dark-gray flex flex-col gap-[2rem] justify-between p-[1.5rem] lg:p-[2rem]"
            key={id}
          >
            {/* Course information */}
            <div className="flex flex-col gap-[1rem]">
              <h1 className="text-white font-bold text-[1.25rem] lg:text-[1.75rem]">
                Unit {idx + 1}
              </h1>
              <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
                {title}
              </p>
              <p
                className={`${
                  finishedCount === moduleCount ? "text-green" : "text-yellow"
                } text-[1rem] lg:text-[1.25rem]`}
              >
                {finishedCount}/{moduleCount} modul sudah Anda selesaikan
              </p>
            </div>
            {/* Button */}
            <button className="text-white border-2 border-white p-[1rem] font-bold transition-all hover:pointer hover:text-black hover:bg-white text-[1rem] lg:text-[1.25rem]">
              Eksplorasi
            </button>
          </div>
        );
      })}
    </div>
  );
}
