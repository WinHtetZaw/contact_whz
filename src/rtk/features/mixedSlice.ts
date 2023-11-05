import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface State {
  isSidebarOpen: boolean | "toggle";
  contactLength: number;
}

const initialState: State = {
  isSidebarOpen: innerWidth < 640 ? false : true,
  contactLength: 0,
};

export const mixedSlice = createSlice({
  name: "mixedSlice",
  initialState,
  reducers: {
    setIsSidebarOpen: (
      state,
      { payload }: PayloadAction<boolean | "toggle">
    ) => {
      if (payload === "toggle") {
        state.isSidebarOpen = !state.isSidebarOpen;
      }

      if (typeof payload === "boolean") {
        payload ? (state.isSidebarOpen = true) : (state.isSidebarOpen = false);
      }
    },
    setContactLength: (state, { payload }: PayloadAction<number>) => {
      state.contactLength = payload;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setIsSidebarOpen, setContactLength } = mixedSlice.actions;

export default mixedSlice.reducer;
