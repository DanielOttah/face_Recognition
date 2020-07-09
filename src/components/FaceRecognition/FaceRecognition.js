import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = (props) => {

    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputImage' alt=" " src={props.image} width='500px' height='auto' />

                <div className="bounding-box" style={{
                    top: props.boundary.topRow,
                    right: props.boundary.rightCol, left: props.boundary.rightCol,
                    bottom: props.boundary.bottomRow
                }}></div>
            </div>
        </div>

    );
}


export default FaceRecognition;