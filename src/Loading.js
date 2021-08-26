import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props)
    this.checkLogin()
  }
  checkLogin = async () => {


    const userToken = await AsyncStorage.getItem('isLoggedIn');
    // console.log(userToken);

    setTimeout(() => {

      if (userToken == 1) {

        this.props.navigation.replace('Dashboard');

      } else {
        this.props.navigation.replace('UserSelect');

      }
    }, 1000);
  };
  // bahirnikalappsa=async()=>{
  //   console.log('login is now running')
  //  this.props.navigation.navigate('Logout')
  //  console.log('sadasdasd')
  // }

  render() {

    const { navigate } = this.props.navigation;
    return (

      <View style={{ flex: 1, backgroundColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' }}>
        {/* <NavigationEvents onDidFocus={() => this.bahirnikalappsa()}/> */}
        {/* // <Image source={require('./assets/gif.gif')} style={{width:'100%',height:'30%'}} /> */}

      </View>
    );
  }
}