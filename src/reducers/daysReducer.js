import { DAYS_REQUEST, DAYS_SUCCESS, DAYS_FAILURE, ADD_EXERCISE_REQUEST, ADD_EXERCISE_SUCCESS, ADD_EXERCISE_FAILURE, EDIT_EXERCISE_REQUEST, EDIT_EXERCISE_SUCCESS, EDIT_EXERCISE_FAILURE, DELETE_EXERCISE_REQUEST, DELETE_EXERCISE_FAILURE, DELETE_EXERCISE_SUCCESS } from "../constants/daysConstants";

export const daysReducer = (state = { loading: true, days: [] }, action) => {
    switch(action.type) {
        case DAYS_REQUEST:
            return { loading: true };
        case DAYS_SUCCESS:
            return { loading: false, days: action.payload };
        case DAYS_FAILURE:
            return { loading: false, error: action.payload };
        case ADD_EXERCISE_SUCCESS:
            const updatedDay = action.payload.updatedDay;
            const foundDay = state.days.find((day) => day._id === updatedDay._id);
            let newDays;
            if (foundDay) {
                newDays = state.days.map((day) => day._id === updatedDay._id ? updatedDay : day);
            } else {
                newDays = [ ...state.days, updatedDay ];
            }
            return { ...state, loading: false, days: newDays }
        case EDIT_EXERCISE_SUCCESS:
            const data = action.payload.updatedDay;
            const updatedDays = state.days.map((day) => day._id === data._id ? data : day);
            return { ...state, loading: false, days: updatedDays };
        case EDIT_EXERCISE_FAILURE:
            return { loading: false, error: action.payload };
        case DELETE_EXERCISE_REQUEST:
            return { ...state, loading: true };
        case DELETE_EXERCISE_SUCCESS:
            let editedDays;
            if (action.payload.updatedDay) {
                const editedDay = action.payload.updatedDay;
                editedDays = state.days.map((day) => day._id === editedDay._id ? editedDay : day);
            } else {
                editedDays = state.days.filter((day) => day._id !== action.payload);
            }
            return { ...state, loading: false, days: editedDays };
        case DELETE_EXERCISE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const ExerciseReducer = (state = { loading: true }, action) => {
    switch(action.type) {
        case ADD_EXERCISE_REQUEST:
            return { loading: true };
        // case ADD_EXERCISE_SUCCESS:
        //     const item = action.payload;
        //     console.log("sucess", state);
        //     console.log([...state.exercises, item]);
        //     return { ...state, loading: false, exercises: [...state.exercises, item]  };
        case ADD_EXERCISE_FAILURE:
            return { loading: false, error: action.payload };
        case EDIT_EXERCISE_REQUEST:
            return { loading: true };
        default:
            return state;
    }
}