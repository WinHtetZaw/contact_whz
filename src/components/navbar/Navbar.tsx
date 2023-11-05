import { AiOutlineMenu } from "react-icons/ai";
import InputSearch from "../InputSearch";
import { useAppDispatch } from "../../rtk/hooks";
import { setIsSidebarOpen } from "../../rtk/features/mixedSlice";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const dispatch = useAppDispatch();
  return (
    <nav className="h-20 px-3 sm:px-5 flex gap-3 sm:gap-7 items-center justify-evenly bg-slate-500 text-slate-100 w-full">
      {/* logo  */}
      <div className=" flex gap-3 items-center">
        <span
          onClick={() => dispatch(setIsSidebarOpen("toggle"))}
          className="p-3 rounded-full hover:bg-slate-500 active:bg-slate-400 transition-all duration-[0.3s]"
        >
          <AiOutlineMenu className="text-2xl" />
        </span>

        <Link to={"/"} className="max-sm:hidden">
          <h2 className="uppercase select-none font-bold text-xl">contact</h2>
        </Link>
      </div>

      <InputSearch />

      <div className=" flex justify-end">
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
