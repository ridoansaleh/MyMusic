import React, { Component } from 'react';
import logo from './music.png';
import './App.css';
import axios from './config';
import FormSong from './AddSong';


class App extends Component {

  constructor(props){
    super(props);
    this.state = { songs: [], status: false, id: '', title: '', genre: '', singer: '' };
    this.getSongs = this.getSongs.bind(this);
    this.editSong = this.editSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
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

  editSong(id) {
    axios.get('/songs?id='+id)
    .then((response) => {
      var data = response.data[0];
      console.log(response.data[0]);
      this.setState({
        id: id,
        title: data.title,
        genre: data.genre,
        singer: data.singer,
        status: true
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deleteSong(id) {
    axios.delete('/songs/'+id)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const songs = this.state.songs;
    const listSongs = songs.map((song) =>
      <li key={song.id}> 
        {song.singer} - {song.title} 
        <span className="edit-label" onClick={() => this.editSong(song.id)}>Edit</span>
        <span className="delete-label" onClick={() => this.deleteSong(song.id)}>Delete</span>  
      </li>
    );
    var formsong = null;
    if(this.state.status){
      formsong = <FormSong id={this.state.id} title={this.state.title} genre={this.state.genre} singer={this.state.singer}/>
    }else{
      formsong = <FormSong/>
    }
    
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

        {formsong}
      
      </div>
    );
  }
}

export default App;
