export const actionTypes = {
  FETCHING_ACCOUNT: "FETCHING_ACCOUNT",
  FETCHING_ACCOUNT_SUCCESS: "FETCHING_ACCOUNT_SUCCESS",
  FETCHING_ACCOUNT_FAILED: "FETCHING_ACCOUNT_FAILED",
  DELETE_OR_SPAM_MESSAGES: "DELETE_OR_SPAM_MESSAGES"
};

export const fetching_init = () => {
  return {
    type: actionTypes.FETCHING_ACCOUNT
  };
};

export const fetching_success = results => {
  return {
    type: actionTypes.FETCHING_ACCOUNT_SUCCESS,
    payload: results
  };
};

export const fetching_fail = err => {
  return {
    type: actionTypes.FETCHING_ACCOUNT_FAILED,
    error: err
  };
};

export const updateCurrentAccount = async (dispatch, account) => {
  dispatch(fetching_init());
  try {
    dispatch(fetching_success(account));
  } catch (err) {
    dispatch(fetching_fail(err));
  }
};
