import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import CreateContactForm from "./components/contacts/CreateContactForm";
import RootLayout from "./layouts/RootLayout";
import EditForm from "./components/contacts/EditForm";
import FavoritePage from "./pages/FavoritePage";
import TrashPage from "./pages/TrashPage";
import Contacts from "./pages/Contacts";
import Detail from "./pages/Detail";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <div className="">
      <Toaster position="top-right" />
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              <Contacts />
            </RootLayout>
          }
        />

        <Route
          path="profile"
          element={
            <RootLayout>
              <ProfilePage />
            </RootLayout>
          }
        />

        <Route
          path="detail/:id"
          element={
            <RootLayout>
              <Detail />
            </RootLayout>
          }
        />

        <Route
          path="/auth"
          element={
            <RootLayout>
              <AuthPage />
            </RootLayout>
          }
        />

        <Route
          path="/new"
          element={
            <RootLayout>
              <CreateContactForm />
            </RootLayout>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <RootLayout>
              <EditForm />
            </RootLayout>
          }
        />

        <Route
          path="/favorite"
          element={
            <RootLayout>
              <FavoritePage />
            </RootLayout>
          }
        />

        <Route
          path="/trash"
          element={
            <RootLayout>
              <TrashPage />
            </RootLayout>
          }
        />

        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </div>
  );
};

export default App;
