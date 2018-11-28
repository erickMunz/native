import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import Login from "./src/app/components/Login";
import Boiler from "./src/app/components/Boiler";
import ForgetPassword from "./src/app/components/ForgetPassword";
import Register from "./src/app/components/Register";
import Inicio from "./src/app/components/Inicio";
import Camera from "./src/app/components/camara";

import { StackNavigator } from "react-navigation";

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

class Home extends Component<{}> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#16a085" title="pagina chida"/>
        <Login navigation={this.props.navigation} />
      </View>
    );
  }
}

export default App = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Inicio"
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Inicio de sesion"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Registro",
    }
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      title: "Recuperar contraseña"
    }
  },
  Boiler: {
    screen: Boiler,
    navigationOptions: {
      title: "Boiler"
    }
  },
  Inicio:{
    screen: Inicio,
    navigationOptions:{
      title:"Inicio"
    }
  },
  Camera:{
    screen: Camera,
    navigationOptions:{
      title:"Camara"
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});