import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Comment = (props) => {
    return (
        <View style={ styles.comment }>
            <View>
                    <Image style={ styles.commentImage  } source={ { uri:`http://localhost:3333/files/${props.image}` } } />
            </View>
            <View style={ {  flexDirection:'column' } }>
                <View style={ {  flexDirection:'row' } }>
                    <Text style={ styles.commentAuthor }> { props.author }</Text>
                    <Text style={ styles.commentDescription }> { props.description  }  </Text>
                </View>
                <View style={ {  flexDirection:'row' } }>
                    <Text style={ styles.reply }> 1m</Text>
                    <Text style={ styles.reply }> Reply  </Text>
                </View>
            </View>

        </View>
    )
}

export default Comment

const styles = StyleSheet.create({
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
    commentDescriptionSection:{
        
        fontWeight: '100',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    commentImage:{
        height:30,
        width:30,
        borderRadius:15,
        marginRight:10,
    },
    reply:{
        color:'#8e8e8e'
    },
})
