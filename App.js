import React from 'react';
import {Constants} from 'expo';
import * as firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
import { WeatherWidget } from 'react-native-weather';
import { Text, View, Button, 
  StyleSheet, TextInput, SafeAreaView} from 'react-native';
import { createAppContainer, createStackNavigator, 
  StackActions, NavigationActions } from 'react-navigation';

//--------------------------------------------------//

const config = {
  apiKey: "AIzaSyBasnhoBBPBGCUDT81DTyXXrZkQ-aR1ZaY",
  authDomain: "firstassignment-b1166.firebaseapp.com",
  databaseURL: "https://firstassignment-b1166.firebaseio.com",
  projectId: "firstassignment-b1166",
  storageBucket: "firstassignment-b1166.appspot.com",
  messagingSenderId: "931584263833"
};
firebase.initializeApp(config);

//--------------------------------------------------//


// global.user = firebase.user;

//--------------------------------------------------//

class SignupScreen extends React.Component {
  constructor(props) {
    // global.userNAME;
    // global.userPASS;
    // global.userINFO;
    // global.userMAJOR;

    super(props);
    this.state = {
      username: '',
      password: '',
      info: '',
      major: '',
    }
    this.register = this.register.bind(this);
  }

  // static getNAME() {
  //   return this.userNAME;
  // }

  register() {
    userNAME = this.state.username;
    userPASS = this.state.password;
    // temp = this.state.username;
    // console.log(temp);

    firebase.auth().createUserWithEmailAndPassword(this.state.username, 
      this.state.password).then((res) => {
        userINFO = this.state.info;
        userMAJOR = this.state.major;
        // console.log(this.state.info);
        firebase.database().ref('users/' + res.user.uid ).set({
        major: this.state.major,
        info: this.state.info,
        username: this.state.username,
      })
    })
    alert("Successful. Please Login.");
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.loginView}>
          <Text style={styles.loginHeader}>InfoCollector</Text>
          
          <Text style={styles.usernamePrompt}>Email</Text>
          <TextInput style={styles.input} 
            placeholder='you@domain.com' 
            value={this.state.username} 
            onChangeText={(text)=>this.setState({username: text})}></TextInput>
          
          <Text style={styles.usernamePrompt}>Password</Text>
          <TextInput secureTextEntry={true} 
            autoCorrect={false} 
            placeholder='******' 
            style={styles.input} 
            value={this.state.password} 
            onChangeText={(text)=>this.setState({password: text})}></TextInput>
          
          <Text style={styles.usernamePrompt}>Major</Text>
          <TextInput 
            style={styles.input}
            value={this.state.major}
            onChangeText={(text)=>this.setState({major: text})}
            placeholder='Your major'></TextInput>
          
          <Text style={styles.usernamePrompt}>About yourself</Text>
          <TextInput 
            style={styles.input}
            value={this.state.info}
            onChangeText={(text)=>this.setState({info: text})}
            placeholder='Tell something about yourself'></TextInput>
          
          <Button style={styles.greenBtn} 
            title='Sign Up' 
            backgroundColor='#0096FF' 
            onPress={this.register}></Button>

          <Button
            title="Log In"
            onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'LogIn' })
                ],
              }))
            }}
          />

          <WeatherWidget
            api={"9198bd7fa0fe721d6f54ce9861e973d6"}
            lat={"33.753746"}
            lng={"-84.386330"}
          />

        </View>
      </SafeAreaView>
    );
  }  
}

//--------------------------------------------------//

class LoginScreen extends React.Component {
  constructor(props) {
    global.userNAME;
    global.userPASS;
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.login = this.login.bind(this);
  }

  static getNAME() {
    return this.userNAME;
  }

  login() {
    try {
      userNAME = this.state.username;
      userPASS = this.state.password;
      firebase.auth().signInWithEmailAndPassword(this.state.username, 
        this.state.password).then((user) => {
          // console.log(user)
          if (user) {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Profile' })
              ],
            }))
          }
      })
    } catch (error) {
      alert('Login Failed')
    }
  }
  
  render() {
    return (
      <SafeAreaView>
        <View style={styles.loginView}>
          <Text style={styles.loginHeader}>InfoCollector</Text>

          <Text style={styles.usernamePrompt}>Email</Text>
          <TextInput style={styles.input} 
            placeholder='you@domain.com' 
            value={this.state.username} 
            onChangeText={(text)=>this.setState({username: text})}></TextInput>
          
          <Text style={styles.usernamePrompt}>Password</Text>
          <TextInput secureTextEntry={true} 
            autoCorrect={false} 
            placeholder='******' 
            style={styles.input} 
            value={this.state.password} 
            onChangeText={(text)=>this.setState({password: text})}></TextInput>
          
          <Button style={styles.greenBtn} 
            title='Log In' 
            backgroundColor='#0096FF' 
            onPress={this.login}></Button>

          <Button
            title="Sign Up"
            onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'SignUp' })
                ],
              }))
            }}
          />
        </View>
      </SafeAreaView>
    );
  }  
}

//--------------------------------------------------//

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    global.temp;
  }
  temp() {
    // firebase.database().ref.once('value').then(function(dataSnapshot) {
    //   console.log('hello' + dataSnapshot.val().info);
    // });
    // console.log(temp);
    console.log('hi ' + global.userNAME);

    // var temp = firebase.database().ref('users').orderByChild('username')
    //   .equalTo(global.userNAME).once('value', snap => console.log(snap.val()));

    var temp = firebase.database().ref('users').orderByChild('username')
      .equalTo(global.userNAME).on('child_added', snap => console.log(snap.val()));
    // console.log('temp = ' + temp);

    // firebase.database().ref('users').orderByChild('username')
    //     .equalTo(global.userNAME).on('value', (snapshot) => {
    //       return {
    //         info: snapshot.val().info
    //       }
    //     });
    // console.log(global.temp);

    // temp = temp.toString();
    // console.log('hello ' + temp);
  }
  render() {
    name = LoginScreen.getNAME();
    // console.log(name);
    // this.temp();
    return (
      <SafeAreaView>
        <View style={styles.loginView}>
          <Text style={styles.loginHeader}>InfoCollector</Text>

          <Text style={styles.usernamePrompt}>PROFILE PAGE</Text>

          {/* console.log(global.user.username); */}
          {/* <Text style={styles.usernamePrompt}>{SignupScreen.userNAME}</Text> */}
          {/* <Text style={styles.usernamePrompt}>{global.temp}</Text> */}
          <Text style={styles.usernamePrompt}>{global.userNAME}</Text>
          <Text style={styles.usernamePrompt}>{global.userPASS}</Text>
          <Text style={styles.usernamePrompt}>{global.userMAJOR}</Text>
          <Text style={styles.usernamePrompt}>{global.userINFO}</Text>
          {/* <Text style={styles.usernamePrompt}>{global.temp}</Text> */}


          <Button
            title="Log Out"
            onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'SignUp' })
                ],
              }))
            }}
          />
        </View>
      </SafeAreaView>
    );
  }  
}

//--------------------------------------------------//

const AppNavigator = createStackNavigator({
  SignUp: {
    screen: SignupScreen,
  },
  LogIn: {
    screen: LoginScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
}, {
    initialRouteName: 'SignUp',
});
export default createAppContainer(AppNavigator);

//--------------------------------------------------//

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
    color: 'purple',
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
  },
  
  txtInput: {
    borderColor: 'blue',
    borderRadius: 5,
    height: 35,
    marginBottom: 20,
    backgroundColor: '#E9E9E9',
  },
});
