import {
  CLOSE_PENDING_REQUEST,
  CLOSE_PENDING_REQUEST_VALIDATE,
  FAILURE,
  REQUEST,
  SEND_ALERT,
  SEND_PENDING_REQUEST,
  SEND_PENDING_REQUEST_VALIDATE,
  SUCCESS
} from "./action.types";

const nano = require('nano')('https://learningstore.eecloud.dynamic.nsn-net.net:5948');
export const tdpDB = nano.db.use('tdp');


export function send(status, type, payload) {
  return {status, type, payload: payload}
}

export function sendAlert(message) {
  return {type: SEND_ALERT, alert: {message: message}}
}

export function sendPendingRequest(request) {
  return {type: SEND_PENDING_REQUEST, request}
}

export function closePendingRequest(request) {
  return {type: CLOSE_PENDING_REQUEST, request}
}

export function sendPendingRequestValidate(request) {
  return {type: SEND_PENDING_REQUEST_VALIDATE, request}
}

export function closePendingRequestValidate(request, error) {
  return {type: CLOSE_PENDING_REQUEST_VALIDATE, request, error}
}


export function getDocById(type, documentId) {
  return dispatch => {
    dispatch(send(REQUEST, type));
    tdpDB.get(documentId)
      .then(rep => {
        dispatch(send(SUCCESS, type, rep));
      })
      .catch(err => {
        dispatch(send(FAILURE, type, err));
      })
  };
}

export function insertDoc(type, payload, documentId, buttonLoading) {
  return dispatch => {
    dispatch(send(REQUEST, type));
    buttonLoading && dispatch(sendPendingRequestValidate(type));
    tdpDB.insert({...payload}, documentId)
      .then(rep => {
        dispatch(send(SUCCESS, type, {...payload, _rev: rep.rev, _id: rep.id}));
        buttonLoading && dispatch(closePendingRequestValidate(type));
      })
      .catch(err => {
        dispatch(send(FAILURE, type, err));
        dispatch(sendAlert(err.message));
        buttonLoading && dispatch(closePendingRequestValidate(type, true));
      })
  };
}

export function removeAttributeFromDoc(type, payload, path) {
  let newPayload = {...payload};

  switch (path.length) {
    case 1:
      delete newPayload[path[0]];
      break;
    case 2:
      delete newPayload[path[0]][path[1]];
      break;
    case 3:
      delete newPayload[path[0]][path[1]][path[2]];
      break;
    case 4:
      delete newPayload[path[0]][path[1]][path[2]][path[3]];
      break;
    case 5:
      delete newPayload[path[0]][path[1]][path[2]][path[3]][path[5]];
      break;
  }
  return dispatch => {
    dispatch(send(REQUEST, type));
    tdpDB.insert({...newPayload})
      .then(rep => {
        dispatch(send(SUCCESS, type, {...newPayload, _rev: rep.rev, _id: rep.id}));
      })
      .catch(err => {
        dispatch(send(FAILURE, type, err));
      })
  };
}


export function deleteDocById(type, documentId, rev) {
  return dispatch => {
    dispatch(send(REQUEST, type));

    tdpDB.destroy(documentId, rev)
      .then(rep => {
        dispatch(send(SUCCESS, type, rep));
      })
      .catch(err => {
        dispatch(send(FAILURE, type, err));
      })
  };
}

export function getView(type, designName, viewName, keys, loadingRequest) {
  return dispatch => {
    loadingRequest && dispatch(sendPendingRequest(type));
    tdpDB.view(designName, viewName, keys)
      .then(rep => {
        dispatch(send(SUCCESS, type, rep));
        loadingRequest && dispatch(closePendingRequest(type));
      })
      .catch(err => {
        dispatch(send(FAILURE, type, err));
      })
  };
}

export function modifyAttributeFromDoc(type, payload, path, newValue) {

  //todo not verified
  let newPayload;
  switch (path.length) {
    case 1:
      newPayload = {...payload, [path[0]]: newValue}
      break;
    case 2:
      newPayload = {...payload, [path[0]]: {...payload[path[0]], [path[1]]: newValue}}
      break;
    case 3:
      delete newPayload[path[0]][path[1]][path[2]];
      break;
    case 4:
      delete newPayload[path[0]][path[1]][path[2]][path[3]];
      break;
    case 5:
      delete newPayload[path[0]][path[1]][path[2]][path[3]][path[5]];
      break;
  }
  return dispatch => {
    dispatch(send(REQUEST, type, {...newPayload}));
    tdpDB.insert({...newPayload})
      .then(rep => {
        dispatch(send(SUCCESS, type, {...newPayload, _rev: rep.rev, _id: rep.id}));
      })
      .catch(err => {
        dispatch(send(FAILURE, type, err));
      })
  };
}
