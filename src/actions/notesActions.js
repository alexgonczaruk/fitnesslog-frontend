import axios from "axios";
import { NOTES_FAILURE, NOTES_REQUEST, NOTES_SUCCESS } from "../constants/notesConstants";

// const baseURL = "https://alex-fitness-log.herokuapp.com";
const baseURL = "";

export const getNotes = () => async (dispatch, getState) => {
    dispatch({ type: NOTES_REQUEST });
    try {
        const { data } = await axios.get(baseURL + "/api/notes/");
        dispatch({ type: NOTES_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: NOTES_FAILURE, payload: e.message });
    }
}

export const updateNote = (note, date) => async (dispatch, getState) => {
    dispatch({ type: NOTES_REQUEST });
    try {
        const { data } = await axios.patch(baseURL + "/api/notes/update", { date, note });
        dispatch({ type: NOTES_SUCCESS, payload: data })
    } catch (e) {
        console.log(e);
        dispatch({ type: NOTES_FAILURE, payload: e.message });
    }
};