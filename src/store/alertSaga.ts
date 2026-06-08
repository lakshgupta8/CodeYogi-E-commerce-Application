import { delay, put, takeLatest } from "redux-saga/effects";
import { showAlert, setFading, removeAlert } from "./alertSlice";

function* handleShowAlertSaga(): Generator<any, void, any> {
  yield delay(5000);
  yield put(setFading(true));
  yield delay(500);
  yield put(removeAlert());
}

export function* watchAlert(): Generator<any, void, any> {
  yield takeLatest(showAlert.type, handleShowAlertSaga);
}
