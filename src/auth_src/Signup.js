import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, TextInput, Dimensions, TouchableNativeFeedback, TouchableOpacity, ActivityIndicator, Text, View, ScrollView } from 'react-native';
import { SimpleLineIcons, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box'
import { BasePath } from "../../config/config";
import Toast from "react-native-tiny-toast";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'fahad2@gmail.com',
            name: 'AsimBashir',
            password: 'aaaaaa',
            conpassword: 'aaaaaa',
            isChecked: false,
            isLoading: false,
        }
    }

    signup_request = async () => {

        const formData = new FormData();
        formData.append("fullname", this.state.name);
        formData.append("email", this.state.email);
        formData.append("discount_offer", this.state.isChecked ? '1' : '0');
        // formData.append("discount_offer", '1');
        formData.append("password", this.state.password);
        console.log(formData);
        try {
            fetch(`${BasePath}signup.php`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            })
                // Toast.show("response")
                .then((response) => response.text())

                .then((responseJson) => {
                    if (responseJson == "Email Already Exists!!!") {
                        Toast.show(responseJson)
                        this.setState({ isLoading: false });
                    } else if (responseJson == "Email Not Received!!!") {
                        Toast.show(responseJson)
                        this.setState({ isLoading: false });
                    } else if (responseJson == "Failed! Try Again.") {
                        Toast.show(responseJson)
                        this.setState({ isLoading: false });
                    } else {
                        Toast.show(responseJson)
                        this.setState({ isLoading: false });
                        this.props.navigation.replace('Dashboard')
                    }



                })
                .catch((error) => {
                    Toast.show(error)

                });
        } catch (e) { Toast.show(e) }
    }




    form_validation = () => {
        this.setState({ isLoading: true })
        if (this.state.email === '' || this.state.password === '' || this.state.name === '' || this.state.conpassword === '') {
            this.setState({ error_message: 'All Fields are required', isLoading: false, show_error: true })

        } else if (this.state.password.length < 6) {
            this.setState({ error_message: 'Password Invalid', isLoading: false, show_error: true })
            // console.log("password")

        }
        else if (this.state.conpassword.length < 6) {
            this.setState({ error_message: 'Password Invalid', isLoading: false, show_error: true })
            // console.log("password")

        }
        else if (this.state.password != this.state.conpassword) {
            this.setState({ error_message: 'Password are not matching', isLoading: false, show_error: true })
            // console.log("password")

        }
        else if (!this.ValidateEmail(this.state.email)) {
            this.setState({ error_message: 'Email is not valid', isLoading: false, show_error: true })
        }
        else if (!this.validateUsername(this.state.name)) {
            this.setState({ error_message: 'Please enter a valid name', isLoading: false, show_error: true })
        }
        else {
            // this.setState({isLoading:true})
            this.setState({ error_message: '', show_error: true })
            this.signup_request()
            // alert('called validation done')

        }
        // else {
        //     this.login_request()
        // }
        // console.log("working");
    }

    validateUsername = (email) => {
        if (/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(email)) {
            return (true)
        }

        return (false)
    }

    ValidateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }

        return (false)
    }

    Signup = () => {
        this.setState({ isLoading: true })
        this.form_validation()
    }


    render() {
        return (
            <View style={styles.container}>

                <StatusBar style="auto" />
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 100 }}>
                    <View style={{ marginBottom: 100 }}>
                        <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Name</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#a9a9a9' }}>
                            <FontAwesome style={{ marginLeft: 10 }} name="user-o" size={20} color="rgb(173,0,22)" />
                            <TextInput
                                onChangeText={value => this.setState({ name: value })}
                                value={this.state.name}
                                onFocus={value => this.setState({ show_error: '' })}
                                style={{ marginLeft: 8, fontSize: 14 }}
                                placeholder={'Enter your name'}
                            />
                        </View>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#a9a9a9' }}>
                            <MaterialIcons style={{ marginLeft: 10 }} name="lock-outline" size={24} color="rgb(173,0,22)" />
                            <TextInput
                                onChangeText={value => this.setState({ password: value })}
                                value={this.state.password}
                                secureTextEntry={true}
                                onFocus={value => this.setState({ show_error: '' })}
                                style={{ marginLeft: 8, fontSize: 14, width: '78%' }}
                                placeholder={'Password'}
                            />
                            <Ionicons name="ios-eye-outline" size={20} color="#a9a9a9" />
                        </View>

                        <Text style={{ marginTop: 20, marginLeft: 15, marginBottom: 5, fontWeight: 'bold', color: '#a9a9a9' }}>Confirm Password</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%', height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: '#a9a9a9', marginBottom: 15 }}>
                            <MaterialIcons style={{ marginLeft: 10 }} name="lock-outline" size={24} color="rgb(173,0,22)" />
                            <TextInput
                                onChangeText={value => this.setState({ conpassword: value })}
                                value={this.state.conpassword}
                                secureTextEntry={true}
                                onFocus={value => this.setState({ show_error: '' })}
                                style={{ marginLeft: 8, fontSize: 14, width: '78%' }}
                                placeholder={'Password'}
                            />
                            <Ionicons name="ios-eye-outline" size={20} color="#a9a9a9" />

                        </View>
                        <Text style={{ textAlign: "center", color: "red", marginTop: 10 }}>
                            {this.state.error_message}
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
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
                                <Text style={{ fontSize: 14, color: '#a9a9a9' }}>Allow Discounted offers</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', marginLeft: 15 }}>
                                {/* <Text>Forgot your password?</Text> */}
                            </View>
                        </View>

                        <View style={{ width: '65%', height: 70, backgroundColor: 'white', elevation: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginBottom: 50, marginTop: 10 }}>
                            <View style={{ justifyContent: "flex-end", alignItems: 'center' }}>
                                {this.state.isLoading ? (
                                    <View style={{ justifyContent: 'center' }}>
                                        <View >
                                            {/* <Image source={spinner} style={styles.image} /> */}
                                            <ActivityIndicator size="large" color="black" />
                                        </View>
                                    </View>
                                ) : (
                                    <View style={{ flexDirection: 'row' }}>
                                        {Platform.OS == "android" ? (
                                            <TouchableOpacity
                                                onPress={() => { this.Signup() }}
                                                style={{ ...styles._LOGIN_Button_Style_IOS }}
                                            >
                                                <Text style={styles._Touchable_Text_Colors}>Sign Up</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableNativeFeedback onPress={() => { this.Signup() }}>
                                                <View style={{ ...styles._LOGIN_Button_Style_android }}>
                                                    <Text style={styles._Touchable_Text_Colors}>Sign Up</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                        )}
                                    </View>
                                )}
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>
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