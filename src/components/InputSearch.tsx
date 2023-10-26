import { BsSearch } from "react-icons/bs";
import { useState } from "react";

const InputSearch = () => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  return (
    <span className=" col-span-6 flex px-3 py-1 rounded items-center bg-slate-200 text-slate-950">
      <input
        value={search}
        onChange={handleChange}
        className=" w-full outline-none bg-transparent placeholder:text-slate-700"
        placeholder="Search..."
        type="text"
      />
      <span className="px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      <span className="border-l border-l-slate-700 pl-3">
        <BsSearch />
      </span>
    </span>
  );
};

export default InputSearch;
