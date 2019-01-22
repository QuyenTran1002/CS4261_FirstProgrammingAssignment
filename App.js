import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import {Constants} from 'expo';
import { Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBasnhoBBPBGCUDT81DTyXXrZkQ-aR1ZaY",
  authDomain: "firstassignment-b1166.firebaseapp.com",
  databaseURL: "https://firstassignment-b1166.firebaseio.com",
  projectId: "firstassignment-b1166",
  storageBucket: "firstassignment-b1166.appspot.com",
  messagingSenderId: "931584263833"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }
  login() {
  }
  register() {
    // alert(this.state.username)
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.username, this.state.password).then((res) => {
      firebase.database().ref('users/' + res.user.uid).set({
        username: this.state.username,
      })
    })

  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.loginView}>
          <Text style={styles.loginHeader}>Login</Text>
          <Text style={styles.usernamePrompt}>Email</Text>
          <TextInput style={styles.input} value={this.state.username} onChangeText={(text)=>this.setState({username: text})}></TextInput>
          <Text style={styles.usernamePrompt}>Password</Text>
          <TextInput secureTextEntry={true} style={styles.input} value={this.state.password} onChangeText={(text)=>this.setState({password: text})}></TextInput>
          <Button style={styles.blueBtn} title='Login' backgroundColor='red' onPress={this.login}></Button>
          <Button style={styles.greenBtn} title='Sign Up' backgroundColor='#0096FF' onPress={this.register}></Button>
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  blueBtn: {
    borderColor: 'blue',
    borderRadius: 5,
    height: 35,
    marginBottom: 20,
    backgroundColor: '#E9E9E9',
  },
  greenBtn: {
    borderColor: 'blue',
    borderRadius: 5,
    height: 35,
    marginBottom: 20,
    backgroundColor: '#E9E9E9',
  },
  loginView: {
    padding: 25,
  },
  loginHeader: {
    fontSize: 50,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  usernamePrompt: {
    fontSize: 18,
    paddingBottom: 5,
  },
  input: {
    borderColor: 'blue',
    borderRadius: 5,
    height: 35,
    marginBottom: 20,
    backgroundColor: '#E9E9E9',
  }
});
