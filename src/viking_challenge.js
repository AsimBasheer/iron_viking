import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Image, TextInput, ImageBackground, TouchableOpacity, TouchableNativeFeedback, Text, View, Dimensions, ScrollView } from 'react-native';
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Paragraph } from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

import Monday from './weeks/monday'
import Tuesday from './weeks/tuesday'
import Wednesday from './weeks/wednes'
import Thursday from './weeks/thursday'
import Friday from './weeks/friday'


const items = [
    { label: 'Week 1', value: '1' },
    { label: 'Week 2', value: '2' },
    { label: 'Week 3', value: '3' },
    { label: 'Week 4', value: '4' },
    { label: 'Week 5', value: '5' },
]

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            week: '1',
            tabsVisible: true
        }
        // this.InputAccessoryView = this.InputAccessoryView.bind(this)
    }



    render_tabs = (weeks) => {
        return (
            <Tab.Navigator
                // initialRouteName={this.state.type}

                tabBarOptions={{
                    indicatorStyle: { backgroundColor: 'white' },
                    activeTintColor: 'white',
                    inactiveTintColor: '#a9a9a9',
                    labelStyle: { fontSize: 10, fontWeight: 'bold' },
                    tabStyle: {},
                    style: { justifyContent: 'center', backgroundColor: 'rgb(173,0,22)' },
                }}
            >
                <Tab.Screen navigation={this.props.navigation} name="Mon" component={Monday} initialParams={weeks} />
                <Tab.Screen navigation={this.props.navigation} name="Tues" component={Tuesday} initialParams={weeks} />
                <Tab.Screen navigation={this.props.navigation} name="Wed" component={Wednesday} initialParams={weeks} />
                <Tab.Screen navigation={this.props.navigation} name="Thur" component={Thursday} initialParams={weeks} />
                <Tab.Screen navigation={this.props.navigation} name="Fri" component={Friday} initialParams={weeks} />
            </Tab.Navigator>
        )
    }

    changeWeek = (value) => {
        // alert(value);

        this.setState({
            week: value,
            tabsVisible: false

        });

        console.log(2);

        setInterval(() => {
            // console.log(this.state.tabsVisible)
            this.setState({ tabsVisible: true })
            this.props.navigation.addListener("focus", () => {
                //alert('called on focus')
                // console.log(this.props.route.params)
                this.render_tabs(value)

            });
        }, 500);
    }


    render() {
        const placeholder = {
            label: 'Select',
            value: null,
            color: '#9EA0A4',
        };

        return (
            <View style={styles.container}>
                <View style={{ width: '100%', height: 120, marginTop: 50 }}>
                    <View style={{ flexDirection: 'row', flex: 1, padding: 10 }}>
                        <View style={{ flex: 0.7 }}>
                            <Text style={{ marginLeft: 10, fontSize: 20 }} >28 Days Viking Challenge</Text>
                        </View>
                        <View style={{ flex: 0.3, backgroundColor: '#F7EBEB', borderRadius: 5 }}>
                            <RNPickerSelect
                                // placeholder={placeholder}
                                items={items}
                                onValueChange={(value) => {
                                    this.changeWeek(value)
                                }}

                                //     this.changeWeek.bind(this)
                                // }

                                style={pickerSelectStyles}
                                value={this.state.week}

                            />


                        </View>
                    </View>
                    <View style={{ width: '100%', height: 70 }}>
                        <Paragraph style={{ marginLeft: 20, marginRight: 20 }}>
                            A workout plan that utilizes a variety of basic sandbag exercises to give you rapid  results in strength, power and conditioning
                        </Paragraph>
                    </View>
                </View>


                <>
                    {this.state.tabsVisible ?
                        <>
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgb(173,0,22)', alignSelf: 'center', shadowOpacity: 5, elevation: 5 }}>
                                {this.render_tabs(this.state.week)}
                            </View>
                        </>
                        :
                        <>
                            <View style={{ flex: 5, marginTop: 150, justifyContent: 'center', alignSelf: 'center' }}>
                                <ActivityIndicator animating size="large" color="#1B0B2B" />
                            </View>
                        </>
                    }

                </>






            </View >
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: '#F7EBEB',
        color: 'rgb(173,0,22)',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        justifyContent: 'center',
        // paddingHorizontal: 1,
        paddingVertical: 8,
        borderWidth: 0.7,
        // borderColor: 'purple',
        marginTop: 4,
        marginLeft: 1,
        fontWeight: 'bold',
        borderRadius: 8,
        color: 'rgb(173,0,22)',
        paddingRight: 10, // to ensure the text is never behind the icon
    },
});

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