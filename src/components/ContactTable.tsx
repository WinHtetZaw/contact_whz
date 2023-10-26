import { useState } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { LuFileEdit } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { useAppSelector } from "../rtk/hooks";
import { useContactsQuery } from "../rtk/services/contactApi";
import { ResponseContact } from "../shared/type";
import {
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import AddToFavorite from "./AddToFavorite";

const ContactTable = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { data } = useContactsQuery(user?.token);
  const [selections, setSelections] = useState<ResponseContact[]>([]);
  // console.log(data);
  // console.log(selections);

  const contacts = data?.contacts.data;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item?: ResponseContact
  ) => {
    let isChecked = e.target.checked;
    const name = e.target.name;

    // console.log(item);

    if (item && name !== "all") {
      if (isChecked) {
        isChecked = false;
        setSelections([...selections, { ...item }]);
      } else {
        isChecked = true;
        const filter = selections?.filter((el) => el.email !== name);
        setSelections(filter);
      }
    } else {
      isChecked ? setSelections([...contacts]) : setSelections([]);
    }
  };

  const findId = (id: number, contactArray: ResponseContact[]) => {
    const arr1 = contactArray.map((el) => el.id);
    const arr2 = arr1.find((el) => el === id);
    return arr2;
  };

  return (
    <>
      {/* header  */}
      <article className="p-5">
        <header className=" w-full mb-7 py-1 grid grid-cols-12 border-b-[1.5px] border-slate-400">
          <span>
            <Checkbox
              isIndeterminate={selections.length > 0}
              isSelected={selections.length > 0}
              onChange={handleInputChange}
              name={"all"}
              size="sm"
              color="default"
              className="table-checkbox m-0"
            />
          </span>
          <span className=" table-header col-span-3 max-md:col-span-7">
            title
          </span>
          <span className=" table-header col-span-2 max-md:hidden">phone</span>
          <span className=" table-header col-span-3 max-md:hidden">email</span>
          <span className=" table-header col-span-2 max-md:hidden">
            address
          </span>
          <span className="table-option capitalize">opt</span>
          <span className="table-option capitalize md:hidden">favorite</span>
        </header>

        <main className=" w-full">
          <ul className=" w-full">
            {contacts?.map((el: ResponseContact, index: number) => (
              <li
                key={index}
                className="py-1 even:bg-slate-200 hover:bg-slate-600 hover:text-slate-100  rounded grid grid-cols-12 transition-all duration-100"
              >
                <span>
                  <Checkbox
                    size="sm"
                    color="default"
                    isSelected={findId(el.id, selections) ? true : false}
                    onChange={(e) => handleInputChange(e, el)}
                    name={el.email}
                    className="table-checkbox m-0"
                  />
                </span>
                <span className="table-item col-span-3 max-md:col-span-7">
                  {el.name}
                </span>
                <span className="table-item col-span-2 max-md:hidden">
                  {el.phone}
                </span>
                <span className="table-item col-span-3 max-md:hidden">
                  {el.email}
                </span>
                <span className="table-item col-span-2 max-md:hidden">
                  {el.address}
                </span>
                <span className="block col-span-1 max-md:col-span-2">
                  <Dropdown>
                    <DropdownTrigger className=" outline-none">
                      <button className="flex justify-center items-center w-full h-full">
                        <PiDotsThreeVerticalBold className="text-2xl" />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="favorite" textValue="favorite">
                        <span className="flex items-center gap-3">
                          <AddToFavorite contact={el} />
                          <h3 className=" capitalize">add to favorite</h3>
                        </span>
                      </DropdownItem>
                      <DropdownItem key="edit" textValue="edit">
                        <Link to={`edit/${el.id}`} state={{ stateContact: el }}>
                          <span className="flex items-center gap-3">
                            <LuFileEdit />
                            <h3 className=" capitalize">edit</h3>
                          </span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem
                        key="trash"
                        textValue="trash"
                        color="danger"
                      >
                        <span className="flex items-center gap-3">
                          <GoTrash />
                          <h3 className=" capitalize">move to trash</h3>
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </span>
                <span className="table-option md:hidden">
                  <AddToFavorite contact={el} />
                </span>
              </li>
            ))}
          </ul>
        </main>
      </article>
    </>
  );
};

export default ContactTable;
