import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import api from '../services/api';

import styles from './New.style';


export default class New extends Component {
    static navigationOptions = {
        headerTitle:'New Post'
    };

    state = {
        preview: null,
        author:"",
        place:'',
        description:"",
        hashtags:"",
        image:  null
    }
 
    handleSubmit = async () => {
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post("posts", data);

        this.props.navigation.navigate('Feed');
    }

    handleSelectImage = () =>{
            
        ImagePicker.showImagePicker({
            title:'Select Image'
        }, upload => {
                
                if (upload.error){
                    console.log('Error');
                } else if (upload.didCancel){
                    console.log('User Canceled');
                } else {
                    
                    const preview = {
                        uri : upload.uri
                    }

                    let prefix, ext;

                    if (upload.fileName){
                        [prefix, ext] = upload.fileName.split('.');
                    } else {
                        prefix = new Date().getTime();
                        ext ='jpg';
                    }
                     
                    ext = ext.toLocaleLowerCase() === 'heic' ? 'jpg' : ext;

                    const image = {
                        uri:upload.uri,
                        type: upload.type,
                        name: `${prefix}.${ext}`

                    };
                     
                    this.setState({ preview, image });
                    
                }
        })
    }

    render() {
        return (
            <View style={ styles.container }>
                <TouchableOpacity style={ styles.selectButton } onPress={ this.handleSelectImage }>
                    <Text style={ styles.selectButtonText }> Select Image </Text>
                </TouchableOpacity>
                {
                    this.state.preview 
                            && <Image style={ styles.preview }
                                        source={ this.state.preview  } 
                                        />
                }
                <TextInput 
                    style={ styles.input}
                    autoCorrect={ false }
                    autoCapitalize="none"
                    placeholder="Author Name"
                    placeholderTextColor="#999"
                    value={ this.state.author }
                    onChangeText={author=> this.setState({ author })}
                />
                <TextInput 
                    style={ styles.input}
                    autoCorrect={ false }
                    autoCapitalize="none"
                    placeholder="Place"
                    placeholderTextColor="#999"
                    value={ this.state.place }
                    onChangeText={ place => this.setState({ place })}
                />
                <TextInput 
                    style={ styles.input}
                    autoCorrect={ false }
                    autoCapitalize="none"
                    placeholder="Description"
                    placeholderTextColor="#999"
                    value={ this.state.description }
                    onChangeText={description=> this.setState({ description })}
                />
                <TextInput 
                    style={ styles.input}
                    autoCorrect={ false }
                    autoCapitalize="none"
                    placeholder="Hashtags"
                    placeholderTextColor="#999"
                    value={ this.state.hashtags }
                    onChangeText={hashtags=> this.setState({ hashtags })}
                />
                
                 <TouchableOpacity style={ styles.shareButton } 
                                    onPress={ this.handleSubmit }>
                    <Text style={ styles.shareButtonText }> Share </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
