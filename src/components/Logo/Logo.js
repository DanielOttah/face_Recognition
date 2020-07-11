import React from 'react';
// import Tilt from 'react-tilt';
import './Logo.css';
import face from './FACE.png';
//👽 
class Logo extends React.Component {
    render() {
        return (
            <div className="ma4 mt0 " >
                {/* <Tilt className="Tilt br2 shadow-2" options={{ max: 60 }} style={{ height: 150, width: 150 }} >
                </Tilt> */}
                <div className="Tilt-inner pa3">
                    <div>
                        <img style={{ paddingTop: '5px' }} alt='logo' src={face} />
                    </div>
                    <div>
                        Name: {this.props.name}
                    </div>
                    <div>
                        Email:{this.props.email}
                    </div>
                    <div>
                        Entries made: {this.props.entries}
                    </div>
                </div>
            </div>
        );
    }
}


export default Logo;