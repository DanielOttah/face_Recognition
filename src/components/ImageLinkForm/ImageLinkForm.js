import React from 'react';
import './ImageLinkForm.css'
//👽 
const ImageLinkForm = (props) => {

    return (
        <div>
            <p className="f3">
                {'This is a face detector app from your pictures...'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type='text' value={props.inputValue} onChange={props.handleOnChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={props.handleDetect}>Detect</button>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-red" onClick={props.clear}>Clear</button>
                </div>
            </div>
        </div>

    );
}


export default ImageLinkForm;