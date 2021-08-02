import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { Button, Input, Text, CheckBox } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * Type for props to be passed by App when mounting AddEntry
 */
type Props = {
    createEntry: Function,
    cancelCreateEntry: Function
}

/**
 * Type for state variable
 */
type IState = {
    txnDay: number | null;
    txnMonth: number | null;
    txnYear: number | null;
    date: Date;
    firstName: string;
    lastName: string;
    businessName: string;
    contactNumber: number;
    email: string;
    typeOfBusiness: string;
    description: string;

}

const AddEntry: React.FC<Props> = ({ createEntry, cancelCreateEntry }) => {
    const date = new Date(); // for initializing all the dates.
    const [state, setState] = useState<IState>({
        txnDay: date.getDate(),
        txnMonth: date.getMonth(),
        txnYear: date.getFullYear(),
        date: new Date(),
        firstName: '',
        lastName: '',
        businessName: '',
        contactNumber: 0,
        email: '',
        typeOfBusiness: '',
        description: '',
    })
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios" ? true : false);


    return (
        <SafeAreaView style={styles.container}>

            <Text h3 style={[styles.inputContainerStyle, { color: 'darkblue' }]}>Register Your Business Here</Text>

            {/* Only show button below if the OS is not ios. IOS DateTimePicker is visible by default */}
            {Platform.OS !== "ios" && <Button style={styles.inputContainerStyle}
                title="Select Date"
                onPress={() => {
                    setShowDatePicker(true);
                }}
            />}
            {showDatePicker && <DateTimePicker
                style={styles.inputContainerStyle}
                value={state.date}
                mode={'date'}
                //is24Hour={true}
                display="default"
                onChange={(_event: any, selectedDate: any) => {
                    const date: Date = selectedDate as Date;
                    setState({
                        ...state,
                        date: selectedDate,
                        txnDay: date.getDate(),
                        txnMonth: date.getMonth(),
                        txnYear: date.getFullYear()
                    })
                    setShowDatePicker(Platform.OS === "ios" ? true : false);
                }}
            />}

            <Input
                label="Owner's First Name:"
                placeholder="Business Owner's first name here"
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={firstName => setState({ ...state, firstName })}
            />
            <Input
                label="Owner's Last Name:"
                placeholder="Last name here"
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={lastName => setState({ ...state, lastName })}

            />

            <Input
                label="Name Of Company:"
                placeholder="Company name here"
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'building' }}
                onChangeText={businessName => setState({ ...state, businessName })}
            />

            <Input
                label="Contact Number:"
                placeholder="Contact number here"
                keyboardType="numeric"
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                onChangeText={contactNumber => setState({ ...state, contactNumber: +contactNumber })}
            />

            <Input
                label="Email:"
                placeholder="Business email here..."
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={email => setState({ ...state, email })}
            />

            <Input
                label="Type Of Company:"
                placeholder="e.g Pharmaceuticals, Oil and Gas, etc."
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'building' }}
                onChangeText={typeOfBusiness => setState({ ...state, typeOfBusiness })}
            />

            <Input
                label="Description::"
                placeholder="talk about your company in a few words..."
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'building' }}
                onChangeText={description => setState({ ...state, description })}
            />

            <View style={{ flexDirection: 'row' }}>
                <Button
                    style={[styles.inputContainerStyle, { paddingRight: 1 }]}
                    title="Submit"
                    onPress={() => {
                        //call create which will also make the form disappear
                        createEntry(state);
                    }}
                    buttonStyle={{ backgroundColor: 'green' }}
                /><Button
                    style={[styles.inputContainerStyle, { paddingLeft: 1 }]}
                    title="Cancel"
                    onPress={() => {
                        //call create which will also make the form disappear
                        cancelCreateEntry();
                    }}
                    buttonStyle={{ backgroundColor: 'darkblue' }}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30,
        color: 'white',
        fontSize: 50
    },
    inputContainerStyle: {
        width: '100%',
        padding: 0,
        backgroundColor: 'lightblue',
        marginBottom: 30,
        color: 'black',

    }
});

export default AddEntry;