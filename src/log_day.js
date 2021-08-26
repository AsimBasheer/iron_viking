import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, AsyncStorage, FlatList, TextInput, TouchableOpacity, TouchableNativeFeedback, Text, View, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SimpleLineIcons, MaterialCommunityIcons, MaterialIcons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars'
import moment from 'moment'
import { BasePath } from "../config/config";
import Toast from "react-native-tiny-toast";
const Tab = createMaterialTopTabNavigator();

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'white' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'white' };
const workout = { key: 'workout', color: 'green' };

const markedDate = {
    '2021-06-25': { dots: [vacation, massage, workout], selected: true, },
    // '2021-06-26': { dots: [massage, workout], disabled: true }
}

const _format1 = 'YYYY-MM-DD'
const _format = 'LL'
const _today = moment().format(_format)
const _maxDate = moment().add(15, 'days').format(_format)

export default class Authentication extends Component {

    initialState = {
        [_today]: { disabled: false }
    }

    constructor(props) {
        super(props);
        this.state = {
            formFields: [{ getdone: '' }],
            formFields1: [{ getgoal: '' }],
            selectedDay: [],
            day: true,
            markedDays: [],
            logday: [],
            repeat: false,
            _markedDates: this.initialState
        }

    }

    mutliple_requests = async () => {
        let user_id = await AsyncStorage.getItem('userid')
        // console.log(user_id);
        this.state.markedDays.forEach((item, pos) => {
            const formData = new FormData();
            formData.append("userid", user_id);
            // formData.append("userid", );
            formData.append("date", this.state.markedDays[pos]);
            formData.append("title", this.state.formFields[pos].getdone);
            formData.append("goal", this.state.formFields1[pos].getgoal);

            // this.state.markedDays.forEach((val, index) => {
            //     // return console.log(val);
            //     formData.append("date", val);
            // })
            // this.state.formFields.forEach((val, index) => {
            //     // return console.log(val);

            //     formData.append("title", val.getdone);
            // })
            // this.state.formFields1.forEach((val, index) => {
            //     // return console.log(val);
            //     formData.append("goal", val.getgoal);
            // })
            // return console.log(formData);
            try {
                fetch(`${BasePath}user_log.php`, {
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
                        Toast.show(responseJson)


                    })
                    .catch((error) => {
                        Toast.show(error)

                    });
            } catch (e) { Toast.show(e) }
        })
    }


    componentDidMount = async () => {
        // var data = await AsyncStorage.getItem('userid')
        // console.log(data);
        // this.setState({ logday: JSON.parse(data) })
        // setTimeout(() => {
        //     console.log(this.state.logday);

        // }, 200);
    }


    submit_days = async () => {
        let Data = [];
        // this.logdata_request()
        this.mutliple_requests()
        this.state.markedDays.forEach((item, index) => {
            // Data.push(item, { ...this.state.formFields[index],this.state.formFields1[index] }, { ...this.state.formFields1[index] })
            // var str = "date"
            var date = { "date": item }
            var field = { ...this.state.formFields[index], ...this.state.formFields1[index] }
            // date[str] = item;
            Data.push({ date, field })
            // Data.push(item, )
        })
        setTimeout(() => {
            // console.log("$$$$$$$$$$$$$$$$$$$$$$$");
            // console.log(Data);
        }, 300);
        await AsyncStorage.setItem('logday', JSON.stringify(Data))
        this.props.navigation.goBack()
        // console.log(3);
        // console.log(this.state.formFields);
        // console.log(this.state.formFields1);

    }

    onTextChange = (text, index) => {
        const existingFormFields = this.state.formFields.map(fields => ({ ...fields }))
        let targetField = { ...existingFormFields[index] }
        targetField.getdone = text
        // console.log(targetField.value);

        existingFormFields[index] = targetField

        this.setState({ formFields: existingFormFields })
        setTimeout(() => {
            // console.log(this.state.formFields);
        }, 300);
    }

    onTextChange1 = (text, index) => {
        const existingFormFields = this.state.formFields1.map(fields => ({ ...fields }))
        let targetField = { ...existingFormFields[index] }
        targetField.getgoal = text
        // console.log(targetField.value);

        existingFormFields[index] = targetField

        this.setState({ formFields1: existingFormFields })
        setTimeout(() => {
            // console.log(this.state.formFields1);
        }, 300);
    }

    select(day) {
        const markedDay = { [day.dateString]: [{ selected: true, marked: true }] }
        this.setState({ markedDay: markedDay })
    }

