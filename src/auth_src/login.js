import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, TextInput, AsyncStorage, Dimensions, TouchableNativeFeedback, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box'
import { BasePath } from "../../config/config";
import Toast from "react-native-tiny-toast";
// import AsyncStorage from "react-native-async-storage";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: 'fahad@gmail.com',
            password: '12345678',
            isChecked: false,
            isLoading: false,
            error_message: '',
            showpass: true
        }
    }

    checkLoginStatus = async () => {
        if (await AsyncStorage.getItem('isLoggedIn')) {

            this.props.navigation.dispatch('DashboardDrawer')
        } else {
        }
    }



    login_request = () => {

        const formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        // console.log(formData);
        try {
            fetch(`${BasePath}signin.php`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            })
                .then((response) => response.text())
                .then((responseJson) => {
                    // console.log(responseJson)

                    if (responseJson == "Username or Password is not correct!!!") {
                        // console.log(responseJson);
                        Toast.show(responseJson)
                        this.setState({ isLoading: false });

                        // setTimeout(() => {
                        // }, 200);
                    } else {
                        //          console.log(responseJson.data.original.error_msg)
                        Toast.show("LoggedIn Successfully")

                        this.storeData(responseJson);
                        // Toast.show(responseJson.error_msg);

                        return;
                    }
                })
                .catch((error) => {
                    Toast.show(error)

                });
        } catch (e) { Toast.show(e) }
    }


    storeData = async (response) => {
        // return
        // alert(this.state.isChecked)
        let res = JSON.parse(response)
        console.log(res);
        const { navigate } = this.props.navigation;
        try {
            if (this.state.isChecked) {
                await AsyncStorage.setItem('isLoggedIn', '1')
                // console.log(1);
                await AsyncStorage.setItem('email', res[0].email)
                await AsyncStorage.setItem('userid', res[0].userid)
                // console.log(2);
                await AsyncStorage.setItem('name', res[0].name)
                // console.log(3);
                await AsyncStorage.setItem('password', res[0].password)
                // console.log(4);
                await AsyncStorage.setItem('is_subscribed', res[0].is_subscribed)
                // console.log(5);
                await AsyncStorage.setItem('isChecked', JSON.stringify(this.state.isChecked))
                // alert(this.state.isChecked)

            } else {
                await AsyncStorage.setItem('isLoggedIn', '1')
                // console.log(1);
                await AsyncStorage.setItem('email', res[0].email)
                await AsyncStorage.setItem('userid', res[0].userid)
                // console.log(2);
                await AsyncStorage.setItem('name', res[0].name)
                // console.log(3);
                await AsyncStorage.setItem('password', res[0].password)
                // console.log(4);
                await AsyncStorage.setItem('is_subscribed', res[0].is_subscribed)
                // console.log(5);
                await AsyncStorage.setItem('isChecked', JSON.stringify(this.state.isChecked))

            }


            this.props.navigation.replace('Dashboard')

        } catch (e) {
            console.log(e)
        }

    }

    form_validation = () => {
        this.setState({ isLoading: true })
        if (this.state.email === '' || this.state.password === '') {
            this.setState({ error_message: 'All Fields are required', isLoading: false, show_error: true })

        } else if (this.state.password.length < 6) {
            this.setState({ error_message: 'Password Invalid', isLoading: false, show_error: true })
            // console.log("password")

        } else if (!this.ValidateEmail(this.state.email)) {
            this.setState({ error_message: 'Email is not valid', isLoading: false, show_error: true })
        }
        else {
            // this.setState({isLoading:true})
            this.setState({ error_message: '', show_error: true })
            this.login_request()

        }
        // else {
        //     this.login_request()
        // }
        // console.log("working");
    }

    ValidateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }

        return (false)
    }

    login = () => {
        this.setState({ isLoading: true })
        this.form_validation()
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Email</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#a9a9a9' }}>
                    <FontAwesome style={{ marginLeft: 10 }} name="envelope-o" size={20} color="rgb(173,0,22)" />
                    <TextInput
                        onChangeText={value => this.setState({ email: value })}
                        value={this.state.email}
                        onFocus={value => this.setState({ show_error: '' })}
                        style={{ marginLeft: 8, fontSize: 14 }}
                        placeholder={'Enter your email'}
                    />
                </View>
                <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Password</Text>
                {this.state.showpass ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#a9a9a9' }}>
                        <MaterialIcons style={{ marginLeft: 10 }} name="lock-outline" size={24} color="rgb(173,0,22)" />
                        <TextInput
                            onChangeText={value => this.setState({ password: value })}
                            value={this.state.password}
                            onFocus={value => this.setState({ show_error: '' })}
                            style={{ marginLeft: 8, fontSize: 14, width: '78%' }}
                            placeholder={'Password'}
                            secureTextEntry={true}
                            maxLength={20}
                        />
                        <TouchableOpacity onPress={() => this.setState({ showpass: !this.state.showpass })}>
                            <Ionicons name="eye-off" size={20} color="#a9a9a9" />
                        </TouchableOpacity>

                    </View>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#a9a9a9' }}>
                        <MaterialIcons style={{ marginLeft: 10 }} name="lock-outline" size={24} color="rgb(173,0,22)" />
                        <TextInput
                            onChangeText={value => this.setState({ password: value })}
                            value={this.state.password}
                            onFocus={value => this.setState({ show_error: '' })}
                            style={{ marginLeft: 8, fontSize: 14, width: '78%' }}
                            placeholder={'Password'}
                            maxLength={20}
                        />
                        <TouchableOpacity onPress={() => this.setState({ showpass: !this.state.showpass })}>
                            <Ionicons name="eye" size={20} color="#33A1DE" />
                        </TouchableOpacity>
                    </View>
                }

                <Text style={{ textAlign: "center", color: "red", marginTop: 10 }}>
                    {this.state.error_message}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 0.5, flexDirection: 'row', marginLeft: 15, alignItems: 'center' }}>
                        <CheckBox
                            style={{ padding: 5 }}
                            onClick={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked
                                })
                            }}
                            isChecked={this.state.isChecked}
                            checkBoxColor="rgb(173,0,22)"
                            uncheckedCheckBoxColor="#a9a9a9"
                        />
                        <Text style={{ fontSize: 14, color: '#a9a9a9' }}>Remember me</Text>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center', marginLeft: 15 }}>
                        <Text>Forgot your password?</Text>
                    </View>
                </View>

                <View style={{ width: '65%', height: 70, backgroundColor: 'white', elevation: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginBottom: 10, marginTop: 10 }}>
                    <View style={{ justifyContent: "flex-end", alignItems: 'center' }}>
                        {this.state.isLoading ? (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{}}>
                                    {/* <Image source={spinner} style={styles.image} /> */}
                                    <ActivityIndicator size="large" color="black" />
                                </View>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row' }}>
                                {Platform.OS != "android" ? (
                                    <TouchableOpacity
                                        onPress={() => this.login()}
                                        // onPress={() => this.props.navigation.navigate('Dashboard')}
                                        style={{ ...styles._LOGIN_Button_Style_IOS }}
                                    >
                                        <Text style={styles._Touchable_Text_Colors}>Log In</Text>
                                    </TouchableOpacity>
                                ) : (
                                    // <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Dashboard')}>
                                    <TouchableNativeFeedback onPress={() => this.login()}>
                                        <View style={{ ...styles._LOGIN_Button_Style_android }}>
                                            <Text style={styles._Touchable_Text_Colors}>Log In</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                )}
                            </View>
                        )}
                    </View>

                </View>
            </View >
        );
    }
}

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
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: 2,
    },
    _LOGIN_Button_Style_IOS: {
        width: 200,
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        // marginBottom: 10,
    },
    _LOGIN_Button_Style_android: {
        width: "90%",
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 5,
        // borderWidth:2,
        // borderColor:'#E48565',
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginVertical: 5,
        // marginBottom: 10,
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
        width: "20%",
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
        width: "20%",
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
