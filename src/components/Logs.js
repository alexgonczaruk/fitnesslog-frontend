import './Logs.css';
import React, { useEffect, useState } from 'react';
import { addExercise, generateNewDay, listDays } from "../actions/daysActions";
import { useDispatch, useSelector } from 'react-redux';
import sameCalendarDate from '../helpers/sameCalendarDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faPlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";


import Log from "./Log.js";
import { getExerciseNames } from '../actions/exerciseNamesActions';

export default function Logs() {
    const [currentDay, setCurrentDay] = useState(Date.now());
    const [day, setDay] = useState({  });

    const dispatch = useDispatch();
    const daysList = useSelector(state => state.daysList);
    const { loading, error, days } = daysList;

    const exerciseNamesList = useSelector(state => state.exerciseNames);
    const { exerciseNames } = exerciseNamesList;

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
        if (days && days.length > 0) {
            const match = days.find((day) => sameCalendarDate(currentDay, day.date));
            setDay(match ? match : {});
        }
    }, [days, currentDay])

    // useEffect(() => {
    //     console.log("logs names", exerciseNames);
    // }, [exerciseNames]);

    // useEffect(() => {
    //     dispatch(generateNewDay());
    // }, [dispatch])

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
                                Object.keys(day).length > 0 ?
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
                        <button className="add-exercise" onClick={addExerciseHandler}>
                            <span>Add an exercise</span>
                            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}