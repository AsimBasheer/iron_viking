import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, TouchableNativeFeedback, Text, View, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CountDown from 'react-native-countdown-component';
import { SimpleLineIcons, MaterialCommunityIcons, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { WP } from './responsive';
import { LinearGradient } from 'expo-linear-gradient';
import { BasePath } from "../config/config";
import Toast from "react-native-tiny-toast";

const Tab = createMaterialTopTabNavigator();

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challanges: [],
            no_of_rounds: 0,
            round_duration: 0,
            round_time: 0,
            rest_time: 0,
            round_rest: 0,
            time: 0,
            round_count: 0,
            timetext: '',
            exercise_count: 0,
            timer: false,
            resttimer: false,
            timmer: 0,
        }
    }

    componentDidMount = () => {
        this.props.navigation.addListener("focus", () => {
            //alert('called on focus')
            // console.log(this.props.route.params)
            this.getChanllenges()
            //your function name

        });
        this.getChanllenges()
    }


    getChanllenges = async () => {
        this.setState({ isLoading: true })
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        // return console.log(this.props.route)
        // alert(this.props.route.params[0])
        // const formData = new FormData();
        // formData.append("week", this.props.route.params[0]);
        // formData.append("day", "2");
        // console.log(formData);
        try {
            fetch(`${BasePath}getfitnesscard.php`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                // body: formData,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson.Flag.message == "Successfull") {
                        Toast.show(responseJson.Flag.message);
                        let challenge = [];
                        responseJson.Data.map((item, index) => {
                            // if (item.circuit_0 == 1 || item == item.circuit_0) {
                            // console.log('true 0');
                            challenge.push(item)
                            this.setState({ challanges: challenge[0] })
                            this.setState({ isLoading: false })

                            // } else {
                            //     challenge.push(item)
                            //     this.setState({ challanges: challenge })
                            //     this.setState({ isLoading: false })

                            // }
                        })

                    } else {
                        Toast.show(responseJson.Flag.message);

                    }

                    this.setState({
                        time: this.state.challanges.total_duration * 60,
                        timetext: this.state.challanges.total_duration,
                        no_of_rounds: this.state.challanges.no_of_rounds,
                        round_duration: this.state.challanges.round_duration,
                        round_time: this.state.challanges.round_duration,
                        round_rest: this.state.challanges.round_rest,
                        rest_time: this.state.challanges.round_rest,
                        exercise_count: this.state.challanges.exercise_count
                    })
                    // if(){

                    // }
                    setTimeout(() => {
                        // console.log("@@@@@@@@@@@@@@@@@@@@@@@");
                        console.log(this.state.round_rest);
                        // console.log(this.state.time + " sdasdasds " + this.state.timetext);

                    }, 150);
                    // this.roundwork()




                })
                .catch((error) => {
                    Toast.show(error)

                });
        } catch (e) { Toast.show(e) }
    }

    roundwork() {
        this.setState({ timer: true })
        let interval;
        var round = this.state.no_of_rounds;
        // var round = 2;
        var secs;
        if (this.state.no_of_rounds != 0) {

            const startTimer = () => {
                // console.log(this.state.round_rest);
                secs = this.state.round_duration;
                this.setState({ round_count: round, timmer: this.state.round_duration })
                // secs = 10;
                interval = setInterval(() => {
                    console.log(secs);
                    secs = secs - 1;

                    if (secs === 0) {
                        if (round != 0) {
                            // alert("called")
                            setTimeout(() => {
                                clearInterval(interval);
                                this.setState({ resttimer: true })
                                startBreakTimer();
                            }, 1000);

                        } else {
                            clearInterval(interval);
                            console.log("$$$$$$$$$end$$$$$$$$$");
                            this.setState({ timer: false })
                            this.props.navigation.navigate('Completed')
                        }

                    }
                }, 1000);
            }

            const startBreakTimer = () => {
                round = round - 1;

                // secs = 5;
                this.setState({ timer: this.state.round_rest })
                secs = this.state.round_rest;

                interval = setInterval(() => {
                    console.log(secs);
                    secs = secs - 1;
                    if (secs === 0) {
                        setTimeout(() => {
                            clearInterval(interval);
                            this.setState({ resttimer: false })
                            startTimer();
                        }, 1000);
                    }
                }, 1000);
            }

            clearInterval(interval);
            startTimer();
        }
    }



    setTime() {
        alert(0)
        this.setState({ time: 400 })
        setTimeout(() => {
            alert(this.state.time)

        }, 200);
    }

    render() {



        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={{ marginTop: 30, height: '8%', backgroundColor: 'white', flexDirection: 'row' }}>
                    {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <AntDesign style={{ justifyContent: 'center', marginLeft: 10, marginTop: 20 }} name="arrowleft" size={24} color="#a9a9a9" />
                    </TouchableOpacity> */}
                    <Text style={{ fontSize: 18, fontWeight: 'bold', justifyContent: 'center', marginTop: 20, marginLeft: 20 }}>Random Workout</Text>
                </View>
                <ScrollView>
                    <View style={{ backgroundColor: '#f9f9f9' }}>

                        <Image source={{ uri: this.state.challanges.gif_url }} style={{ margin: 15, width: '92%', alignSelf: 'center', height: 500, borderRadius: 5 }} />
                        {/* <Image source={require('../assets/walk.gif')} style={{ margin: 15, width: '92%', alignSelf: 'center', height: 200, borderRadius: 5 }} /> */}
                        {/* <Image source={require('../assets/burpee.jpg')} style={{ margin: 15, width: '92%', alignSelf: 'center', height: 200, borderRadius: 5 }} /> */}
                        <View style={{ width: '92%', alignSelf: 'center', height: 280, margin: 15, borderRadius: 2, backgroundColor: 'white', elevation: 5 }}>
                            <Text style={{ alignSelf: 'center', fontWeight: '700', marginTop: 30, fontSize: 15 }}>{this.state.challanges.exercise_name}</Text>
                            <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 12, color: '#a9a9a9' }} >{this.state.challanges.exercise_name}</Text>

                            {this.state.no_of_rounds == 0 ?
                                <>
                                    {!this.state.timer ?
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                            <Text style={{ fontSize: 30, color: 'rgb(173,0,22)', fontWeight: 'bold' }} >00 : </Text>
                                            <Text style={{ fontSize: 30, color: 'rgb(173,0,22)', fontWeight: 'bold' }}>{this.state.timetext} : </Text>
                                            <Text style={{ fontSize: 30, color: 'rgb(173,0,22)', fontWeight: 'bold' }}>00</Text>
                                        </View>
                                        :
                                        <View style={{ justifyContent: 'center', flex: 1 }}>
                                            <CountDown
                                                size={30}
                                                until={this.state.time}
                                                onFinish={() => { this.props.navigation.navigate('Completed') }}
                                                onChange={(e) => this.setState({ time: e })}
                                                digitStyle={{ backgroundColor: '#f9f9f9', }}
                                                digitTxtStyle={{ color: 'rgb(173,0,22)' }}
                                                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                                separatorStyle={{ color: 'black' }}
                                                timeToShow={['H', 'M', 'S']}
                                                timeLabels={{ m: null, s: null }}
                                                showSeparator
                                            />
                                        </View>
                                    }
                                </>
                                :
                                <>
                                    <Text style={{ fontSize: 18, alignSelf: 'center', color: 'rgb(173,0,22)', fontWeight: 'bold' }} >Total no of rounds : <Text>{this.state.no_of_rounds}</Text> </Text>

                                    {/* {this.state.no_of_rounds.forEach((item) => { */}
                                    <>
                                        {!this.state.timer ?
                                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                                {/* <Text style={{ fontSize: 30, color: 'rgb(173,0,22)', fontWeight: 'bold' }} >No of round :  </Text> */}
                                                <Text style={{ fontSize: 18, alignSelf: 'center', color: 'rgb(173,0,22)', fontWeight: 'bold' }}>Duration per Round  {this.state.round_time} sec </Text>
                                                <Text style={{ fontSize: 16, alignSelf: 'center', color: 'rgb(173,0,22)', fontWeight: 'bold' }}>Rest after every roud  {this.state.rest_time} sec </Text>
                                            </View>
                                            :
                                            <View style={{ justifyContent: 'center', flex: 1 }}>
                                                {this.state.no_of_rounds != 0 ?

                                                    <>
                                                        {/* <Text>timer {this.state.timer}</Text> */}
                                                        {!this.state.resttimer ?
                                                            <>
                                                                <Text style={{ fontSize: 16, alignSelf: 'center', color: 'rgb(173,0,22)', fontWeight: 'bold' }}>No of round : {this.state.round_count} </Text>
                                                                <CountDown
                                                                    size={30}
                                                                    // until={10}
                                                                    until={!this.state.resttimer ? this.state.round_duration : this.state.round_rest}
                                                                    // onFinish={() => {
                                                                    //     setInterval(() => {
                                                                    //         this.setState({ resttimer: true })
                                                                    //     }, 1000);
                                                                    // }}
                                                                    onChange={(e) => this.setState({ time: e })}
                                                                    digitStyle={{ backgroundColor: '#f9f9f9', }}
                                                                    digitTxtStyle={{ color: 'rgb(173,0,22)' }}
                                                                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                                                    separatorStyle={{ color: 'black' }}
                                                                    timeToShow={['H', 'M', 'S']}
                                                                    timeLabels={{ m: null, s: null }}
                                                                    showSeparator
                                                                />
                                                            </>
                                                            :
                                                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                                                <Text style={{ fontSize: 16, alignSelf: 'center', color: 'rgb(173,0,22)', fontWeight: 'bold' }}>Rest time  </Text>
                                                                <CountDown
                                                                    size={18}
                                                                    until={this.state.round_rest}
                                                                    // onFinish={() => this.setState({ btnstate: !this.state.btnstate, timer: false, err: false })}
                                                                    digitStyle={{ backgroundColor: '#f9f9f9', }}
                                                                    digitTxtStyle={{ color: 'rgb(173,0,22)' }}
                                                                    timeToShow={['S']}
                                                                    timeLabels={{ m: null, s: null }}
                                                                />
                                                                {/* <CountDown
                                                                size={30}
                                                                // until={5}
                                                                until={!this.state.resttimer ? this.state.round_duration : this.state.round_rest}
                                                                // onFinish={() => { this.setState({ resttimer: false }) }}
                                                                onChange={(e) => this.setState({ time: e })}
                                                                digitStyle={{ backgroundColor: '#f9f9f9', }}
                                                                digitTxtStyle={{ color: 'rgb(173,0,22)' }}
                                                                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                                                separatorStyle={{ color: 'black' }}
                                                                timeToShow={['H', 'M', 'S']}
                                                                timeLabels={{ m: null, s: null }}
                                                                showSeparator
                                                            /> */}
                                                            </View>

                                                        }
                                                    </>
                                                    :
                                                    <></>
                                                }
                                                {/* <CountDown
                                                size={30}
                                                // until={5}
                                                until={this.state.timmer}
                                                // onFinish={() => { this.setState({ resttimer: false }) }}
                                                onChange={(e) => this.setState({ time: e })}
                                                digitStyle={{ backgroundColor: '#f9f9f9', }}
                                                digitTxtStyle={{ color: 'rgb(173,0,22)' }}
                                                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                                separatorStyle={{ color: 'black' }}
                                                timeToShow={['H', 'M', 'S']}
                                                timeLabels={{ m: null, s: null }}
                                                showSeparator
                                            /> */}
                                            </View>
                                        }
                                    </>
                                    {/* })} */}
                                </>
                            }

                        </View>
                        {/* <TouchableOpacity onPress={() => this.setState({ timer: true })} style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '90%', height: 50, borderRadius: 5, marginTop: 25, backgroundColor: 'rgb(173,0,22)' }}> */}
                        <TouchableOpacity onPress={() => this.roundwork()} style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '90%', height: 50, borderRadius: 5, marginTop: 25, backgroundColor: 'rgb(173,0,22)' }}>
                            <Text style={{ color: 'white' }}>Start Timer</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('Completed') }} style={{ marginTop: 10, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '90%', height: 50, borderRadius: 5, backgroundColor: '#1B0B2B' }}> */}
                        <TouchableOpacity onPress={() => this.getChanllenges()} style={{ marginTop: 10, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '90%', height: 50, borderRadius: 5, backgroundColor: '#1B0B2B' }}>
                            <Text style={{ color: 'white' }}>Change Random Workout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>



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