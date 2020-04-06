import React, { Component } from "react";
import './Feed.css';
import api from '../services/api';
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';
import io from 'socket.io-client';

class Feed extends Component {

    state = {
        feed : [],
    };

    handleLike = async id => {
        const response = await api.post(`posts/${id}/like`);
    } 

    async componentDidMount (){
        this.registerToSocket();

        const response = await api.get('posts');
        
        this.setState({ feed : response.data });

        console.log(response);

    };

    registerToSocket = () => {
        const socket = io('http://localhost:3333');


        socket.on('post', newPost => {
            this.setState({
                feed : [newPost, ... this.state.feed],
            });
        });

        socket.on('like', likedPost => {
            this.setState({
                feed : this.state.feed.map(post =>{ 
                    return post._id == likedPost._id ? likedPost : post
                    }
                )
            });
        });
    }

    render() {
        return (
            <section id='post-list'>
            { this.state.feed.map( post => (
                    <article key={ post._id }>
                    <header>
                        <div className='user-info'>
                            <span>{post.author}</span>
                            <span className='place'>{post.place}</span>
                        </div>
                        <img src={more} alt="More"/>
                        
                    </header>
                    
                    <img src={`http://localhost:3333/files/${post.image}`} />

                    <footer>
                        <div className='actions'>
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <img src={like} alt="Like"/>
                            </button>
                            <img src={comment}  alt="Comments"/>
                            <img src={send}     alt="More"/>
                        </div>
                        <strong>{post.likes} curtidas</strong>
                        
                        <p>{ post.description}
                            <span>{ post.hashtags }</span>
                        </p>
                    </footer>
                </article>
               
            )) 
            } 
                
            </section>
        )
    };
}


export default Feed;