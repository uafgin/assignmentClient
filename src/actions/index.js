import { INSERT_TASK, GET_TASKS } from "./types";
import taskApi from "../apis/tasks";

export const insertTask = (formValues) => async (dispatch) => {
  const reaponse = await taskApi.post("/Tasks", formValues);
  dispatch({
    type: INSERT_TASK,
    payload: reaponse.data,
  });
};

export const getTasks = () => async (dispatch) => {
  const response = await taskApi.get("/Tasks");
  dispatch({
    type: GET_TASKS,
    payload: response.data,
  });
};
