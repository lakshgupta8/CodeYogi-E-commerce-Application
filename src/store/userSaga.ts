import { call, put, takeLatest, select } from "redux-saga/effects";
import { getAuthUser } from "../api";
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  loginSuccess,
  logout,
  selectToken,
} from "./userSlice";
import { type AuthResponse } from "../types";

function* fetchUserSaga(): Generator<any, void, any> {
  const token: string | null = yield select(selectToken);
  if (token) {
    try {
      const response: AuthResponse = yield call(getAuthUser, token);
      if (response.user) {
        yield put(fetchUserSuccess(response.user));
      } else {
        yield put(fetchUserFailure());
      }
    } catch {
      yield put(fetchUserFailure());
    }
  } else {
    yield put(fetchUserFailure());
  }
}

function* handleLoginSaga(action: ReturnType<typeof loginSuccess>): Generator<any, void, any> {
  yield call([localStorage, "setItem"], "token", action.payload.token);
}

function* handleLogoutSaga(): Generator<any, void, any> {
  yield call([localStorage, "removeItem"], "token");
}

function* handleFetchUserFailureSaga(): Generator<any, void, any> {
  yield call([localStorage, "removeItem"], "token");
}

export function* watchUser(): Generator<any, void, any> {
  yield takeLatest(fetchUserRequest.type, fetchUserSaga);
  yield takeLatest(loginSuccess.type, handleLoginSaga);
  yield takeLatest(logout.type, handleLogoutSaga);
  yield takeLatest(fetchUserFailure.type, handleFetchUserFailureSaga);
}
