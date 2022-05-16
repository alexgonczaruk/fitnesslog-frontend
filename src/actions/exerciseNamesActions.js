import axios from "axios";
import { EXERCISE_NAMES_FAILURE, EXERCISE_NAMES_REQUEST, EXERCISE_NAMES_SUCCESS } from "../constants/exerciseNamesConstants";

export const getExerciseNames = () => async (dispatch, getState) => {
    dispatch({ type: EXERCISE_NAMES_REQUEST });
    try {
        const { data } = await axios.get("/api/exercises");
        data.sort((a, b) => a.exercise.localeCompare(b.exercise));
        dispatch({ type: EXERCISE_NAMES_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: EXERCISE_NAMES_FAILURE, payload: e.message });
    }
}

export const addExerciseName = (sets, exerciseName, currentDay) => async (dispatch, getState) => {
    dispatch({ type: EXERCISE_NAMES_REQUEST });
    console.log("ACTION", sets)
    try {
        const { data } = await axios.post("/api/exercises/add", { sets, exerciseName, currentDay });
        dispatch({ type: EXERCISE_NAMES_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: EXERCISE_NAMES_FAILURE, payload: e.message });
    }
}

export const editExerciseName = (exerciseName, exerciseNameId) => async (dispatch, getState) => {
    dispatch({ type: EXERCISE_NAMES_REQUEST });
    try {
        const { data } = await axios.patch(`/api/exercises/edit/${exerciseNameId}`, { exerciseName });
        dispatch({ type: EXERCISE_NAMES_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: EXERCISE_NAMES_FAILURE, payload: e.message });
    }
}

export const deleteExerciseName = (exerciseNameId) => async (dispatch, getState) => {
    dispatch({ type: EXERCISE_NAMES_REQUEST });
    try {
        const { data } = await axios.delete(`/api/exercises/edit/${exerciseNameId}`);
        dispatch({ type: EXERCISE_NAMES_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: EXERCISE_NAMES_FAILURE, payload: e.message });
    }
}