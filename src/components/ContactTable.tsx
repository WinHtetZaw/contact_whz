import { useState } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { LuFileEdit } from "react-icons/lu";
import { ResponseContact } from "../shared/type";
import {
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import AddToFavorite from "./AddToFavorite";
import TrashItem from "../utils/TrashItem";
import FavTooltip from "../utils/FavTooltip";
import TrashTooltip from "../utils/TrashTooltip";

type Props = {
  data: ResponseContact[];
  contactTitles: { name: string; style: string }[];
};

const ContactTable = (props: Props) => {
  const [selections, setSelections] = useState<ResponseContact[]>([]);
  const navigate = useNavigate();
  const contacts: ResponseContact[] = props?.data;

  const handleContactClick = (contact: ResponseContact) => {
    // e.stopPropagation()
    navigate(`/detail/${contact.id}`, { state: { contact } });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item?: ResponseContact
  ) => {
    let isChecked = e.target.checked;
    const name = e.target.name;

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
      // console.log(contacts);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLElement>) => {
    const currentElement = e.currentTarget as HTMLElement;
    const firstChildElement = currentElement.children[0] as HTMLElement;
    firstChildElement.click();
  };

  const handleTrashClick = (e: React.MouseEvent<HTMLElement>) => {
    const currentElement = e.currentTarget as HTMLElement;
    const firstChildElement = currentElement.children[0] as HTMLElement;
    firstChildElement.click();
  };

  const findId = (id: number, contactArray: ResponseContact[]) => {
    const arr1 = contactArray.map((el) => el.id);
    const arr2 = arr1.find((el) => el === id);
    return arr2;
  };

  return (
    <>
      {/* header  */}
      <article className="py-5 mb-10 w-full overscroll-x-auto">
        <div className=" space-x-5">
          <FavTooltip selections={selections} setSelections={setSelections} />
          <TrashTooltip selections={selections} setSelections={setSelections} />
        </div>
        <main className=" w-full  overflow-auto">
          <div className="min-w-[400px] ">
            <header className="flex w-full mb-7 py-1  border-b-[1.5px] border-slate-400">
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
              <div className=" w-full grid grid-cols-12">
                {props?.contactTitles.map((title, index) => (
                  <span key={index} className={title.style}>
                    {title.name}
                  </span>
                ))}
              </div>
            </header>

            <section className=" w-full">
              <div className=" w-full">
                {contacts?.map((el: ResponseContact, index: number) => (
                  <section
                    onClick={() => handleContactClick(el)}
                    key={index}
                    className="py-1 even:bg-slate-50 hover:bg-orange-50 rounded flex transition-all duration-100"
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
                    <div className=" w-full grid grid-cols-12">
                      <span className="table-item col-span-2 max-md:col-span-7">
                        {el.name}
                      </span>
                      <span className="table-item col-span-2 max-md:hidden">
                        {Math.abs(el.phone)}
                      </span>
                      <span className="table-item w-full col-span-3 max-md:hidden">
                        {el.email}
                      </span>
                      <span className="table-item w-full col-span-4 max-md:hidden">
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
                              <span
                                onClick={handleFavoriteClick}
                                className="flex items-center gap-3"
                              >
                                <AddToFavorite contact={el} />
                                <h3 className=" capitalize">favorite</h3>
                              </span>
                            </DropdownItem>
                            <DropdownItem key="edit" textValue="edit">
                              <Link
                                to={`/edit/${el.id}`}
                                state={{ stateContact: el }}
                              >
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
                              className="p-0 "
                            >
                              <span
                                onClick={handleTrashClick}
                                className="px-2 py-1 flex flex-row items-center gap-3"
                              >
                                <TrashItem contact={el} />
                                <h3 className=" capitalize">move to trash</h3>
                              </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </span>
                      <span className="table-option flex justify-center items-center md:hidden max-md:col-span-3">
                        <AddToFavorite contact={el} />
                      </span>
                    </div>
                  </section>
                ))}
              </div>
            </section>
          </div>
        </main>
      </article>
    </>
  );
};

export default ContactTable;
