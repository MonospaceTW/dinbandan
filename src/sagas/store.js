// import { put } from "redux-saga/effects";
import FirebaseManager from "../utils/FirebaseManager";

export function* createStoreSaga({payload}) {
  const {data} = payload;
  try {
    const store = yield FirebaseManager.addNewData("stores/", data);
    console.log(store);
  } catch (error) {
    console.log(error);
  }

  console.log("create store saga");
}
