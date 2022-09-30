import { configureStore } from "@reduxjs/toolkit";
import mykeys from "../slices/KeysSlice";
import myusers from "../slices/UsersSlice";
const store = configureStore({
  reducer: {
    mykeys: mykeys,
    myusers: myusers,
  },
});

export default store;
