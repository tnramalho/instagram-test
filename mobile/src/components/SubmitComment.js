import React , { useState } from 'react'
import { StyleSheet, Text,TextInput, TouchableOpacity, View } from 'react-native'

const SubmitComment = (props) => {
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    handleSubmit = () =>{
        
        let comment = { 
            id: props.postId,  
            author: author  , 
            description : description 
        }

        props.onSubmit(comment);

        setAuthor('');
        setDescription('');
    }

    handleKeyReturn = (e) =>{
        handleSubmit();
    }

    return (
        <View   style={ styles.commentDescriptionSection }>
            <TextInput 
                style={ styles.input}
                autoCorrect={ false }
                placeholder="Author"
                placeholderTextColor="#999"
                value={ author }
                onChangeText={ (value) => { setAuthor(value) }}
            />
        
            <TextInput 
                style={ styles.input}
                autoCorrect={ false }
                placeholder="Comment"
                placeholderTextColor="#999"
                value={ description }
                onChangeText={ description => setDescription( description )}
                onSubmitEditing={ handleKeyReturn }
                returnKeyType="done"

            />
            <TouchableOpacity onPress={  handleSubmit  }>
                <Text style={ styles.sendButton }> Post</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SubmitComment

const styles = StyleSheet.create({
    commentDescriptionSection:{
        
        fontWeight: '100',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input:{
        padding:10,
        fontSize: 16,
        marginVertical:7
    },
    sendButton:{
        color:'#0095f6'

    }});
