import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, TouchableNativeFeedback, Text, View, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SimpleLineIcons, Entypo, MaterialCommunityIcons, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { WP } from './responsive';
import HTML from "react-native-render-html";


const Tab = createMaterialTopTabNavigator();

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nutrition: '',
            nutritiontxt: ''
        }
    }

    componentDidMount = () => {
        let nutrition = this.props.route.params.item
        this.setState({ nutrition: nutrition, nutritiontxt: nutrition.detail })
        // console.log(nutrition);
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
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>{this.state.nutrition.title}</Text>
                    </View>
                    <View style={{ flex: 0.3 }}>
                        {/* <Text style={{ fontSize: 14, justifyContent: 'center', marginTop: 22, color: 'rgb(173,0,22)', marginLeft: 10 }}>Light Meal</Text> */}
                    </View>
                </View>
                <ScrollView>
                    <View style={{ backgroundColor: '#f9f9f9' }}>

                        <View style={{ width: 390, marginLeft: 10, height: '100%', marginVertical: 10, elevation: 5, marginRight: 15, backgroundColor: 'white', borderRadius: WP('2'), padding: WP('1'), shadowOpacity: 1 }}>
                            <Image style={{ borderRadius: 5, margin: 5, width: '98%', height: 250, alignSelf: 'center' }} source={{ uri: this.state.nutrition.img_url }} />
                            <HTML containerStyle={{ margin: 10 }} source={{ html: this.state.nutrition.detail }} computeEmbeddedMaxWidth={computeEmbeddedMaxWidth} style={{ marginLeft: 8 }} />


                            {/* <Text style={{ margin: 5, color: '#a9a9a9' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>

                            <View style={{ borderWidth: 0.2, borderColor: '#C0C0C0', margin: 5, width: '98%' }}></View>

                            <View style={{ margin: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>Ingredients:</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }} >
                                    <View style={{ flex: 0.7, flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={24} color='rgb(173,0,22)' />
                                        <Text style={{ alignSelf: 'center' }}>Rice Crispy Cereal</Text>
                                    </View>
                                    <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
                                        <Text style={{ alignSelf: 'center', color: 'rgb(173,0,22)', }}>6 cups</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }} >
                                    <View style={{ flex: 0.7, flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={24} color='rgb(173,0,22)' />
                                        <Text style={{ alignSelf: 'center' }}>Rice Crispy Cereal</Text>
                                    </View>
                                    <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
                                        <Text style={{ alignSelf: 'center', color: 'rgb(173,0,22)', }}>6 cups</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }} >
                                    <View style={{ flex: 0.7, flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={24} color='rgb(173,0,22)' />
                                        <Text style={{ alignSelf: 'center' }}>Rice Crispy Cereal</Text>
                                    </View>
                                    <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
                                        <Text style={{ alignSelf: 'center', color: 'rgb(173,0,22)', }}>6 cups</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }} >
                                    <View style={{ flex: 0.7, flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={24} color='rgb(173,0,22)' />
                                        <Text style={{ alignSelf: 'center' }}>Butter</Text>
                                    </View>
                                    <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
                                        <Text style={{ alignSelf: 'center', color: 'rgb(173,0,22)', }}>50g melted cup</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }} >
                                    <View style={{ flex: 0.7, flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={24} color='rgb(173,0,22)' />
                                        <Text style={{ alignSelf: 'center' }}>Unsweated Hersheys Coca Powder</Text>
                                    </View>
                                    <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
                                        <Text style={{ alignSelf: 'center', color: 'rgb(173,0,22)', }}>40g</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={{ borderWidth: 0.2, borderColor: '#C0C0C0', margin: 5, width: '98%' }}></View>

                            <View style={{ margin: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>Directions:</Text>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 20, height: 22, paddingLeft: 5 }}>1</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 20, height: 22, paddingLeft: 5 }}>2</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 20, height: 22, paddingLeft: 5 }}>3</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 20, height: 22, paddingLeft: 5 }}>4</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 20, height: 22, paddingLeft: 5 }}>5</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 20, height: 22, paddingLeft: 5 }}>6</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 20, height: 22, paddingLeft: 5 }}>7</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 20, height: 22, paddingLeft: 5 }}>8</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 20, height: 22, paddingLeft: 5 }}>9</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 25, height: 22, paddingLeft: 5 }}>10</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 25, height: 22, paddingLeft: 5 }}>11</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: 'rgb(173,0,22)', backgroundColor: '#F7EBEB', borderRadius: 25, width: 25, height: 22, paddingLeft: 5 }}>12</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20 }}>Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder</Text>
                                </View>

                            </View>

                            <View style={{ width: '98%', margin: 5, borderRadius: 5, backgroundColor: '#F7EBEB', marginBottom: 20, marginTop: 15 }}>
                                <Text style={{ alignSelf: 'center', margin: 8 }} ><Text style={{ color: 'rgb(173,0,22)' }}>*</Text> Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder
                                    Unsweated Hersheys Coca Unsweated Hersheys Coca Powder Unsweated Hersheys Coca Powder
                                </Text>
                            </View> */}

                        </View>



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