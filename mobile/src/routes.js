import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';


const AppNavigator = createStackNavigator({
  Feed,
  New
},{
    initialRouteName:'Feed',
    defaultNavigationOptions: {
        headerTintColor:'#000',
        headerTitle: () => <Image style={ { marginHorizontal:20} } source={logo}/>,
        headerBackTitle : () => {}
    },
    mode : 'modal'
});

export default createAppContainer(AppNavigator);