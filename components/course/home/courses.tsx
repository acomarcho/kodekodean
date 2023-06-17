export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Pemrograman fungsional menggunakan Haskell",
      description:
        "Belajar pemrograman menggunakan paradigma fungsional. Anda akan mempelajari gaya pemrograman fungsional, fungsi rekursif, dan fungsi lambda. Lorem ipsum dolor sit amet, constectur adipiscing elit. Lorem ipsum dolor sit amet, constectur adipiscing elit.",
      course: "IF1210 Dasar Pemrograman",
    },
    {
      id: 2,
      title: "Pemrograman prosedural menggunakan Python",
      description:
        "Belajar pemrograman menggunakan paradigma prosedural. Anda akan mempelajari gaya pemrograman prosedural dan pemrosesan file.",
      course: "IF1210 Dasar Pemrograman",
    },
    {
      id: 3,
      title: "Pemrograman fungsional menggunakan Haskell",
      description:
        "Belajar pemrograman menggunakan paradigma fungsional. Anda akan mempelajari gaya pemrograman fungsional, fungsi rekursif, dan fungsi lambda.",
      course: "IF1210 Dasar Pemrograman",
    },
    {
      id: 4,
      title: "Pemrograman prosedural menggunakan Python",
      description:
        "Belajar pemrograman menggunakan paradigma prosedural. Anda akan mempelajari gaya pemrograman prosedural dan pemrosesan file.",
      course: "IF1210 Dasar Pemrograman",
    },
  ];

  return (
    <div className="p-[1rem] grid grid-cols-1 gap-[1rem] lg:px-[2.5rem] lg:grid-cols-2">
      {courses.map(({ id, title, description, course }) => {
        return (
          <div className="w-[100%] bg-dark-gray flex flex-col gap-[2rem] justify-between p-[1.5rem] lg:p-[2rem]" key={id}>
            {/* Course information */}
            <div className="flex flex-col gap-[1rem]">
              <h1 className="text-white font-bold text-[1.25rem] lg:text-[1.75rem]">{title}</h1>
              <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">{description}</p>
              <p className="text-green text-[1rem] lg:text-[1.25rem]">
                Materi diambil dari mata kuliah {course}
              </p>
            </div>
            {/* Button */}
            <button className="text-white border-2 border-white p-[1rem] font-bold transition-all hover:pointer hover:text-black hover:bg-white text-[1rem] lg:text-[1.25rem]">Mulai belajar</button>
          </div>
        );
      })}
    </div>
  );
}
