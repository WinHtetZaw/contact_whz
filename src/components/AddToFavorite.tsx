import { BsStar, BsStarFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { addFavorite, removeFavorite } from "../rtk/features/contactSlice";
import { ResponseContact } from "../shared/type";

type Props = {
  contact: ResponseContact;
};

const AddToFavorite = (props: Props) => {
  const { favorite } = useAppSelector((state) => state.contactSlice);
  const dispatch = useAppDispatch();

  const filter = favorite.find((el) => el.id === props.contact.id);

  return (
    <>
      {filter ? (
        <span onClick={() => dispatch(removeFavorite(props.contact))}>
          <BsStarFill className="text-sky-700" />
        </span>
      ) : (
        <span onClick={() => dispatch(addFavorite(props.contact))}>
          <BsStar />
        </span>
      )}
    </>
  );
};

export default AddToFavorite;
