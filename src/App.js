import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

//MytAPI Face detectiion key - 474cf84726c6449bab79e6f23973b798

const particleParams =
{
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}
const app = new Clarifai.App({
  apiKey: '474cf84726c6449bab79e6f23973b798'
});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "",
      imageURL: "",
      boundary: {},
      route: 'signIn',
      isSignedIn: false,
    }
  }

  handleInput = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  calculateFaceLocation = (response) => {
    const face_box = response.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImage');
    const width = Number(img.width)
    const height = Number(img.height)

    return {
      leftCol: face_box.left_col * width,
      topRow: face_box.top_row * height,
      rightCol: width - (face_box.right_col * width),
      bottomRow: height - (face_box.bottom_row * height)

    }
  }

  displayFaceBox = (box) => {
    this.setState({ boundary: box })
  }

  handleDetect = () => {

    this.setState({
      imageURL: this.state.input
    })

    //Clarifai API call code 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState({
        isSignedIn: false
      })
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      })
    }
    this.setState({
      route: route
    })
  }

  render() {
    const { isSignedIn, imageURL, boundary, input, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particleParams}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm handleDetect={this.handleDetect} handleOnChange={this.handleInput} inputValue={input} />
            <FaceRecognition image={imageURL} boundary={boundary} />
          </div> :
          (route === 'signIn') ?
            <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
        }

      </div>
    );
  }

}

export default App;
