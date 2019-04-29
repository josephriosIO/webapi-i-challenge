import axios from "axios";

export const FETCHING_USERS = "FETCHING_USERS";
export const SUCCESS_GETTING_USERS = "SUCCESS_GETTING_USERS";
export const FAILURE_GETTING_USERS = "FAILURE_GETTING_USERS";

export const getUsers = () => async dispatch => {
  dispatch({
    type: FETCHING_USERS
  });
  try {
    const res = await axios.get("http://localhost:5000/api/users");
    dispatch({
      type: SUCCESS_GETTING_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FAILURE_GETTING_USERS,
      payload: "oops failure getting users"
    });
  }
};
