import {
  CLOSE_PENDING_REQUEST,
  CLOSE_PENDING_REQUEST_VALIDATE,
  SEND_ALERT,
  SEND_PENDING_REQUEST,
  SEND_PENDING_REQUEST_VALIDATE
} from '../actions/action.types'

export default (state = {alert: null, pendingRequest: null}, action) => {

  let a = action;
  let request, alert, error;
  if (a) {
    request = a.request;
    alert = a.alert;
    error = a.error
  }

  switch (action.type) {
    case SEND_ALERT:
      return {...state, alert};
    case SEND_PENDING_REQUEST:
      return {...state, pendingRequest: {[request]: true}};
    case CLOSE_PENDING_REQUEST:
      return {...state, pendingRequest: {[request]: false}};
    case SEND_PENDING_REQUEST_VALIDATE:
      return {...state, pendingRequestValidate: "request"};
    case CLOSE_PENDING_REQUEST_VALIDATE:
      return {...state, pendingRequestValidate: error ? "failure" : "success"};
    default:
      return state;
  }
};