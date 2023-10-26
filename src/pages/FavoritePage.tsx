import { useAppSelector } from "../rtk/hooks";

const FavoritePage = () => {
  const { favorite } = useAppSelector((state) => state.contactSlice);
  console.log(favorite);
  return <div>FavoritePage</div>;
};

export default FavoritePage;
