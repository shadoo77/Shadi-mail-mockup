export default (state, action) => {
  switch (action.type) {
    case "SELECT_MESSAGES":
      return {
        ...state,
        checked: action.payload
      };
    default:
      return state;
  }
};
