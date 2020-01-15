export const actionTypes = {
  FETCHING_ACCOUNTS: "FETCHING_ACCOUNTS",
  FETCHING_ACCOUNTS_SUCCESS: "FETCHING_ACCOUNTS_SUCCESS",
  FETCHING_ACCOUNTS_FAILED: "FETCHING_ACCOUNTS_FAILED",
  UPDATE_READ_UNREAD: "UPDATE_READ_UNREAD"
};

export const fetching_init = () => {
  return {
    type: actionTypes.FETCHING_ACCOUNTS
  };
};

export const fetching_success = results => {
  return {
    type: actionTypes.FETCHING_ACCOUNTS_SUCCESS,
    payload: results
  };
};

export const fetching_fail = err => {
  return {
    type: actionTypes.FETCHING_ACCOUNTS_FAILED,
    error: err
  };
};

export const fetchAccounts = async (dispatch, data) => {
  dispatch(fetching_init());
  try {
    dispatch(fetching_success(data));
  } catch (err) {
    dispatch(fetching_fail(err));
  }
};

export const updateReadUnread = async (dispatch, accountId, msgId) => {
  dispatch(fetching_init());
  try {
    dispatch({
      type: actionTypes.UPDATE_READ_UNREAD,
      payload: { accountId, msgId }
    });
  } catch (err) {
    dispatch(fetching_fail(err));
  }
};
