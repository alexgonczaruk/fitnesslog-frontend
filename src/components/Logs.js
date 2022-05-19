import './Logs.css';
import React, { useEffect, useState } from 'react';
import { addExercise, generateNewDay, listDays } from "../actions/daysActions";
import { useDispatch, useSelector } from 'react-redux';
import sameCalendarDate from '../helpers/sameCalendarDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faPlus, faCircleMinus, faCircleCheck, faCircleChevronUp, faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";


import Log from "./Log.js";
import { getExerciseNames } from '../actions/exerciseNamesActions';
import { getNotes, updateNote } from '../actions/notesActions';

export default function Logs() {
    const [currentDay, setCurrentDay] = useState(Date.now());
    const [day, setDay] = useState({  });
    const [notesSaved, setNotesSaved] = useState(true);
    const [note, setNote] = useState("");
    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch();
    const daysList = useSelector(state => state.daysList);
    const { loading, error, days } = daysList;

    const exerciseNamesList = useSelector(state => state.exerciseNames);
    const { exerciseNames } = exerciseNamesList;

    const notesList = useSelector(state => state.notes);
    const { notes } = notesList;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const CHEVRON_OPTIONS = {
        INCREASE: 1,
        DECREASE: -1,
    };
    const ENTIRE_DAY = 60*60*1000*24;

    useEffect(() => {
        dispatch(listDays());
        dispatch(getExerciseNames())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getNotes(currentDay));
    }, [dispatch, currentDay]);

    useEffect(() => {
        if (days && days.length > 0) {
            const match = days.find((day) => sameCalendarDate(currentDay, day.date));
            setDay(match ? match : {});
        }
    }, [days, currentDay]);

    useEffect(() => {
        if (notes && notes !== "") {
            const match = notes.find((note) => sameCalendarDate(currentDay, note.date));
            setNote(match ? match.note : "");
        }
    }, [notes, currentDay]);
    
    const dayChangeHandler = (newDay) => {
        if (!sameCalendarDate(new Date(), currentDay) || newDay < 0) {
            const completeDay = currentDay + newDay * ENTIRE_DAY;
            setCurrentDay(completeDay);
        }
    }

    const addExerciseHandler = () => {
        const id = Object.keys(day).length > 0 ? day._id : "";
        dispatch(addExercise(id, currentDay));
    }

    const changeNoteHandler = (e) => {
        setNotesSaved(false);
        setNote(e.target.value);
    }

    const submitNotesHandler = () => {
        setNotesSaved(true);
        dispatch(updateNote(note, currentDay));
    }

    const collapseHandler = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div className="Log">
            {
                loading ? <div>loading</div> :
                error ? <div>error</div> : 
                <div>
                    <div>
                        <div className="Flex">
                                <div className="chevron-container">
                                    <FontAwesomeIcon className="chevron" icon={faCircleChevronLeft} onClick={() => dayChangeHandler(CHEVRON_OPTIONS.DECREASE)}/>
                                </div>
                                    <div className="current-date">
                                        {
                                            new Date(currentDay).toLocaleDateString("en-US", options)
                                        }
                                    </div>
                                <div className="chevron-container">
                                    <FontAwesomeIcon className={ `chevron ${sameCalendarDate(new Date(), currentDay) ? "disabled" : ""}` } icon={faCircleChevronRight} onClick={() => dayChangeHandler(CHEVRON_OPTIONS.INCREASE)}/>
                                </div>
                        </div>
                        <div className="exercises">
                            {
                                Object.keys(day).length > 0 && day.exercises ?
                                day.exercises.map((exercise) => (
                                    <div className="exercise" key={exercise.exercise + Math.random()}>
                                        <Log exercise={exercise} dayId={day._id} exerciseNames={exerciseNames} currentDay={currentDay}></Log>
                                    </div>
                                )) :
                                <div className="no-data">No data for {new Date(currentDay).toLocaleDateString("en-US", options)}</div>
                            }
                        </div>
                    </div>
                    <div className="add-holder">
                        <FontAwesomeIcon icon={!collapsed ? faCircleChevronUp : faCircleChevronDown} className="collapse" onClick={collapseHandler}/>
                        { 
                            !collapsed ? 
                            <div>
                                <button className="add-exercise" onClick={addExerciseHandler}>
                                    <span>Add an exercise</span>
                                    <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                                </button>
                                <div className="notes-holder">
                                    <div className="notes">
                                        <div className="notes-title">Notes</div>
                                        <FontAwesomeIcon icon={faCircleCheck} className={`check-icon ${notesSaved ? 'saved' : 'unsaved'}`} onClick={submitNotesHandler}/>
                                    </div>
                                    <textarea id="notes" placeholder={`My notes for ${new Date(currentDay).toLocaleDateString("en-US", options)}`} onChange={changeNoteHandler} value={note}></textarea>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            }
        </div>
    )
}