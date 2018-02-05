import React, { Component } from 'react';
import logo from './music.png';
import './App.css';
import axios from './config';
import FormSong from './AddSong';


class App extends Component {

  constructor(props){
    super(props);
    this.state = { songs: [] };
    this.getSongs = this.getSongs.bind(this);
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs(){
    // get the data from the fake API
    axios.get('/songs')
    .then((response) => {
      // update state's property songs value
      this.setState({
        songs : response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const songs = this.state.songs;
    const listSongs = songs.map((song) =>
      <li key={song.id}> {song.singer} - {song.title} </li>
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My Music</h1>
        </header>

        <div className="App-intro">
          <ul>
            {listSongs}
          </ul>
        </div>

        <FormSong/>
      
      </div>
    );
  }
}

export default App;
