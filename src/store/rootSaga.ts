import { all, fork } from "redux-saga/effects";
import { watchUser } from "./userSaga";
import { watchCart } from "./cartSaga";
import { watchAlert } from "./alertSaga";

export function* rootSaga(): Generator<any, void, any> {
  yield all([
    fork(watchUser),
    fork(watchCart),
    fork(watchAlert),
  ]);
}
