/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//TO DISABLE YELLOW WARNING BOX IN APPLICATION
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
