import { EXERCISE_NAMES_FAILURE, EXERCISE_NAMES_REQUEST, EXERCISE_NAMES_SUCCESS } from "../constants/exerciseNamesConstants";

export const ExerciseNamesReducer = (state = { loading: true, exerciseNames: [] }, action) => {
    switch(action.type) {
        case EXERCISE_NAMES_REQUEST:
            return { ...state, loading: true };
        case EXERCISE_NAMES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EXERCISE_NAMES_SUCCESS:
            return { ...state, loading: false, exerciseNames: action.payload };
        default:
            return state;
    }
}