import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Text, Button, Icon } from 'react-native-elements';
import { IRegistrationEntry } from '../interfaces/registration-entry.interface';

type Props = {
    item: IRegistrationEntry;
    deleteEntry: Function;
}

const EntrySectionListItem: React.FC<Props> = ({ item, deleteEntry }) => {

    return (
        <View style={styles.inputContainerStyle}>
            <Text style={{ fontSize: 18 }}>Date: {new Date(item.txnYear!, item.txnMonth!, item.txnDay!).toLocaleDateString()}</Text>
            <Text style={{ fontSize: 18 }}>First Name: {item.firstName}</Text>
            <Text style={{ fontSize: 18 }}>Last Name: {item.lastName}</Text>
            <Text style={{ fontSize: 18 }}>Business Name: {item.businessName}</Text>
            <Text style={{ fontSize: 18 }}>Contact Number: {item.contactNumber}</Text>
            <Text style={{ fontSize: 18 }}>Email: {item.email}</Text>
            <Text style={{ fontSize: 18 }}>typeOfBusiness: {item.typeOfBusiness}</Text>
            <Text style={{ fontSize: 18 }}>Description: {item.description}</Text>
            <ButtonGroup
                containerStyle={{ backgroundColor: 'skyblue', width: '40%', borderColor: 'skyblue' }}
                buttons={
                    [<Button
                        icon={<Icon
                            name="edit"
                            color="green"
                        />}
                        type="clear"
                        title="Edit"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => { }}
                    />,
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

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '100%',
        padding: 9
    }
});

export default EntrySectionListItem;