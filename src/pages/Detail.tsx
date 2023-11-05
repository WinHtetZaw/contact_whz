import { useMemo } from "react";
import { useGetContactQuery } from "../rtk/services/contactApi";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../rtk/hooks";
import { ResponseContact } from "../shared/type";
import AddToFavorite from "../components/AddToFavorite";
import { LuFileEdit } from "react-icons/lu";
import TrashItem from "../utils/TrashItem";
import MainLoading from "../components/MainLoading";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import BackBtn from "../utils/BackBtn";

const Detail = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { id } = useParams();
  const { data, isLoading, status } = useGetContactQuery({
    token: user?.token,
    id,
  });

  const contact = data?.contact as ResponseContact;

  const firstLetter = useMemo(() => {
    return contact?.name.split("")[0];
  }, [contact]);

  const dateFormatter = (originalDateString: string) => {
    const originalDate: Date = new Date(originalDateString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
      // timeZoneName: "short",
    };
    const formattedDate: string = new Intl.DateTimeFormat(
      "en-US",
      options
    ).format(originalDate);

    return formattedDate;
  };

  return (
    <>
      {isLoading || status === "pending" ? (
        <div className=" w-full h-main h-full flex items-center justify-center">
          <MainLoading />
        </div>
      ) : (
        <main className="p-5 min-w-[300px]">
          <div className="flex items-center justify-between">
            <BackBtn />

            <div className="text-xl gap-5 flex justify-end items-start">
              <AddToFavorite contact={contact} />
              <Link
                to={`/edit/${contact?.id}`}
                state={{ stateContact: contact }}
              >
                <LuFileEdit />
              </Link>
              <TrashItem contact={contact} />
            </div>
          </div>
          <section className=" px-5 py-10">
            <div className="flex flex-col md:flex-row items-center gap-5 flex-1">
              <span className="peer hover:shadow-2 transition-shadow duration-100 flex items-center justify-center w-24 rounded-full aspect-square bg-orange-500 text-slate-50">
                <h3 className="text-[30px] select-none">{firstLetter}</h3>
              </span>
              <h2 className=" peer-hover:screw-1 transition-transform duration-100 title-2">
                {contact.name}
              </h2>
            </div>
          </section>

          <section className=" px-5 overflow-x-auto card-1">
            <h2 className=" font-semibold">Contact Detail</h2>

            <div className="mt-5 flex flex-col gap-2">
              <span>
                <AiOutlinePhone className=" float-left mt-1 mr-2" />
                <p>{Math.abs(contact.phone)}</p>
              </span>
              <span>
                <AiOutlineMail className=" float-left mt-1 mr-2" />
                <p className="w-full">{contact.email}</p>
              </span>
              <span>
                <FaRegAddressCard className=" float-left mt-1 mr-2" />
                <p className="w-full">{contact.address}</p>
              </span>
            </div>

            <div className="mt-10 space-y-1">
              <h2>Last edited #{dateFormatter(contact.updated_at)}</h2>
              <h2>Added to contact #{dateFormatter(contact.created_at)}</h2>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Detail;