    checkactivity = async (date) => {
        await date.forEach((item) => {
            if (item == this.state.logday[0]) {
                setTimeout(() => {
                    if (this.state.selectedDay.indexOf(this.state.logday[1]) === -1) this.state.selectedDay.push(this.state.logday[1]);
                }, 100);
            }
            else if (item == this.state.logday[2]) {
                if (this.state.selectedDay.indexOf(this.state.logday[3]) === -1) this.state.selectedDay.push(this.state.logday[3]);
                // this.state.selectedDay.push(this.state.logday[3])
            }
            else if (item == this.state.logday[4]) {
                if (this.state.selectedDay.indexOf(this.state.logday[5]) === -1) this.state.selectedDay.push(this.state.logday[5]);
                // console.log(this.state.logday[5]);
            }
            else if (item == this.state.logday[6]) {
                if (this.state.selectedDay.indexOf(this.state.logday[7]) === -1) this.state.selectedDay.push(this.state.logday[7]);
                // console.log(this.state.logday[7]);
            }
            else if (item == this.state.logday[8]) {
                if (this.state.selectedDay.indexOf(this.state.logday[9]) === -1) this.state.selectedDay.push(this.state.logday[9]);
                // console.log(this.state.logday[7]);
            }
            else if (item == this.state.logday[10]) {
                if (this.state.selectedDay.indexOf(this.state.logday[11]) === -1) this.state.selectedDay.push(this.state.logday[11]);
                // console.log(this.state.logday[11]);
            }
            else if (item == this.state.logday[12]) {
                if (this.state.selectedDay.indexOf(this.state.logday[13]) === -1) this.state.selectedDay.push(this.state.logday[13]);
                // console.log(this.state.logday[13]);
            }
            else if (item == this.state.logday[14]) {
                if (this.state.selectedDay.indexOf(this.state.logday[15]) === -1) this.state.selectedDay.push(this.state.logday[15]);
                // console.log(this.state.logday[15]);
            }
            else if (item == this.state.logday[16]) {
                if (this.state.selectedDay.indexOf(this.state.logday[17]) === -1) this.state.selectedDay.push(this.state.logday[17]);
                // console.log(this.state.logday[17]);
            }
            else if (item == this.state.logday[18]) {
                if (this.state.selectedDay.indexOf(this.state.logday[19]) === -1) this.state.selectedDay.push(this.state.logday[19]);
                // console.log(this.state.logday[19]);
            }
            else if (item == this.state.logday[20]) {
                if (this.state.selectedDay.indexOf(this.state.logday[31]) === -1) this.state.selectedDay.push(this.state.logday[31]);
                // console.log(this.state.logday[31]);
            }
            else if (item == this.state.logday[22]) {
                if (this.state.selectedDay.indexOf(this.state.logday[23]) === -1) this.state.selectedDay.push(this.state.logday[23]);
                // console.log(this.state.logday[23]);
            }
            else if (item == this.state.logday[24]) {
                if (this.state.selectedDay.indexOf(this.state.logday[25]) === -1) this.state.selectedDay.push(this.state.logday[25]);
                // console.log(this.state.logday[25]);
            } else {
                // alert("Can not add more")
            }
        })

        // setTimeout(() => {
        //     console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        //     console.log(this.state.selectedDay);
        // }, 200);
    }


