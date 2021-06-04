import { INSERT_TASK, GET_TASKS } from "../actions/types";

const tasksReducer = (state = {}, action) => {
  switch (action.type) {
    case INSERT_TASK:
      return { ...state, [action.payload.id]: action.payload };
    case GET_TASKS:
      return action.payload.reduce((a, b) => {
        a = { ...a, [b.id]: b };
        return a;
      }, {});
    default:
      return state;
  }
};

export default tasksReducer;
