import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Icon, Text, Button } from 'react-native-elements';
import { IRegistrationEntry } from '../interfaces/registration-entry.interface';

type Props = {
    item: IRegistrationEntry;
    deleteEntry: Function;
}

const EntryFlatListItem: React.FC<Props> = ({ item, deleteEntry }) => {

    return (
        <View style={styles.inputContainerStyle}>
            <Text style={{ fontSize: 18, }}><Text style={{fontWeight: 'bold'}}>Date: </Text> {new Date(item.txnYear!, item.txnMonth!, item.txnDay!).toLocaleDateString()}</Text>
            <Text style={{ fontSize: 18 }}><Text style={{fontWeight: 'bold'}}>First Name: </Text>  {item.firstName}</Text>
            <Text style={{ fontSize: 18 }}><Text style={{fontWeight: 'bold'}}>Last Name:</Text> {item.lastName}</Text>
            <Text style={{ fontSize: 18 }}><Text style={{fontWeight: 'bold'}}>Business Name: </Text>{item.businessName}</Text>
            <Text style={{ fontSize: 18 }}><Text style={{fontWeight: 'bold'}}>Contact Number: </Text> {item.contactNumber}</Text>
            <Text style={{ fontSize: 18 }}><Text style={{fontWeight: 'bold'}}>Email:</Text> {item.email}</Text>
            <Text style={{ fontSize: 18 }}><Text style={{fontWeight: 'bold'}}>typeOfBusiness: </Text> {item.typeOfBusiness}</Text>
            <Text style={{ fontSize: 18 }}><Text style={{fontWeight: 'bold'}}>Description: </Text> {item.description}</Text>

            <ButtonGroup
                containerStyle={{ backgroundColor: 'skyblue', width: '40%', borderColor: 'skyblue' }}
                buttons={
                    [
                    <Button
                        icon={<Icon
                            name="delete"
                            color="red"
                        />}
                        type="clear"
                        title="Delete"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => {
                            deleteEntry(item.id!)
                        }}
                    />
                    ]
                }
            />
        </View>
    )
}

export default EntryFlatListItem;

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '100%',
        padding: 9
    }
});