import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
// import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';

//MyAPI Face detectiion key - 474cf84726c6449bab79e6f23973b798

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
// const app = new Clarifai.App({
//   apiKey: '474cf84726c6449bab79e6f23973b798'
// });
const initialState = {
  input: "",
  imageURL: "",
  boundary: {},
  route: 'signIn',
  isSignedIn: false,
  showError: "none",
  user: {
    id: '123',
    name: 'John',
    email: 'john@gmail.com',
    entries: 0,
    joined: "new Date()"

  }//initialState
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    // {
    //   input: "",
    //   imageURL: "",
    //   boundary: {},
    //   route: 'signIn',
    //   isSignedIn: false,
    //   showError: "none",
    //   user: {
    //     id: '123',
    //     name: 'John',
    //     email: 'john@gmail.com',
    //     entries: 0,
    //     joined: "new Date()"

    //   }
    // }

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
    //  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    fetch(`https://radiant-caverns-61113.herokuapp.com/imageurl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(resp => resp.json())
      .then(response => {
        if (response) { //retrieve the entries of the user
          fetch(`https://radiant-caverns-61113.herokuapp.com/image`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(res => {
              this.setState(Object.assign(this.state.user, { entries: res }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => this.setState({ showError: "block" }));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {

      // this.setState({
      //   isSignedIn: false
      // })
      this.setState(initialState)

    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      })
    }
    this.setState({
      route: route
    })
  }

  loadUser = (newUser) => {

    this.setState({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        entries: newUser.entries,
        joined: newUser.joined

      }
    })
  }

  handleClearFields = () => {
    this.setState({
      input: "",
      imageURL: "",
      showError: "none"
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
            <Logo name={this.state.user.name} email={this.state.user.email} entries={this.state.user.entries} />
            {/* <Rank name={this.state.user.name} entries={this.state.user.entries} /> */}
            <ImageLinkForm handleDetect={this.handleDetect} handleOnChange={this.handleInput} inputValue={input} clear={this.handleClearFields} />
            <FaceRecognition image={imageURL} boundary={boundary} showError={this.state.showError} />
          </div> :
          (route === 'signIn') ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }

      </div>
    );
  }

}

export default App;
