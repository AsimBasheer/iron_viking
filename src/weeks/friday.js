import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Image, ImageBackground, FlatList, Modal, TouchableHighlight, TextInput, TouchableOpacity, TouchableNativeFeedback, Text, View, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WP } from '../responsive';
import { BasePath } from "../../config/config";
import Toast from "react-native-tiny-toast";
import { LocaleConfig } from 'react-native-calendars';
import { localeData } from 'moment';


const Tab = createMaterialTopTabNavigator();



export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challanges: [],
            challang0: false,
            challang1: false,
            challang2: false,
            challang3: false,
            challang4: false,
            isLoading: true,
            modalComplete: false,
        }
        // this.getChanllenges()
    }

    componentDidMount() {
        this.props.navigation.addListener("focus", () => {
            //alert('called on focus')
            // console.log(this.props.route.params)
            this.getChanllenges()
            //your function name

        });
        this.getChanllenges()
    }

    setmodalComplete(visible) {
        this.setState({ modalComplete: visible });
    }

    getChanllenges = async () => {
        this.setState({ isLoading: true })
        // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        // return console.log(this.props.route)
        // alert(this.props.route.params[0])
        const formData = new FormData();
        formData.append("week", this.props.route.params[0]);
        formData.append("day", "5");
        // console.log(formData);
        try {
            fetch(`${BasePath}getchallenge.php`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson);
                    if (responseJson.Flag.message == "Successfull") {
                        Toast.show(responseJson.Flag.message);
                        let challenge = [];
                        responseJson.Data.map((item, index) => {
                            challenge.push(item)
                            this.setState({ challanges: challenge })
                            if (item.circuit_0 == 1 || item == item.circuit_0) {
                                this.setState({ challang0: true })
                            }
                            else if (item.circuit_1 == 1 || item == item.circuit_1) {
                                this.setState({ challang1: true })
                            }
                            else if (item.circuit_2 == 1 || item == item.circuit_2) {
                                this.setState({ challang2: true })
                            }
                            else if (item.circuit_3 == 1 || item == item.circuit_3) {
                                this.setState({ challang3: true })
                            }
                            else if (item.circuit_4 == 1 || item == item.circuit_4) {
                                this.setState({ challang4: true })
                            }
                            else {
                                this.setState({ isLoading: false })
                            }
                            this.setState({ isLoading: false })


                        })

                    } else {
                        Toast.show(responseJson.Flag.message);

                    }

                    // setTimeout(() => {
                    //     console.log("@@@@@@@@@@@@@@@@@@@@@@@");
                    //     console.log(this.state.challanges);
                    // }, 350);





                })
                .catch((error) => {
                    Toast.show(error)

                });
        } catch (e) { Toast.show(e) }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                {this.state.isLoading ?
                    <>
                        <View style={{ flex: 5, marginTop: 150, alignSelf: 'center' }}>
                            <ActivityIndicator animating size="large" color="#1B0B2B" />
                        </View>
                    </>
                    :
                    <>
                        <ScrollView style={{ flex: 5 }}>
                            <View style={{ flex: 5, backgroundColor: '#f9f9f9', }}>

                                {!this.state.challang0 ?
                                    <></>
                                    :
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ marginLeft: 10, marginTop: 10, color: 'rgb(173,0,22)', fontWeight: 'bold' }}>Walking Steps</Text>
                                        <FlatList
                                            style={{ height: '30%', margin: 20 }}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.challanges}
                                            renderItem={({ item, index }) =>
                                                <>
                                                    {item === item.circuit_0 || item.circuit_0 == '1' ?
                                                        <View style={{ width: 260, height: 270, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>

                                                            <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: item.gif_url }} />
                                                            {/* <Image borderRadius={5} style={styles.imgBg} source={require('../../assets/walk.gif')} /> */}
                                                            <LinearGradient
                                                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                                                style={styles.background}
                                                                start={{ x: 0, y: 1.0 }}
                                                                end={{ x: 0, y: 0 }}
                                                            >
                                                            </LinearGradient>
                                                            <View>
                                                                <View style={{ marginLeft: 12, }}>
                                                                    <Text style={{ fontWeight: 'bold' }}>{item.title.length > 25 ? item.title.substring(0, 24) + "..." : item.title}</Text>
                                                                    <Text style={{ color: 'grey' }} >{item.description}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                                    <View style={{ flex: 1 }}></View>
                                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DailyWorkout', { item: item })}>
                                                                        <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B', marginRight: 4 }}>
                                                                            <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>START <MaterialCommunityIcons name="greater-than" size={10} color="white" /></Text>
                                                                        </View>
                                                                    </TouchableOpacity>

                                                                </View>
                                                            </View>
                                                        </View>

                                                        :
                                                        <>
                                                            {/* <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>not included in this day</Text> */}
                                                        </>
                                                    }
                                                </>

                                            }
                                        />
                                    </View>

                                }

                                {!this.state.challang1 ?
                                    <></>
                                    :
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ marginLeft: 10, marginTop: 10, color: 'rgb(173,0,22)', fontWeight: 'bold' }}>Circuit 1</Text>
                                        <FlatList
                                            style={{ height: '30%', margin: 20 }}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.challanges}
                                            renderItem={({ item, index }) =>
                                                <>
                                                    {item === item.circuit_1 || item.circuit_1 == '1' ?
                                                        <View style={{ width: 260, height: 270, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>

                                                            <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: item.gif_url }} />
                                                            {/* <Image style={styles.imgBg} source={require('../../assets/clean.gif')} /> */}
                                                            <LinearGradient
                                                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                                                style={styles.background}
                                                                start={{ x: 0, y: 1.0 }}
                                                                end={{ x: 0, y: 0 }}
                                                            >
                                                            </LinearGradient>
                                                            <View>
                                                                <View style={{ marginLeft: 12, }}>
                                                                    <Text style={{ fontWeight: 'bold' }}>{item.title.length > 25 ? item.title.substring(0, 24) + "..." : item.title}</Text>
                                                                    <Text style={{ color: 'grey' }} >{item.description}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                                    <View style={{ flex: 1 }}></View>
                                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DailyWorkout', { item: item })}>
                                                                        <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B', marginRight: 4 }}>
                                                                            <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>START <MaterialCommunityIcons name="greater-than" size={10} color="white" /></Text>
                                                                        </View>
                                                                    </TouchableOpacity>

                                                                </View>
                                                            </View>
                                                        </View>

                                                        :
                                                        <></>
                                                    }
                                                </>

                                            }
                                        />
                                    </View>

                                }

                                {!this.state.challang2 ?
                                    <></>
                                    :
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ marginLeft: 10, marginTop: 10, color: 'rgb(173,0,22)', fontWeight: 'bold' }}>Circuit 2</Text>

                                        <FlatList
                                            style={{ height: '30%', margin: 20 }}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.challanges}
                                            renderItem={({ item, index }) =>
                                                <>
                                                    {item === item.circuit_2 || item.circuit_2 == '1' ?
                                                        <View style={{ width: 260, height: 270, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                                                            <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: item.gif_url }} />
                                                            {/* <Image style={styles.imgBg} source={require('../../assets/shouldering.gif')} /> */}
                                                            <LinearGradient
                                                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                                                style={styles.background}
                                                                start={{ x: 0, y: 1.0 }}
                                                                end={{ x: 0, y: 0 }}
                                                            >
                                                            </LinearGradient>
                                                            <View>
                                                                <View style={{ marginLeft: 12, }}>
                                                                    <Text style={{ fontWeight: 'bold' }}>{item.title.length > 25 ? item.title.substring(0, 24) + "..." : item.title}</Text>
                                                                    <Text style={{ color: 'grey' }} >{item.description}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                                    <View style={{ flex: 1 }}></View>
                                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DailyWorkout', { item: item })}>
                                                                        <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B', marginRight: 4 }}>
                                                                            <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>START <MaterialCommunityIcons name="greater-than" size={10} color="white" /></Text>
                                                                        </View>
                                                                    </TouchableOpacity>

                                                                </View>
                                                            </View>
                                                        </View>

                                                        :
                                                        <></>
                                                    }
                                                </>

                                            }
                                        />
                                    </View>
                                }

                                {!this.state.challang3 ?
                                    <></>
                                    :
                                    <View style={{ flex: 5 }}>

                                        <Text style={{ marginLeft: 10, marginTop: 10, color: 'rgb(173,0,22)', fontWeight: 'bold' }}>Circuit 3</Text>

                                        <FlatList
                                            style={{ height: '30%', margin: 10 }}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.challanges}
                                            renderItem={({ item, index }) =>
                                                <>
                                                    {item === item.circuit_3 || item.circuit_3 == '1' ?
                                                        <View style={{ width: 390, height: 270, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                                                            <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: item.gif_url }} />
                                                            {/* <Image style={styles.imgBg} source={require('../../assets/rotate.gif')} /> */}
                                                            <LinearGradient
                                                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                                                style={styles.background}
                                                                start={{ x: 0, y: 1.0 }}
                                                                end={{ x: 0, y: 0 }}
                                                            >
                                                            </LinearGradient>
                                                            <View>
                                                                <View style={{ marginLeft: 12, }}>
                                                                    <Text style={{ fontWeight: 'bold' }}>{item.title.length > 25 ? item.title.substring(0, 24) + "..." : item.title}</Text>
                                                                    <Text style={{ color: 'grey' }} >{item.description}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                                    <View style={{ flex: 1 }}></View>
                                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DailyWorkout', { item: item })}>
                                                                        <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B', marginRight: 4 }}>
                                                                            <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>START <MaterialCommunityIcons name="greater-than" size={10} color="white" /> </Text>
                                                                        </View>
                                                                    </TouchableOpacity>

                                                                </View>
                                                            </View>
                                                        </View>

                                                        :
                                                        <></>
                                                    }
                                                </>

                                            }
                                        />
                                    </View>
                                }

                                {!this.state.challang4 ?
                                    <></>
                                    :
                                    <View style={{ flex: 5 }}>

                                        <Text style={{ marginLeft: 10, marginTop: 10, color: 'rgb(173,0,22)', fontWeight: 'bold' }}>Circuit 4</Text>

                                        <FlatList
                                            style={{ height: '30%', margin: 10 }}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.challanges}
                                            renderItem={({ item, index }) =>
                                                <>
                                                    {item === item.circuit_4 || item.circuit_4 == '1' ?
                                                        <View style={{ width: 390, height: 270, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                                                            <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: item.gif_url }} />
                                                            {/* <Image style={styles.imgBg} source={require('../../assets/rotate.gif')} /> */}
                                                            <LinearGradient
                                                                colors={['rgba(255,255,255,0.9)', 'transparent']}
                                                                style={styles.background}
                                                                start={{ x: 0, y: 1.0 }}
                                                                end={{ x: 0, y: 0 }}
                                                            >
                                                            </LinearGradient>
                                                            <View>
                                                                <View style={{ marginLeft: 12, }}>
                                                                    <Text style={{ fontWeight: 'bold' }}>{item.title.length > 25 ? item.title.substring(0, 24) + "..." : item.title}</Text>
                                                                    <Text style={{ color: 'grey' }} >{item.description}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                                    <View style={{ flex: 1 }}></View>
                                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DailyWorkout', { item: item })}>
                                                                        <View style={{ borderRadius: 5, justifyContent: 'flex-end', alignItems: 'center', width: 70, height: 30, backgroundColor: '#1B0B2B', marginRight: 4 }}>
                                                                            <Text style={{ color: '#fff', marginBottom: 5, alignSelf: 'center', justifyContent: 'center', marginBottom: 8, fontSize: 12 }}>START <MaterialCommunityIcons name="greater-than" size={10} color="white" /> </Text>
                                                                        </View>
                                                                    </TouchableOpacity>

                                                                </View>
                                                            </View>
                                                        </View>

                                                        :
                                                        <></>
                                                    }
                                                </>

                                            }
                                        />
                                    </View>
                                }

                            </View>
                            <View style={{ height: 60, marginBottom: 180, backgroundColor: '#f9f9f9' }}>
                                <TouchableOpacity onPress={() => this.setmodalComplete(true)} style={{ marginBottom: 10, width: '98%', height: 50, borderRadius: 5, backgroundColor: '#1B0B2B', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "white", fontWeight: 'bold' }}>Complete</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView >
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalComplete}
                            onRequestClose={() => {
                                this.setState({ modalComplete: !this.state.modalComplete })
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View >
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                        </View>

                                    </View>
                                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}



                                    <View style={{ margin: 15, alignItems: 'center' }}>
                                        <Image style={{ width: '100%', height: 300, alignSelf: 'center' }} source={require('../../assets/done.jpg')}></Image>
                                        <Text style={{ alignSelf: 'center', color: '#a9a9a9' }}>Week 1 Complete</Text>


                                    </View>



                                    {Platform.OS == "android" ?
                                        <View style={{ borderRadius: 5, width: '65%', height: 60, backgroundColor: 'white', marginTop: 25, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                            <TouchableOpacity
                                                style={{ ...styles.openButton }}
                                                onPress={() => {
                                                    this.setState({ modalComplete: !this.state.modalComplete })
                                                }}
                                            >
                                                <Text style={{ color: 'white', fontSize: 16 }}>Go Home</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={{ borderRadius: 5, width: '70%', height: 60, backgroundColor: 'white', marginTop: 25, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton }}
                                                onPress={() => {
                                                    this.setState({ modalComplete: !this.state.modalComplete })
                                                }}
                                            >
                                                <Text style={{ color: 'white', fontSize: 16 }}>Go Home</Text>
                                            </TouchableHighlight>
                                        </View>
                                    }
                                    {/* </ScrollView> */}
                                </View>
                            </View>
                        </Modal>

                    </>

                }


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
        width: '98%',
        height: 170,
        // resizeMode: 'cover',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '28%',
        // padding: 10,
        width: '98%',
        height: 50,
        marginLeft: 5,
        marginRight: 5,
        // borderBottomEndRadius: 5
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
        backgroundColor: '#00000080',
        marginTop: 30
    },
    modalView: {
        height: '55%',
        width: '90%',
        margin: 10,
        //   justifyContent:'center',
        backgroundColor: "#ffff",
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
        width: '42',
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
        alignSelf: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 180,
        height: 50,
        backgroundColor: "#1B0B2B",
        borderRadius: 5,
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