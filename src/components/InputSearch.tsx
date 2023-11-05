import { BsSearch } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../rtk/hooks";
import { useContactsQuery } from "../rtk/services/contactApi";
import { ResponseContact } from "../shared/type";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const InputSearch = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { data } = useContactsQuery(user?.token);
  const searchQuery = useRef<string>("");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [results, setResults] = useState<ResponseContact[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const activeContact = useRef<ResponseContact | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.current.length > 0) {
      setInputValue(searchQuery.current);
    } else {
      setInputValue("");
    }
  }, [searchQuery.current]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedItem, results]);

  function handleKeyPress(this: Window, ev: KeyboardEvent) {
    switch (ev.key) {
      case "ArrowDown": {
        ev.preventDefault();
        if (selectedItem === null || selectedItem === results.length - 1) {
          setSelectedItem(0);
        } else {
          setSelectedItem(selectedItem + 1);
        }
        break;
      }

      case "ArrowUp": {
        ev.preventDefault();
        if (selectedItem === null || selectedItem === 0) {
          setSelectedItem(results.length - 1);
        } else {
          setSelectedItem(selectedItem - 1);
        }
        break;
      }

      case "Enter": {
        ev.preventDefault();
        if (activeContact.current) {
          const id = activeContact.current.id;
          searchQuery.current = "";
          setSelectedItem(null);
          activeContact.current = null;
          navigate(`/detail/${id}`);
        }
      }
    }
  }

  const contacts = data?.contacts?.data as ResponseContact[];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchQuery.current = e.target.value;
    // const searchString = e.target.value;
    const filter = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.current.toLowerCase())
    );
    setResults(filter);
  };

  const resultRendering = results?.map((el, index) => {
    if (selectedItem === index) {
      activeContact.current = el;
    }

    return (
      <li
        key={el.id}
        onClick={() => handleClick(el)}
        className={`${
          selectedItem === index ? "bg-slate-200" : "hover:bg-orange-50"
        } py-1 px-2 rounded select-none cursor-pointer transition-background duration-[0.2s]`}
      >
        {el.name}
      </li>
    );
  });

  const handleClick = (el: ResponseContact) => {
    setSelectedItem(null);
    searchQuery.current = "";
    activeContact.current = null;
    navigate(`/detail/${el.id}`);
  };

  const handleClear = () => {
    searchQuery.current = "";
    setSelectedItem(null);
    setInputValue("");
    activeContact.current = null;
  };

  const handleBlur = () => {
    setIsFocus(false);
    setSelectedItem(null);
    activeContact.current = null;
  };

  return (
    <section className="relative w-full max-w-[700px] mx-auto flex px-3 py-1 rounded items-center bg-slate-200 text-slate-950">
      <input
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocus(true)}
        onBlur={handleBlur}
        className=" z-20 w-full outline-none bg-transparent placeholder:text-slate-700 placeholder:select-none"
        placeholder="Search..."
        type="text"
      />

      {(searchQuery.current.length > 0 || isFocus) && (
        // <button onClick={() => setSearchQuery("")} className="px-3">
        <button onClick={handleClear} className="px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <span className="border-l border-l-slate-700 pl-3">
        <BsSearch />
      </span>

      <AnimatePresence>
        {results.length > 0 && searchQuery.current.length > 0 && isFocus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15, ease: "easeIn" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, ease: "easeOut" },
            }}
            className=" absolute z-50 w-full left-0 p-3 rounded-md shadow-1 top-10 bg-white"
          >
            <ul>{resultRendering}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InputSearch;
