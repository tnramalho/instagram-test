import React, { Component } from "react";
import api from '../services/api';
import './New.css';


class New extends Component {

    state = {
        image : null,
        author : '',
        place : '',
        description : '',
        hashtags : '',
    };

    handleSubmit = async e =>{
        e.preventDefault();

        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        const response = await api.post("posts", data);

        this.props.history.push('/');

    }


    handleImageChange = e =>{
        console.log(e.target.files);
        this.setState({ image : e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value  });
    }

    render() {
        return (
            <form id="new-post">
                <input onChange={this.handleImageChange} type='file' />

                <input 
                    type="text"
                    name="author"
                    placeholder="Author of post"
                    onChange={this.handleChange}
                    value={this.state.author}
                />

                <input 
                    type="text"
                    name="place"
                    placeholder="Place of post"
                    onChange={this.handleChange}
                    value={this.state.place}
                />

                <input 
                    type="text"
                    name="description"
                    placeholder="Description of post"
                    onChange={this.handleChange}
                    value={this.state.description}
                />
                <input 
                    type="text"
                    name="hashtags"
                    placeholder="Hashtags of post"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />
                <button onClick={this.handleSubmit} type="submit">Send</button>

            </form>
        )
    };
}


export default New;