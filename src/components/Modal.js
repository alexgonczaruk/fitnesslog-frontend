import React from "react";
import './Modal.css';


export default function Modal(props) {
    return (
        <div className="modal-background">
            <div className="modal-holder">
                <div className="modal-holder-name">{props.exerciseName}</div>
                <div></div>
            </div>
        </div>
    )
}