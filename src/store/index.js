import React, { createContext, useReducer } from "react";
import rootReducers from "./reducers/root";

const RootContext = createContext();

const initialAccountsState = {
  hasFailed: false,
  isLoading: false,
  items: [],
  errormessage: ""
};

const initCurrentAccountState = {
  hasFailed: false,
  isLoading: false,
  data: {},
  errormessage: ""
};

const initState = {
  accounts: initialAccountsState,
  currentAccount: initCurrentAccountState,
  selectedMessages: { checked: [] }
};

const RootContextProvider = props => {
  const [state, dispatch] = useReducer(rootReducers, initState);
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RootContext.Provider>
  );
};

export { RootContext, RootContextProvider };
