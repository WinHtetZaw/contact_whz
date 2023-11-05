import { useEffect, useState, useMemo } from "react";
import ContactTable from "../components/ContactTable";
import { useAppSelector } from "../rtk/hooks";
import { contactTitles } from "../shared/data";
import { ResponseContact } from "../shared/type";
import { useContactsQuery } from "../rtk/services/contactApi";
import { useDispatch } from "react-redux";
import { setContactLength } from "../rtk/features/mixedSlice";
import MainLoading from "../components/MainLoading";




const Contacts = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { data, isLoading, status, refetch } = useContactsQuery(user?.token);
  const { trash } = useAppSelector((state) => state.contactSlice);
  const [contactArray, setContactArray] = useState<ResponseContact[]>([]);
  const dispatch = useDispatch();

  const contacts = data?.contacts.data as ResponseContact[];

  useMemo(() => {
    return contactArray;
  }, [contacts, trash]);

  useEffect(() => {
    if (trash.length > 0) {
      const filterId = trash?.map((el) => el.id);
      const filterContacts = contacts?.filter(
        (el) => !filterId.includes(el.id)
      );
      setContactArray(filterContacts);
    } else {
      refetch();
      setContactArray(contacts);
    }
  }, [contacts, trash]);

  useEffect(() => {
    if (contactArray?.length > 0) {
      dispatch(setContactLength(contactArray.length));
    }
  }, [contactArray]);

  return (
    <main className=" p-5 w-full h-main flex flex-col">
      <h1 className="py-5 uppercase font-bold text-lg">
        <span className="mr-3">contacts</span>
        <span>({contactArray ? contactArray.length : 0})</span>
      </h1>

      {contactArray && contactArray.length === 0 ? (
        <div>No contact yet.</div>
      ) : (
        <>
          {isLoading || status === "pending" ? (
            <div className="w-full flex-1 flex items-center justify-center">
              <MainLoading />
            </div>
          ) : (
            <ContactTable data={contactArray} contactTitles={contactTitles} />
          )}
        </>
      )}
    </main>
  );
};

export default Contacts;
