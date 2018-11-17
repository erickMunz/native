import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
import { Container, Header, Content, Form, Item, Input ,Button} from 'native-base';
export default class Login extends Component {

    render() {
        return (
            
                  <Container >
                  <Header />
                  <Content>
                    <Form>
                      <Item>
                        <Input placeholder="Username" />
                      </Item>
                      <Item last>
                        <Input placeholder="Password" />
                      </Item>
                      <Button block onPress={this.props.onLoginPress}>
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                  </Content>
                </Container>
            )
    }
}