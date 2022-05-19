import React, { useEffect, useState } from "react";
import './Modal.css';
import { faFloppyDisk, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { deleteExerciseName } from "../actions/exerciseNamesActions";


export default function Modal(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [exerciseName, setExerciseName] = useState(props.exerciseName);

    const dispatch = useDispatch();

    const closeModalHandler = () => {
        props.closeModalHandler();
    }

    const submitHandler = (e) => {
        console.log("SUBMITTED");
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
        setExerciseName(e.target.value);
    }

    const deleteHandler = () => {
        dispatch(deleteExerciseName(exerciseName));
        closeModalHandler();
    }

    return (
        <div className="modal-background">
            <div className="modal-holder">
                <form onSubmit={submitHandler}>
                    <div className="modal-title-container">
                        <input className="modal-holder-name" disabled={!isEditing} value={exerciseName} onChange={(e) => changeNameHandler(e)}></input>
                        {/* <FontAwesomeIcon icon={isEditing ? faFloppyDisk : faPenToSquare} className="modal-edit-icon" onClick={(e) => editHandler(e)}/> */}
                    </div>
                </form>
                <div className="modal-delete-button"><button className="delete-btn" onClick={deleteHandler}>Delete Exercise From List</button></div>
                <FontAwesomeIcon icon={faXmark} className="modal-x-icon" onClick={closeModalHandler}/>
                <div></div>
            </div>
        </div>
    )
}