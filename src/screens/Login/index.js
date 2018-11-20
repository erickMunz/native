import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,Button
} from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      redirect: false,
      loading:false,
      register: false,
      error:{
        usuario:'',
        contraseña:''
      }
    }
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
   onChange = (e) =>{
     this.setState({[e.target.name]: e.target.value});
     this.validate(this.state);
     
   }
   onSubmit = () =>{
     if(this.validate(this.state)){
 
       post('login',this.state).then((result)=>{
         let response= result;
         if(response.user){
           sessionStorage.setItem('usuario', response.user);
           this.setState({redirect:true});
         }
         console.log(response);
       })
       this.setState({loading:true})
     }else{
       console.log("no mande ni mergas");
     }
   }
   register = () =>{
     this.setState({register:true})
   }
  
    render() {
        return (
                <Container >
                  <Header />
                  <Content>
                    <Form>
                      <Item>
                        <Input placeholder="Username" name="username" onChange={this.onChange}/>
                      </Item>
                      <Item last>
                        <Input placeholder="Password" name="password" onChange={this.onChange} />
                      </Item>
                      <Button title={"Envia"} onPress={this.props.onLoginPress}>
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                  </Content>
                </Container>
            )
    }
}