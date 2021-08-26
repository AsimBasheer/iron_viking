import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, TouchableNativeFeedback, Text, View, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SimpleLineIcons, MaterialCommunityIcons, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { WP } from './responsive';
import { LinearGradient } from 'expo-linear-gradient';

import Login from './auth_src/login'
import Signup from './auth_src/Signup'

const Tab = createMaterialTopTabNavigator();

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={{ marginTop: 30, height: '8%', backgroundColor: 'white', flexDirection: 'row', elevation: 5 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <AntDesign style={{ justifyContent: 'center', marginLeft: 10, marginTop: 20 }} name="arrowleft" size={24} color="#a9a9a9" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}> Congratulations</Text>
                </View>
                <View style={{ width: '100%', marginTop: 20, flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                    <Image style={{ width: '100%', marginTop: 50, justifyContent: 'center', alignSelf: 'center', height: '82%' }} source={require('../assets/completed.jpg')} />
                </View>
                <View style={{ width: '100%', backgroundColor: '#fff' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '90%', height: 50, borderRadius: 5, backgroundColor: 'rgb(173,0,22)' }}>
                        <Text style={{ color: 'white' }}>Another Workout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Dashboard') }} style={{ marginTop: 10, marginBottom: 8, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '90%', height: 50, borderRadius: 5, backgroundColor: '#1B0B2B' }}>
                        <Text style={{ color: 'white' }}>Done</Text>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 5,
//         backgroundColor: '#fff',
//         // alignItems: 'center',
//         // justifyContent: 'center',
//     },
// });
const styles = StyleSheet.create({
    imgBg: {
        marginLeft: 1,
        marginTop: 2,
        width: '98%',
        height: "97%",
        // resizeMode: 'cover',
    },
    background: {
        position: 'absolute',
        left: '59%',
        right: 0,
        bottom: 0,
        // padding: 10,
        width: '34%',
        height: '100%',
        marginLeft: 5,
        marginRight: 5,
        // borderBottomEndRadius: 5
        // marginBottom: 3
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    openButton1: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 15,
        elevation: 2
    },
    text: {
        fontSize: 15,
        color: "#000000",
        fontWeight: "bold",
        letterSpacing: 2,
    },
    image: {
        width: 35,
        height: 35,
    },
    button_view: {
        flex: 1,
        top: -10,
        alignItems: "center",
        justifyContent: "center",
    },
    _TextInput_Style: {
        borderBottomWidth: 1,
        backgroundColor: "#ffff",
        borderBottomColor: "#dddddd",
        padding: 5,
        marginVertical: 10,
        width: 300,
    },
    _Forgot_Password: {
        textAlign: "right",
        fontSize: 16,
        marginVertical: 5,
        color: "#1B0B2B",
        marginRight: 20,
    },
    _Touchable_Text_Colors: {
        fontSize: 16,
        color: "#fff",
        // fontWeight: "bold",
        // letterSpacing: 2,
    },
    _LOGIN_Button_Style_IOS: {
        width: 230,
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 5,
        justifyContent: "center",
        alignSelf: 'center',
        alignContent: "center",
        margin: 5,
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_android: {
        width: "94%",
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 5,
        // borderWidth:2,
        // borderColor:'#E48565',
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginVertical: 5,
        margin: 5,
    },
    _LOGIN_Button_Style_IOS_camera: {
        width: 90,
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 5,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_android_camera: {
        marginLeft: 5,
        width: "30%",
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 10,
        // borderWidth:2,
        // borderColor:'#E48565',
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginVertical: 5,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_IOS_video: {
        width: 70,
        height: 50,
        marginRight: 10,
        backgroundColor: "#1B0B2B",
        borderRadius: 10,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_android_video: {
        marginLeft: 5,
        width: "30%",
        marginRight: 10,
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 10,
        // borderWidth:2,
        // borderColor:'#E48565',
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginVertical: 5,
        // marginBottom: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    modalView: {
        height: '70%',
        width: '90%',
        margin: 10,
        //   justifyContent:'center',
        backgroundColor: "#F4F7F0",
        borderRadius: 10,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalView1: {
        height: '20%',
        width: '50%',
        margin: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: "#E8E8E8",
        borderRadius: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
    openButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 80,
        backgroundColor: "#1B0B2B",
        borderRadius: 10,
        padding: 15,
        elevation: 2
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 15,
        elevation: 2
    },
    root: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#eee',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    main: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
    editor: {
        backgroundColor: '#fff'
    },
    toolbarContainer: {
        minHeight: 35
    },
    menuOptionText: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    divider: {
        marginVertical: 0,
        marginHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: '#eee'
    }

});