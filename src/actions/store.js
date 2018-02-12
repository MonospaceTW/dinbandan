import types from "../constants/actionTypes";

export const handleCreateStore = payload => ({
  type: types.CREATE_STORE,
  payload
});
