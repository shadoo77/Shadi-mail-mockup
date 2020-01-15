import { actionTypes } from "../actions/accounts";

export default (state, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_ACCOUNTS:
      return {
        ...state,
        hasFailed: false,
        isLoading: true
      };
    case actionTypes.FETCHING_ACCOUNTS_SUCCESS:
      return {
        ...state,
        hasFailed: false,
        isLoading: false,
        items: action.payload
      };
    case actionTypes.UPDATE_READ_UNREAD:
      const accountIndex = state.items
        .map(item => item._id)
        .indexOf(action.payload.accountId);
      const mailIndex = state.items[accountIndex].mail
        .map(mail => mail._id)
        .indexOf(action.payload.msgId);
      state.items[accountIndex].mail[mailIndex].read = true;
      //.splice(removeIndex, 1);
      return {
        ...state,
        hasFailed: false,
        isLoading: false,
        items: state.items
      };
    case actionTypes.FETCHING_ACCOUNTS_FAILED:
      return {
        ...state,
        hasFailed: true,
        isLoading: false,
        errormessage: action.error
      };
    default:
      return state;
  }
};
