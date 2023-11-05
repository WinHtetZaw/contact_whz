import { ResponseContact, ResponseRegister } from "../shared/type";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import AddToFavorite from "./AddToFavorite";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { recoverFromTrash, removeFavorite } from "../rtk/features/contactSlice";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useDeleteContactMutation } from "../rtk/services/contactApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
  contact: ResponseContact;
};
const ContactCard = (props: Props) => {
  const { id, name, phone, email, address } = props.contact;
  const { user } = useAppSelector((state) => state.userSlice);
  const [isHover, setIsHover] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const handleRecoverClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(recoverFromTrash(props.contact));
    toast.success("Recovery Successful");
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be reversed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(3 105 161)",
      cancelButtonColor: "rgb(190 18 60)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "Delete forever.", "success");

        const deleting:
          | { data: ResponseRegister }
          | { error: FetchBaseQueryError | SerializedError } =
          await deleteContact({
            token: user?.token,
            id,
          });

        if ("data" in deleting) {
          // checking data or error
          if (deleting.data.success) {
            // checking success or not
            dispatch(recoverFromTrash(props.contact));
            dispatch(removeFavorite(props.contact));
            toast.success("Successfully Deleted!");
          }
        } else {
          toast.error("Something wrong!");
        }
      }
    });
  };

  const handleClick = () => {
    if (location.pathname === "/favorite") {
      navigate(`/detail/${props.contact.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="p-5 group relative rounded-lg border shadow-md overflow-hidden"
    >
      <h2 className=" w-full text-center uppercase font-semibold mb-5">
        {name}
      </h2>

      {/* favorite  */}
      {location.pathname === "/favorite" && (
        <div
          style={{ borderRadius: "0 0 0 10px" }}
          className="absolute top-0 right-0 bg-slate-200 p-2"
        >
          <AddToFavorite contact={props.contact} />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="flex gap-2 items-center">
          <AiOutlinePhone className="mb-1" />
          <p>{Math.abs(phone)}</p>
        </span>
        <span className="flex gap-2 items-center">
          <AiOutlineMail />
          <p className=" w-full truncate">{email}</p>
        </span>
        <span className="flex gap-2 items-center">
          <FaRegAddressCard />
          <p className="w-full truncate">{address}</p>
        </span>
      </div>

      {location.pathname === "/trash" && (
        <div
          onMouseOver={() => setIsHover(props.contact.id)}
          onMouseLeave={() => setIsHover(0)}
          className=" absolute inset-0 flex gap-3 flex-col transition-all duration-300"
        >
          <AnimatePresence>
            {isHover === props.contact.id && isHover > 0 && (
              <>
                <motion.button
                  initial={{ translateX: "-100%" }}
                  animate={{ translateX: 0 }}
                  exit={{
                    translateX: "100%",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  onClick={handleRecoverClick}
                  disabled={isLoading}
                  className="flex justify-center items-center bg-slate-900 bg-opacity-10 text-[#e67e22] backdrop-blur-sm h-full"
                >
                  <div className=" font-semibold select-none text-lg tracking-wider uppercase p-3 rounded-md w-fit">
                    Recover
                  </div>
                </motion.button>
                <motion.button
                  initial={{ translateX: "100%" }}
                  animate={{ translateX: 0 }}
                  exit={{
                    translateX: "-100%",
                    transition: { duration: 0.3, ease: "easeIn" },
                  }}
                  onClick={handleDeleteClick}
                  disabled={isLoading}
                  className="flex justify-center items-center bg-slate-900 bg-opacity-10 text-[#e67e22] backdrop-blur-sm h-full"
                >
                  <div className="font-semibold select-none text-lg tracking-wider uppercase p-3 rounded-md w-fit">
                    Delete
                  </div>
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center absolute inset-0 bg-slate-100 bg-opacity-10 backdrop-blur-sm">
          <div className="loader-4"></div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
