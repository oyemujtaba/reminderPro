import { ADD_REMINDER, DELETE_REMINDER, EDIT_REMINDER, GET_REMINDERS } from './../constants/actionTypes';
// import {bake_cookie,read_cookie} from 'sfcookies';

const initialState = [];
var newState;



const reminders = (state = initialState, action) => {
    // console.log("reminders actions ", actin)

    switch (action.type) {
        case ADD_REMINDER:
            newState = Object.assign([], [...state, action.data]);
            localStorage.setItem('reminders', JSON.stringify(newState))
            return newState;

        case DELETE_REMINDER:
            newState = state.filter((element) => element.id !== action.data);
            localStorage.setItem('reminders',JSON.stringify(newState))
            return newState;

        case EDIT_REMINDER:
            newState = state;
            newState.forEach(element => {
                if (element.id === action.data.id) {
                    element.text = action.data.text
                    element.dueDate = action.data.dueDate
                }
            });
            localStorage.setItem('reminders',JSON.stringify(newState))
            return newState;

        case GET_REMINDERS:
            newState = localStorage.getItem('reminders')
            if(newState){
                newState = JSON.parse(newState);
                return newState;
            }
            return []

        default:
            return state;
    }
}

export default reminders;