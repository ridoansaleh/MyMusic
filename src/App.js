import React, { Component } from "react";
import FormSong from "./FormSong";
import logo from "./music.png";
import axios from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      status: false,
      id: "",
      title: "",
      genre: "",
      singer: "",
    };
    this.getSongs = this.getSongs.bind(this);
    this.editSong = this.editSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.addSongToList = this.addSongToList.bind(this);
  }

  componentDidMount() {
    this.getSongs();
  }

  addSongToList(newSong) {
    const { songs } = this.state;
    const isSongExist = songs.find((d) => d.id === newSong.id);
    if (isSongExist) {
      let newList = songs.filter((d) => d.id !== newSong.id);
      this.setState({
        songs: [...newList, newSong].sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        }),
      });
    } else {
      this.setState({
        songs: [...songs, newSong],
      });
    }
  }

  getSongs() {
    axios
      .get("/songs")
      .then((response) => {
        this.setState({
          songs: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editSong(id) {
    axios
      .get("/songs?id=" + id)
      .then((response) => {
        var data = response.data[0];
        this.setState({
          id: id,
          title: data.title,
          genre: data.genre,
          singer: data.singer,
          status: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteSong(id) {
    axios
      .delete("/songs/" + id)
      .then((response) => {
        const { songs } = this.state;
        this.setState({
          songs: songs.filter((d) => d.id !== id),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { songs, status } = this.state;
    console.log("songs >> ", songs);
    console.log("this.state.songs >> ", this.state.songs);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My Music</h1>
        </header>
        {status ? (
          <FormSong
            id={this.state.id}
            title={this.state.title}
            genre={this.state.genre}
            singer={this.state.singer}
            totalSong={songs.length}
            onAddSongToList={this.addSongToList}
          />
        ) : (
          <FormSong
            totalSong={songs.length}
            onAddSongToList={this.addSongToList}
          />
        )}
        <div className="App-intro">
          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                {song.singer} - {song.title}
                <span
                  className="edit-label"
                  onClick={() => this.editSong(song.id)}
                >
                  Edit
                </span>
                <span
                  className="delete-label"
                  onClick={() => this.deleteSong(song.id)}
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="limitation-info">
          * Limitation :
          <ul>
            <li>Data you saved is not persist in database</li>
            <li>
              You can't delete or edit a new entry because of the first reason
            </li>
          </ul>
        </p>
      </div>
    );
  }
}

export default App;
