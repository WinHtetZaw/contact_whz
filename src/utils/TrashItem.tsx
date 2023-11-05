import { GoTrash } from "react-icons/go";
import { useAppDispatch } from "../rtk/hooks";
import { ResponseContact } from "../shared/type";
import { moveToTrash, removeFavorite } from "../rtk/features/contactSlice";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  contact: ResponseContact;
};

const TrashItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  
  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This contact can be recovered from the trash!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(3 105 161)",
      cancelButtonColor: "rgb(190 18 60)",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "The contact has been moved to the trash.", "success");
        toast.success("The contact has been moved to the trash");
        dispatch(moveToTrash(props.contact));
        dispatch(removeFavorite(props.contact));
        if (location.pathname.split("/").includes("detail")) {
          navigate("/");
        }
      }
    });
  };
  return (
    <span onClick={handleClick}>
      <GoTrash />
    </span>
  );
};

export default TrashItem;
