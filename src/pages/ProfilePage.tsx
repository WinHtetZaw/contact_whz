import { useMemo } from "react";
import { useAppSelector } from "../rtk/hooks";
import { useGetProfileQuery } from "../rtk/services/contactApi";
import MainLoading from "../components/MainLoading";
import BackBtn from "../utils/BackBtn";
import PasswordChangeForm from "../components/PasswordChangeForm";
import { Button, Tooltip } from "@nextui-org/react";

const ProfilePage = () => {
  const { user: userData } = useAppSelector((state) => state.userSlice);
  const { data, isLoading, status } = useGetProfileQuery(userData?.token);

  const user = data?.user;

  const firstLetter = useMemo(() => {
    return user?.name.split("")[0];
  }, [user]);

  return (
    <>
      {isLoading || status === "pending" ? (
        <div className=" w-full h-main h-full flex items-center justify-center">
          <MainLoading />
        </div>
      ) : (
        <main className="p-5 min-w-[300px]">
          <section className="flex justify-between items-center">
            <BackBtn />

            <PasswordChangeForm />
          </section>
          <section className="mt-10">
            <div className="flex flex-col w-fit mx-auto sm:flex-row items-center gap-5 flex-1">
              <span className=" peer hover:shadow-2 transition-shadow duration-100 flex items-center justify-center w-24 rounded-full aspect-square bg-orange-500 text-slate-50">
                <h3 className="text-[30px] select-none">{firstLetter}</h3>
              </span>
              <h1 className=" peer-hover:screw-1 transition-transform duration-75 text-lg font-semibold tracking-wider uppercase">
                {user.name}
              </h1>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3">
            <section className=" w-full mt-10 card-1">
              <h2 className="title-1 mb-3">Personal Information</h2>
              <span className="flex gap-1">
                <h3>Name ----------</h3>

                <h3>{user.name}</h3>
              </span>

              <span className="flex gap-1">
                <h3>Email ----------</h3>
                <h3>{user.email}</h3>
              </span>
            </section>

            <section className="mt-10 mx-auto w-full card-1">
              <h2 className="title-1 mb-3">address</h2>

              <span className="flex gap-1">
                <h3>Country ----------</h3>
                <h3>Italy</h3>
              </span>

              <span className="flex gap-1">
                <h3>State ----------</h3>
                <h3>Pennsylvania</h3>
              </span>

              <span className="flex gap-1">
                <h3>City ----------</h3>
                <h3>Chico</h3>
              </span>

              <span className="flex gap-1">
                <h3>Street ----------</h3>
                <h3>764 Barton Road</h3>
              </span>
            </section>

            <section className="mt-10 w-full card-1">
              <h2 className="title-1 mb-3">about</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Quaerat sequi fugiat accusamus saepe eveniet voluptatem delectus
                veniam accusantium distinctio. Placeat, laudantium. Ullam
                aliquam in cupiditate aut, expedita ex est aperiam.
              </p>
            </section>
          </div>

          <section className="mt-10 w-full text-end">
            <Tooltip
              content={"This feature is currently unavailable!"}
              closeDelay={0}
            >
              <Button className="" variant="light" color="danger">
                Delete Account
              </Button>
            </Tooltip>
          </section>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
