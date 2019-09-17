import React, {Component} from 'react';
import {Scene, Router} from 'react-native-router-flux';
import DetailScreen from './src/screen/DetailScreen';
import MainScreen from './src/screen/MainScreen';
import SwiperScreen from './src/screen/SwiperScreen';

//NAVIGATING SCREENS

export default class App extends Component {
  render() {
    return (
      <Router navigationBarStyle={{backgroundColor: '#fff'}}>
        <Scene key="root">
          <Scene key="main" component={MainScreen} initial hideNavBar />
          <Scene key="detail" component={DetailScreen} />
          <Scene key="swiper" component={SwiperScreen} />
        </Scene>
      </Router>
    );
  }
}
