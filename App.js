import TopContainer from "./navigation/topContainer";
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todoSlice";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    todo: todoSlice
  }
})

export default function App() {
  return (
      <Provider store={store}>
        <TopContainer />
      </Provider>
  );
}