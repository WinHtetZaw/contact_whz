import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../shared/type";
import { getLocalStorage, setLocalStorage } from "../../shared/helper";

export interface CounterState {
  user: User | null;
}

// type User

const initialState: CounterState = {
  user: null,
};

if (getLocalStorage("contact_user")) {
  initialState.user = getLocalStorage("contact_user");
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      setLocalStorage("contact_user", state.user);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
