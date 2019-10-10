import { ADD_COLUMNS, DELETE_COLUMNS } from '../constance/columns';

export function addColumns(payload: any) {
  return {
    payload,
    type: ADD_COLUMNS,
  }
}
export function deleteColumns(payload: any) {
  return {
    payload,
    type: DELETE_COLUMNS,
  }
}
