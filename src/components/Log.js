import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faFloppyDisk, faPlus, faTrashCan, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteExercise, editExercise } from "../actions/daysActions";
import { addExerciseName, getExerciseNames } from "../actions/exerciseNamesActions";
import Modal from "./Modal";

export default function Log(props) {
    const [isEditing, setIsEditing] = useState(false);

    const [sets, setSets] = useState(props.exercise.sets);

    const [exercise, setExercise] = useState(props.exercise.exercise);

    const [showModal, setShowModal] = useState(false);

    const [selectedExercise, setSelectedExercise] = useState({});

    const exerciseNames = props.exerciseNames;
    const [filteredExerciseNames, setFilteredExerciseNames] = useState(exerciseNames);

    const dayId = props.dayId;
    const exerciseId = props.exercise._id;
    const otherExercises = props.otherExercises;

    const dispatch = useDispatch();

    const WEIGHT_FEATURES = {
        WEIGHT: "WEIGHT",
        SETS: "SETS",
        REPS: "REPS",
    };

    const CLICKED_HOME = {
        TRUE: "TRUE", 
        FALSE: "FALSE",
    };

    const nameHandler = (e) => {
        setExercise(e.target.value);
    }

    const editHandler = (e) => {
        if (isEditing) {
            for (let i=0; i<sets.length; i++) {
                if (exercise.length === 0 || sets[i].weight.length === 0 || sets[i].sets.length === 0 || sets[i].reps.length === 0) {
                    console.log(exercise, sets[i]);
                    alert("A field has not been filled out. Please fill out all fields.");
                    return;
                }
            }
            const foundExercise = otherExercises.find((ex) => ex.exercise === exercise);
            if (foundExercise && foundExercise._id !== exerciseId) {
                alert(`${exercise} already exists today.`);
                return;
            }
            setIsEditing(false);
            submitHandler(e);
        } else {
            setIsEditing(true);
        }
    }

    const changeHandler = (index, e, feature) => {
        switch (feature) {
            case WEIGHT_FEATURES.WEIGHT:
                setSets(sets.map((set, i) => {
                    if (i === index) return { ...set, weight: e.target.value } 
                    else return set
                }));
                break;
            case WEIGHT_FEATURES.SETS:
                setSets(sets.map((set, i) => {
                    if (i === index) return { ...set, sets: e.target.value } 
                    else return set
                }));
                break;
            case WEIGHT_FEATURES.REPS:
                setSets(sets.map((set, i) => {
                    if (i === index) return { ...set, reps: e.target.value } 
                    else return set
                }));
                break;
            default:
                return;
        }
    }

    const addHandler = (e) => {
        setSets(sets => [...sets, { weight: 0, sets: 0, reps: 0 }]);
    }

    const deleteHandler = (i) => {
        if (sets.length > 1) {
            const newSets = sets.filter((set, index) => index !== i);
            setSets(newSets);
        } else {
            dispatch(deleteExercise(dayId, exerciseId, exercise));
        }
    }

    const submitHandler = (event) => {
        if (event && event.preventDefault()) {
            event.preventDefault();
        }
        const foundName = exerciseNames.find((exerciseName) => exerciseName.exercise.toString() === exercise.toString());
        if (!foundName) {
            dispatch(addExerciseName(exercise));
        }
        dispatch(editExercise(sets, exercise, dayId, exerciseId));
    }
    
    const filterExerciseNamesHandler = (e) => {
        const search = e.target.value.toLowerCase();
        const filteredSearches = exerciseNames.filter((name) => name.exercise.toLowerCase().indexOf(search) > -1);
        setFilteredExerciseNames(filteredSearches);
    }

    const chooseExerciseNameHandler = (exercise) => {
        setExercise(exercise.exercise);
        setClickedOutside(true);
    }

    const modalHandler = (ex, clickedHome) => {
        if (clickedHome === CLICKED_HOME.TRUE) {
            const foundExercise = exerciseNames.find((exerciseName) => ex === exerciseName.exercise);
            if (!foundExercise) return;
            setSelectedExercise(foundExercise);
        } else {
            setSelectedExercise(ex);
        }
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const [clickedOutside, setClickedOutside] = useState(false);
    const showDropdownRef = useRef();

    const handleClickOutside = e => {
        if (!showDropdownRef.current.contains(e.target)) {
        setClickedOutside(true);
        }
    };

    const handleClickInside = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    return (
        <div>
            <form onSubmit={(event) => submitHandler(event)}>
                <table>
                    <thead>
                    <tr>
                        {/* <th className="exercise-name"><input className="exercise-name" type="text" disabled={!isEditing} value={exercise} onChange={nameHandler}></input></th> */}
                        <th className="exercise-name-holder" ref={showDropdownRef}>
                            <input className="exercise-name" type="text" disabled={!isEditing} value={exercise} onClick={handleClickInside} onKeyUp={(e) => filterExerciseNamesHandler(e)} onChange={nameHandler}></input>
                            {   !isEditing && 
                                <div className="exercise-name-btn" onClick={() => modalHandler(exercise, CLICKED_HOME.TRUE)}></div>
                            }
                            { isEditing && 
                                <div className={ `dropdown ${filteredExerciseNames && Object.keys(filteredExerciseNames).length > 0 && !clickedOutside ? 'dropdown-visible' : ''}` }>
                                    { filteredExerciseNames && Object.keys(filteredExerciseNames).length > 0 && !clickedOutside && 
                                        <div >
                                            {
                                                filteredExerciseNames.map((exerciseName, index) => (
                                                    <div className="dropdown-option" key={index}>
                                                        <span key={index} className="exercisename-option" onClick={() => chooseExerciseNameHandler(exerciseName)}>{exerciseName.exercise}</span>
                                                        <FontAwesomeIcon icon={faEllipsisVertical} className="info-icon" onClick={() => modalHandler(exerciseName, CLICKED_HOME.FALSE)}/>
                                                    </div>
                                                )) 
                                            }
                                        </div>
                                    }
                                </div>
                            }
                        </th>
                        <th>Weight</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th><FontAwesomeIcon icon={isEditing ? faFloppyDisk : faPenToSquare} className="edit-icon" onClick={(e) => editHandler(e)}/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sets.map((set, index) => (
                            <tr key={index}>
                                <td className={ `${isEditing ? "visible" : ""}` }><FontAwesomeIcon icon={faTrashCan} className={ `edit-icon ${isEditing ? "" : "invisible"}` } onClick={() => deleteHandler(index)}/></td>
                                <td><input className="exercise-entry" type="text" disabled={!isEditing} value={set.weight} onChange={(e) => changeHandler(index, e, WEIGHT_FEATURES.WEIGHT)}></input></td>
                                <td><input className="exercise-entry" type="number" min="0" disabled={!isEditing} value={set.sets} onChange={(e) => changeHandler(index, e, WEIGHT_FEATURES.SETS)}></input></td>
                                <td><input className="exercise-entry" type="number" min="0" disabled={!isEditing} value={set.reps} onChange={(e) => changeHandler(index, e, WEIGHT_FEATURES.REPS)}></input></td>
                                <td hidden={!isEditing || index+1 !== sets.length}><FontAwesomeIcon icon={faPlus} className="edit-icon" onClick={addHandler}/></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </form>
            {
                showModal ? <Modal selectedExercise={selectedExercise} exerciseId={exerciseId} closeModalHandler={closeModalHandler}/> : null
            }
        </div>
    )
    
}