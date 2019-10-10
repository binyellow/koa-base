import { ADD_COLUMNS, DELETE_COLUMNS } from "../constance/columns";

const initialState = {
  columns: []
};
export function columns(state = initialState, action) {
  switch (action.type) {
    case ADD_COLUMNS:
      return {
        ...state,
        columns: [...state.columns, ...action.payload]
      };
    case DELETE_COLUMNS:
      return {
        ...state,
        todoList: (state.todoList || []).filter(
          (item, index) => action.payload.index !== index
        )
      };
    default:
      return state;
  }
}
