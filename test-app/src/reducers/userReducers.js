import {
  FETCHING_USERS,
  SUCCESS_GETTING_USERS,
  FAILURE_GETTING_USERS
} from "../actions";

const intitalState = {
  users: [],
  fetching: false,
  error: ""
};

export const userReducers = (state = intitalState, action) => {
  switch (action.type) {
    case FETCHING_USERS:
      return {
        fetching: true,
        error: ""
      };
    case SUCCESS_GETTING_USERS:
      return {
        fetching: false,
        users: action.payload,
        error: ""
      };
    case FAILURE_GETTING_USERS:
      return {
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
