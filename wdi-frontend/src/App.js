import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';

class App extends Component {

  constructor(){
    super();
    this.state = {
      gif: '',
      upload: ''
    }
  }

  componentDidMount(){
    var config = {
      apiKey: "AIzaSyCRdKqNxw5phZK2ik3IvviUWHMb8X8d2HE",
      authDomain: "wdi2-5cb55.firebaseapp.com",
      databaseURL: "https://wdi2-5cb55.firebaseio.com",
      projectId: "wdi2-5cb55",
      storageBucket: "wdi2-5cb55.appspot.com",
      messagingSenderId: "603940008500"
    };
    firebase.initializeApp(config);
  }


  handleselectedFile = (event) => {

    var storageRef = firebase.storage().ref();
      
    const file = event.target.files[0];
    const fileName = file.name;

    const uploadTask = storageRef.child(`images/${fileName}`).put(file);

    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      }, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      }, () => {
         // Do something once upload is complete
         console.log('success');
        //  console.log(uploadTask.fullPath);
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.setState({
              upload: downloadURL
            })
          console.log('File available at', downloadURL);
        });
      });
  }

  render() {
    return (
      <div className="App">

          <div className="firstDiv">

              <div className="uplodeImg">
              <h2>Uplode IMG</h2>
              <input type="file"  onChange={this.handleselectedFile}/>
          <br/>
              <img src={this.state.upload}/>
              </div>

              <div className="showGif">
              <h2>GIF</h2>
              <img src={this.state.gif}/>
              </div>

          </div>


          <div className="secDiv">
            <h2>IMG gallery</h2>

            <div className="searchDiv">
              <input type="text" />
              <button>submit</button>
            </div>

            <div className="imgGallery">
              <div className="eachImg"></div>
            </div>

          </div>

      </div>
    );
  }
}

export default App;
