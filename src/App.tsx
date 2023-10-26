import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import CreateContactForm from "./components/contacts/CreateContactForm";
import RootLayout from "./layouts/RootLayout";
import EditForm from "./components/contacts/EditForm";
import FavoritePage from "./pages/FavoritePage";
import TrashPage from "./pages/TrashPage";

const App = () => {
  return (
    <div className=" max-w-[1280px] mx-auto">
      <Toaster position="top-right" />
      <RootLayout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route path="new" element={<CreateContactForm />} />
          <Route path="edit/:id" element={<EditForm />} />
          <Route path="favorite" element={<FavoritePage />} />
          <Route path="trash" element={<TrashPage />} />
        </Routes>
      </RootLayout>
    </div>
  );
};

export default App;
