import { AiOutlineMenu } from "react-icons/ai";
import InputSearch from "./InputSearch";

const Navbar = () => {
  return (
    <nav className="h-20 grid grid-cols-12 items-center justify-evenly bg-slate-600 text-slate-100 w-full">
      {/* logo  */}
      <span className=" col-span-3 flex ml-5 gap-3 items-center">
        <AiOutlineMenu className="text-2xl" />
        <h2 className="uppercase font-bold text-xl">contact</h2>
      </span>

      <InputSearch />

      <span className="col-span-3 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 ml-auto mr-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </span>
    </nav>
  );
};

export default Navbar;
