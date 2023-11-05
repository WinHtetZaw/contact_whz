import { IoTrashOutline } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { setIsSidebarOpen } from "../rtk/features/mixedSlice";
import { useEffect } from "react";

const Sidebar = () => {
  const { isSidebarOpen, contactLength } = useAppSelector(
    (state) => state.mixedSlice
  );
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    // if(window.innerWidth > 640) {
    //   dispatch(setIsSidebarOpen(true));
    // }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleResize(this: Window) {
    if (this.innerWidth < 640) {
      dispatch(setIsSidebarOpen(false));
    } else {
      dispatch(setIsSidebarOpen(true));
    }
  }

  const sidebarMenuItems = [
    {
      title: "contacts",
      url: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
      length: contactLength,
    },
    { title: "new", url: "/new", icon: <AiOutlinePlus /> },
    { title: "favorite", url: "/favorite", icon: <AiOutlineHeart /> },
    { title: "trash", url: "/trash", icon: <IoTrashOutline /> },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={() => dispatch(setIsSidebarOpen(false))}
          className="absolute sm:hidden z-40 bg-red-100 w-full h-full h-main"
        />
      )}
      <aside
        className={` ${
          !isSidebarOpen ? " translate-x-[-200px]" : " translate-x-0"
        }
          pt-5 h-main h-full absolute z-40 max-sm:shadow-0 bg-white left-0 top-0 w-[200px] text-slate-800 transition-transform duration-100 ease-in-out`}
      >
        <div className="flex flex-col gap-1 p-2">
          {sidebarMenuItems.map((el) => (
            <Link to={el.url} key={el.title} className="">
              <section
                className={`sidebar-item relative group overflow-hidden ${
                  location.pathname === el.url &&
                  "sidebar-active border-x-[3.5px] border-[#e67e22] bg-slate-10"
                } `}
              >
                <div className="flex items-center gap-2 ">
                  <span className="sidebar-icon-1">{el.icon}</span>
                  <span className="sidebar-icon-2">{el.icon}</span>

                  <h4 className="sidebar-item-title-1">
                    <span>{el.title}</span>
                  </h4>
                  <h4 className="sidebar-item-title-2">
                    <span>{el.title}</span>
                  </h4>
                </div>
              </section>
            </Link>
          ))}
        </div>
      </aside>
      {/* )} */}
    </>
  );
};

export default Sidebar;
