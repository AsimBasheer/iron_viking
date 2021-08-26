import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, ActivityIndicator, TextInput, TouchableOpacity, TouchableNativeFeedback, Text, View, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SimpleLineIcons, MaterialCommunityIcons, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { WP } from './responsive';
import { LinearGradient } from 'expo-linear-gradient';
import { BasePath } from "../config/config";
import Toast from "react-native-tiny-toast";
import HTML from "react-native-render-html";



export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            intro: "",
            nutritiontxt: '',
            nutrition: '',
            fasting: '',
            fastingtxt: '',
            weight_loss: '',
            weight_losstxt: '',
            recomposition_plan: '',
            recomposition_plantxt: '',
            lean_muscle_gain: '',
            lean_muscle_gaintxt: '',
            walking: '',
            walkingtxt: '',
            workout_plan: '',
            workout_plantxt: '',

        }
    }

    componentDidMount = () => {
        this.ragnar_diet()
    }

    ragnar_diet = () => {
        this.setState({ isLoading: true })
        const formData = new FormData();
        formData.append("plan_no", "1");
        // console.log(formData);
        try {
            fetch(`${BasePath}getdietplan.php`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                    if (responseJson.Flag.message == "Successfull") {
                        this.setState({
                            intro: responseJson.Data.introduction,
                            nutrition: responseJson.Data.nutrition,
                            fasting: responseJson.Data.fasting,
                            weight_loss: responseJson.Data.weight_loss,
                            recomposition_plan: responseJson.Data.recomposition_plan,
                            lean_muscle_gain: responseJson.Data.lean_muscle_gain,
                            walking: responseJson.Data.walking,
                            workout_plan: responseJson.Data.workout_plan,
                            nutritiontxt: responseJson.Data.nutrition.detail,
                            fastingtxt: responseJson.Data.fasting.detail,
                            weight_losstxt: responseJson.Data.weight_loss.detail,
                            recomposition_plantxt: responseJson.Data.recomposition_plan.detail,
                            lean_muscle_gaintxt: responseJson.Data.lean_muscle_gain.detail,
                            walkingtxt: responseJson.Data.walking.detail,
                            workout_plantxt: responseJson.Data.workout_plan.detail,

                        })
                        Toast.show(responseJson.Flag.message);
                        this.setState({ isLoading: false })
                    } else {
                        Toast.show(responseJson.Flag.message);
                    }


                })
                .catch((error) => {
                    Toast.show(error)

                });
        } catch (e) { Toast.show(e) }
    }


    render() {
        const computeEmbeddedMaxWidth = (availableWidth) => {
            return Math.min(availableWidth, 500);
        };
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={{ marginTop: 30, height: '8%', backgroundColor: 'white', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <AntDesign style={{ justifyContent: 'center', marginLeft: 10, marginTop: 20 }} name="arrowleft" size={24} color="#a9a9a9" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>The Ragnar Diet</Text>
                </View>
                {this.state.isLoading ?
                    <View style={{ flex: 5, marginTop: 150, alignSelf: 'center' }}>
                        <ActivityIndicator animating size="large" color="#1B0B2B" />
                    </View>
                    :
                    <ScrollView>
                        <View style={{ backgroundColor: '#f9f9f9' }}>
                            <HTML containerStyle={{ margin: 10 }} source={{ html: this.state.intro.intro }} computeEmbeddedMaxWidth={computeEmbeddedMaxWidth} style={{ marginLeft: 8 }} />

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { item: this.state.nutrition })} style={{ width: 390, flexDirection: 'row', marginLeft: 10, height: 100, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                                <View style={{ flex: 0.4 }}>
                                    <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: this.state.nutrition.img_url }} />
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.9)', 'transparent']}
                                        style={styles.background}
                                        start={{ x: 1.0, y: 0 }}
                                        end={{ x: 0, y: 0 }}
                                    >
                                        {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                                    </LinearGradient>
                                </View>
                                <View style={{ flex: 1.5, marginLeft: 3 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 0.6, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontSize: 18, }}>{this.state.nutrition.title} <MaterialCommunityIcons style={{ marginLeft: -15 }} name="greater-than" size={16} color="black" /></Text>

                                        </View>
                                        <View style={{ flex: 0.4, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14, color: '#a9a9a9', alignSelf: 'center' }}>Calories: <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgb(173,0,22)' }}>440</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>

                                        <HTML containerStyle={{}} source={{ html: this.state.nutritiontxt.substring(0, 85) + "..." }} computeEmbeddedMaxWidth={computeEmbeddedMaxWidth} style={{ marginLeft: 8 }} />

                                    </View>
                                    {/* <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ marginTop: 2, color: '#a9a9a9' }}>Macros:</Text>
                                    <Text style={{ height: 30, paddingLeft: 3, paddingRight: 3, paddingTop: 3, marginLeft: 10, color: 'rgb(173,0,22)', borderRadius: 5, backgroundColor: '#F7EBEB' }}>63g Crabs</Text>
                                    <Text style={{ height: 30, paddingLeft: 3, paddingRight: 3, paddingTop: 3, marginLeft: 10, color: 'rgb(173,0,22)', borderRadius: 5, backgroundColor: '#F7EBEB' }}>21g Flat</Text>
                                    <Text style={{ height: 30, paddingLeft: 3, paddingRight: 3, paddingTop: 3, marginLeft: 10, color: 'rgb(173,0,22)', borderRadius: 5, backgroundColor: '#F7EBEB' }}>13g Protiens</Text>
                                </View>
                                 */}
                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                        <TouchableOpacity>
                                            <SimpleLineIcons name="options" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { item: this.state.fasting })} style={{ width: 390, flexDirection: 'row', marginLeft: 10, height: 100, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                                <View style={{ flex: 0.4 }}>
                                    <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: this.state.fasting.img_url }} />
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.9)', 'transparent']}
                                        style={styles.background}
                                        start={{ x: 1.0, y: 0 }}
                                        end={{ x: 0, y: 0 }}
                                    >
                                        {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                                    </LinearGradient>
                                </View>
                                <View style={{ flex: 1.5, marginLeft: 3 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 0.6, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontSize: 18, }}>{this.state.fasting.title}<MaterialCommunityIcons style={{ marginLeft: -15 }} name="greater-than" size={16} color="black" /></Text>

                                        </View>
                                        <View style={{ flex: 0.4, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14, color: '#a9a9a9', alignSelf: 'center' }}>Calories: <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgb(173,0,22)' }}>440</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <HTML containerStyle={{}} source={{ html: this.state.fastingtxt.substring(0, 85) + "..." }} computeEmbeddedMaxWidth={computeEmbeddedMaxWidth} style={{ marginLeft: 8 }} />

                                    </View>
                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                        <TouchableOpacity>
                                            <SimpleLineIcons name="options" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { item: this.state.weight_loss })} style={{ width: 390, flexDirection: 'row', marginLeft: 10, height: 100, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                                <View style={{ flex: 0.4 }}>
                                    <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: this.state.weight_loss.img_url }} />
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.9)', 'transparent']}
                                        style={styles.background}
                                        start={{ x: 1.0, y: 0 }}
                                        end={{ x: 0, y: 0 }}
                                    >
                                        {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                                    </LinearGradient>
                                </View>
                                <View style={{ flex: 1.5, marginLeft: 3 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 0.6, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontSize: 18, }}>{this.state.weight_loss.title}<MaterialCommunityIcons style={{ marginLeft: -15 }} name="greater-than" size={16} color="black" /></Text>

                                        </View>
                                        <View style={{ flex: 0.4, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14, color: '#a9a9a9', alignSelf: 'center' }}>Calories: <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgb(173,0,22)' }}>440</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                        <HTML containerStyle={{}} source={{ html: this.state.weight_losstxt.substring(0, 85) + "..." }} computeEmbeddedMaxWidth={computeEmbeddedMaxWidth} style={{ marginLeft: 8 }} />

                                    </View>
                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                        <TouchableOpacity>
                                            <SimpleLineIcons name="options" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { item: this.state.recomposition_plan })} style={{ width: 390, flexDirection: 'row', marginLeft: 10, height: 100, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                                <View style={{ flex: 0.4 }}>
                                    <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: this.state.recomposition_plan.img_url }} />
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.9)', 'transparent']}
                                        style={styles.background}
                                        start={{ x: 1.0, y: 0 }}
                                        end={{ x: 0, y: 0 }}
                                    >
                                        {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                                    </LinearGradient>
                                </View>
                                <View style={{ flex: 1.5, marginLeft: 3 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 0.6, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontSize: 18, }}>{this.state.recomposition_plan.title}<MaterialCommunityIcons style={{ marginLeft: -15 }} name="greater-than" size={16} color="black" /></Text>

                                        </View>
                                        <View style={{ flex: 0.4, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14, color: '#a9a9a9', alignSelf: 'center' }}>Calories: <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgb(173,0,22)' }}>440</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                        <HTML containerStyle={{}} source={{ html: this.state.recomposition_plantxt.substring(0, 85) + "..." }} computeEmbeddedMaxWidth={computeEmbeddedMaxWidth} style={{ marginLeft: 8 }} />
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                        <TouchableOpacity>
                                            <SimpleLineIcons name="options" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { item: this.state.lean_muscle_gain })} style={{ width: 390, flexDirection: 'row', marginLeft: 10, height: 100, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                                <View style={{ flex: 0.4 }}>
                                    <ImageBackground borderRadius={5} style={styles.imgBg} source={{ uri: this.state.lean_muscle_gain.img_url }} />
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.9)', 'transparent']}
                                        style={styles.background}
                                        start={{ x: 1.0, y: 0 }}
                                        end={{ x: 0, y: 0 }}
                                    >
                                        {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                                    </LinearGradient>
                                </View>
                                <View style={{ flex: 1.5, marginLeft: 3 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 0.6, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontSize: 18, }}>{this.state.recomposition_plan.title}<MaterialCommunityIcons style={{ marginLeft: -15 }} name="greater-than" size={16} color="black" /></Text>

                                        </View>
                                        <View style={{ flex: 0.4, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14, color: '#a9a9a9', alignSelf: 'center' }}>Calories: <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgb(173,0,22)' }}>440</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                        <HTML containerStyle={{}} source={{ html: this.state.lean_muscle_gaintxt.substring(0, 85) + "..." }} computeEmbeddedMaxWidth={computeEmbeddedMaxWidth} style={{ marginLeft: 8 }} />
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                        <TouchableOpacity>
                                            <SimpleLineIcons name="options" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { item: this.state.workout_plan })} style={{ width: 390, flexDirection: 'row', marginLeft: 10, height: 100, marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                                <View style={{ flex: 0.4 }}>
                                    <ImageBackground borderRadius={5} style={styles.imgBg} source={{ ur: this.state.workout_plan.img_url }} />
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.9)', 'transparent']}
                                        style={styles.background}
                                        start={{ x: 1.0, y: 0 }}
                                        end={{ x: 0, y: 0 }}
                                    >
                                        {/* <Text style={styles.exampleText}>{'HERE IS THE RED GRADIENT'}</Text> */}
                                    </LinearGradient>
                                </View>
                                <View style={{ flex: 1.5, marginLeft: 3 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontSize: 18, }}>{this.state.workout_plan.title}<MaterialCommunityIcons style={{ marginLeft: -15 }} name="greater-than" size={16} color="black" /></Text>

                                        </View>
                                        <View style={{ flex: 0.1, justifyContent: 'center', alignSelf: 'center' }}>
                                            {/* <Text style={{ marginLeft: 5, fontSize: 14, color: '#a9a9a9', alignSelf: 'center' }}>Calories: <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgb(173,0,22)' }}>440</Text></Text> */}
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                        <HTML containerStyle={{}} source={{ html: this.state.workout_plantxt.substring(0, 85) + "..." }} computeEmbeddedMaxWidth={computeEmbeddedMaxWidth} style={{ marginLeft: 8 }} />
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                        <TouchableOpacity>
                                            <SimpleLineIcons name="options" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>




                        </View>
                    </ScrollView>

                }



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