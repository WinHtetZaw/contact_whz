import { Tooltip } from "@nextui-org/react";
import { useAppDispatch } from "../rtk/hooks";
import {
  moveToTrashSelections,
  removeFavoriteSelection,
} from "../rtk/features/contactSlice";
import { ResponseContact } from "../shared/type";
import { toast } from "react-hot-toast";

type Props = {
  selections: ResponseContact[];
  setSelections: (value: ResponseContact[]) => void;
};

const TrashTooltip = (props: Props) => {
  const { selections, setSelections } = props;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (selections.length > 0) {
      toast.success("Successfully Added");
    } else {
      return;
    }

    dispatch(moveToTrashSelections(selections));
    dispatch(removeFavoriteSelection(selections));
    setSelections([]);
  };
  return (
    <Tooltip
      content={<p className="text-[12px]">Select to Trash</p>}
      closeDelay={0}
    >
      <button type="button" onClick={handleClick} className=" mb-5 btn-3">
        trash
      </button>
    </Tooltip>
  );
};

export default TrashTooltip;
