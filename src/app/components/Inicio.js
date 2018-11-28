import React , {Component}from "react";
import { ScrollView, Text, Linking, View,AsyncStorage,StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";



export default class Inicio extends Component {
    async onLoginPress() {
        const {email, password} = this.state;
        args= {
          email:email,
          password:password
        }
        api.login(args).then((algo)=>{
          AsyncStorage.setItem("xkey","hola prro");
          this.setState({isLoggedin:true})}).catch(err=>{
          this.setState({})
          console.log(err);
        })
        
      }
    async seleccionSize(){
        console.log("se presiono");
        this.props.navigation.navigate("Camera");
    }
     async logout () {
        AsyncStorage.getItem("xkey").then((value) => {
            console.log(value);
            this.props.navigation.navigate("Login");
        })
        .then(res => {
            //do something else
        });
    }
    render(){

        var images = [
            {
              key: 1,
              name: "600 x 600",
              image: require("../../../assets/images/1.jpg"),
              url: "https://unsplash.com/photos/C9t94JC4_L8"
            },
            {
              key: 2,
              name: "Jamison McAndie",
              image: require("../../../assets/images/1.jpg"),
              url: "https://unsplash.com/photos/waZEHLRP98s"
            },
            {
              key: 3,
              name: "Alberto Restifo",
              image: require("../../../assets/images/1.jpg"),
              url: "https://unsplash.com/photos/cFplR9ZGnAk"
            },
            {
              key: 4,
              name: "John Towner",
              image: require("../../../assets/images/1.jpg"),
              url: "https://unsplash.com/photos/89PFnHKg8HE"
            }
          ];
    return(
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                {images.map(({ name, image, url, key }) => (
                    <Card title={`Tamaño  ${key}`} image={image} key={key}>
                    <Text style={{ marginBottom: 10 }}>
                        Photo by {name}.
                    </Text>
                    <Button
                        backgroundColor="#03A9F4"
                        title="Elegir"
                        //onPress={() => Linking.openURL(url)}
                        onPress={this.seleccionSize.bind(this)}
                    />
                    </Card>
                ))}
                </ScrollView>
                <Button title="Cerrar session" onPress={this.logout.bind(this)}/>
            </View>
        )}
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