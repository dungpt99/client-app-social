import actions from "../actions";
import types from "../types";

const initial_state = {
  userData: {},
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LOGIN_START:
      return { userData: {} };
    case types.LOGIN_SUCCESS:
      return { userData: action.payload };
    case types.LOGIN_FAILURE:
      return { userData: {} };
    default:
      return { ...state };
  }
}
