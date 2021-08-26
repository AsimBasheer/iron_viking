import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity, TouchableNativeFeedback, Text, View, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SimpleLineIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box'

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
                <View style={{ flex: 0.5, backgroundColor: 'rgb(173,0,22)' }}>
                    <Image
                        style={{ alignSelf: 'center', width: '90%', marginTop: 20 }}
                        resizeMode={'contain'}
                        source={require("../assets/logoo.jpg")} />
                </View>
                <View style={{ felx: 4.5 }} ></View>
                <View style={{ width: '90%', height: '25%', backgroundColor: '#fff', position: 'absolute', marginBottom: 30, borderRadius: 5, alignSelf: 'center', marginTop: '50%', shadowOpacity: 5, elevation: 5, marginBottom: 80 }}>
                    <Image source={require('../assets/cell.jpg')} style={{ width: '97%', height: 205, alignSelf: 'center', position: 'absolute', borderRadius: 5, margin: 5 }} />
                </View>
                <View style={{ width: '60%', height: 60, alignSelf: 'center', backgroundColor: 'white', elevation: 10, borderRadius: 5, position: 'absolute', marginTop: 390 }}>
                    <View style={{ justifyContent: "flex-end", alignItems: 'center' }}>
                        {this.state.isLoading ? (
                            <View style={{ justifyContent: 'center' }}>
                                <View style={styles._LOGIN_Button_Style_android}>
                                    <ActivityIndicator size="large" color="white" />
                                </View>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row' }}>
                                {Platform.OS != "android" ? (
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.replace('Auth', { type: 'Sign up' })}
                                        style={{ ...styles._LOGIN_Button_Style_IOS }}
                                    >
                                        <Text style={styles._Touchable_Text_Colors}>New User</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableNativeFeedback onPress={() => this.props.navigation.replace('Auth', { type: 'Sign up' })}>
                                        <View style={{ ...styles._LOGIN_Button_Style_android }}>
                                            <Text style={styles._Touchable_Text_Colors}>New User</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                )}
                            </View>
                        )}
                    </View>

                </View>
                <View style={{ width: '90%', height: '21%', backgroundColor: '#fff', position: 'absolute', marginBottom: 30, borderRadius: 5, alignSelf: 'center', marginTop: '115%', shadowOpacity: 5, elevation: 5, marginBottom: 80 }}>
                    <Image source={require('../assets/young.jpg')} style={{ width: '97%', height: 200, alignSelf: 'center', position: 'absolute', borderRadius: 5, margin: 5 }} />
                </View>
                <View style={{ width: '60%', height: 60, alignSelf: 'center', backgroundColor: 'white', elevation: 10, borderRadius: 5, position: 'absolute', marginTop: 650 }}>
                    <View style={{ justifyContent: "flex-end", alignItems: 'center' }}>
                        {this.state.isLoading ? (
                            <View style={{ justifyContent: 'center' }}>
                                <View style={styles._LOGIN_Button_Style_android}>
                                    <ActivityIndicator size="large" color="white" />
                                </View>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row' }}>
                                {Platform.OS != "android" ? (
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.replace('Auth', { type: 'Login' })}
                                        style={{ ...styles._LOGIN_Button_Style_IOS }}
                                    >
                                        <Text style={styles._Touchable_Text_Colors}>Returning User</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableNativeFeedback onPress={() => this.props.navigation.replace('Auth', { type: 'Login' })}>
                                        <View style={{ ...styles._LOGIN_Button_Style_android }}>
                                            <Text style={styles._Touchable_Text_Colors}>Returning User</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                )}
                            </View>
                        )}
                    </View>

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
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        width: "96%",
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