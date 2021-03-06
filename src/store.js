import thunk from "redux-thunk";
import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { daysReducer, ExerciseReducer } from "./reducers/daysReducer";
import { ExerciseNamesReducer } from "./reducers/exerciseNamesReducer";
import { NotesReducer } from "./reducers/notesReducer";

const preloadedState = {};

const reducer = combineReducers({
    daysList: daysReducer,
    exercises: ExerciseReducer,
    exerciseNames: ExerciseNamesReducer,
    notes: NotesReducer,
});

const store = configureStore({
    reducer, 
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
});

export default store;