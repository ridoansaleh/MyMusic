import React, { Component } from "react";
import axios from "./config";

class FormSong extends Component {
  constructor(props) {
    super(props);

    this.state = { id: "", title: "", genre: "Pop", singer: "" };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleSingerChange = this.handleSingerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      const { id, title, genre, singer } = this.props;
      this.setState({
        id,
        title,
        genre,
        singer,
      });
    }
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleGenreChange(e) {
    this.setState({ genre: e.target.value });
  }

  handleSingerChange(e) {
    this.setState({ singer: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    const { id, title, genre, singer } = this.state;
    if (title && genre && singer) {
      if (this.props.id) {
        axios
          .put("/songs/" + this.props.id, {
            id: this.props.id,
            title,
            genre,
            singer,
          })
          .then(function (response) {
            that.props.onAddSongToList(response.data);
            that.setState({
              id: "",
              title: "",
              singer: "",
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("/songs", {
            id: this.props.totalSong + 1,
            title,
            genre,
            singer,
          })
          .then(function (response) {
            that.props.onAddSongToList(response.data);
            that.setState({
              id: "",
              title: "",
              singer: "",
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-input"
            onChange={this.handleTitleChange}
            value={this.state.title}
            placeholder="Title"
          />
          <select
            className="cs-select"
            onChange={this.handleGenreChange}
            value={this.state.genre}
          >
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Country">Country</option>
          </select>
          <input
            type="text"
            className="form-input"
            onChange={this.handleSingerChange}
            value={this.state.singer}
            placeholder="Singer"
          />
          <input type="submit" className="btn-save" value="Add Song" />
        </form>
      </div>
    );
  }
}

export default FormSong;
