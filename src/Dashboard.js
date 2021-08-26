import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Share, StyleSheet, AsyncStorage, Image, TextInput, Linking, ImageBackground, TouchableOpacity, TouchableNativeFeedback, Text, View, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box'
import { WP } from './responsive';
import { LinearGradient } from 'expo-linear-gradient';

import Login from './auth_src/login'
import Signup from './auth_src/Signup'

const Tab = createMaterialTopTabNavigator();

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    openUrl = async () => {
        const url = 'https://ironvikingfitness.com/password'
        await Linking.openURL(url);
        console.log('clicked');
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    "Visit G-Market for Gold Sell and buy",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    postOnFacebook = () => {
        let facebookParameters = [];
        // if (facebookShareURL)
        //     facebookParameters.push('u=' + encodeURI(facebookShareURL));
        // if (postContent)
        facebookParameters.push('quote=' + encodeURI('Hello Guys, This is a testing of facebook share example'));
        const url =
            'https://www.facebook.com/sharer/sharer.php?' +
            facebookParameters.join('&');

        Linking.openURL(url)
            .then((data) => {
                // alert('Facebook Opened');
            })
            .catch(() => {
                // alert('Something went wrong');
            });
    }

    postOnInstagrm = () => {

        const url =
            'https://www.instagram.com/create/select/'

        Linking.openURL(url)
            .then((data) => {
                // alert('Facebook Opened');
            })
            .catch(() => {
                // alert('Something went wrong');
            });
    }

    postOnTiktok = () => {
        let facebookParameters = [];
        // if (facebookShareURL)
        //     facebookParameters.push('u=' + encodeURI(facebookShareURL));
        // if (postContent)
        // facebookParameters.push('quote=' + encodeURI('Hello Guys, This is a testing of facebook share example'));
        const url =
            'https://www.tiktok.com/upload/'
        // +
        // facebookParameters.join('&');

        Linking.openURL(url)
            .then((data) => {
                // alert('Facebook Opened');
            })
            .catch(() => {
                // alert('Something went wrong');
            });
    }

    logout = async () => {
        await AsyncStorage.clear()
        this.props.navigation.replace('UserSelect')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={{ width: '100%', height: 160, }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.3 }}></View>
                        <View style={{ flex: 0.9 }}>
                            <Image source={require('../assets/icon_red.jpg')} style={{ width: 45, height: 35, alignSelf: 'center', marginTop: 20, marginRight: 15 }} />
                        </View>
                        <View style={{ flex: 0.2, alignItems: 'center', marginTop: 5 }}>
                            <TouchableOpacity onPress={() => this.logout()}>
                                <Feather style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 10 }} name="log-out" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Image source={require('../assets/wordmark.png')} style={{ width: '65%', height: 70, alignSelf: 'center', marginTop: 5 }} />
                </View>
                <View style={{ flex: 1, padding: 5, alignItems: 'center', backgroundColor: '#f9f9f9' }}>
                    <View style={{ flex: 1, width: '95%', flexDirection: 'row', height: '35%', borderRadius: 5, backgroundColor: 'white', shadowOpacity: 1, elevation: 5 }}>
                        <View style={{ flex: 0.5 }}>
                            <ImageBackground borderRadius={5} style={styles.imgBg} source={require('../assets/robe.jpg')} />
                            <LinearGradient
                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                style={styles.background}
                                start={{ x: 1.0, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                            </LinearGradient>
                        </View>
                        <View style={{ flex: 1 }} >
                            <View>
                                <Text style={{ marginTop: 5, fontWeight: '700', fontSize: 18 }} >Take the viking Challenge</Text>
                                <Text style={{ color: 'grey' }} >Make a difference in 28 days</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <View style={{ flex: 0.9 }}></View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('VikingChallenge')}>
                                    <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B' }}>
                                        <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>START <MaterialCommunityIcons name="greater-than" size={10} color="white" /> </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>



                <View style={{ flex: 1, padding: 5, alignItems: 'center', backgroundColor: '#f9f9f9' }}>
                    <View style={{ flex: 1, width: '95%', flexDirection: 'row', height: '35%', borderRadius: 5, backgroundColor: 'white', shadowOpacity: 1, elevation: 5 }}>
                        <View style={{ flex: 0.5 }}>
                            <ImageBackground borderRadius={5} style={styles.imgBg} source={require('../assets/squats.jpg')} />
                            <LinearGradient
                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                style={styles.background}
                                start={{ x: 1.0, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                            </LinearGradient>
                        </View>
                        <View style={{ flex: 1 }} >
                            <View>
                                <Text style={{ marginTop: 5, fontWeight: '700', fontSize: 18 }} >Time Based Workouts</Text>
                                <Text style={{ color: 'grey' }} >Random time based workouts</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <View style={{ flex: 0.9 }}></View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Random')}>
                                    <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B' }}>
                                        <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>START <MaterialCommunityIcons name="greater-than" size={10} color="white" /> </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, padding: 5, alignItems: 'center', backgroundColor: '#f9f9f9' }}>
                    <View style={{ flex: 1, width: '95%', flexDirection: 'row', height: '35%', borderRadius: 5, backgroundColor: 'white', shadowOpacity: 1, elevation: 5 }}>
                        <View style={{ flex: 0.5 }}>
                            <ImageBackground borderRadius={5} style={styles.imgBg} source={require('../assets/food.jpg')} />
                            <LinearGradient
                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                style={styles.background}
                                start={{ x: 1.0, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                            </LinearGradient>
                        </View>
                        <View style={{ flex: 1 }} >
                            <View>
                                <Text style={{ marginTop: 5, fontWeight: '700', fontSize: 18 }} >Viking Nutrition</Text>
                                <Text style={{ color: 'grey' }} >Great tasting and healthy recipes!</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <View style={{ flex: 0.9 }}></View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Nutrition')}>
                                    <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B' }}>
                                        <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>START <MaterialCommunityIcons name="greater-than" size={10} color="white" /> </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, padding: 5, alignItems: 'center', backgroundColor: '#f9f9f9' }}>
                    <View style={{ flex: 1, width: '95%', flexDirection: 'row', height: '35%', borderRadius: 5, backgroundColor: 'white', shadowOpacity: 1, elevation: 5 }}>
                        <View style={{ flex: 0.5 }}>
                            <ImageBackground borderRadius={5} style={styles.imgBg} source={require('../assets/trainer.jpg')} />
                            <LinearGradient
                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                style={styles.background}
                                start={{ x: 1.0, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                            </LinearGradient>
                        </View>
                        <View style={{ flex: 1 }} >
                            <View>
                                <Text style={{ marginTop: 5, fontWeight: '700', fontSize: 18 }} >Log Your Day</Text>
                                <Text style={{ color: 'grey' }} >Keep track of your progress</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <View style={{ flex: 0.9 }}></View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('LogDay')}>
                                    <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B' }}>
                                        <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>START <MaterialCommunityIcons name="greater-than" size={10} color="white" /> </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, padding: 5, alignItems: 'center', backgroundColor: '#f9f9f9' }}>
                    <View style={{ flex: 1, width: '95%', flexDirection: 'row', height: '35%', borderRadius: 5, backgroundColor: 'white', shadowOpacity: 1, elevation: 5 }}>
                        <View style={{ flex: 0.5 }}>
                            <ImageBackground borderRadius={5} style={styles.imgBg} source={require('../assets/weigth.jpg')} />
                            <LinearGradient
                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                style={styles.background}
                                start={{ x: 1.0, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                            </LinearGradient>
                        </View>
                        <View style={{ flex: 1 }} >
                            <View>
                                <Text style={{ marginTop: 5, fontWeight: '700', fontSize: 18 }} >Shop Equipments</Text>
                                <Text style={{ color: 'grey' }} >Build out your home gym!</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <View style={{ flex: 0.9 }}></View>
                                <TouchableOpacity onPress={() => this.openUrl()}>
                                    <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B' }}>
                                        <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>GO <MaterialCommunityIcons name="greater-than" size={10} color="white" /> </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>

                <View style={{ flex: 0.5, marginTop: 10, backgroundColor: 'white', borderTopWidth: 1, borderColor: 'white', flexDirection: 'row' }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={{ marginTop: 10, marginLeft: 10 }}>Follow Us</Text>
                    </View>
                    <View style={{ flex: 0.3, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.postOnInstagrm()}>
                            <AntDesign name="instagram" size={24} color="rgb(173,0,22)" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.postOnTiktok()}>
                            <Image style={{ width: 25, height: 25, marginLeft: 16, borderRadius: 5 }} source={require('../assets/tiktok.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.postOnFacebook() }}>
                            <FontAwesome style={{ marginLeft: 16, marginTop: 2 }} name="facebook-f" size={24} color="rgb(173,0,22)" />
                        </TouchableOpacity>
                    </View>
                </View>


            </View >
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
        margin: 6,
        width: '90%',
        height: '95%',
        // resizeMode: 'cover',
    },

    background: {
        position: 'absolute',
        left: '46%',
        right: 0,
        bottom: 0,
        // padding: 40,
        width: '40%',
        height: '95%',
        // marginBottom: 3
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
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