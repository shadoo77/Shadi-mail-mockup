import { actionTypes } from "../actions/currentAccount";

export default (state, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_ACCOUNT:
      return {
        ...state,
        hasFailed: false,
        isLoading: true
      };
    case actionTypes.FETCHING_ACCOUNT_SUCCESS:
      return {
        ...state,
        hasFailed: false,
        isLoading: false,
        data: action.payload
      };
    case actionTypes.FETCHING_ACCOUNT_FAILED:
      return {
        ...state,
        hasFailed: true,
        isLoading: false,
        errormessage: action.error
      };
    case actionTypes.DELETE_OR_SPAM_MESSAGES:
      const newData = state.data;
      action.payload.messages.forEach(el => {
        newData.mail.forEach(msg => {
          if (msg._id === el) msg.belongTo = action.payload.cont;
        });
      });
      return {
        ...state,
        hasFailed: true,
        isLoading: false,
        data: newData
      };
    default:
      return state;
  }
};
