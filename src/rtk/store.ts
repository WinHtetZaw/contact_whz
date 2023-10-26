import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import { contactApi } from "./services/contactApi";
import userSlice from "./features/userSlice";
import contactSlice from "./features/contactSlice";

export const store = configureStore({
  reducer: {
    counterSlice: counterSlice,
    userSlice: userSlice,
    contactSlice: contactSlice,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
