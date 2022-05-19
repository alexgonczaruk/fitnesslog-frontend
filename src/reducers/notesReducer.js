import { NOTES_FAILURE, NOTES_REQUEST, NOTES_SUCCESS } from "../constants/notesConstants";

export const NotesReducer = (state = { loading: true, notes: "" }, action) => {
    switch(action.type) {
        case NOTES_REQUEST:
            return { ...state, loading: true };
        case NOTES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case NOTES_SUCCESS:
            return { ...state, loading: false, notes: action.payload };
        default:
            return state;
    }
}