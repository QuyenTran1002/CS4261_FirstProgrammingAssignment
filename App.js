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
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.loginHeader}>Login</Text>
          <Text style={styles.usernamePrompt}>Username</Text>
          <TextInput style={styles.input}></TextInput>
          <Text style={styles.usernamePrompt}>Password</Text>
          <TextInput style={styles.input}></TextInput>
          <Button title = 'Login' onPress={this.addItem}></Button>
          <Button title = 'Sign Up' onPress={this.addItem}></Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loginHeader: {

  },
  usernamePrompt: {

  },
  input: {

  }
});
