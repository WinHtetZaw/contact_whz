import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useAppSelector } from "../../rtk/hooks";
import { useUserLogoutMutation } from "../../rtk/services/contactApi";
import { ResponseRegister, ResponseRegisterError } from "../../shared/type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { removeLocalStorage } from "../../shared/helper";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userLogout, { isLoading }] = useUserLogoutMutation();
  const { user } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const handleAuthClick = async () => {
    const logoutData:
      | { data: ResponseRegister }
      | {
          error: FetchBaseQueryError | SerializedError | ResponseRegisterError;
        } = await userLogout(user?.token);
    if ("data" in logoutData)
      if (logoutData.data.success) {
        toast.success("Successfully logout");
        removeLocalStorage("contact_user");
        navigate("/auth");
      }

    if ("error" in logoutData) {
      toast.error("Something wrong!");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        {/* <Button variant="bordered">Open Menu</Button> */}
        <button className=" outline-none w-fit flex items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="profile"
          textValue="profile"
          onClick={() => navigate("/profile")}
          className=" text-center"
        >
          <h2 className=" capitalize">profile</h2>
        </DropdownItem>
        <DropdownItem key="auth" textValue="auth">
          <Button
            isLoading={isLoading}
            className=" p-0 w-full h-full bg-transparent flex justify-center"
            onClick={handleAuthClick}
          >
            <h2 className=" capitalize">
              <span>Log out</span>
              {/* {getLocalStorage("contact_user") ? (
              ) : (
                <span>Log in</span>
              )} */}
            </h2>
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfile;
