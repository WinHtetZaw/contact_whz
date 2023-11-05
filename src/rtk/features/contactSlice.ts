import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ResponseContact } from "../../shared/type";
import { getLocalStorage, setLocalStorage } from "../../shared/helper";

export interface InitialState {
  favorite: ResponseContact[];
  trash: ResponseContact[];
}

// type User

const initialState: InitialState = {
  favorite: [],
  trash: [],
};

if (getLocalStorage("contact_favorite")) {
  initialState.favorite = getLocalStorage("contact_favorite") ?? [];
}

if (getLocalStorage("contact_trash")) {
  initialState.trash = getLocalStorage("contact_trash") ?? [];
}

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    addFavorite: (state, { payload }: PayloadAction<ResponseContact>) => {
      state.favorite = [...state.favorite, payload];
      setLocalStorage("contact_favorite", state.favorite);
    },

    addFavoriteSelections: (
      state,
      { payload }: PayloadAction<ResponseContact[]>
    ) => {
      const filterId = state.favorite.map((el) => el.id);
      const filter = payload.filter((el) => !filterId.includes(el.id));

      state.favorite = [...state.favorite, ...filter];
      setLocalStorage("contact_favorite", state.favorite);
    },

    removeFavorite: (state, { payload }: PayloadAction<ResponseContact>) => {
      const filter = state.favorite.filter((el) => el.id !== payload.id);
      state.favorite = filter;
      setLocalStorage("contact_favorite", state.favorite);
    },

    removeFavoriteSelection: (
      state,
      { payload }: PayloadAction<ResponseContact[]>
    ) => {
      const filterId = payload.map((el) => el.id);
      const filter = state.favorite.filter((el) => !filterId.includes(el.id));

      state.favorite = filter;
      setLocalStorage("contact_favorite", state.favorite);
    },

    moveToTrash: (state, { payload }: PayloadAction<ResponseContact>) => {
      const filter = state.trash.filter((el) => el.id === payload.id);
      if (filter.length > 0) return;

      state.trash = [...state.trash, payload];
      setLocalStorage("contact_trash", state.trash);
    },

    moveToTrashSelections: (
      state,
      { payload }: PayloadAction<ResponseContact[]>
    ) => {
      const filterId = state.trash.map((el) => el.id);
      const filter = payload.filter((el) => !filterId.includes(el.id));

      // console.log(filter);
      // return;

      state.trash = [...state.trash, ...filter];
      setLocalStorage("contact_trash", state.trash);
    },

    recoverFromTrash: (state, { payload }: PayloadAction<ResponseContact>) => {
      const filter = state.trash.filter((el) => el.id !== payload.id);
      state.trash = filter;
      setLocalStorage("contact_trash", state.trash);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addFavorite,
  removeFavorite,
  removeFavoriteSelection,
  moveToTrash,
  recoverFromTrash,
  addFavoriteSelections,
  moveToTrashSelections,
} = contactSlice.actions;

export default contactSlice.reducer;
