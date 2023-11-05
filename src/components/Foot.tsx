import { TbBrandGithubFilled } from "react-icons/tb";
import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { BiLogoTelegram } from "react-icons/bi";

const Foot = () => {
  const isDark = false;
  return (
    <div
      className={`${
        isDark ? " bg-black bg-opacity-50 backdrop-blur-sm" : "bg-slate-100"
      }  w-full flex flex-col items-center justify-center py-16`}
    >
      <p className=" flex items-center text-sm sm:text-base">
        <span className=" text-2xl font-mono mr-2">&copy; </span>Win Htet Zaw |
        All rights Reserved
      </p>
      <section className="flex gap-5 items-center h-[50px]">
        <div className="relative flex items-center justify-center group">
          <span className="logo-border"></span>
          <TbBrandGithubFilled className="logo " />
        </div>

        <div className="relative flex items-center justify-center group">
          <span className="logo-border"></span>
          <RiFacebookFill className="logo " />
        </div>

        <div className="relative flex items-center justify-center group">
          <span className="logo-border"></span>
          <BiLogoTelegram className="logo " />
        </div>

        <div className="relative flex items-center justify-center group">
          <span className="logo-border"></span>
          <AiOutlineTwitter className="logo " />
        </div>

        <div className="relative flex items-center justify-center group">
          <span className="logo-border"></span>
          <AiOutlineInstagram className="logo " />
        </div>
      </section>
    </div>
  );
};

export default Foot;
