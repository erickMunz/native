import React, { Component } from "react";
import {
  AppRegistry,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View, // Container component
  Alert,ActivityIndicator
} from "react-native";
import api from "../../api";

import { StackNavigator } from "react-navigation";
//import Spinner from "react-native-loading-spinner-overlay";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoggedin: false,
      loading: false
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };
  onchange =(e)=>{
      this.setState({[e.target.name]: e.target.value});
      this.validate(this.state);
  }
  validateEmail =(email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validate = (data) =>{
    console.log(data);
    let errores={
      usuario:''
      ,contraseña:''}
    if(!this.validateEmail(data.username)){
      errores.usuario="Error en el correo";
      this.setState({error:errores.usuario});
      if(data.password!='' && data.password.length<5){
        errores.contraseña='Error la contraseña deberia ser de mas de 5 caracteres';
        this.setState({error:errores});
      }else{
        errores.contraseña="";
        console.log('error contraseña')
        this.setState({error:errores})
        return 1;
      }
    }else{
      if(data.password!='' && data.password.length<5){
        errores.contraseña='Error la contraseña deberia ser de mas de 5 caracteres';
        this.setState({error:errores});
      }else{
        errores.contraseña="";
        console.log('error contraseña')
        this.setState({error:errores})
        return 1;
      }
      errores.usuario="";
      errores.contraseña=this.state.password;
      this.setState({error:errores  })
      return 1;
    }
    
  }
  async onLoginPress() {
    
    const {email, password} = this.state;
    if(email.length==0 ||  password.length==0){
      Alert.alert(
        'Error',
        'Los campos deben de tener datos',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }else{
    this.setState({loading:true})
    args= {
      email:email,
      password:password
    }
    api.login(args).then((algo)=>{
      console.log(algo);
      this.setState({loading:false});
      AsyncStorage.setItem("xkey","hola prro");
      this.props.navigation.navigate("Inicio");
    }).catch(err=>{
        
      this.setState({loading:false});
        Alert.alert(
          'Login incorrecto',
          'El usuario o la contraseña son incorrectos',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      console.log(err);
    })
  }
    
  }
  render() {
    const {isLoggedin, loading} = this.state
    
    
    return (
      <View style={styles.container}>
        <View behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../../../assets/flaticon.png")} />
            <Text style={styles.subtext}>Inicia sesion</Text>
          </View>
          <KeyboardAvoidingView style={styles.keyboard} behavior="padding">
            <View style={styles.window}>
              <TextInput
                placeholder="Correo "
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.window}>
              <TextInput
                placeholder="Contraseña"
                name="password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                secureTextEntry
                style={styles.input}
                ref={input => (this.passwordInput = input)}
                value={this.state.password}
                onChangeText={password => this.setState({password})}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              accessible={this.activo}
              onPress={this.onLoginPress.bind(this)}
            >
              {loading?<ActivityIndicator size="large" color="#0000ff" />:<Text style={styles.buttonText}>INICIA SESSION</Text>}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("Register")}
            title="Sign up"
          >
            REGISTRATE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            title="Forget Password"
          >
            OLVIDASTE LA CONTRASEÑA?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5B4FFF"
  },input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 150
  },
  subtext: {
    color: "#ffffff",
    fontWeight: "900",
    marginTop: 10,
    width: 160,
    textAlign: "center",
    opacity: 0.8
  },
  keyboard: {
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#27ae60",
    paddingVertical: 15
  },
  window: {
    marginBottom: 20
  }
});

AppRegistry.registerComponent("Login", () => Login);
