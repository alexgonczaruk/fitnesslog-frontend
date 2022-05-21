import axios from "axios";
import { EXERCISE_NAMES_FAILURE, EXERCISE_NAMES_REQUEST, EXERCISE_NAMES_SUCCESS } from "../constants/exerciseNamesConstants";

// const baseURL = "https://alex-fitness-log.herokuapp.com";
const baseURL = "";

export const getExerciseNames = () => async (dispatch, getState) => {
    console.log("GETTING NAMES")
    dispatch({ type: EXERCISE_NAMES_REQUEST });
    try {
        const { data } = await axios.get(baseURL + "/api/exercises");
        data.sort((a, b) => a.exercise.localeCompare(b.exercise));
        dispatch({ type: EXERCISE_NAMES_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: EXERCISE_NAMES_FAILURE, payload: e.message });
    }
}

export const addExerciseName = (exerciseName) => async (dispatch, getState) => {
    dispatch({ type: EXERCISE_NAMES_REQUEST });
    try {
        const { data } = await axios.post(baseURL + "/api/exercises/add", { exerciseName });
        dispatch({ type: EXERCISE_NAMES_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: EXERCISE_NAMES_FAILURE, payload: e.message });
    }
}

export const editExerciseName = (exerciseName, exerciseNameId) => async (dispatch, getState) => {
    dispatch({ type: EXERCISE_NAMES_REQUEST });
    try {
        const { data } = await axios.patch(baseURL + `/api/exercises/edit/${exerciseNameId}`, { exerciseName });
        dispatch({ type: EXERCISE_NAMES_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: EXERCISE_NAMES_FAILURE, payload: e.message });
    }
}

export const deleteExerciseName = (exerciseName) => async (dispatch, getState) => {
    const exerciseNameId = getState().exerciseNames.exerciseNames.find((exercise) => exercise.exercise === exerciseName)._id;
    dispatch({ type: EXERCISE_NAMES_REQUEST });
    try {
        const { data } = await axios.delete(baseURL + `/api/exercises/delete/${exerciseNameId}`);
        dispatch({ type: EXERCISE_NAMES_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: EXERCISE_NAMES_FAILURE, payload: e.message });
    }
}