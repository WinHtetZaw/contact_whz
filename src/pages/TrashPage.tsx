import { AnimatePresence, motion } from "framer-motion";
import ContactCard from "../components/ContactCard";
import { useAppSelector } from "../rtk/hooks";
import { ResponseContact } from "../shared/type";
import { containerVariant, itemVariant } from "../shared/variants";

const TrashPage = () => {
  const { trash } = useAppSelector((state) => state.contactSlice);

  return (
    <main className="p-5">
      <h1 className="py-5 uppercase font-bold text-lg">
        <span className="mr-3">trash</span>
        <span>({trash.length})</span>
      </h1>
      {trash.length > 0 ? (
        <motion.main
          initial="hidden"
          animate="show"
          variants={containerVariant}
          className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <AnimatePresence>
            {trash?.map((el: ResponseContact, index) => (
              <motion.div variants={itemVariant} key={index} className="">
                <ContactCard contact={el} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.main>
      ) : (
        <h2>No contact in trash.</h2>
      )}
    </main>
  );
};

export default TrashPage;
