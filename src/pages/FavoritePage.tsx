import { useAppSelector } from "../rtk/hooks";
import { contactTitles } from "../shared/data";
import ContactTable from "../components/ContactTable";
// import { containerVariant, itemVariant } from "../shared/variants";

const FavoritePage = () => {
  const { favorite } = useAppSelector((state) => state.contactSlice);
  return (
    <div className="p-5 min-w-[300px]">
      <h1 className="py-5 uppercase font-bold text-lg">
        <span className="mr-3">favorite contacts</span>
        <span>({favorite.length})</span>
      </h1>
      {favorite.length > 0 ? (
        <ContactTable data={favorite} contactTitles={contactTitles} />
      ) : (
        <div>No contact in favorite.</div>
      )}
    </div>
  );
};

export default FavoritePage;
