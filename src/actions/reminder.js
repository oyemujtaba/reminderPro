import { ADD_REMINDER, DELETE_REMINDER, EDIT_REMINDER, GET_REMINDERS } from './../constants/actionTypes';

let previousId = 0;

export function addReminder(data) {
     // console.log('action called', data)
     return function (dispatch) {
          // previousId = previousId + 1;
          // data.id = previousId;
          return new Promise(function (resolve, reject) {
               dispatch({
                    type: ADD_REMINDER,
                    data: data
               });
               resolve(data)
          })
     }
}

export function deleteReminder(id) {

     return function (dispatch) {

          return new Promise(function (resolve, reject) {
               dispatch({
                    type: DELETE_REMINDER,
                    data: id,
               });
               resolve(id)
          })
     }
}

export function editReminder(obj) {

     return function (dispatch) {

          return new Promise(function (resolve, reject) {
               dispatch({
                    type: EDIT_REMINDER,
                    data: obj,
               });
               resolve(true)
          })
     }
}

export function getReminders() {
     return function (dispatch) {
          dispatch({
               type: GET_REMINDERS
          })
     }
}

