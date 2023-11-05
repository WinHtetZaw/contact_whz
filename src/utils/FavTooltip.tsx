import { Tooltip } from "@nextui-org/react";
import { useAppDispatch } from "../rtk/hooks";
import {
  addFavoriteSelections,
  removeFavoriteSelection,
} from "../rtk/features/contactSlice";
import { ResponseContact } from "../shared/type";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

type Props = {
  selections: ResponseContact[];
  setSelections: (value: ResponseContact[]) => void;
};

const FavTooltip = (props: Props) => {
  const { selections, setSelections } = props;
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleClick = () => {
    if (selections.length > 0) {
      toast.success("Successfully Added");
    } else {
      return;
    }

    if (location.pathname === "/favorite") {
      dispatch(removeFavoriteSelection(selections));
    } else {
      dispatch(addFavoriteSelections(selections));
    }
    setSelections([]);
  };
  return (
    <Tooltip
      content={
        <p className="text-[12px]">
          {location.pathname === "/favorite"
            ? "Select to Remove"
            : "Select to Favorite"}
        </p>
      }
      closeDelay={0}
    >
      <button onClick={handleClick} className=" mb-5 btn-3">
        {location.pathname === "/favorite" ? "remove" : "favorite"}
      </button>
    </Tooltip>
  );
};

export default FavTooltip;