    onDaySelect = async (day) => {

        // console.log(day);
        const _selectedDay2 = moment(day.dateString).format(_format);
        if (this.state.markedDays.indexOf(_selectedDay2) === -1) this.state.markedDays.push(_selectedDay2);
        // this.state.markedDays.push(_selectedDay2)

        const _selectedDay1 = moment(day.dateString).format(_format1);



        // setTimeout(() => {
        //     if (this.state.markedDays.length > 1) {
        //         this.check_repeat(_selectedDay2)
        //     }
        // }, 200);


        setTimeout(() => {
            console.log(this.state.markedDays);
            this.checkactivity(this.state.markedDays)
        }, 250);
        let selected = true;


        if (this.state._markedDates[_selectedDay1]) {
            // Already in marked dates, so reverse current marked state
            selected = !this.state._markedDates[_selectedDay1].selected;
        }

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay1]: { selected } } }

        // Triggers component to render again, picking up the new state
        this.setState({ _markedDates: updatedMarkedDates });
        // setTimeout(() => {
        //     console.log(this.state._markedDates);
        // }, 200);
        // } else {
        //     this.setState({ day: false })

        // }

    }


    remove_day = (index) => {
        this.state.markedDays.splice(index, 1)
        this.setState({ markedDays: this.state.markedDays })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={{ height: 80, marginTop: 30, height: '10%', backgroundColor: 'white', flexDirection: 'row' }}>
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}> Log Your Day</Text>
                        <Text style={{ fontSize: 12, color: '#a9a9a9', fontWeight: 'bold', justifyContent: 'center', marginTop: 5, marginLeft: 10 }}> Select a date below to answera question</Text>
                    </View>
                    <View style={{ flex: 0.2, alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Logged') }} style={{ alignSelf: 'center', marginRight: 5, width: 60, height: 25, justifyContent: 'center', borderRadius: 10, backgroundColor: 'rgb(173,0,22)' }}>
                            <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>Logged</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ paddingTop: 20, flex: 1 }}>
                        <Calendar
                            // minDate={_today}
                            // maxDate={_maxDate}
                            // onDayPress={day => this.setState({ markedDay: day.dateString })}
                            horizontal={true}
                            onDayPress={day => this.onDaySelect(day)}
                            // markedDates={{ [this.state.markedDay]: { selected: true } }}
                            markedDates={this.state._markedDates}
                            // markedDates={markedDate}
                            markingType={'multi-period'}
                            // pastScrollRange={24}
                            // futureScrollRange={24}
                            hideExtraDays={true}
                            scrollEnabled={true}
                            // markingType={'multi-dot'}
                            style={{
                                // borderWidth: 1,
                                // borderColor: 'gray',
                                margin: 10,
                                elevation: 5,
                                height: 380
                            }}
                            // Specify theme properties to override specific styles for calendar parts. Default = {}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: 'rgb(173,0,22)',
                                textSectionTitleDisabledColor: '#d9e1e8',
                                selectedDayBackgroundColor: '#F7EBEB',
                                selectedDayTextColor: 'rgb(173,0,22)',
                                todayTextColor: '#00adf5',
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#00adf5',
                                selectedDotColor: '#ffffff',
                                arrowColor: 'rgb(173,0,22)',
                                disabledArrowColor: '#d9e1e8',
                                monthTextColor: 'black',
                                indicatorColor: 'green',
                                textDayFontFamily: 'monospace',
                                textMonthFontFamily: 'monospace',
                                textDayHeaderFontFamily: 'monospace',
                                textDayFontWeight: '300',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '300',
                                textDayFontSize: 14,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 14,
                                // textDayHeaderc: 16
                            }}
                        // Initially visible month. Default = Date()
                        // current={'2012-03-01'}
                        // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        // minDate={'2012-05-10'}
                        // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        // maxDate={'2012-05-30'}
                        // // Handler which gets executed on day press. Default = undefined
                        // onDayPress={day => {
                        //     console.log('selected day', day);
                        // }}
                        // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        // monthFormat={'yyyy MM'}
                        // // Handler which gets executed when visible month changes in calendar. Default = undefined
                        // onMonthChange={month => {
                        //     console.log('month changed', month);
                        // }}
                        // // Hide month navigation arrows. Default = false
                        // hideArrows={true}
                        // // Do not show days of other months in month page. Default = false
                        // hideExtraDays={true}
                        // // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                        // // day from another month that is visible in calendar page. Default = false
                        // disableMonthChange={true}
                        // // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        // firstDay={1}
                        />

                    </View>
                    <View style={{ flex: 1 }}>
                        {/* <Text>{this.state.selectedDay.length}</Text> */}

                        {this.state.markedDays.length > 0 ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.markedDays}
                                renderItem={({ item, index }) =>
                                    <View style={{ margin: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 18, color: 'rgb(173,0,22)' }} >{item}</Text>
                                            </View>
                                            <View style={{ flex: 0.1, marginLeft: 10 }}>
                                                <TouchableOpacity onPress={() => this.remove_day(index)}>
                                                    <Entypo name="cross" size={24} color="black" />
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <AntDesign name="questioncircleo" size={20} color="black" />
                                                <Text>  What did you get done today?</Text>
                                            </View>
                                            <View style={{ width: '100%', height: 80, borderWidth: 0.2, paddingLeft: 5, marginTop: 10 }}>
                                                <TextInput
                                                    onChangeText={text => this.onTextChange(text, index)}
                                                    value={this.state.getDone}
                                                    onFocus={value => this.setState({ show_error: '' })}
                                                    multiline={true}
                                                    style={{ padding: 5 }}
                                                    placeholder={"Type here..."} />

                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                <AntDesign name="questioncircleo" size={20} color="black" />
                                                <Text>  What are your goals next?</Text>
                                            </View>
                                            <View style={{ width: '100%', height: 80, borderWidth: 0.2, paddingLeft: 5, marginTop: 10 }}>
                                                <TextInput
                                                    onChangeText={value => this.onTextChange1(value, index)}
                                                    value={this.state.getgoal}
                                                    onFocus={value => this.setState({ show_error: '' })}
                                                    multiline={true}
                                                    style={{ padding: 5 }}
                                                    placeholder={"Type here..."} />

                                            </View>
                                        </View>
                                    </View>
                                }
                            />
                            :
                            <></>
                        }

                    </View>
                    {this.state.markedDays.length > 0 ?
                        // <TouchableOpacity onPress={() => { this.props.navigation.navigate('Dashboard') }} style={{ marginTop: 10, marginBottom: 8, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '90%', height: 50, borderRadius: 5, backgroundColor: '#1B0B2B' }}>
                        <TouchableOpacity onPress={() => { this.submit_days() }} style={{ marginTop: 10, marginBottom: 8, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '90%', height: 50, borderRadius: 5, backgroundColor: '#1B0B2B' }}>
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                        :
                        <></>
                    }

                </ScrollView>
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