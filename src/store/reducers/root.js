import accountsReducer from "./accountsReducer";
import currentAccountsReducer from "./currentAccountReducer";
import selectedMessagesReducer from "./selectedMessagesReducer";

const combineReducers = reducers => {
  return (state = {}, action) => {
    const keys = Object.keys(reducers);
    const nextReducers = {};
    for (const key of keys) {
      const invoke = reducers[key](state[key], action);
      nextReducers[key] = invoke;
    }
    return nextReducers;
  };
};

const rootReducer = combineReducers({
  accounts: accountsReducer,
  currentAccount: currentAccountsReducer,
  selectedMessages: selectedMessagesReducer
});

export default rootReducer;
