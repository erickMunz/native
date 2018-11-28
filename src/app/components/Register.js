import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,
  ScrollView
} from "react-native";

import api from "../../api";

import { StackNavigator } from "react-navigation";
//import { ScrollView } from "react-native-gesture-handler";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      last_name:"",
      password: "",
      password_confirmation: "",
      fch_nac:""
    };
  }
  validateEmail =(email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validaFecha(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    if(Number.isNaN(d.getTime())) return false; // Invalid date
    return d.toISOString().slice(0,10) === dateString;
  }
  validate (){
    const { email, password, name, last_name,password_confirmation,fch_nac} = this.state;
    
    if(password.length==0||email.length==0||name.length==0||last_name.length==0||fch_nac.length==0||password_confirmation.length==0){
      Alert.alert(
        'Error',
        'Los campos deben de tener datos',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      
      return 0;
    }
    else{
      if(!this.validateEmail(email)){
        Alert.alert(
          'Error',
          'No es un mail valido',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
        
        return 0;
      }
      else{
        if(password!=password_confirmation){
          Alert.alert(
            'Error',
            'Las contraseñas deben coincidir',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
          
          return 0;
        }
        else{
          if(password.length<6){
            Alert.alert(
              'Error',
              'Las contraseña debe ser mayor de 6 caracteres',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
            return 0;
          }else{
            return 1;
        }
      } 
    }
  }
   
  }
  

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    }
  };

  async onRegisterPress() {
    
    const { email, password, name, last_name,password_confirmation,fch_nac} = this.state;
    if(this.validate()){
      const args = {
        'email': email,
        'password': password,
        'password_confirmation': password_confirmation,
        'birthday':fch_nac,
        'last_name':last_name,
        'name':name
    }
    console.log("Datos que envie");
    console.log(args);
    api.register(args).then((data)=>{ 
      console.log(data);
      console.log(email);
      console.log(name);
      console.log(password);
      /*await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("password", password);*/
  
      this.props.navigation.navigate("Inicio");
    }).catch((err)=>{console.log(err)});
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
       
        <KeyboardAvoidingView style={styles.keyboard} behavior="padding">
        
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.last_name.focus()}
          />
          <TextInput
            value={this.state.last_name}
            onChangeText={last_name => this.setState({ last_name })}
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            ref={input => (this.last_name = input)}
          />
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordCInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={true}
            placeholder="Correo electronico"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            placeholderTextColor="rgba(255,255,255,0.7)"
            ref={input => (this.passwordCInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            value={this.state.password_confirmation}
            onChangeText={password_confirmation => this.setState({ password_confirmation })}
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry={true}
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
          />
          
          <TextInput
            value={this.state.fch_nac}
            onChangeText={fch_nac => this.setState({ fch_nac })}
            style={styles.input}
            placeholder="Fecha de nacimiento"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            keyboardType="number-pad"
            autoCorrect={false}
            ref={input => (this.fch_nac = input)}
          />
          
        <TouchableHighlight
          onPress={this.onRegisterPress.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableHighlight>
        </KeyboardAvoidingView>
        </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16a085"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  keyboard: {
    margin: 10,
    padding: 10,
    alignSelf: "stretch"
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 20
  },
  button: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "stretch",
    marginTop: 10,
    justifyContent: "center",
    paddingVertical: 15,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  subtext: {
    color: "#ffffff",
    width: 160,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 20
  },logo: {
    width: 200,
    height: 70
  },
  window: {
    marginBottom: 20
  }
});

AppRegistry.registerComponent("Register", () => Register);
