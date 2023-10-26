import { IoPersonOutline, IoTrashOutline } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";


const sidebarMenuItems = [
  { title: "contacts", url: "/", icon: <IoPersonOutline /> },
  { title: "new", url: "/new", icon: <AiOutlinePlus /> },
  { title: "favorite", url: "/favorite", icon: <AiOutlineHeart /> },
  { title: "trash", url: "/trash", icon: <IoTrashOutline /> },
];

const Sidebar = () => {
  return (
    <aside
      style={{ minHeight: "calc(100vh - 5rem)" }}
      className=" w-sidebar pt-5 bg-slate-200 text-slate-800"
    >
      <ul className="flex flex-col gap-1 p-2">
        {sidebarMenuItems.map((el) => (
          <li key={el.title} className="sidebar-menu-item">
            <Link to={el.url}>
              <span className="flex items-center gap-2">
                <span className="text-lg mb-1">{el.icon}</span>
                <h4 className="title-2">{el.title}</h4>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
