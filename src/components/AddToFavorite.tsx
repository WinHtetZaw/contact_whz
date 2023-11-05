import { BsStar, BsStarFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { addFavorite, removeFavorite } from "../rtk/features/contactSlice";
import { ResponseContact } from "../shared/type";
import { toast } from "react-hot-toast";

type Props = {
  contact: ResponseContact;
};

const AddToFavorite = (props: Props) => {
  const { favorite } = useAppSelector((state) => state.contactSlice);
  const dispatch = useAppDispatch();

  const filter = favorite.find((el) => el.id === props.contact.id);

  const handleAddClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    toast.success("Successfully added to favorite!")
    dispatch(addFavorite(props.contact));
  };

  const handleRemoveClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    toast.success("Successfully remove!")
    dispatch(removeFavorite(props.contact));
  };

  return (
    <>
      {/* <span className="flex items-center gap-3"> */}
      {filter ? (
        <span onClick={handleRemoveClick}>
          <BsStarFill className="text-1" />
        </span>
      ) : (
        <span onClick={handleAddClick}>
          <BsStar />
        </span>
      )}
      {/* <h3 className=" capitalize">add to favorite</h3>
      </span> */}
    </>
  );
};

export default AddToFavorite;
