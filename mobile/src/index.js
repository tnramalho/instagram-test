import React from 'react';
import {
  YellowBox
} from 'react-native';

import Routes from "./routes";


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App (){

    return <Routes />
  // return <View style={ { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#f00'}  }>
  //       <Text>Hellow World!</Text>
  //    </View>


}
