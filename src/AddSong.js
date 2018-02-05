import React, { Component } from 'react';
import axios from './config';

export default class FormSong extends Component {

    constructor(props){
        super(props);
        this.state = { id:'', title: '', genre: 'Pop', singer: '' };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleSingerChange = this.handleSingerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTheLastSongId = this.getTheLastSongId.bind(this);
    }

    getTheLastSongId(){
        axios.get('/songs')
        .then((response) => {
            var id = response.data.length;
            return id;
        })
        .catch((error) => {
          console.log(error);
        });
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
        axios.post('/songs', {
            id : this.getTheLastSongId,
            title: this.state.title,
            genre: this.state.genre,
            singer: this.state.singer
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleTitleChange} value={this.state.title} placeholder="Title" />
                    <select onChange={this.handleGenreChange} value={this.state.genre}>
                        <option value="Pop">Pop</option>
                        <option value="Rock">Rock</option>
                        <option value="Country">Country</option>
                    </select>
                    <input type="text" onChange={this.handleSingerChange} value={this.state.singer} placeholder="Singer" />
                    <input type="submit" className="btn-save" value="Add Song" />
                </form>
            </div>
        );
    }
}