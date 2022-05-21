import React, { useEffect, useState } from "react";
import './Modal.css';
import { faFloppyDisk, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { deleteExerciseName, getExerciseNames } from "../actions/exerciseNamesActions";
import dateFormatter from "../helpers/dateFormatter";


export default function Modal(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [sortedExercises, setSortedExercises] = useState([]);
    // const [exerciseName, setExerciseName] = useState(props.selectedExercise.exercise);
    const exercise = props.selectedExercise;
    const exerciseName = exercise.exercise;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    })

    useEffect(() => {
        const sorted = exercise.sets.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        setSortedExercises(sorted);
    }, [exercise]);

    const dispatch = useDispatch();

    const closeModalHandler = () => {
        document.body.style.overflow = 'unset';
        props.closeModalHandler();
    }

    const submitHandler = (e) => {
        // console.log("SUBMITTED");
    }

    const editHandler = (e) => {
        if (isEditing) {
            setIsEditing(false);
            submitHandler(e);
        } else {
            setIsEditing(true);
        }
    }

    const changeNameHandler = (e) => {
        // setExerciseName(e.target.value);
    }

    const deleteHandler = () => {
        dispatch(deleteExerciseName(exerciseName));
        closeModalHandler();
    }

    return (
        <div className="modal-background">
            <div className="modal-holder">
                <form onSubmit={submitHandler} className="modal-title-form">
                    <div className="modal-title-container">
                        <input className="modal-holder-name" disabled={!isEditing} value={exerciseName} onChange={(e) => changeNameHandler(e)}></input>
                        {/* <FontAwesomeIcon icon={isEditing ? faFloppyDisk : faPenToSquare} className="modal-edit-icon" onClick={(e) => editHandler(e)}/> */}
                    </div>
                </form>
                {
                    exercise.sets.length === 0 ? 
                    <div>You have no previous data for { exerciseName }. Log some exercises!</div>
                    : 
                    <div className="modal-list">
                        {
                            sortedExercises.map((outerSet, outerIndex) => (
                                <div className="modal-entry" key={outerIndex}>
                                    <div className="modal-entry-date">{ dateFormatter(outerSet.date) }</div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td className="modal-table-header">Weight</td>
                                                <td className="modal-table-header">Sets</td>
                                                <td className="modal-table-header">Reps</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            outerSet.sets.map((innerSet, innerIndex) => (
                                                <tr key={innerIndex}>
                                                    <td>{ innerSet.weight }</td>
                                                    <td>{ innerSet.sets }</td>
                                                    <td>{ innerSet.reps }</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        }
                    </div>
                }
                <div className="modal-delete-button"><button className="delete-btn" onClick={deleteHandler}>Delete Exercise From List</button></div>
                <FontAwesomeIcon icon={faXmark} className="modal-x-icon" onClick={closeModalHandler}/>
                <div></div>
            </div>
        </div>
    )
}