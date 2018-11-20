import {FAILURE, REQUEST, SET_CURRENT_USER, SUCCESS, TOGGLE_USER_PREFERENCE} from './action.types'
import {modifyAttributeFromDoc, send, tdpDB} from './async'


export const toggleUserPreference = (user, prefName) => modifyAttributeFromDoc(TOGGLE_USER_PREFERENCE, user, ["preference", prefName], !user.preference[prefName]);


export function setCurrentUser(user) {
  return dispatch => {
    dispatch(send(REQUEST, SET_CURRENT_USER));

    tdpDB.get(user._id)
      .then(rep => {
        dispatch(send(SUCCESS, SET_CURRENT_USER, rep));
      })
      .catch(err => {
        if (err.statusCode === 404) {
          tdpDB.insert({...user, docType: "user"}, user._id)
            .then(rep => {
              dispatch(send(SUCCESS, SET_CURRENT_USER, {...user, _rev: rep.rev}));
            })
            .catch(err => {
              dispatch(send(FAILURE, SET_CURRENT_USER, err));
            })
        }
      })
  };
}