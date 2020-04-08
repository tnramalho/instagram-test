import React, { Component } from 'react'
import { Text, View, KeyboardAvoidingView, Image, StyleSheet,  TouchableOpacity , FlatList, TextInput } from 'react-native'
import io from 'socket.io-client'
import api from '../services/api';
import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import commentImg from '../assets/comment.png';
import send from '../assets/send.png';

import Comment from '../components/Comment';
import SubmitComment from '../components/SubmitComment';


export default class Feed extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: () =>   
            <TouchableOpacity 
                    style={{ marginRight: 20} } 
                    onPress={ () => { navigation.navigate('New') } }>
                <Image  source={ camera }/>
            </TouchableOpacity>
        ,
    });

    state = {
        feed : [],
        author:"",
        description:"",

        showComment: false,
        showCommentFromId: null
    };


    handleShowComment = id => {
        if (id == this.state.showCommentFromId){
            this.setState({
                showCommentFromId : null
            });
        } else {
            this.setState({
                showCommentFromId : id
            });
        }
    } 

    handleLike = async id => {
        await api.post(`posts/${id}/like`);
    } 

    handleComment = async comment => {

        console.log("handleComment");
        console.log(comment);
        await api.post(`posts/${comment.id}/comment`, comment);

        this.setState({ author:"", description:"" });
    }

    async componentDidMount (){
        this.registerToSocket();

        const response = await api.get('posts');
        
        this.setState({ feed : response.data });

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
            <KeyboardAvoidingView behavior='position' style={styles.container}>
                
                <FlatList 
                    data={this.state.feed}
                    keyExtractor={post => post._id}
                    renderItem={ ( { item } ) =>(
                        

                        <View style={ styles.feedItem}>
                            <View style={ styles.feedItemHeader }>
                                <View style={ styles.userInfo }>
                                        <Text style={ styles.name }> { item.author } </Text>
                                        <Text style={ styles.place }> { item.place } </Text>
                                </View>
                                <Image source={ more }/>
                            </View>
                        
                            <Image style={ styles.feedImage  } source={ { uri:`http://localhost:3333/files/${item.image}` } } />
                            <View style={ styles.feedItemFooter }>
                                <View style={styles.actions}>
                                    <TouchableOpacity style={styles.action} onPress={ () =>{ this.handleLike(item._id) } }>
                                        <Image source={ like } />
                                    </TouchableOpacity>
                                    <TouchableOpacity  style={styles.action} onPress={ () =>{ this.handleShowComment(item._id)  } }>
                                        <Image source={ commentImg } />
                                    </TouchableOpacity>
                                    <TouchableOpacity  style={styles.action} onPress={ () =>{ } }>
                                        <Image source={ send } />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.likes}> { item.likes } curtidas</Text>
                                <Text style={styles.description}> { item.description } </Text>
                                <Text style={styles.hashtags}> { item.hashtags } </Text>
                                <View  style={ styles.comments }>
                                <View>
                                    <FlatList 
                                        data={item.comments}
                                        keyExtractor={obj => obj._id}
                                        renderItem={ (  { item : comment }  ) =>( 

                                            <Comment  image={ item.image }
                                                      author={ comment.author  } 
                                                      description={ comment.description } />
                                            
                                        )}>
                                            
                                    </FlatList> 
                                    { this.state.showCommentFromId == item._id &&
                                            <SubmitComment
                                                postId={item._id}
                                                onSubmit={ this.handleComment }
                                            />
                                           
                                    }
                                </View>

                                </View>
                            </View>
                        </View>

                    ) }
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    feedItem :{
        marginTop:20
    },
    feedItemHeader :{
        paddingHorizontal:15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontSize: 14,
        color:'#000'
    },
    place:{
        fontSize:12,
        color:'#666',
        marginTop:2
    },
    feedImage:{
        width: '100%',
        height: 400,
        marginVertical: 15
    },
    feedItemFooter :{
        paddingHorizontal:15,
    },
    actions:{
        flexDirection:'row'
    },
    action:{
        marginRight:8
    },
    likes:{
        marginTop: 15,
        fontWeight:'bold',
        color:'#000'
    },
    description: {
        lineHeight: 18,
        color:'#000'
    },
    hashtags:{
        color:'#7159c1'
    },
    comments :{
        flex:1
    },
    comment :{
        flexDirection:'row',
        alignItems: 'center',
        padding:10,
    },
    commentAuthor :{
        fontWeight:'600',
        lineHeight: 18,
        color:'#000',
    },
    commentDescription :{
        
        
    },
    commentImage:{
        height:30,
        width:30,
        borderRadius:10,
        marginRight:10,
    },
    reply:{
        color:'#8e8e8e'
    },
});