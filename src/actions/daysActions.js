import axios from "axios";
import { DAYS_REQUEST, DAYS_SUCCESS, DAYS_FAILURE, ADD_EXERCISE_REQUEST, ADD_EXERCISE_FAILURE, ADD_EXERCISE_SUCCESS, EDIT_EXERCISE_REQUEST, EDIT_EXERCISE_SUCCESS, EDIT_EXERCISE_FAILURE, DELETE_EXERCISE_REQUEST, DELETE_EXERCISE_SUCCESS, DELETE_EXERCISE_FAILURE } from "../constants/daysConstants";
import sameCalendarDate from "../helpers/sameCalendarDate";
import { getExerciseNames } from "./exerciseNamesActions";

const baseURL = "https://alex-fitness-log.herokuapp.com";
// const baseURL = "";

export const listDays = () => async (dispatch, getState) => {
    dispatch({
        type: DAYS_REQUEST
    });
    try {
        const days = getState().daysList.days;
        let data;
        if (!days) {
            ({ data } = await axios.get(baseURL + "/api/days"));
        }
        dispatch({ type: DAYS_SUCCESS, payload: days ? days : data });
    } catch (e) {
        console.log(e);
        dispatch({ type: DAYS_FAILURE, payload: e.message });
    }
};

export const addExercise = (dayId, date) => async (dispatch, getState) => {
    dispatch({ type: ADD_EXERCISE_REQUEST });
    try {
        const { data } = await axios.post(baseURL + "/api/days/add", { dayId, date });
        // dispatch({ type: ADD_EXERCISE_SUCCESS, payload: { days, newExercise, id } })
        dispatch({ type: ADD_EXERCISE_SUCCESS, payload: data })
    } catch (e) {
        console.log(e);
        dispatch({ type: ADD_EXERCISE_FAILURE, payload: e.message });
    }
};

export const editExercise = (newSets, newExercise, dayId, exerciseId) => async (dispatch, getState) => {
    dispatch({ type: EDIT_EXERCISE_REQUEST });
    try {
        const { data } = await axios.patch(baseURL + `/api/days/edit/${dayId}`, {
            newSets,
            newExercise,
            exerciseId,
        });
        dispatch({ type: EDIT_EXERCISE_SUCCESS, payload: data });
        dispatch(getExerciseNames());
    } catch (e) {
        console.log(e);
        dispatch({ type: EDIT_EXERCISE_FAILURE, payload: e.message });
    }
}

export const deleteExercise = (dayId, exerciseId, exerciseName) => async (dispatch, getState) => {
    dispatch({ type: DELETE_EXERCISE_REQUEST });
    try {
        const days = getState().daysList.days;
        const day = days.find((day) => day._id === dayId);
        const { data } = await axios.delete(baseURL + `/api/days/delete/${dayId}`, { data: { exercises: day.exercises, exerciseId, exerciseName } });
        dispatch({ type: DELETE_EXERCISE_SUCCESS, payload: Object.keys(data).length > 0 ? data : dayId });
        dispatch(getExerciseNames());
    } catch (e) {
        console.log(e);
        dispatch({ type: DELETE_EXERCISE_FAILURE, payload: e.message });
    }
}

// export const generateNewDay = () => async (dispatch, getState) => {

//     try {
//         const days = getState().daysList.days;
//         if (!days) {
//             dispatch(listDays());
//             // console.log("entered")
//         }
//         const today = new Date();
//         console.log("dbays is ", days);
//         const sameDate = days.find((day) => sameCalendarDate(today, day));
//         if (sameDate) {
//             console.log("SAME DATE FOUND");
//         } else {
//             console.log("tuff...");
//         }
//     } catch (e) {
//         console.log("second", e);
//     }
// }